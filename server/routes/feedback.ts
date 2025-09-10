
import { Request, Response } from "express";

export function handleFeedback(req: Request, res: Response) {
  const { type, message, email, page } = req.body;

  // For now, we just log the feedback to the console.
  // In a real application, you would save this to a database,
  // send it to a logging service, or notify a Slack channel.
  console.log("--- New Feedback Received ---");
  console.log(`Page: ${page}`);
  console.log(`Type: ${type}`);
  console.log(`Email: ${email || 'Not provided'}`);
  console.log(`Message: ${message}`);
  console.log("-----------------------------");

  res.status(200).json({ message: "Feedback received successfully" });
}
