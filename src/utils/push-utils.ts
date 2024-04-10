/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
// Gets the PushSubscription object from the browser

import { api } from "./api";

// If it doesn't exist, it creates a new one by requesting permission from the user
async function subscribeAndGetSub() {
  if (!("serviceWorker" in navigator)) {
    throw new Error("Service Worker not supported");
  }

  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(
      process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY!,
    ), // Replace with your VAPID public key
  });

  return subscription;
}

function getVapidDetails() {
  return {
    subject: "mailto:will.rees9132@gmail.com",
    publicKey: process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
    privateKey: process.env.WEB_PUSH_PRIVATE_KEY,
  };
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

export { subscribeAndGetSub, getVapidDetails };
