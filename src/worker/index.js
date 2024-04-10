/* eslint-disable */
// @ts-nocheck

// public/sw.js

// ALL THIS DOES IS LISTEN FOR PUSH EVENTS AND DISPLAY A NOTIFICATION
// PUSH EVENTS SIMPLY WAKE UP THE SERVICE WORKER
// SO THIS BASICALLY SAYS "WHEN YOU WAKE UP, DISPLAY A NOTIFICATION"
self.addEventListener("push", function (event) {
  const payload = event.data ? event.data.text() : "Notification.";
  event.waitUntil(
    self.registration.showNotification("NHL Update", {
      body: payload,
      icon: "public/nhl.webp",
    }),
  );
});
