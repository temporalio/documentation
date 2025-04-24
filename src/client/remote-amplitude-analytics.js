import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import RemoteCommsClass from "./remote-amplitude-class";

let dev = process.env.NODE_ENV === "development";
let url = dev ? "http://localhost:5173/comms" : "https://temporal.io/comms";

let analytics = null;
if (ExecutionEnvironment.canUseDOM) {
  analytics = new RemoteCommsClass(url, window.document);
}

export function onRouteDidUpdate() {
  (async () => {
    if (ExecutionEnvironment.canUseDOM && analytics) {
      try {
        if (window.amplitude) {
          /** If we don't have a userId in amplitude refresh the remote amplitude iFrame and get the userId and
           * set it if it exists, this will merge both device ID's */
          if (!window.amplitude.getUserId()) {
            analytics.refreshComms();
            const userid = await analytics.getUserId();

            // Only update userId if we actually get something from the frame
            if (userid) {
              window.amplitude.setUserId(userid);
            }
          }

          // This might cause weird sessionID stuff but if amplitude exists we'll nab the remote one quickly
          // probably only gonna lose the first event if we event send an event
          const sessionId = await analytics.getSessionId();
          if (sessionId) {
            window.amplitude.setSessionId(sessionId);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  })();
}
