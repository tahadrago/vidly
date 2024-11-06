// import Raven from "raven-js";
// import * as Sentry from "@sentry/react";

function init() {
  // Sentry.init({
  //   dsn: "https://7fcca83a07d8ac4246b65d302db79091@o4508167949123584.ingest.us.sentry.io/4508167954235392",
  //   integrations: [
  //     Sentry.browserTracingIntegration(),
  //     Sentry.replayIntegration(),
  //   ],
  //   // Tracing
  //   tracesSampleRate: 1.0, //  Capture 100% of the transactions
  //   // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  //   tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  //   // Session Replay
  //   replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  //   replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  // });
}

function log(error) {
  // Sentry.captureException(error);
  console.error(error);
}

export default {
  init,
  log,
};
