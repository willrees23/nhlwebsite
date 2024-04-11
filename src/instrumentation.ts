/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { httpGet, httpPost } from "./lib/utils";
import { db } from "./server/db";
import { api } from "./utils/api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function jsonDiff(json1: any, json2: any) {
  const diff = {};

  // Check keys in json1
  for (const key in json1) {
    if (json1.hasOwnProperty(key)) {
      if (!json2.hasOwnProperty(key)) {
        // @ts-expect-error This is javascript
        diff[key] = [json1[key], undefined];
      } else if (json1[key] !== json2[key]) {
        if (typeof json1[key] === "object" && typeof json2[key] === "object") {
          const nestedDiff = jsonDiff(json1[key], json2[key]);
          if (Object.keys(nestedDiff).length > 0) {
            // @ts-expect-error This is javascript
            diff[key] = nestedDiff;
          }
        } else {
          // @ts-expect-error This is javascript
          diff[key] = [json1[key], json2[key]];
        }
      }
    }
  }

  // Check keys in json2
  for (const key in json2) {
    if (json2.hasOwnProperty(key) && !json1.hasOwnProperty(key)) {
      // @ts-expect-error This is javascript
      diff[key] = [undefined, json2[key]];
    }
  }

  return diff;
}

const pollingUrl = "https://api-web.nhle.com/v1/score/now";

let lastData: unknown;

export function register() {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  setInterval(async () => {
    await httpGet(pollingUrl).then(async (data) => {
      // check if data has changed
      if (JSON.stringify(data) !== JSON.stringify(lastData)) {
        console.log("Data has changed!");
        if (lastData) {
          const differences = jsonDiff(data, lastData);

          const subscriptions = await db.pushSubscription.findMany();

          if (subscriptions) {
            for (const subscription of subscriptions) {
              const auth = subscription.auth;
              const endpoint = subscription.endpoint;
              const p256dh = subscription.p256dh;

              try {
                await httpPost("http://localhost:3000/api/send-notification", {
                  auth,
                  endpoint,
                  p256dh,
                  message: JSON.stringify(differences, null, 2),
                });
              } catch (error) {
                console.error("Error sending notification:", error);
              }
            }
          }
        }
      } else {
        console.log("Data has not changed.");
      }
      lastData = data;
    });
  }, 5000);
}
