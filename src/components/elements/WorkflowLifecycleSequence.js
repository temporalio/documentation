import React, { useState, useEffect, useRef, useCallback } from 'react';

// ── Brand colors ──────────────────────────────────────────────────────────────
const C = {
  bg: '#141414',
  surface: '#1c1c2e',
  surfaceAlt: '#1e1e2e',
  border: '#2a2a40',
  blue: '#444CE7',
  green: '#1ff1a5',
  indigo: '#cacbf9',
  muted: '#576e8f',
  dim: '#374761',
  text: '#F8FAFC',
  textSub: '#9ca3af',
};

// ── Actor definitions ─────────────────────────────────────────────────────────
const ACTORS = [
  { name: 'Your App',  sub: 'Client / SDK',    color: C.blue },
  { name: 'Frontend',  sub: 'Service',          color: C.blue },
  { name: 'History',   sub: 'Service',          color: C.blue },
  { name: 'Matching',  sub: 'Service',          color: C.blue },
  { name: 'Worker',    sub: 'Your Infrastructure', color: C.green },
];

// ── Phase definitions ─────────────────────────────────────────────────────────
const PHASES = [
  { id: 'workflow', label: 'Workflow Lifecycle', color: C.blue,   steps: [0,1,2,3,4,5,6] },
  { id: 'activity', label: 'Activity Lifecycle', color: C.green,  steps: [7,8,9,10] },
  { id: 'resume',   label: 'Resume & Close',     color: C.indigo, steps: [11,12,13,14] },
];

