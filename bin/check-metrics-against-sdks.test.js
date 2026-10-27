const { describe, it } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const {
  SDKS,
  BASELINE,
  applyBaseline,
  stripRustTestModule,
  extractRust,
  extractGo,
  extractJava,
  resolveConcatenations,
  compare,
} = require('./check-metrics-against-sdks.js');

// Snippets in the shape each SDK actually writes, trimmed to the cases the
// extractors have to get right. Anything exercised here was a real bug or a
// real trap in the sources at the time it was written.

const RUST = `
const NUM_POLLERS_NAME: &str = "num_pollers";
pub const WORKFLOW_E2E_LATENCY_HISTOGRAM_NAME: &str = "workflow_endtoend_latency";
const KEY_NAMESPACE: &str = "namespace";

fn workflow_completed(meter: &Meter) -> Counter {
    meter.counter(MetricParameters {
        name: "workflow_completed".into(),
        description: "Count of workflows completed".into(),
    })
}

fn pollers(meter: &Meter) -> Gauge {
    meter.gauge(MetricParameters {
        name: NUM_POLLERS_NAME.into(),
        description: "Current number of pollers".into(),
    })
}

fn e2e(meter: &Meter) -> Histogram {
    meter.histogram_duration(MetricParameters {
        name: WORKFLOW_E2E_LATENCY_HISTOGRAM_NAME.into(),
        unit: "duration".into(),
    })
}

fn slots(meter: &Meter) {
    let mem_usage = meter.gauge_f64("resource_slots_mem_usage".into());
}

#[cfg(test)]
mod tests {
    use super::*;

    fn fake(meter: &Meter) {
        meter.counter(MetricParameters {
            name: "ctr".into(),
        });
    }
}
`;

const GO = `
const (
	TemporalMetricsPrefix = "temporal_"

	WorkflowCompletedCounter = TemporalMetricsPrefix + "workflow_completed"
	TemporalRequest          = TemporalMetricsPrefix + "request"
	TemporalRequestFailure   = TemporalRequest + "_failure"
	LocalActivityFailedCounter = TemporalMetricsPrefix + "local_activity_failed" // Deprecated: use LocalActivityExecutionFailedCounter instead.
	// Deprecated: use WorkflowCompletedCounter instead.
	LocalActivityCanceledCounter = TemporalMetricsPrefix + "local_activity_canceled"
	WorkflowActiveThreadCount    = TemporalMetricsPrefix + "workflow_active_thread_count"
)

const (
	ClientTagValue = "temporal_go"
	NamespaceTagName = "namespace"
)
`;

const JAVA = `
public class MetricsType {
  public static final String TEMPORAL_METRICS_PREFIX = "temporal_";

  public static final String WORKFLOW_COMPLETED_COUNTER =
      TEMPORAL_METRICS_PREFIX + "workflow_completed";

  /** Emitted when a Workflow Task heartbeats; see @Deprecated docs elsewhere. */
  public static final String WORKFLOW_TASK_HEARTBEAT_COUNTER =
      TEMPORAL_METRICS_PREFIX + "workflow_task_heartbeat";

  @Deprecated
  public static final String ACTIVITY_CANCELED_COUNTER =
      TEMPORAL_METRICS_PREFIX + "activity_canceled";

  @Experimental
  public static final String NEXUS_POLL_NO_TASK_COUNTER =
      TEMPORAL_METRICS_PREFIX + "nexus_poll_no_task";
}
`;

describe('stripRustTestModule', () => {
  it('drops the inline test module', () => {
    const body = stripRustTestModule(RUST);
    assert.ok(!body.includes('"ctr"'));
    assert.ok(body.includes('"workflow_completed"'));
  });

  it('leaves a file with no test module alone', () => {
    const source = 'const A: &str = "a";\n';
    assert.strictEqual(stripRustTestModule(source), source);
  });

  it('keeps a #[cfg(test)] that is not a module', () => {
    const source = '#[cfg(test)]\nuse crate::TelemetryInstance;\nconst A: &str = "a";';
    assert.ok(stripRustTestModule(source).includes('const A'));
  });
});

