import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
  try {
    const body = await req.json()
    const { name, email, company, type, budget, message } = body

    // ── Basic validation ──
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // ── Send email to YOU (business inbox) ──
    const { error: sendError } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL,
      to:   process.env.CONTACT_TO_EMAIL,
      subject: `🔱 New Project Inquiry from ${name}`,
      html: buildOwnerEmail({ name, email, company, type, budget, message }),
      // Reply-to: so jab aap reply karo toh seedha client ko jaaye
      replyTo: email,
    })

    if (sendError) {
      console.error('Resend error:', sendError)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    // ── Send confirmation email to CLIENT ──
    await resend.emails.send({
      from:    process.env.CONTACT_FROM_EMAIL,
      to:      email,
      subject: `✨ We received your inquiry — SHAKTI STUDIO`,
      html:    buildClientEmail({ name }),
    })

    return NextResponse.json({ success: true })

  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// ─────────────────────────────────────────────────────────────
//  EMAIL TEMPLATE: Owner ko milega (aapki business email)
// ─────────────────────────────────────────────────────────────
function buildOwnerEmail({ name, email, company, type, budget, message }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Inquiry</title>
</head>
<body style="margin:0;padding:0;background:#04010e;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#04010e;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#0d0020,#200040);padding:40px 40px 32px;border-bottom:2px solid #f5c842;">
          <table width="100%"><tr>
            <td>
              <p style="margin:0;font-family:'Courier New',monospace;font-size:10px;letter-spacing:4px;color:#f5c842;text-transform:uppercase;">New Project Inquiry</p>
              <h1 style="margin:12px 0 0;font-size:28px;font-weight:700;color:#f8f2e8;letter-spacing:2px;">🔱 SHAKTI STUDIO</h1>
            </td>
            <td align="right">
              <div style="background:rgba(245,200,66,0.15);border:1px solid #f5c842;padding:8px 16px;display:inline-block;">
                <p style="margin:0;font-family:'Courier New',monospace;font-size:9px;letter-spacing:2px;color:#f5c842;text-transform:uppercase;">
                  ${new Date().toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' })}
                </p>
              </div>
            </td>
          </tr></table>
        </td></tr>

        <!-- Client Info -->
        <tr><td style="background:#080316;padding:32px 40px 24px;">
          <table width="100%" cellspacing="0">
            <tr><td colspan="2" style="padding-bottom:20px;">
              <p style="margin:0;font-family:'Courier New',monospace;font-size:9px;letter-spacing:3px;color:#5a5280;text-transform:uppercase;padding-bottom:12px;border-bottom:1px solid rgba(255,255,255,0.07);">Client Details</p>
            </td></tr>
            ${row('Name',    name,    '#7b2dff')}
            ${row('Email',   email,   '#00ffee')}
            ${row('Company', company || '—', '#f5c842')}
          </table>
        </td></tr>

        <!-- Project Info -->
        <tr><td style="background:#080316;padding:0 40px 24px;">
          <table width="100%" cellspacing="0">
            <tr><td colspan="2" style="padding-bottom:20px;">
              <p style="margin:0;font-family:'Courier New',monospace;font-size:9px;letter-spacing:3px;color:#5a5280;text-transform:uppercase;padding-bottom:12px;border-bottom:1px solid rgba(255,255,255,0.07);">Project Details</p>
            </td></tr>
            ${row('Type',   type   || '—', '#ff7b2e')}
            ${row('Budget', budget || '—', '#f5c842')}
          </table>
        </td></tr>

        <!-- Message -->
        <tr><td style="background:#080316;padding:0 40px 32px;">
          <p style="margin:0 0 12px;font-family:'Courier New',monospace;font-size:9px;letter-spacing:3px;color:#5a5280;text-transform:uppercase;">Message</p>
          <div style="background:rgba(123,45,255,0.08);border-left:3px solid #7b2dff;padding:20px 24px;">
            <p style="margin:0;font-size:15px;line-height:1.8;color:#c8c0e0;">${message.replace(/\n/g, '<br>')}</p>
          </div>
        </td></tr>

        <!-- Reply CTA -->
        <tr><td style="background:#0c0520;padding:28px 40px;border-top:1px solid rgba(255,255,255,0.07);">
          <table width="100%"><tr>
            <td>
              <p style="margin:0;font-size:13px;color:#5a5280;">Reply directly to this email to respond to <strong style="color:#f8f2e8;">${name}</strong></p>
            </td>
            <td align="right">
              <a href="mailto:${email}" style="display:inline-block;background:#f5c842;color:#04010e;font-family:'Courier New',monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;text-decoration:none;padding:12px 20px;font-weight:700;">
                Reply ↗
              </a>
            </td>
          </tr></table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:20px 40px;text-align:center;">
          <p style="margin:0;font-family:'Courier New',monospace;font-size:9px;letter-spacing:2px;color:rgba(90,82,128,0.5);">
            SHAKTI STUDIO • hello@shakti.studio • © ${new Date().getFullYear()}
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

// ─────────────────────────────────────────────────────────────
//  EMAIL TEMPLATE: Client ko confirmation milega
// ─────────────────────────────────────────────────────────────
function buildClientEmail({ name }) {
  const firstName = name.split(' ')[0]
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#04010e;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#04010e;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#0d0020,#200040);padding:48px 40px;text-align:center;border-bottom:2px solid #f5c842;">
          <p style="margin:0 0 8px;font-size:48px;line-height:1;">🔱</p>
          <h1 style="margin:16px 0 8px;font-size:32px;font-weight:700;color:#f8f2e8;letter-spacing:3px;">SHAKTI STUDIO</h1>
          <p style="margin:0;font-family:'Courier New',monospace;font-size:10px;letter-spacing:4px;color:#f5c842;text-transform:uppercase;">Creative Digital Agency</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#080316;padding:48px 40px;text-align:center;">
          <h2 style="margin:0 0 20px;font-size:24px;color:#f8f2e8;font-weight:400;">
            Namaste, <span style="background:linear-gradient(90deg,#ff7b2e,#f5c842);-webkit-background-clip:text;-webkit-text-fill-color:transparent;font-weight:700;">${firstName}</span> 🙏
          </h2>
          <p style="margin:0 0 24px;font-size:15px;line-height:1.9;color:#8880a8;">
            Your vision has been received.<br>
            We are already thinking about your project and will get back to you within <strong style="color:#f5c842;">24 hours</strong>.
          </p>
          <div style="background:rgba(245,200,66,0.06);border:1px solid rgba(245,200,66,0.2);padding:24px;margin:32px 0;">
            <p style="margin:0;font-family:'Courier New',monospace;font-size:11px;letter-spacing:3px;color:#f5c842;text-transform:uppercase;">OM NAMAH SHIVAYA</p>
            <p style="margin:8px 0 0;font-size:13px;color:#5a5280;">Every great creation begins with a single thought.</p>
          </div>
        </td></tr>

        <!-- Contact Info -->
        <tr><td style="background:#0c0520;padding:28px 40px;border-top:1px solid rgba(255,255,255,0.07);">
          <table width="100%"><tr>
            <td style="text-align:center;padding:0 12px;">
              <p style="margin:0;font-family:'Courier New',monospace;font-size:8px;letter-spacing:2px;color:#5a5280;text-transform:uppercase;">Email</p>
              <p style="margin:6px 0 0;font-size:13px;color:#f5c842;">hello@shakti.studio</p>
            </td>
            <td style="text-align:center;padding:0 12px;border-left:1px solid rgba(255,255,255,0.07);">
              <p style="margin:0;font-family:'Courier New',monospace;font-size:8px;letter-spacing:2px;color:#5a5280;text-transform:uppercase;">Response</p>
              <p style="margin:6px 0 0;font-size:13px;color:#f5c842;">Within 24 Hours</p>
            </td>
          </tr></table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:24px 40px;text-align:center;">
          <p style="margin:0;font-family:'Courier New',monospace;font-size:8px;letter-spacing:2px;color:rgba(90,82,128,0.4);">
            You are receiving this because you contacted us at shakti.studio
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

// Helper: table row
function row(label, value, color) {
  return `
  <tr>
    <td style="padding:10px 0;width:120px;font-family:'Courier New',monospace;font-size:9px;letter-spacing:2px;color:#5a5280;text-transform:uppercase;vertical-align:top;">${label}</td>
    <td style="padding:10px 0;font-size:14px;color:#f8f2e8;border-left:2px solid ${color};padding-left:16px;">${value}</td>
  </tr>`
}