/* eslint-disable */
// public/sw.js
self.addEventListener("push", function (event) {
  const payload = event.data ? event.data.text() : "Notification.";
  event.waitUntil(
    self.registration.showNotification("NHL Update", {
      body: payload,
      icon: "public/nhl.webp",
    }),
  );
});
