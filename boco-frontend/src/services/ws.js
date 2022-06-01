const Stomp = require("stompjs");
const SockJSRequire = require("sockjs-client");
const SockJS = new SockJSRequire(process.env.VUE_APP_BASEURL + "ws");
import { parseCurrentUser } from "@/utils/token-utils";

// Create a Singleton function
// Events fired by websocket, MESSAGE
const ws = (function () {
  // Object of all injected functions that the client may want
  // These functions will be in a object
  const handlers = {};

  const fire = function (event, data) {
    if (handlers[event]) {
      // for each object in object fire event
      for (const key in handlers[event]) {
        handlers[event][key](data);
      }
    }
  };

  const onMessageReceived = (payload) => {
    const data = JSON.parse(payload.body);

    // Fire message event
    fire("MESSAGE", JSON.parse(payload.body));
    if (data.status == "NEW_MESSAGE")
      fire("NEW_MESSAGE", JSON.parse(payload.body));
  };

  const onConnected = () => {
    stompClient.subscribe(
      "/user/" + parseCurrentUser().accountId + "/queue/messages",
      onMessageReceived
    );
  };

  const onError = () => {};

  let stompClient = Stomp.over(SockJS);

  stompClient.connect({}, onConnected, onError);

  return {
    on: function (event, callback, id = "none") {
      // Generate random id
      if (!handlers[event]) {
        handlers[event] = {};
      }
      handlers[event][id] = callback;
    },
    fire: fire,
    isActive: function (event, id = "none") {
      return !!handlers[event]?.[id];
    },
    end: function (event, id = "none") {
      if (handlers[event]) {
        delete handlers[event][id];
      } else {
        throw new Error("No handler for event: " + event);
      }
    },
    sendMessage: ({ sender, recipient /* , status */ }) => {
      stompClient.send(
        "/app/chat",
        {},
        JSON.stringify({
          from: sender,
          to: recipient,
          id: null,
          status: "NEW_MESSAGE",
        })
      );
    },
    test: true,
  };
})();

export default ws;