// ── Step data ─────────────────────────────────────────────────────────────────
// Each arrow: { from, to } — indices into ACTORS (0–4)
// selfLoop: true  →  draw a loopback arc on that actor
const STEPS = [
  {
    id: 1,
    phase: 'workflow',
    title: 'Client sends StartWorkflowExecution',
    description: 'Your application calls StartWorkflowExecution on the Temporal gRPC API. The request carries the Workflow type, input arguments, and the Task Queue name. The Frontend Service validates and rate-limits the call, then routes it to the History Service, which will own and track this Workflow Execution.',
    arrows: [
      { from: 0, to: 1, label: 'StartWorkflowExecution' },
      { from: 1, to: 2, label: 'route to History' },
    ],
    events: [],
  },
  {
    id: 2,
    phase: 'workflow',
    title: 'History initializes the Workflow Execution',
    description: 'The History Service creates a new Workflow Execution record in the database and starts the Event History with two events: WorkflowExecutionStarted (capturing all inputs) and WorkflowTaskScheduled (signaling that a Worker needs to run). It also creates an internal Transfer Task telling the system to enqueue a Workflow Task.',
    arrows: [
      { from: 2, to: 2, label: 'persist + init Event History', selfLoop: true },
    ],
    events: ['WorkflowExecutionStarted', 'WorkflowTaskScheduled'],
  },
  {
    id: 3,
    phase: 'workflow',
    title: 'Workflow Task is placed on the Task Queue',
    description: 'A background queue processor inside the History Service reads the Transfer Task and calls the Matching Service to enqueue a Workflow Task for the specified Task Queue. The Task Queue now holds one pending task, waiting for a Worker to pick it up.',
    arrows: [
      { from: 2, to: 3, label: 'AddWorkflowTask' },
    ],
    events: [],
  },
  {
    id: 4,
    phase: 'workflow',
    title: 'Worker polls and receives the Workflow Task',
    description: 'A Worker process is already long-polling the Task Queue via PollWorkflowTask. The Frontend forwards the poll to the Matching Service. Matching selects the pending task, notifies History (which appends WorkflowTaskStarted), and returns the Workflow Task plus the full Event History to the Worker through the Frontend.',
    arrows: [
      { from: 4, to: 1, label: 'PollWorkflowTask (long-poll)' },
      { from: 1, to: 3, label: 'forward to Matching' },
      { from: 2, to: 1, label: 'WorkflowTask + Event History' },
      { from: 1, to: 4, label: 'deliver task to Worker' },
    ],
    events: ['WorkflowTaskStarted'],
  },
  {
    id: 5,
    phase: 'workflow',
    title: 'Worker replays history and runs your Workflow code',
    description: 'The SDK replays the Event History to reconstruct the Workflow\'s logical state — this is the cornerstone of durable execution. After replay, it executes your Workflow function. The Workflow runs until it either returns or reaches an await point (waiting for an Activity, timer, or Signal).',
    arrows: [
      { from: 4, to: 4, label: 'replay history → execute Workflow code', selfLoop: true },
    ],
    events: [],
  },
  {
    id: 6,
    phase: 'workflow',
    title: 'Workflow issues Commands back to History',
    description: 'When your Workflow calls a Temporal API (e.g. executeActivity), the SDK records a Command — like ScheduleActivityTask — instead of executing it immediately. Once the Workflow can make no more progress, the Worker sends RespondWorkflowTaskCompleted carrying the list of Commands to the Frontend, which forwards them to History.',
    arrows: [
      { from: 4, to: 1, label: 'RespondWorkflowTaskCompleted + Commands' },
      { from: 1, to: 2, label: 'forward Commands' },
    ],
    events: [],
  },
  {
    id: 7,
    phase: 'workflow',
    title: 'History converts Commands into Events and new Tasks',
    description: 'History turns each Command into durable Events — appending WorkflowTaskCompleted and ActivityTaskScheduled. It then creates Transfer Tasks, which queue processors use to call the Matching Service and place Activity Tasks on the Activity Task Queue. The Workflow is now suspended, waiting for the Activity to complete.',
    arrows: [
      { from: 2, to: 3, label: 'AddActivityTask (via queue processor)' },
    ],
    events: ['WorkflowTaskCompleted', 'ActivityTaskScheduled'],
  },
  {
    id: 8,
    phase: 'activity',
    title: 'Activity Task queued in Matching',
    description: 'For each ActivityTaskScheduled event, a queue processor in the History Service calls the Matching Service to add an Activity Task to the Activity Task Queue. The task waits here until an Activity Worker polls for it.',
    arrows: [
      { from: 2, to: 3, label: 'AddActivityTask' },
    ],
    events: [],
  },
  {
    id: 9,
    phase: 'activity',
    title: 'Worker polls and receives the Activity Task',
    description: 'A Worker (possibly a different host from the Workflow Worker) long-polls the Activity Task Queue via PollActivityTask. Matching selects the task, History appends ActivityTaskStarted and sets up timeout timers (schedule-to-close, start-to-close). The Activity Task and its inputs are returned to the Worker via the Frontend.',
    arrows: [
      { from: 4, to: 1, label: 'PollActivityTask (long-poll)' },
      { from: 1, to: 3, label: 'forward to Matching' },
      { from: 2, to: 1, label: 'ActivityTask + inputs' },
      { from: 1, to: 4, label: 'deliver task to Worker' },
    ],
    events: ['ActivityTaskStarted'],
  },
  {
    id: 10,
    phase: 'activity',
    title: 'Worker executes your Activity code',
    description: 'The Worker calls your Activity function with the inputs from the task. Unlike Workflow code, Activity code is never replayed — it can perform I/O, call external APIs, write to databases, or do anything non-deterministic. This is where the real work of your application happens.',
    arrows: [
      { from: 4, to: 4, label: 'execute Activity code (I/O, APIs, side effects)', selfLoop: true },
    ],
    events: [],
  },
  {
    id: 11,
    phase: 'activity',
    title: 'Activity reports result to History',
    description: 'On success, the Worker sends RespondActivityTaskCompleted with the result. On failure, it sends RespondActivityTaskFailed. History appends ActivityTaskCompleted (or ActivityTaskFailed) and either schedules a retry or appends WorkflowTaskScheduled to wake the waiting Workflow. The Activity\'s lifecycle is now complete.',
    arrows: [
      { from: 4, to: 1, label: 'RespondActivityTaskCompleted (result)' },
      { from: 1, to: 2, label: 'forward result' },
    ],
    events: ['ActivityTaskCompleted', 'WorkflowTaskScheduled'],
  },
  {
    id: 12,
    phase: 'resume',
    title: 'New Workflow Task scheduled for resume',
    description: 'Because the Activity completed, History has appended new events and scheduled a fresh Workflow Task. A queue processor calls the Matching Service to add this task to the Workflow Task Queue. The Workflow is about to wake up.',
    arrows: [
      { from: 2, to: 3, label: 'AddWorkflowTask (resume)' },
    ],
    events: [],
  },
  {
    id: 13,
    phase: 'resume',
    title: 'Worker resumes the Workflow',
    description: 'A Worker polls the Workflow Task Queue again. History appends WorkflowTaskStarted and returns the updated Event History. The SDK replays the history up to the current point, unblocks the awaited Activity call with its result, and your Workflow function continues executing from the new state.',
    arrows: [
      { from: 4, to: 1, label: 'PollWorkflowTask' },
      { from: 2, to: 4, label: 'updated Event History' },
    ],
    events: ['WorkflowTaskStarted'],
  },
  {
    id: 14,
    phase: 'resume',
    title: 'Workflow closes',
    description: 'The cycle — Workflow Task → Commands → Events → new Tasks — repeats until the Workflow function returns. The Worker sends CompleteWorkflowExecution. History appends WorkflowTaskCompleted and WorkflowExecutionCompleted, permanently closing the execution. A Workflow can also close via failure, cancellation, termination, or Continue-As-New.',
    arrows: [
      { from: 4, to: 1, label: 'RespondWorkflowTaskCompleted + CompleteWorkflowExecution' },
      { from: 1, to: 2, label: 'forward' },
    ],
    events: ['WorkflowTaskCompleted', 'WorkflowExecutionCompleted'],
  },
  {
    id: 15,
    phase: 'resume',
    title: 'Client retrieves the final result',
    description: 'While a Workflow is open, Clients can Query it (read-only state) and send Signals to it. After it closes, a Client requests the result via the SDK. The SDK calls the Frontend, which reads the result from the History Service and Persistence Layer, and returns it to your application.',
    arrows: [
      { from: 0, to: 1, label: 'GetWorkflowResult' },
      { from: 1, to: 2, label: 'read from Persistence' },
      { from: 1, to: 0, label: 'final result' },
    ],
    events: [],
  },
];

