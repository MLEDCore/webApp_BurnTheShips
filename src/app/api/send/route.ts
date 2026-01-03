import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { format } from 'date-fns';

const resend = new Resend(process.env.RESEND_API_KEY);
const resendEmailTo = process.env.RESEND_EMAIL_TO;

const sendRouteSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  commitment: z.string().min(10),
  goalDate: z.string().datetime(),
  successMeasurement: z.string().min(10),
  commitmentAmount: z.number().min(20).max(500),
  ageVerification: z.literal(true),
});

// In-memory store for rate limiting
const ipRequestCounts = new Map<string, number[]>();
const RATE_LIMIT_COUNT = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute

export async function POST(req: NextRequest) {
  // Rate Limiting Logic
  const ip = req.ip ?? '127.0.0.1';
  const now = Date.now();

  // Clean up old timestamps for the current IP
  const currentTimestamps = (ipRequestCounts.get(ip) || []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );

  // If the user has made too many requests, return an error
  if (currentTimestamps.length >= RATE_LIMIT_COUNT) {
    return NextResponse.json({ error: 'Too many requests. Please try again in a minute.' }, { status: 429 });
  }

  // Add the new request timestamp
  currentTimestamps.push(now);
  ipRequestCounts.set(ip, currentTimestamps);


  if (!resendEmailTo || !process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY or RESEND_EMAIL_TO environment variable is not set.');
    return NextResponse.json({ error: 'Server configuration error. Please check environment variables.' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { name, email, commitment, goalDate, successMeasurement, commitmentAmount } = sendRouteSchema.parse(body);
    const formattedGoalDate = format(new Date(goalDate), "dd.MM.yyyy");


    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [resendEmailTo],
      subject: `New Commitment from ${name}`,
      reply_to: email,
      html: `<p>You have received a new commitment from your website contact form.</p>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <hr>
             <p><strong>Commitment:</strong></p>
             <p>${commitment}</p>
             <p><strong>Goal Date:</strong> ${formattedGoalDate}</p>
             <p><strong>Success Measurement:</strong></p>
             <p>${successMeasurement}</p>
             <p><strong>Commitment Amount:</strong> ${commitmentAmount}€</p>
             `,
    });

    if (error) {
        console.error('Resend API Error:', error);
        return NextResponse.json({ error: 'Error sending email via Resend.', details: error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error('Error in send route:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
