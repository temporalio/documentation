import React, { useMemo } from "react";
import { useColorMode } from "@docusaurus/theme-common";
import {
  DIAGRAM_NODES,
  routePath,
  getActiveNodes,
  getDiagramPalette,
} from "./temporal-lifecycle-layout";

const ENV_BOX = { x: 2, y: 8, w: 38, h: 62 };
const SERVER_BOX = { x: 44, y: 8, w: 80, h: 62 };

function ServerBlock({ x, y, w, h, label, active, dim, kind, palette, fontSize = 3.2 }) {
  let fill = palette.serverBlock;
  if (dim) fill = palette.serverBlockDim;
  if (active) fill = palette.serverBlockActive;
  if (kind === "frontend") fill = active ? palette.serverBlockActive : palette.serverBlock;
  if (kind === "queue") fill = active ? palette.taskQueueActive : palette.taskQueue;
  if (kind === "client") fill = active ? palette.clientBlockActive : palette.clientBlock;
  if (kind === "env") fill = active ? palette.envBlock : palette.envBlockDim;

  const labelFill = active && fill === palette.serverBlockActive ? palette.textOnAccent : palette.text;

  return (
    <g>
      {active && (
        <rect
          x={x - w / 2 - 1}
          y={y - h / 2 - 1}
          width={w + 2}
          height={h + 2}
          fill="none"
          stroke={palette.glow}
          strokeWidth="0.7"
        />
      )}
      <rect
        x={x - w / 2}
        y={y - h / 2}
        width={w}
        height={h}
        fill={fill}
      />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={labelFill}
        fontSize={fontSize}
        fontWeight="600"
        className="lifecycle-diagram-label"
      >
        {label}
      </text>
    </g>
  );
}

const LifecycleDiagram = ({ step, prefix = "lifecycle", palette: paletteProp }) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const palette = useMemo(() => paletteProp || getDiagramPalette(isDark), [paletteProp, isDark]);
  const activeNodes = getActiveNodes(step);

  const envCenterX = ENV_BOX.x + ENV_BOX.w / 2;
  const serverCenterX = SERVER_BOX.x + SERVER_BOX.w / 2;

  return (
    <svg
      viewBox="0 0 126 78"
      preserveAspectRatio="xMidYMid meet"
      className="lifecycle-diagram-svg"
      aria-hidden="true"
    >
      <defs>
        <marker id={`${prefix}-arr-req`} markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5 Z" fill={palette.connectorActive} />
        </marker>
        <marker id={`${prefix}-arr-ret`} markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5 Z" fill={palette.connectorReturn} />
        </marker>
      </defs>

      <rect
        x={ENV_BOX.x}
        y={ENV_BOX.y}
        width={ENV_BOX.w}
        height={ENV_BOX.h}
        fill={palette.envBg}
        stroke={palette.envBorder}
        strokeWidth="0.6"
        strokeDasharray="2.5 1.5"
      />
      <text
        x={envCenterX}
        y={ENV_BOX.y + 4.5}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={palette.envBorder}
        fontSize="2.4"
        fontWeight="700"
        className="lifecycle-diagram-label"
      >
        YOUR ENVIRONMENT
      </text>

      <rect x={SERVER_BOX.x} y={SERVER_BOX.y} width={SERVER_BOX.w} height={SERVER_BOX.h} fill={palette.serverBg} />
      <text
        x={serverCenterX}
        y={SERVER_BOX.y + 4.5}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={palette.text}
        fontSize="3.2"
        fontWeight="700"
        className="lifecycle-diagram-label"
      >
        Temporal Server
      </text>

      {step.routes.map((route, idx) => (
        <path
          key={`route-${idx}`}
          d={routePath(route.from, route.to)}
          fill="none"
          stroke={route.return ? palette.connectorReturn : palette.connectorActive}
          strokeWidth="0.65"
          opacity="0.95"
          markerEnd={route.return ? `url(#${prefix}-arr-ret)` : `url(#${prefix}-arr-req)`}
        />
      ))}

      {Object.entries(DIAGRAM_NODES).map(([id, node]) => {
        const active = activeNodes.has(id);
        const dim = node.alwaysDim;

        if (node.kind === "worker") {
          return (
            <ServerBlock
              key={id}
              x={node.cx}
              y={node.cy}
              w={node.w}
              h={node.h}
              label={node.label}
              active={active || step.local === id}
              dim={!active && step.local !== id}
              kind="env"
              palette={palette}
              fontSize={node.fontSize}
            />
          );
        }

        if (node.kind === "client") {
          return (
            <ServerBlock
              key={id}
              x={node.cx}
              y={node.cy}
              w={node.w}
              h={node.h}
              label={node.label}
              active={active}
              dim={!active}
              kind="client"
              palette={palette}
              fontSize={node.fontSize}
            />
          );
        }

        return (
          <ServerBlock
            key={id}
            x={node.cx}
            y={node.cy}
            w={node.w}
            h={node.h}
            label={node.label}
            active={active}
            dim={dim || (!active && !step.local)}
            kind={node.kind}
            palette={palette}
            fontSize={node.fontSize}
          />
        );
      })}
    </svg>
  );
};

export default LifecycleDiagram;
