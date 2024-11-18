import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { TwitterApi } from 'npm:twitter-api-v2@1.18.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  console.log('🚀 Function started: send-twitter-dm');
  
  if (req.method === 'OPTIONS') {
    console.log('Handling CORS preflight request');
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Validate environment variables
    const requiredEnvVars = [
      'TWITTER_API_KEY',
      'TWITTER_API_SECRET',
      'TWITTER_ACCESS_TOKEN',
      'TWITTER_ACCESS_TOKEN_SECRET',
      'TWITTER_USER_ID'
    ];

    console.log('Validating environment variables...');
    for (const envVar of requiredEnvVars) {
      if (!Deno.env.get(envVar)) {
        throw new Error(`Missing required environment variable: ${envVar}`);
      }
    }

    const { name, email, subject, message, requestCV } = await req.json();
    
    const dmText = `New Contact Form Message:
Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}
CV Requested: ${requestCV ? 'Yes' : 'No'}`;

    const client = new TwitterApi({
      appKey: Deno.env.get('TWITTER_API_KEY')!,
      appSecret: Deno.env.get('TWITTER_API_SECRET')!,
      accessToken: Deno.env.get('TWITTER_ACCESS_TOKEN')!,
      accessSecret: Deno.env.get('TWITTER_ACCESS_TOKEN_SECRET')!,
    });

    const rwClient = client.readWrite;
    const currentUser = await rwClient.v2.me();
    console.log('✅ Authenticated as Twitter user:', currentUser);

    const result = await rwClient.v2.sendDmToParticipant(
      Deno.env.get('TWITTER_USER_ID')!,
      { text: dmText }
    );
    
    console.log('✅ DM sent successfully:', result);

    return new Response(
      JSON.stringify({ message: 'Message sent successfully' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error in send-twitter-dm function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Error sending message',
        details: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});