import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { initBotId } from 'botid/client/core';

// Vercel BotID adds a bot-classification header to the page feedback widget's
// POST to /api/feedback, which checkBotId() reads there. Agents send GET or
// POST without it, and the endpoint only checks widget submissions. See
// readme/FEEDBACK.md.
if (ExecutionEnvironment.canUseDOM) {
  initBotId({ protect: [{ path: '/api/feedback', method: 'POST' }] });
}
