import { Resend } from 'resend'
import { NextResponse } from 'next/server'

// ✅ Resend ko module level pe NAHI banate — function ke andar banate hain
//    Taaki build time pe crash na ho

export async function POST(req) {
  try {
    // ── API key check ──
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not set')
      return NextResponse.json(
        { error: 'Email service not configured. Please contact us directly.' },
        { status: 503 }
      )
    }

    // ✅ Resend ab function ke andar banta hai (runtime pe)
    const resend = new Resend(process.env.RESEND_API_KEY)

    const body = await req.json()
    const { name, email, company, type, budget, message } = body

    // ── Validation ──
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const toEmail   = process.env.CONTACT_TO_EMAIL   || process.env.RESEND_API_KEY && 'hello@shakti.studio'
    const fromEmail = process.env.CONTACT_FROM_EMAIL  || 'onboarding@resend.dev'

    // ── Email 1: Owner ko (aapko) ──
    const { error: ownerError } = await resend.emails.send({
      from:    fromEmail,
      to:      toEmail,
      replyTo: email,
      subject: `🔱 New Inquiry from ${name}`,
      html:    buildOwnerEmail({ name, email, company, type, budget, message }),
    })

    if (ownerError) {
      console.error('Owner email error:', ownerError)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    // ── Email 2: Client ko confirmation ──
    // Non-blocking — agar fail bhi ho toh form success dikhao
    resend.emails.send({
      from:    fromEmail,
      to:      email,
      subject: `✨ Got your message — SHAKTI STUDIO`,
      html:    buildClientEmail({ name }),
    }).catch(err => console.warn('Client confirmation email failed:', err))

    return NextResponse.json({ success: true })

  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// ── Owner email template ──
function buildOwnerEmail({ name, email, company, type, budget, message }) {
  const date = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#04010e;font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#04010e;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <!-- Header -->
  <tr><td style="background:linear-gradient(135deg,#0d0020,#200040);padding:36px 40px 28px;border-bottom:2px solid #f5c842;">
    <table width="100%"><tr>
      <td>
        <p style="margin:0;font-family:'Courier New',monospace;font-size:10px;letter-spacing:4px;color:#f5c842;text-transform:uppercase;">New Project Inquiry</p>
        <h1 style="margin:10px 0 0;font-size:26px;font-weight:700;color:#f8f2e8;letter-spacing:2px;">🔱 SHAKTI STUDIO</h1>
      </td>
      <td align="right">
        <div style="background:rgba(245,200,66,0.12);border:1px solid #f5c842;padding:8px 14px;">
          <p style="margin:0;font-family:'Courier New',monospace;font-size:9px;letter-spacing:2px;color:#f5c842;">${date}</p>
        </div>
      </td>
    </tr></table>
  </td></tr>

  <!-- Client Details -->
  <tr><td style="background:#080316;padding:28px 40px 20px;">
    <p style="margin:0 0 16px;font-family:'Courier New',monospace;font-size:9px;letter-spacing:3px;color:#5a5280;text-transform:uppercase;padding-bottom:12px;border-bottom:1px solid rgba(255,255,255,0.07);">Client Details</p>
    <table width="100%" cellspacing="0">
      ${infoRow('Name',    name,           '#7b2dff')}
      ${infoRow('Email',   email,          '#00ffee')}
      ${infoRow('Company', company || '—', '#f5c842')}
    </table>
  </td></tr>

  <!-- Project Details -->
  <tr><td style="background:#080316;padding:0 40px 20px;">
    <p style="margin:0 0 16px;font-family:'Courier New',monospace;font-size:9px;letter-spacing:3px;color:#5a5280;text-transform:uppercase;padding-bottom:12px;border-bottom:1px solid rgba(255,255,255,0.07);">Project Details</p>
    <table width="100%" cellspacing="0">
      ${infoRow('Type',   type   || '—', '#ff7b2e')}
      ${infoRow('Budget', budget || '—', '#f5c842')}
    </table>
  </td></tr>

  <!-- Message -->
  <tr><td style="background:#080316;padding:0 40px 28px;">
    <p style="margin:0 0 12px;font-family:'Courier New',monospace;font-size:9px;letter-spacing:3px;color:#5a5280;text-transform:uppercase;">Message</p>
    <div style="background:rgba(123,45,255,0.08);border-left:3px solid #7b2dff;padding:18px 22px;">
      <p style="margin:0;font-size:14px;line-height:1.8;color:#c8c0e0;">${message.replace(/\n/g,'<br>')}</p>
    </div>
  </td></tr>

  <!-- Reply CTA -->
  <tr><td style="background:#0c0520;padding:24px 40px;border-top:1px solid rgba(255,255,255,0.07);">
    <table width="100%"><tr>
      <td><p style="margin:0;font-size:13px;color:#5a5280;">Reply to reach <strong style="color:#f8f2e8;">${name}</strong></p></td>
      <td align="right">
        <a href="mailto:${email}" style="display:inline-block;background:#f5c842;color:#04010e;font-family:'Courier New',monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;text-decoration:none;padding:11px 20px;font-weight:700;">Reply ↗</a>
      </td>
    </tr></table>
  </td></tr>

  <!-- Footer -->
  <tr><td style="padding:20px 40px;text-align:center;">
    <p style="margin:0;font-family:'Courier New',monospace;font-size:8px;letter-spacing:2px;color:rgba(90,82,128,0.4);">SHAKTI STUDIO • hello@shakti.studio • © ${new Date().getFullYear()}</p>
  </td></tr>

</table>
</td></tr>
</table>
</body></html>`
}

// ── Client confirmation email ──
function buildClientEmail({ name }) {
  const firstName = name.split(' ')[0]
  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#04010e;font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#04010e;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <tr><td style="background:linear-gradient(135deg,#0d0020,#200040);padding:48px 40px;text-align:center;border-bottom:2px solid #f5c842;">
    <p style="margin:0;font-size:48px;line-height:1;">🔱</p>
    <h1 style="margin:16px 0 8px;font-size:28px;font-weight:700;color:#f8f2e8;letter-spacing:3px;">SHAKTI STUDIO</h1>
    <p style="margin:0;font-family:'Courier New',monospace;font-size:10px;letter-spacing:4px;color:#f5c842;text-transform:uppercase;">Creative Digital Agency</p>
  </td></tr>

  <tr><td style="background:#080316;padding:44px 40px;text-align:center;">
    <h2 style="margin:0 0 18px;font-size:22px;color:#f8f2e8;font-weight:400;">
      Namaste, <span style="color:#f5c842;font-weight:700;">${firstName}</span> 🙏
    </h2>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.9;color:#8880a8;">
      Your vision has been received.<br>
      We will get back to you within <strong style="color:#f5c842;">24 hours</strong>.
    </p>
    <div style="background:rgba(245,200,66,0.06);border:1px solid rgba(245,200,66,0.2);padding:22px;margin:28px 0;">
      <p style="margin:0;font-family:'Courier New',monospace;font-size:11px;letter-spacing:3px;color:#f5c842;text-transform:uppercase;">OM NAMAH SHIVAYA</p>
      <p style="margin:8px 0 0;font-size:13px;color:#5a5280;">Every great creation begins with a single thought.</p>
    </div>
  </td></tr>

  <tr><td style="background:#0c0520;padding:24px 40px;border-top:1px solid rgba(255,255,255,0.07);">
    <table width="100%"><tr>
      <td style="text-align:center;padding:0 12px;">
        <p style="margin:0;font-family:'Courier New',monospace;font-size:8px;letter-spacing:2px;color:#5a5280;text-transform:uppercase;">Email</p>
        <p style="margin:6px 0 0;font-size:13px;color:#f5c842;">hello@shakti.studio</p>
      </td>
      <td style="text-align:center;padding:0 12px;border-left:1px solid rgba(255,255,255,0.07);">
        <p style="margin:0;font-family:'Courier New',monospace;font-size:8px;letter-spacing:2px;color:#5a5280;text-transform:uppercase;">Response Time</p>
        <p style="margin:6px 0 0;font-size:13px;color:#f5c842;">Within 24 Hours</p>
      </td>
    </tr></table>
  </td></tr>

  <tr><td style="padding:20px 40px;text-align:center;">
    <p style="margin:0;font-family:'Courier New',monospace;font-size:8px;letter-spacing:2px;color:rgba(90,82,128,0.35);">You received this because you contacted SHAKTI STUDIO</p>
  </td></tr>

</table>
</td></tr>
</table>
</body></html>`
}

function infoRow(label, value, color) {
  return `<tr>
    <td style="padding:9px 0;width:110px;font-family:'Courier New',monospace;font-size:9px;letter-spacing:2px;color:#5a5280;text-transform:uppercase;vertical-align:top;">${label}</td>
    <td style="padding:9px 0 9px 16px;font-size:14px;color:#f8f2e8;border-left:2px solid ${color};">${value}</td>
  </tr>`
}