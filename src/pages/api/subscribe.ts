import { type NextApiRequest, type NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
  const webpush = require("web-push");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const subscription = req.body;

  console.log(subscription);

  const vapidDetails = {
    subject: "mailto:will.rees9132@gmail.com",
    publicKey: process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
    privateKey: process.env.WEB_PUSH_PRIVATE_KEY,
  };

  const options = {
    vapidDetails,
    TTL: 60 * 60,
  };

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await webpush.sendNotification(
      subscription,
      "This is a notification!",
      options,
    );
    res.status(200).json({ message: "Notification sent" });
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({ message: "Error sending notification" });
  }
}
