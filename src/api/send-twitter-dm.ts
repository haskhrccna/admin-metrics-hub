import { TwitterApi } from 'twitter-api-v2';

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY!,
  appSecret: process.env.TWITTER_API_SECRET!,
  accessToken: process.env.TWITTER_ACCESS_TOKEN!,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
});

export async function sendTwitterDM(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { name, email, subject, message, requestCV } = await req.json();
    
    const dmText = `New Contact Form Message:
Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}
CV Requested: ${requestCV ? 'Yes' : 'No'}`;

    // Send DM to yourself (replace with your Twitter user ID)
    await client.v2.sendDmToParticipant(
      process.env.TWITTER_USER_ID!,
      { text: dmText }
    );

    return new Response('Message sent successfully', { status: 200 });
  } catch (error) {
    console.error('Error sending Twitter DM:', error);
    return new Response('Error sending message', { status: 500 });
  }
}