import React, { useState, useCallback } from "react";
import styles from './retry-simulator.module.css';

const sliderProps = [
  'startToCloseTimeout',
  'scheduleToStartTimeout',
  'scheduleToCloseTimeout',
  'backoffCoefficient',
  'initialInterval',
  'maximumAttempts',
  'maximumInterval'
];

export default function RetrySimulator() {
  const [state, setState] = useState({
    retries: [],
    language: 'typescript',
    scheduleToStartTimeout: 0,
    scheduleToCloseTimeout: 0,
    startToCloseTimeout: 10000,
    backoffCoefficient: 2,
    initialInterval: 1000,
    scheduleTime: 0,
    maximumAttempts: 0,
    maximumInterval: 0
  });

  const addRetry = useCallback(function addRetry(success, runtimeMS) {
    const retries = [...state.retries];
    if (retries.length > 0) {
      retries[retries.length - 1] = { ...retries[retries.length - 1], success: false };
    }
    const retry = { success, runtimeMS };
    retries.push(retry);

    setState({ ...state, retries });
  });

  const updateRetry = useCallback(function updateRetry(index, update) {
    const retries = [...state.retries];
    retries[index] = { ...retries[index], ...update };
    setState({ ...state, retries });
  });

  const { success, runtimeMS, reason } = calculateResult(state);

  return (
    <table className="retry-simulator">
      <tbody>
        <tr>
          <td className="retry-container">
            <div className="retries">
              <h1>Activity Retries</h1>
              <select className="scenarios">
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
            <div className="schedule-class">
              <label>Schedule Time</label>
              <input id="scheduleTime-input" type="number" value="0" />
              <input type="range" id="scheduleTime-slider" className="slider runtime-slider" min="0" max="1000" step="5" value="0" />
            </div>
            <div className="retries-list">
              {state.retries.map((retry, index) => RetryConfig(retry, index, updateRetry))}
            </div>
            <button className="add-button" onClick={() => addRetry(true, 1)}>
              + Add
            </button>
          </td>
          <td className="retry-policy-container">
            <h1>Retry Policy (in ms)</h1>
            <div className="parameter">
              <div className="label-container">
                <label>startToCloseTimeout</label>
                <input className="label-container-item" id="startToCloseTimeout-input" type="number" />
              </div>
              <input
                type="range"
                className="slider"
                id="startToCloseTimeout-slider"
                min="0"
                max="100000"
                step="100" />
            </div>
            <div className="parameter">
              <div className="label-container">
                <label>scheduleToStartTimeout</label>
                <input className="label-container-item" id="scheduleToStartTimeout-input" type="number" />
              </div>
              <input
                type="range"
                className="slider"
                id="scheduleToStartTimeout-slider"
                min="0"
                max="100000" />
            </div>
            <div className="parameter">
              <div className="label-container">
                <label>scheduleToCloseTimeout</label>
                <input className="label-container-item" id="scheduleToCloseTimeout-input" type="number" />
              </div>
              <input
                type="range"
                className="slider"
                id="scheduleToCloseTimeout-slider"
                min="0"
                max="100000" />
            </div>
            <div className="parameter">
              <div className="label-container">
                <label>backoffCoefficient</label>
                <input className="label-container-item" id="backoffCoefficient-input" type="number" />
              </div>
              <input
                type="range"
                className="slider"
                id="backoffCoefficient-slider"
                min="1"
                max="10" />
            </div>
            <div className="parameter">
              <div className="label-container">
                <label>initialInterval</label>
                <input className="label-container-item" id="initialInterval-input" type="number" />
              </div>
              <input
                type="range"
                className="slider"
                id="initialInterval-slider"
                min="0"
                max="10000"
                step="50" />
            </div>
            <div className="parameter">
              <div className="label-container">
                <label>maximumAttempts</label>
                <input className="label-container-item" id="maximumAttempts-input" type="number" />
              </div>
              <input
                type="range"
                className="slider"
                id="maximumAttempts-slider"
                min="0"
                max="100" />
            </div>
            <div className="parameter">
              <div className="label-container">
                <label>maximumInterval</label>
                <input className="label-container-item" id="maximumInterval-input" type="number" />
              </div>
              <input
                type="range"
                className="slider"
                id="maximumInterval-slider"
                min="0" max="100000"
                step="100" />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div className="result">
              <h2 className={success ? 'success' : styles.fail}>
                {success ? 'Success' : 'Failed'} after {runtimeMS} ms
                {success ? '' : ': ' + reason}
              </h2>
            </div>
          </td>
          <td>
            <div className="language-selector">
              <select>
                <option value="typescript">TypeScript</option>
                <option value="go">Go</option>
              </select>
            </div>
            <div className="output-wrapper">
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function RetryConfig(retry, index, updateRetry) {
  return (
    <div className="retry" key={'retry-' + index}>
      <select
        value={retry.success ? 'succeeds' : 'fails'}
        onChange={(ev) => updateRetry(index, { success: ev.target.value === 'success' })}>
        <option value="fails">Fails after</option>
        <option value="succeeds">Succeeds after</option>
      </select>
      <input type="number" value={retry.runtimeMS} />
      ms
      <button className="remove">&times;</button>
      <input
        type="range"
        className="slider runtime-slider"
        value={retry.runtimeMS}
        min="0"
        max="1000"
        step="5" />
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
    backoffCoefficient
  } = state;
  if (scheduleToStartTimeout > 0 && scheduleTime >= scheduleToStartTimeout) {
    return {
      success: false,
      runtimeMS: scheduleToStartTimeout,
      reason: 'scheduleTime'
    };
  }
  for (let i = 0; i < state.retries.length; ++i) {
    runtimeMS = Math.min(runtimeMS + state.retries[i].runtimeMS, startToCloseTimeout);
    if (!state.retries[i].success) {
      if (maximumAttempts > 0 && i + 1 >= maximumAttempts) {
        return {
          success: false,
          runtimeMS,
          reason: 'maximumAttempts'
        };
      }
      runtimeMS = Math.min(runtimeMS + retryIntervalMS, startToCloseTimeout);
    }
    retryIntervalMS = maximumInterval > 0 ?
      Math.min(retryIntervalMS * backoffCoefficient, maximumInterval) :
      retryIntervalMS * backoffCoefficient;
    if (runtimeMS >= startToCloseTimeout) {
      return {
        success: false,
        runtimeMS,
        reason: 'startToCloseTimeout'
      };
    }
    if (scheduleToCloseTimeout > 0 &&
      scheduleTime + runtimeMS >= scheduleToCloseTimeout) {
      let total = scheduleTime + runtimeMS;
      return {
        success: false,
        runtimeMS: total,
        reason: 'scheduleToCloseTimeout'
      };
    }
  }
  if (state.retries.length === 0) {
    return {
      success: false,
      runtimeMS: 0,
      reason: 'No retries'
    };
  }
  if (!state.retries[state.retries.length - 1].success) {
    return {
      success: false,
      runtimeMS,
      reason: 'All retries failed'
    };
  }
  return {
    success: true,
    runtimeMS
  };
}

/*const retryTemplate = document.querySelector('.retry');
const resultContainerElement = document.querySelector('.result');
const retriesListElement = document.querySelector('.retries-list');
const scheduleTimeInput = document.querySelector('#scheduleTime-input');
const scheduleTimeSlider = document.querySelector('#scheduleTime-slider');
const codemirror = CodeMirror(document.querySelector('.output-wrapper'), {
  mode: 'javascript',
  lineNumbers: true,
  tabSize: 2,
  readOnly: true
});
updateCodeMirror();
codemirror.on('focus', () => codemirror.execCommand('selectAll'));
let numRetries = 0;
function omit(obj, props) {
  obj = { ...obj };
  props.forEach(p => { delete obj[p]; });
  return obj;
}
function addRetry(success, runtimeMS) {
  const el = retryTemplate.cloneNode(true);
  if (state.retries.length > 0) {
    state.retries[state.retries.length - 1].success = false;
    state.retries[state.retries.length - 1].select.disabled = true;
    state.retries[state.retries.length - 1].select.value = 'fails';
  }
  const retry = { success, runtimeMS, el };
  state.retries.push(retry);
  const select = el.querySelector('select');
  retry.select = select;
  select.value = success ? 'succeeds' : 'fails';
  const input = el.querySelector('input[type="number"]');
  const slider = el.querySelector('input[type="range"]');
  el.querySelector('.remove').addEventListener('click', () => removeRetry());
  input.value = runtimeMS;
  slider.value = input.value;
  input.addEventListener('change', function () {
    const val = input.value;
    if (!isNaN(val)) {
      slider.value = +val;
      retry.runtimeMS = +val;
      rerenderResult();
    }
  });
  select.addEventListener('change', function () {
    retry.success = select.value === 'succeeds';
    rerenderResult();
  });
  slider.addEventListener('change', function () {
    const val = slider.value;
    input.value = +val;
    retry.runtimeMS = +val;
    rerenderResult();
  });
  retriesListElement.appendChild(el);
  el.style.display = 'block';
  rerenderResult();
}
function removeRetry() {
  if (state.retries.length > 0) {
    const lastRetry = state.retries[state.retries.length - 1];
    retriesListElement.removeChild(lastRetry.el);
    state.retries.pop();
    state.retries[state.retries.length - 1].select.disabled = false;
    rerenderResult();
  }
}
scheduleTimeSlider.addEventListener('change', function () {
  const val = scheduleTimeSlider.value;
  scheduleTimeInput.value = +val;
  state.scheduleTime = +val;
  rerenderResult();
});
scheduleTimeInput.addEventListener('change', function () {
  const val = scheduleTimeInput.value;
  if (!isNaN(val)) {
    scheduleTimeSlider.value = +val;
    state.scheduleTime = +val;
    rerenderResult();
  }
});
const scenarios = document.querySelector('.scenarios');
scenarios.addEventListener('change', function () {
  if (!scenarios.value) {
    return;
  }
  const values = JSON.parse(scenarios.value);
  const requestRuntimeMS = values.requestRuntimeMS;
  const successRate = values.successRate;
  const retries = [];
  const maxRetries = 20;
  clearRetries();
  for (let i = 0; i < maxRetries; ++i) {
    const success = Math.random() < successRate || i === maxRetries - 1;
    const runtimeMS = requestRuntimeMS +
      Math.round((Math.random() - 0.5) * (requestRuntimeMS / 2)); // +/- 50%
    addRetry(success, runtimeMS);
    if (success) {
      break;
    }
  }
  rerenderResult();
});
sliderProps.forEach(prop => {
  const input = document.querySelector(`#${prop}-input`);
  const slider = document.querySelector(`#${prop}-slider`);
  slider.value = state[prop];
  input.value = state[prop];
  input.addEventListener('change', function () {
    const val = input.value;
    if (!isNaN(val)) {
      slider.value = +val;
      state[prop] = +val;
      rerenderResult();
      updateCodeMirror();
    }
  });
  slider.addEventListener('change', () => {
    input.value = +slider.value;
    state[prop] = +slider.value;
    rerenderResult();
    updateCodeMirror();
  });
});
addRetry(true, 1);
function clearRetries() {
  state.retries = [];
  retriesListElement.innerHTML = '';
}
function capitalizeFirstLetter(val) {
  return val[0].toUpperCase() + val.slice(1);
}
function updateCodeMirror() {
  const value = {
    scheduleToCloseTimeout: state.scheduleToCloseTimeout,
    startToCloseTimeout: state.startToCloseTimeout,
    scheduleToStartTimeout: state.scheduleToStartTimeout,
    retryPolicy: {
      backoffCoefficient: state.backoffCoefficient,
      initialInterval: state.initialInterval,
      maximumAttempts: state.maximumAttempts,
      maximumInterval: state.maximumInterval,
    }
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
  if (state.language === 'typescript') {
    codemirror.setOption('mode', 'javascript');
    codemirror.setValue(JSON.stringify(value, null, '  '));
  } else if (state.language === 'go') {
    const val = [
      'workflow.ActivityOptions{',
      ...Object.keys(value).filter(key => key !== 'retryPolicy').map(key => `\t${capitalizeFirstLetter(key)}: ${value[key]},`),
      '\tRetryPolicy: &temporal.RetryPolicy{',
      ...Object.keys(value.retryPolicy).map(key => `\t\t${capitalizeFirstLetter(key)}: ${value.retryPolicy[key]}`),
      '\t}',
      '}'
    ].join('\n');
    codemirror.setOption('mode', 'go');
    codemirror.setValue(val);
  }
}
const languageSelect = document.querySelector('.language-selector select');
languageSelect.addEventListener('change', function () {
  state.language = languageSelect.value;
  updateCodeMirror();
});
function rerenderResult() {
  if (state.retries.length === 0) {
    document.querySelector('.result').innerHTML = '';
  }
  const res = calculateResult();
  if (res.success) {
    resultContainerElement.innerHTML = `<h2>Success after ${res.runtimeMS} ms</h2>`;
    resultContainerElement.classList.add('success');
    resultContainerElement.classList.remove('fail');
  } else {
    resultContainerElement.innerHTML = `<h2>Error after ${res.runtimeMS} ms: ${res.reason}</h2>`;
    resultContainerElement.classList.remove('success');
    resultContainerElement.classList.add('fail');
  }
}
*/