// ── SVG layout constants ──────────────────────────────────────────────────────
const SVG_W = 700;
const ACTOR_X = [54, 189, 336, 483, 630];
const ACTOR_BOX_W = 92;
const ACTOR_BOX_H = 46;
const LIFELINE_TOP = ACTOR_BOX_H;
const SVG_PADDING_BOTTOM = 16;

function getArrowYs(count) {
  if (count === 1) return [110];
  if (count === 2) return [88, 128];
  if (count === 3) return [76, 108, 140];
  return [68, 96, 124, 152];
}

function getSvgHeight(arrowCount) {
  const ys = getArrowYs(arrowCount);
  return Math.max(180, ys[ys.length - 1] + SVG_PADDING_BOTTOM + 30);
}

// ── Arrow SVG element ─────────────────────────────────────────────────────────
function Arrow({ from, to, label, y, animKey, phaseColor, selfLoop, index }) {
  const x1 = ACTOR_X[from];
  const x2 = ACTOR_X[to];
  const animId = `arrow-${animKey}-${index}`;
  const delay = `${index * 0.18}s`;

  if (selfLoop) {
    const markerId = `ah-sl-${animKey}-${index}`;
    const center = x1 + ACTOR_BOX_W / 2;
    // Rightmost actor (Worker) loops left so it stays in-bounds; all others loop right
    const goLeft = from === ACTORS.length - 1;
    const loopX = goLeft ? center - 56 : center + 56;
    const textX = goLeft ? loopX - 6 : loopX + 6;
    const pathD = `M ${center} ${y - 10} Q ${loopX} ${y - 10} ${loopX} ${y} Q ${loopX} ${y + 10} ${center} ${y + 10}`;
    return (
      <g>
        <defs>
          <marker id={markerId} markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill={phaseColor} />
          </marker>
        </defs>
        <path
          d={pathD}
          fill="none"
          stroke={phaseColor}
          strokeWidth="2"
          markerEnd={`url(#${markerId})`}
          style={{ animation: `drawPath 0.5s ease forwards ${delay}`, strokeDasharray: 120, strokeDashoffset: 120 }}
        />
        <text x={textX} y={y + 4} fontSize="9.5" fill={C.textSub} textAnchor={goLeft ? 'end' : 'start'}>{label}</text>
      </g>
    );
  }

  const goingRight = x2 > x1;
  const startX = goingRight ? x1 + ACTOR_BOX_W / 2 : x1 + ACTOR_BOX_W / 2;
  const endX   = goingRight ? x2 + ACTOR_BOX_W / 2 : x2 + ACTOR_BOX_W / 2;
  const midX = (startX + endX) / 2;
  const lineLen = Math.abs(endX - startX);

  return (
    <g>
      <defs>
        <marker id={`ah-${animKey}-${index}`} markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill={phaseColor} />
        </marker>
      </defs>
      <line
        x1={startX} y1={y}
        x2={endX}   y2={y}
        stroke={phaseColor}
        strokeWidth="2"
        markerEnd={`url(#ah-${animKey}-${index})`}
        style={{
          animation: `drawLine 0.4s ease forwards ${delay}`,
          strokeDasharray: lineLen,
          strokeDashoffset: lineLen,
        }}
      />
      <text
        x={midX}
        y={y - 6}
        fontSize="9.5"
        fill={C.textSub}
        textAnchor="middle"
        style={{ animation: `fadeIn 0.3s ease forwards ${parseFloat(delay) + 0.35}s`, opacity: 0 }}
      >
        {label}
      </text>
    </g>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function WorkflowLifecycleSequence() {
  const [stepIdx, setStepIdx] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef(null);

  const step = STEPS[stepIdx];
  const phase = PHASES.find(p => p.id === step.phase);

  const activeSet = new Set(step.arrows.flatMap(a => [a.from, a.to]));

  const goTo = useCallback((idx) => {
    setStepIdx(idx);
    setAnimKey(k => k + 1);
  }, []);

  const next = useCallback(() => { if (stepIdx < STEPS.length - 1) goTo(stepIdx + 1); }, [stepIdx, goTo]);
  const prev = useCallback(() => { if (stepIdx > 0) goTo(stepIdx - 1); }, [stepIdx, goTo]);

  useEffect(() => {
    if (playing) {
      timerRef.current = setInterval(() => {
        setStepIdx(idx => {
          if (idx >= STEPS.length - 1) {
            setPlaying(false);
            clearInterval(timerRef.current);
            return idx;
          }
          setAnimKey(k => k + 1);
          return idx + 1;
        });
      }, 2800);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [playing]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === ' ') { e.preventDefault(); setPlaying(p => !p); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev]);

  const arrowYs = getArrowYs(step.arrows.length);
  const svgH = getSvgHeight(step.arrows.length);

  return (
    <div style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', background: C.bg, borderRadius: 12, overflow: 'hidden', border: `1px solid ${C.border}`, marginBottom: 24 }}>
      <style>{`
        @keyframes drawLine {
          to { stroke-dashoffset: 0; }
        }
        @keyframes drawPath {
          to { stroke-dashoffset: 0; }
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 transparent; }
          50% { box-shadow: 0 0 12px 2px ${C.blue}44; }
        }
      `}</style>

      {/* ── Phase tabs ── */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${C.border}` }}>
        {PHASES.map(p => {
          const active = p.id === step.phase;
          return (
            <button
              key={p.id}
              onClick={() => goTo(p.steps[0])}
              style={{
                flex: 1, padding: '10px 8px', border: 'none', cursor: 'pointer',
                background: active ? C.surfaceAlt : 'transparent',
                color: active ? p.color : C.muted,
                borderBottom: active ? `2px solid ${p.color}` : '2px solid transparent',
                fontSize: 11, fontWeight: active ? 700 : 500,
                letterSpacing: '0.04em', transition: 'all 0.2s',
                fontFamily: 'inherit',
              }}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      {/* ── SVG diagram ── */}
      <div style={{ background: C.surfaceAlt, padding: '16px 16px 8px', overflowX: 'auto' }}>
        <svg
          key={animKey}
          width={SVG_W}
          height={svgH}
          viewBox={`0 0 ${SVG_W} ${svgH}`}
          style={{ display: 'block', margin: '0 auto', maxWidth: '100%' }}
        >
          {/* Lifelines */}
          {ACTORS.map((_, i) => (
            <line
              key={i}
              x1={ACTOR_X[i] + ACTOR_BOX_W / 2}
              y1={LIFELINE_TOP}
              x2={ACTOR_X[i] + ACTOR_BOX_W / 2}
              y2={svgH - SVG_PADDING_BOTTOM}
              stroke={activeSet.has(i) ? C.dim : '#1e1e30'}
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
          ))}

          {/* Actor boxes */}
          {ACTORS.map((actor, i) => {
            const active = activeSet.has(i);
            const isWorker = i === 4;
            return (
              <g key={i}>
                <rect
                  x={ACTOR_X[i]} y={0}
                  width={ACTOR_BOX_W} height={ACTOR_BOX_H}
                  rx={7}
                  fill={active ? (isWorker ? '#1a2e24' : '#1e2040') : '#181820'}
                  stroke={active ? actor.color : C.dim}
                  strokeWidth={active ? 1.5 : 1}
                  style={{ transition: 'all 0.3s' }}
                />
                <text
                  x={ACTOR_X[i] + ACTOR_BOX_W / 2}
                  y={ACTOR_BOX_H / 2 - 5}
                  fontSize="11"
                  fontWeight="700"
                  fill={active ? C.text : C.muted}
                  textAnchor="middle"
                  style={{ transition: 'fill 0.3s' }}
                >
                  {actor.name}
                </text>
                <text
                  x={ACTOR_X[i] + ACTOR_BOX_W / 2}
                  y={ACTOR_BOX_H / 2 + 9}
                  fontSize="8.5"
                  fill={active ? actor.color : C.dim}
                  textAnchor="middle"
                  style={{ transition: 'fill 0.3s' }}
                >
                  {actor.sub}
                </text>
              </g>
            );
          })}

          {/* Arrows for current step */}
          {step.arrows.map((arrow, i) => (
            <Arrow
              key={`${animKey}-${i}`}
              from={arrow.from}
              to={arrow.to}
              label={arrow.label}
              y={arrowYs[i]}
              animKey={animKey}
              index={i}
              phaseColor={phase.color}
              selfLoop={arrow.selfLoop}
            />
          ))}
        </svg>
      </div>

      {/* ── Step info card ── */}
      <div style={{ padding: '16px 20px 12px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
          <span style={{ fontSize: 11, color: phase.color, fontWeight: 700, letterSpacing: '0.06em' }}>
            STEP {step.id} / {STEPS.length}
          </span>
          <span style={{ fontSize: 11, color: C.muted }}>{phase.label}</span>
        </div>
        <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 8 }}>
          {step.title}
        </div>
        <div style={{ fontSize: 13, color: C.textSub, lineHeight: 1.65, marginBottom: step.events.length ? 10 : 0 }}>
          {step.description}
        </div>
        {step.events.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
            <span style={{ fontSize: 11, color: C.muted, alignSelf: 'center' }}>Events written:</span>
            {step.events.map(e => (
              <span key={e} style={{ fontSize: 11, fontFamily: 'monospace', background: '#1e2040', color: C.indigo, padding: '2px 8px', borderRadius: 4, border: `1px solid ${C.dim}` }}>
                {e}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ── Navigation ── */}
      <div style={{ padding: '10px 20px 14px', borderTop: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Step dots */}
        <div style={{ display: 'flex', gap: 5, justifyContent: 'center', flexWrap: 'wrap' }}>
          {STEPS.map((s, i) => {
            const dotPhase = PHASES.find(p => p.id === s.phase);
            const isActive = i === stepIdx;
            const isPast = i < stepIdx;
            return (
              <button
                key={i}
                onClick={() => goTo(i)}
                title={`Step ${s.id}: ${s.title}`}
                style={{
                  width: isActive ? 20 : 8,
                  height: 8,
                  borderRadius: 4,
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  background: isActive ? dotPhase.color : isPast ? `${dotPhase.color}55` : C.dim,
                  transition: 'all 0.25s',
                }}
              />
            );
          })}
        </div>

        {/* Prev / Next / Play */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center' }}>
          <button
            onClick={prev}
            disabled={stepIdx === 0}
            style={{
              padding: '7px 18px', borderRadius: 7, border: `1px solid ${C.dim}`,
              background: 'transparent', color: stepIdx === 0 ? C.dim : C.text,
              fontSize: 13, cursor: stepIdx === 0 ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit', fontWeight: 500,
            }}
          >
            ← Prev
          </button>
          <button
            onClick={() => setPlaying(p => !p)}
            style={{
              padding: '7px 20px', borderRadius: 7, border: 'none',
              background: playing ? C.green : phase.color,
              color: playing ? '#141414' : '#fff',
              fontSize: 13, cursor: 'pointer',
              fontFamily: 'inherit', fontWeight: 600,
              transition: 'background 0.2s',
            }}
          >
            {playing ? '⏸ Pause' : '▶ Auto-play'}
          </button>
          <button
            onClick={next}
            disabled={stepIdx === STEPS.length - 1}
            style={{
              padding: '7px 18px', borderRadius: 7, border: `1px solid ${C.dim}`,
              background: 'transparent', color: stepIdx === STEPS.length - 1 ? C.dim : C.text,
              fontSize: 13, cursor: stepIdx === STEPS.length - 1 ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit', fontWeight: 500,
            }}
          >
            Next →
          </button>
        </div>

        <div style={{ textAlign: 'center', fontSize: 11, color: C.muted }}>
          Use ← → arrow keys or Space to navigate
        </div>
      </div>
    </div>
  );
}
