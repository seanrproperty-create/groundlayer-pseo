import { ADMIN_EMAIL } from './constants.js';

// Same Resend REST pattern as AppleManLegal's src/email.js. Sends from the
// EIGHTFINITY LTD parent-company mailbox (Sean, 2026-08-04) — display name
// still reads "Groundlayer" so it doesn't look like a generic company email.
const FROM_ADDRESS = 'Groundlayer <info@eightfinity.net>';

export async function sendLeadEmail(env, { referenceNum, town, niche, name, phone, email, details, imageUrl, dashboardUrl }) {
  if (!env.RESEND_API_KEY) {
    console.log(`[email] RESEND_API_KEY not set — skipping lead notify for ${referenceNum}`);
    return { sent: false };
  }

  const subject = `New lead — ${niche} / ${town} (${referenceNum})`;
  const text = [
    'A new Groundlayer lead has come in.',
    '',
    `Reference: ${referenceNum}`,
    `Service: ${niche}`,
    `Town: ${town}`,
    `Name: ${name || 'not given'}`,
    `Phone: ${phone || 'not given'}`,
    `Email: ${email || 'not given'}`,
    `Details: ${details || 'not given'}`,
    imageUrl ? `Photo: ${imageUrl}` : null,
    '',
    `Full record: ${dashboardUrl}`,
  ]
    .filter((line) => line !== null)
    .join('\n');

  return sendResendEmail(env, { to: ADMIN_EMAIL, subject, text }, referenceNum);
}

// Sent alongside sendLeadEmail when the customer gave an email address.
// Deliberately makes no claim about licensing or response time — Groundlayer
// is a lead-routing directory, not an in-house reviewer, so promising a
// "licensed specialist" or a fixed turnaround would be a claim we can't back
// up (Sean, 2026-08-04).
export async function sendCustomerConfirmationEmail(env, { referenceNum, town, niche, name, email }) {
  if (!email) return { sent: false };
  if (!env.RESEND_API_KEY) {
    console.log(`[email] RESEND_API_KEY not set — skipping customer confirmation for ${referenceNum}`);
    return { sent: false };
  }

  const subject = `Enquiry received: ${niche} in ${town} (Ref ${referenceNum})`;
  const greeting = name ? `Hi ${name},` : 'Hi,';
  const text = [
    greeting,
    '',
    `Thanks for contacting Groundlayer about ${niche} in ${town}.`,
    '',
    `Your reference number is ${referenceNum} — please quote this in any follow-up correspondence.`,
    '',
    "We've securely logged your details and any photos you provided, and your enquiry will be passed on to a relevant local specialist in our network.",
    '',
    'If you have any questions in the meantime, reply to this email or contact us at info@eightfinity.net.',
    '',
    '— The Groundlayer team',
  ].join('\n');

  return sendResendEmail(env, { to: email, subject, text }, `${referenceNum}-customer`);
}

export async function sendLoginLinkEmail(env, { token, to, dashboardBaseUrl, next }) {
  const verifyUrl = `${dashboardBaseUrl}/local/dashboard/verify?token=${token}${next ? `&next=${encodeURIComponent(next)}` : ''}`;

  if (!env.RESEND_API_KEY) {
    // Dev convenience: without Resend configured there's no other way to get
    // the link, so print it rather than dead-ending local testing.
    console.log(`[email] RESEND_API_KEY not set — sign-in link for ${to}: ${verifyUrl}`);
    return { sent: false };
  }

  const subject = 'Groundlayer dashboard sign-in link';
  const text = [
    'Sign in to the Groundlayer evidence dashboard using the link below.',
    'This link expires in 15 minutes and can only be used once.',
    '',
    verifyUrl,
  ].join('\n');

  return sendResendEmail(env, { to, subject, text }, 'dashboard-login');
}

async function sendResendEmail(env, { to, subject, text }, logRef) {
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from: FROM_ADDRESS, to, subject, text }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      console.error(`[email] Resend send failed for ${logRef}: ${res.status} ${body}`);
      return { sent: false };
    }
    return { sent: true };
  } catch (err) {
    // A failed send should never break lead submission — the lead is already
    // saved in D1 by the time this runs.
    console.error(`[email] Resend request threw for ${logRef}`, err);
    return { sent: false };
  }
}
