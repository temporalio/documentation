import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { initBotId } from 'botid/client/core';

// Vercel BotID adds a bot-classification header to the page feedback widget's
// POST to /api/feedback, which checkBotId() reads there. Agents send GET or
// POST without it, and the endpoint only checks widget submissions. See
// readme/FEEDBACK.md.
//
// Vercel serves BotID's challenge script, so a local `yarn start` or
// `yarn serve` would get an HTML page back and the widget's POST would wait on
// it. checkBotId() skips the check outside production anyway.
const LOCAL_HOSTS = ['localhost', '127.0.0.1', '[::1]'];

if (ExecutionEnvironment.canUseDOM && !LOCAL_HOSTS.includes(window.location.hostname)) {
  initBotId({ protect: [{ path: '/api/feedback', method: 'POST' }] });
}
