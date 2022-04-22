import React, {useState, useCallback} from "react";
import styles from "./retry-simulator.module.css";

export default function RetrySimulator() {
  const [state, setState] = useState({
    retries: [{success: true, runtimeMS: 1}],
    language: "typescript",
    scheduleToStartTimeout: 0,
    scheduleToCloseTimeout: 0,
    startToCloseTimeout: 10000,
    backoffCoefficient: 2,
    initialInterval: 1000,
    scheduleTime: 0,
    maximumAttempts: 0,
    maximumInterval: 0,
  });

  const addRetry = useCallback(function addRetry(success, runtimeMS) {
    const retries = [...state.retries];
    if (retries.length > 0) {
      retries[retries.length - 1] = {
        ...retries[retries.length - 1],
        success: false,
      };
    }
    const retry = {success, runtimeMS};
    retries.push(retry);

    setState({...state, retries});
  });

  const updateRetry = useCallback(function updateRetry(index, update) {
    const retries = [...state.retries];
    retries[index] = {...retries[index], ...update};
    setState({...state, retries});
  });

  const deleteRetry = useCallback(function deleteRetry(index) {
    const retries = [...state.retries];
    retries.splice(index, 1);
    setState({...state, retries});
  });

  const applyRetryScenario = useCallback(function applyRetryScenario(values) {
    if (!values) {
      return;
    }
    values = JSON.parse(values);
    const requestRuntimeMS = values.requestRuntimeMS;
    const successRate = values.successRate;
    const retries = [];
    const maxRetries = 20;
    for (let i = 0; i < maxRetries; ++i) {
      const success = Math.random() < successRate || i === maxRetries - 1;
      const runtimeMS =
        requestRuntimeMS +
        Math.round((Math.random() - 0.5) * (requestRuntimeMS / 2)); // +/- 50%
      retries.push({success, runtimeMS});
      if (success) {
        break;
      }
    }

    setState({...state, retries});
  });

  const updateRetryPolicyParam = useCallback(function updateRetryPolicyParam(
    prop,
    ev
  ) {
    const value = getEventValue(ev);
    if (isNaN(value)) {
      return;
    }
    setState({...state, [prop]: +value});
  });

  const updateLanguage = useCallback(function updateLanguage(language) {
    setState({...state, language});
  });

  const {success, runtimeMS, reason} = calculateResult(state);
  const code = retryPolicyCode(state);

  return (
    <table className={styles.retrySimulator}>
      <tbody>
        <tr className={styles.tr}>
          <td className={styles.td}>
            <div className="retries">
              <h3>Activity Retries</h3>
              <select onChange={(ev) => applyRetryScenario(ev.target.value)}>
                <option value="">Scenarios</option>
                <option value='{"requestRuntimeMS": 10, "successRate": 0.9}'>
                  Fast request (10ms), 90% success rate
                </option>
                <option value='{"requestRuntimeMS": 10, "successRate": 0.5}'>
                  Fast request (10ms), 50% success rate
                </option>
                <option value='{"requestRuntimeMS": 100, "successRate": 0.9}'>
                  Slow request (100ms), 90% success rate
                </option>
                <option value='{"requestRuntimeMS": 100, "successRate": 0.5}'>
                  Slow request (100ms), 50% success rate
                </option>
              </select>
            </div>
            <div className={styles.scheduleTime}>
              <div className={styles.inputContainer}>
                <label className={styles.numberInputLabel}>Schedule Time</label>
                <input
                  className={styles.numberInput}
                  value={state.scheduleTime}
                  onChange={(ev) => updateRetryPolicyParam("scheduleTime", ev)}
                  type="number"
                />
              </div>
              <input
                type="range"
                value={state.scheduleTime}
                onChange={(ev) => updateRetryPolicyParam("scheduleTime", ev)}
                className={styles.slider}
                min="0"
                max="1000"
                step="5"
              />
            </div>
            <div className="retries-list">
              {state.retries.map((retry, index) => {
                return RetryConfig(
                  retry,
                  state.retries.length,
                  index,
                  updateRetry,
                  deleteRetry
                );
              })}
            </div>
            <button className="add-button" onClick={() => addRetry(true, 1)}>
              + Add
            </button>
          </td>
          <td className={styles.td}>
            <h3>Retry Policy (in ms)</h3>
            <RetryPolicyParamInputs
              param="startToCloseTimeout"
              value={state.startToCloseTimeout}
              max={100000}
              step={100}
              updateRetryPolicyParam={updateRetryPolicyParam}
            />
            <RetryPolicyParamInputs
              param="scheduleToStartTimeout"
              value={state.scheduleToStartTimeout}
              max={100000}
              step={100}
              updateRetryPolicyParam={updateRetryPolicyParam}
            />
            <RetryPolicyParamInputs
              param="scheduleToCloseTimeout"
              value={state.scheduleToCloseTimeout}
              max={100000}
              step={100}
              updateRetryPolicyParam={updateRetryPolicyParam}
            />
            <RetryPolicyParamInputs
              param="backoffCoefficient"
              value={state.backoffCoefficient}
              min={1}
              max={10}
              updateRetryPolicyParam={updateRetryPolicyParam}
            />
            <RetryPolicyParamInputs
              param="initialInterval"
              value={state.initialInterval}
              max={10000}
              step={50}
              updateRetryPolicyParam={updateRetryPolicyParam}
            />
            <RetryPolicyParamInputs
              param="maximumAttempts"
              value={state.maximumAttempts}
              updateRetryPolicyParam={updateRetryPolicyParam}
            />
            <RetryPolicyParamInputs
              param="maximumInterval"
              value={state.maximumInterval}
              max={100000}
              step={100}
              updateRetryPolicyParam={updateRetryPolicyParam}
            />
          </td>
        </tr>
        <tr className={styles.tr}>
          <td className={styles.td}>
            <div
              className={
                styles.result + " " + (success ? styles.success : styles.fail)
              }
            >
              <h3 className={styles.resultText}>
                {success ? "Success" : "Failed"} after {runtimeMS} ms
                {success ? "" : ": " + reason}
              </h3>
            </div>
          </td>
          <td className={styles.td + " " + styles.codeOutputWrap}>
            <div>
              <select onChange={(ev) => updateLanguage(ev.target.value)}>
                <option value="typescript">TypeScript</option>
                <option value="go">Go</option>
              </select>
            </div>
            <div>
              <textarea
                onClick={(ev) => ev.target.select()}
                value={code}
                readOnly={true}
                className={styles.codeOutput}
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function RetryConfig(retry, numRetries, index, updateRetry, deleteRetry) {
  return (
    <div className={styles.retry} key={"retry-" + index}>
      <div className={styles.inputContainer}>
        <select
          className={styles.numberInputLabel}
          disabled={index + 1 < numRetries}
          value={retry.success ? "succeeds" : "fails"}
          onChange={(ev) =>
            updateRetry(index, {success: ev.target.value === "success"})
          }
        >
          <option value="fails">Fails after</option>
          <option value="succeeds">Succeeds after</option>
        </select>
        <input
          type="number"
          className={styles.numberInput}
          value={retry.runtimeMS}
          onChange={(ev) => updateRetry(index, {runtimeMS: ev.target.value})}
        />
        <button
          className={styles.removeRetry}
          onClick={() => deleteRetry(index)}
        >
          &times;
        </button>
      </div>
      <input
        type="range"
        className={styles.slider}
        value={retry.runtimeMS}
        onChange={(ev) => updateRetry(index, {runtimeMS: ev.target.value})}
        min="0"
        max="1000"
        step="5"
      />
    </div>
  );
}

function RetryPolicyParamInputs({
  param,
  value,
  updateRetryPolicyParam,
  min,
  max,
  step,
}) {
  return (
    <div className={styles.parameter}>
      <div className={styles.inputContainer}>
        <label className={styles.numberInputLabel}>{param}</label>
        <input
          value={value}
          onChange={(ev) => updateRetryPolicyParam(param, ev)}
          className={styles.numberInput}
          type="number"
        />
      </div>
      <input
        value={value}
        onChange={(ev) => updateRetryPolicyParam(param, ev)}
        type="range"
        className={styles.slider}
        min={min || 0}
        max={max || 100}
        step={step || 1}
      />
    </div>
  );
}

function calculateResult(state) {
  let runtimeMS = 0;
  let retryIntervalMS = state.initialInterval;
  const {
    startToCloseTimeout,
    scheduleToCloseTimeout,
    scheduleToStartTimeout,
    scheduleTime,
    maximumInterval,
    maximumAttempts,
    backoffCoefficient,
  } = state;
  if (scheduleToStartTimeout > 0 && scheduleTime >= scheduleToStartTimeout) {
    return {
      success: false,
      runtimeMS: scheduleToStartTimeout,
      reason: "scheduleTime",
    };
  }
  for (let i = 0; i < state.retries.length; ++i) {
    runtimeMS = Math.min(
      runtimeMS + state.retries[i].runtimeMS,
      startToCloseTimeout
    );
    if (!state.retries[i].success) {
      if (maximumAttempts > 0 && i + 1 >= maximumAttempts) {
        return {
          success: false,
          runtimeMS,
          reason: "maximumAttempts",
        };
      }
      if (i + 1 >= state.retries.length) {
        return {
          success: false,
          runtimeMS,
          reason: "All retries failed",
        };
      }
      runtimeMS = Math.min(runtimeMS + retryIntervalMS, startToCloseTimeout);
    }
    retryIntervalMS =
      maximumInterval > 0
        ? Math.min(retryIntervalMS * backoffCoefficient, maximumInterval)
        : retryIntervalMS * backoffCoefficient;
    if (runtimeMS >= startToCloseTimeout) {
      return {
        success: false,
        runtimeMS,
        reason: "startToCloseTimeout",
      };
    }
    if (
      scheduleToCloseTimeout > 0 &&
      scheduleTime + runtimeMS >= scheduleToCloseTimeout
    ) {
      let total = scheduleTime + runtimeMS;
      return {
        success: false,
        runtimeMS: total,
        reason: "scheduleToCloseTimeout",
      };
    }
  }
  if (state.retries.length === 0) {
    return {
      success: false,
      runtimeMS: 0,
      reason: "No retries",
    };
  }
  return {
    success: true,
    runtimeMS,
  };
}

function retryPolicyCode(state) {
  const value = {
    scheduleToCloseTimeout: state.scheduleToCloseTimeout,
    startToCloseTimeout: state.startToCloseTimeout,
    scheduleToStartTimeout: state.scheduleToStartTimeout,
    retryPolicy: {
      backoffCoefficient: state.backoffCoefficient,
      initialInterval: state.initialInterval,
      maximumAttempts: state.maximumAttempts,
      maximumInterval: state.maximumInterval,
    },
  };
  if (value.retryPolicy.maximumAttempts === 0) {
    delete value.retryPolicy.maximumAttempts;
  }
  if (value.retryPolicy.maximumInterval === 0) {
    delete value.retryPolicy.maximumInterval;
  }
  if (value.scheduleToStartTimeout === 0) {
    delete value.scheduleToStartTimeout;
  }
  if (value.scheduleToCloseTimeout === 0) {
    delete value.scheduleToCloseTimeout;
  }
  if (state.language === "typescript") {
    return JSON.stringify(value, null, "  ");
  } else if (state.language === "go") {
    const val = [
      "workflow.ActivityOptions{",
      ...Object.keys(value)
        .filter((key) => key !== "retryPolicy")
        .map((key) => `\t${capitalizeFirstLetter(key)}: ${value[key]},`),
      "\tRetryPolicy: &temporal.RetryPolicy{",
      ...Object.keys(value.retryPolicy).map(
        (key) => `\t\t${capitalizeFirstLetter(key)}: ${value.retryPolicy[key]}`
      ),
      "\t}",
      "}",
    ].join("\n");
    return val;
  }
}

function getEventValue(ev) {
  return ev && ev.target && ev.target.value;
}

function capitalizeFirstLetter(val) {
  return val[0].toUpperCase() + val.slice(1);
}
