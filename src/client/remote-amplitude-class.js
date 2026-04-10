/** @import { Remote } from 'comlink' */
// If you're in docs go check the cloud repo for the source of truth in remote-amplitude-comms.ts
// Run this through https://sethmac.com/typescript-to-jsdoc/ and copy pasta into documentation
// There's a few weird types to make the conversion stay correct on the other side, good luck Alex T.
import { wrap, windowEndpoint } from "comlink";
const iFrameId = "amplitood";
/**
 * @deprecated Not for use outside of remote-amplitude.ts
 */
class RemoteCommsClass {
  iframeUrl;
  iframe;
  iframeLoadListener;
  document;
  comms;
  /**
   * This is tracking errors, but we don't do nuffin with this yet
   * @default false
   */
  error = false;
  /**
   * @param {string} url
   * @param {Document} document
   */
  constructor(url, document) {
    this.iframeUrl = url;
    // Here to make ts happy about initialized stuff
    this.iframe = document.createElement("iframe");
    this.iframe.id = iFrameId;
    this.iframeLoadListener = () => {};
    this.document = document;
    this.comms = this.initializeIframe();
  }
  /**
   * @public
   * @returns {Promise<Remote<RemoteInterface>>}
   */
  async refreshComms() {
    this.comms = this.initializeIframe();
    return this.comms;
  }
  /**
   * Refreshes the iframe and waits until comlink is hooked back up should be using refreshComms
   * to access the promise
   * @private
   * @returns {Promise<Remote<RemoteInterface>>} Promise that resolves when comlink is reconnected
   */
  async initializeIframe() {
    // Create a new ready promise each time we refresh
    return new Promise((resolve) => {
      // Remove the iframe if we have lost the reference or we have more than a singleton
      // because of docs weird hmr behaviour
      const iframeById = this.document.getElementById(iFrameId);
      if (iframeById) {
        iframeById.parentNode?.removeChild(iframeById);
      }
      // Remove existing iframe if present
      if (this.iframe && this.iframe.parentNode) {
        this.iframe.parentNode.removeChild(this.iframe);
      }
      // Create new iframe
      this.iframe = document.createElement("iframe");
      this.iframe.src = this.iframeUrl;
      this.iframe.id = iFrameId;
      this.iframe.style.display = "none";
      document.body.prepend(this.iframe);
      // Remove previous event listener before adding a new one. Prevents multiple executions
      // on our custom load handler
      window.removeEventListener("message", this.iframeLoadListener);
      // Use our own loaded event listener. onLoad has race conditions and prevents
      // execution after making the onload a promise this works better
      // Weird type to make ts to jsdoc mo bettah
      this.iframeLoadListener = (/** @type { MessageEvent<any> } */ event) => {
        // Verify the origin for security
        if (event.origin !== new URL(this.iframeUrl).origin) return;
        // Check if this is the 'loaded' event
        if (event.data && event.data.type === "loaded") {
          if (this.iframe?.contentWindow) {
            // Weird type to make ts to jsdoc mo bettah
            /** @type {Remote<RemoteInterface>} */
            const comms = wrap(windowEndpoint(this.iframe.contentWindow));
            return resolve(comms);
          }
        }
      };
      // Add the event listener
      window.addEventListener("message", this.iframeLoadListener);
    });
  }
  /**
   * A sessionId returned from the remote amplitude frame. It should track across all domains.
   * This method is likely not very correct because we're only doing a getSessionId and I don't think
   * that "refreshes" the session so it's likely we'll only have 30min sessions. Not entirely sure because
   * gettingSessionId may refresh it's use, who knows what amplitude would do
   * @returns {Promise<number | undefined>}
   */
  async getSessionId() {
    return (await this.comms).getSessionId();
  }
  /**
   * Gets the userId from the remote amplitude frame. userId will be set by the cloud
   * @returns {Promise<string | undefined>}
   */
  async getUserId() {
    return (await this.comms).getUserId();
  }
  /**
   * Set userId on the remote amplitude frame to correlate userId and deviceId remotely expected to be used on cloud
   * @param {string} userId
   * @returns {Promise<void>}
   */
  async setUserId(userId) {
    return (await this.comms).setUserId(userId);
  }
  /**
   * Return deviceId from remote amplitude frame don't think this will get used
   * @returns {Promise<string | undefined>} returns deviceId string
   */
  async getDeviceId() {
    return (await this.comms).getDeviceId() ?? new Error("Couldn't init or default response");
  }
  /**
   * Update the device ID to correlate it to the userId sent from the cloud. Expected to be used from docs
   * @param {string} deviceId
   * @returns {Promise<any>}
   */
  async setDeviceId(deviceId) {
    return (await this.comms).setDeviceId(deviceId);
  }
}
export default RemoteCommsClass;
/**
 * @typedef {Object} RemoteInterface
 * @property {() => number | undefined} getSessionId
 * @property {() => string | undefined} getUserId
 * @property {(userId: string | undefined) => void} setUserId
 * @property {() => string | undefined} getDeviceId
 * @property {(deviceId: string) => void} setDeviceId
 */