describe('extractRust', () => {
  const names = extractRust([{ source: RUST }]).map((m) => m.name);

  it('reads names given as literals', () => {
    assert.ok(names.includes('workflow_completed'));
  });

  it('resolves names given as constants', () => {
    assert.ok(names.includes('num_pollers'));
    assert.ok(names.includes('workflow_endtoend_latency'));
  });

  it('reads names from direct meter calls', () => {
    assert.ok(names.includes('resource_slots_mem_usage'));
  });

  it('ignores constants that are never registered as metrics', () => {
    assert.ok(!names.includes('namespace'));
  });

  it('ignores instruments registered only in tests', () => {
    assert.ok(!names.includes('ctr'));
  });

  it('resolves constants defined in a different file of the same SDK', () => {
    const found = extractRust([
      { source: 'pub const SHARED_NAME: &str = "shared_metric";' },
      { source: 'meter.counter(MetricParameters { name: SHARED_NAME.into() });' },
    ]);
    assert.deepStrictEqual(
      found.map((m) => m.name),
      ['shared_metric']
    );
  });
});

describe('extractGo', () => {
  const found = extractGo([{ source: GO }]);
  const names = found.map((m) => m.name);

  it('strips the prefix constant', () => {
    assert.ok(names.includes('workflow_completed'));
  });

  it('resolves a name chained off another metric constant', () => {
    assert.ok(names.includes('request_failure'));
  });

  it('ignores tag values that merely start with temporal_', () => {
    assert.ok(!names.includes('go'));
  });

  it('ignores constants that are not metric names', () => {
    assert.ok(!names.includes('namespace'));
  });

  it('records the identifier so usage can be checked', () => {
    const metric = found.find((m) => m.name === 'workflow_active_thread_count');
    assert.strictEqual(metric.identifier, 'WorkflowActiveThreadCount');
  });

  it('picks up a trailing deprecation comment', () => {
    const metric = found.find((m) => m.name === 'local_activity_failed');
    assert.deepStrictEqual(metric.annotations, ['Deprecated']);
  });

  it('picks up a preceding deprecation comment', () => {
    const metric = found.find((m) => m.name === 'local_activity_canceled');
    assert.deepStrictEqual(metric.annotations, ['Deprecated']);
  });

  it('does not carry a deprecation onto the next constant', () => {
    const metric = found.find((m) => m.name === 'workflow_active_thread_count');
    assert.deepStrictEqual(metric.annotations, []);
  });
});

describe('extractJava', () => {
  const found = extractJava([{ source: JAVA }]);
  const names = found.map((m) => m.name);

  it('reads names split across lines', () => {
    assert.ok(names.includes('workflow_completed'));
  });

  it('records annotations', () => {
    assert.deepStrictEqual(found.find((m) => m.name === 'activity_canceled').annotations, ['Deprecated']);
    assert.deepStrictEqual(found.find((m) => m.name === 'nexus_poll_no_task').annotations, ['Experimental']);
  });

  it('does not read an annotation out of a comment', () => {
    assert.deepStrictEqual(found.find((m) => m.name === 'workflow_task_heartbeat').annotations, []);
  });

  it('ignores the prefix constant itself', () => {
    assert.ok(!names.includes(''));
  });
});

describe('resolveConcatenations', () => {
  it('resolves in any declaration order', () => {
    const values = resolveConcatenations([
      { identifier: 'B', expression: 'A + "_failure"' },
      { identifier: 'A', expression: 'PREFIX + "request"' },
      { identifier: 'PREFIX', expression: '"temporal_"' },
    ]);
    assert.strictEqual(values.get('B'), 'temporal_request_failure');
  });

  it('gives up on an unresolvable reference instead of guessing', () => {
    const values = resolveConcatenations([{ identifier: 'A', expression: 'someFunc() + "x"' }]);
    assert.strictEqual(values.get('A'), undefined);
  });

  it('does not hang on a cycle', () => {
    const values = resolveConcatenations([
      { identifier: 'A', expression: 'B + "a"' },
      { identifier: 'B', expression: 'A + "b"' },
    ]);
    assert.strictEqual(values.get('A'), undefined);
  });
});

