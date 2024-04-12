/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextApiRequest, type NextApiResponse } from "next";
import { getVapidDetails } from "~/utils/push-utils";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  console.log("SERVER");

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const webpush = require("web-push");

  const body = req.body;

  const auth = body.auth;
  const endpoint = body.endpoint;
  const p256dh = body.p256dh;

  const message = body.message;

  const vapidDetails = getVapidDetails();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  webpush.setVapidDetails(
    vapidDetails.subject,
    vapidDetails.publicKey,
    vapidDetails.privateKey,
  );

  console.log("Attempting!");

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await webpush.sendNotification(
      {
        endpoint,
        keys: {
          auth,
          p256dh,
        },
      },
      message,
    );
    res.status(200).json({ message: "Notification sent" });
  } catch (error) {
    console.log("Subscription details are invalid or expired.");
  }
}