describe('compare', () => {
  const sdk = (name, metrics) => ({
    name,
    metrics: new Map(metrics.map((m) => [m, { name: m, identifier: null, annotations: [] }])),
  });

  it('reports nothing when the page matches the sources', () => {
    const result = compare(
      [{ name: 'worker_start', availability: 'Core, Go' }],
      [sdk('Core', ['worker_start']), sdk('Go', ['worker_start'])]
    );
    assert.deepStrictEqual(result, {
      unknown: [],
      mismatched: [],
      undocumented: [],
    });
  });

  it('flags a documented metric no SDK defines', () => {
    const result = compare([{ name: 'invented_metric', availability: 'Go' }], [sdk('Go', ['worker_start'])]);
    assert.deepStrictEqual(result.unknown, [{ name: 'invented_metric', documented: 'Go' }]);
  });

  it('flags an availability list that is missing an SDK', () => {
    const result = compare(
      [{ name: 'worker_start', availability: 'Go' }],
      [sdk('Core', ['worker_start']), sdk('Go', ['worker_start'])]
    );
    assert.deepStrictEqual(result.mismatched, [{ name: 'worker_start', documented: 'Go', actual: 'Core, Go' }]);
  });

  it('flags an availability list claiming an SDK that lacks the metric', () => {
    const result = compare(
      [{ name: 'worker_start', availability: 'Core, Go' }],
      [sdk('Core', ['worker_start']), sdk('Go', [])]
    );
    assert.deepStrictEqual(result.mismatched, [{ name: 'worker_start', documented: 'Core, Go', actual: 'Core' }]);
  });

  it('flags a metric the SDKs define but the page omits', () => {
    const result = compare(
      [{ name: 'worker_start', availability: 'Go' }],
      [sdk('Go', ['worker_start', 'secret_metric'])]
    );
    assert.deepStrictEqual(result.undocumented, [{ name: 'secret_metric', sdks: 'Go', annotations: [] }]);
  });

  it('orders availability the way the page does', () => {
    const result = compare(
      [{ name: 'worker_start', availability: 'Core, Go, Java' }],
      [sdk('Core', ['worker_start']), sdk('Go', ['worker_start']), sdk('Java', ['worker_start'])]
    );
    assert.deepStrictEqual(result.mismatched, []);
  });
});

describe('applyBaseline', () => {
  const result = {
    unknown: [],
    mismatched: [],
    undocumented: [
      { name: 'known_alias', sdks: 'Go', annotations: [] },
      { name: 'brand_new', sdks: 'Java', annotations: [] },
    ],
  };
  const baseline = {
    undocumented: [{ name: 'known_alias', sdks: 'Go', note: 'Deprecated.' }],
  };

  it('suppresses metrics we have decided not to document', () => {
    assert.deepStrictEqual(
      applyBaseline(result, baseline).undocumented.map((u) => u.name),
      ['brand_new']
    );
  });

  it('reports a baseline entry the SDKs no longer define', () => {
    const gone = { ...result, undocumented: [] };
    assert.deepStrictEqual(applyBaseline(gone, baseline).stale, ['known_alias']);
  });

  it('never suppresses a wrong name or a wrong availability', () => {
    const wrong = {
      unknown: [{ name: 'known_alias', documented: 'Go' }],
      mismatched: [{ name: 'known_alias', documented: 'Go', actual: 'Java' }],
      undocumented: [],
    };
    const applied = applyBaseline(wrong, baseline);
    assert.strictEqual(applied.unknown.length, 1);
    assert.strictEqual(applied.mismatched.length, 1);
  });
});

describe('the checked-in baseline', () => {
  const baseline = JSON.parse(fs.readFileSync(path.join(__dirname, '..', BASELINE), 'utf8'));

  it('lists each entry once', () => {
    const names = baseline.undocumented.map((e) => e.name);
    assert.deepStrictEqual(names, [...new Set(names)]);
  });

  it('stays sorted so regenerating it produces a readable diff', () => {
    const names = baseline.undocumented.map((e) => e.name);
    assert.deepStrictEqual(names, [...names].sort());
  });

  it('gives every entry a name and the SDKs that define it', () => {
    for (const entry of baseline.undocumented) {
      assert.match(entry.name, /^[a-z][a-z0-9_]*$/);
      assert.ok(entry.sdks, `${entry.name} is missing its sdks`);
      assert.strictEqual(typeof entry.note, 'string');
    }
  });
});

describe('SDK configuration', () => {
  it('names the SDKs the page uses in its availability column', () => {
    assert.deepStrictEqual(
      SDKS.map((s) => s.name),
      ['Core', 'Go', 'Java']
    );
  });

  it('checks usage for the SDKs that declare names away from the emit site', () => {
    const usage = Object.fromEntries(SDKS.map((s) => [s.name, s.checkUsage]));
    assert.deepStrictEqual(usage, { Core: false, Go: true, Java: true });
  });
});
