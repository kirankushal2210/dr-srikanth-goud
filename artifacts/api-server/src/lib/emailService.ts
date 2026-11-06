import nodemailer from "nodemailer";
import { logger } from "./logger";
import type { StoredRepresentation } from "./representationStore";

export const SECRETARIAT_EMAIL =
  process.env.SECRETARIAT_EMAIL || "srikanthk.vtelangana@gmail.com";

interface EmailDispatchResult {
  success: boolean;
  delivered: boolean;
  target: string;
  message: string;
}

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const service = process.env.SMTP_SERVICE;

  if (service && user && pass) {
    return nodemailer.createTransport({
      service,
      auth: { user, pass },
    });
  }

  if (host && user && pass) {
    const port = Number(process.env.SMTP_PORT) || 587;
    const secure = process.env.SMTP_SECURE === "true" || port === 465;
    return nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });
  }

  return null;
}

export async function sendRepresentationEmail(
  record: StoredRepresentation
): Promise<EmailDispatchResult> {
  const subject = `[Secretariat Representation] #${record.referenceNumber}: ${record.category} - ${record.name}`;

  const plainText = `
OFFICIAL SECRETARIAT CITIZEN REPRESENTATION
Office of Dr. Nalamasa Srikanth Goud, Ph.D.
Target Secretariat Desk: ${SECRETARIAT_EMAIL}
--------------------------------------------------
Tracking Reference : ${record.referenceNumber}
Citizen Name       : ${record.name}
Mobile Number      : +91 ${record.mobile}
Email Address      : ${record.email || "Not specified"}
Constituency       : ${record.constituency}
Subject / Category : ${record.category}
Submission Date    : ${new Date(record.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
Status             : ${record.status}
--------------------------------------------------
REPRESENTATION / GRIEVANCE DETAILS:
${record.message}
--------------------------------------------------
This enquiry was submitted through the official Secretariat portal.
To follow up directly with the citizen, call +91 ${record.mobile}${record.email ? ` or reply to ${record.email}` : ""}.
`.trim();

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
</head>
<body style="margin:0;padding:24px;background-color:#FAF8F5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#15241D;">
  <div style="max-width:640px;margin:0 auto;background:#FFFFFF;border:1px solid #DFD8CB;border-radius:16px;overflow:hidden;box-shadow:0 4px 12px rgba(20,83,45,0.06);">
    <!-- Top Tricolor Bar -->
    <div style="height:4px;background:linear-gradient(90deg, #CA8A04 0%, #14532D 50%, #0284C7 100%);"></div>

    <!-- Header -->
    <div style="padding:28px 32px;background:#FAF8F5;border-bottom:1px solid #DFD8CB;">
      <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#A16207;">
        Office of Dr. Nalamasa Srikanth Goud, Ph.D.
      </p>
      <h1 style="margin:8px 0 0 0;font-size:22px;font-weight:700;color:#14532D;line-height:1.2;">
        New Citizen Representation Submitted
      </h1>
      <p style="margin:4px 0 0 0;font-size:13px;color:#4A5568;">
        Assigned to Secretariat Desk: <strong style="color:#14532D;">${SECRETARIAT_EMAIL}</strong>
      </p>
    </div>

    <!-- Reference Box -->
    <div style="margin:24px 32px;padding:16px 20px;background:#F5F1E9;border:1px solid #CA8A04;border-radius:10px;">
      <span style="font-size:11px;font-weight:700;text-transform:uppercase;color:#A16207;letter-spacing:0.15em;">Official Tracking Reference</span>
      <div style="font-size:24px;font-weight:800;font-family:monospace;color:#14532D;margin-top:4px;">
        ${record.referenceNumber}
      </div>
      <span style="display:inline-block;margin-top:6px;padding:3px 10px;background:#14532D;color:#FFFFFF;border-radius:20px;font-size:11px;font-weight:600;">
        STATUS: ${record.status}
      </span>
    </div>

    <!-- Citizen & Submission Metadata -->
    <div style="padding:0 32px;">
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr style="border-bottom:1px solid #F0ECE4;">
          <td style="padding:10px 0;width:35%;color:#64748B;font-weight:600;">Citizen Name</td>
          <td style="padding:10px 0;font-weight:700;color:#15241D;">${record.name}</td>
        </tr>
        <tr style="border-bottom:1px solid #F0ECE4;">
          <td style="padding:10px 0;color:#64748B;font-weight:600;">Mobile Number</td>
          <td style="padding:10px 0;font-weight:700;color:#15241D;">
            <a href="tel:+91${record.mobile}" style="color:#0284C7;text-decoration:none;">+91 ${record.mobile}</a>
          </td>
        </tr>
        <tr style="border-bottom:1px solid #F0ECE4;">
          <td style="padding:10px 0;color:#64748B;font-weight:600;">Email Address</td>
          <td style="padding:10px 0;color:#15241D;">
            ${record.email ? `<a href="mailto:${record.email}" style="color:#0284C7;text-decoration:none;">${record.email}</a>` : `<em style="color:#94A3B8;">Not provided</em>`}
          </td>
        </tr>
        <tr style="border-bottom:1px solid #F0ECE4;">
          <td style="padding:10px 0;color:#64748B;font-weight:600;">Constituency</td>
          <td style="padding:10px 0;font-weight:700;color:#15241D;">${record.constituency}</td>
        </tr>
        <tr style="border-bottom:1px solid #F0ECE4;">
          <td style="padding:10px 0;color:#64748B;font-weight:600;">Subject / Category</td>
          <td style="padding:10px 0;font-weight:700;color:#B45309;">${record.category}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;color:#64748B;font-weight:600;">Submission Time</td>
          <td style="padding:10px 0;color:#15241D;">${new Date(record.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</td>
        </tr>
      </table>
    </div>

    <!-- Message Section -->
    <div style="margin:24px 32px;padding:20px;background:#FAF8F5;border-left:4px solid #14532D;border-radius:4px;">
      <h3 style="margin:0 0 10px 0;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:#14532D;">
        Citizen Representation / Message
      </h3>
      <p style="margin:0;font-size:15px;line-height:1.6;color:#15241D;white-space:pre-wrap;">${record.message}</p>
    </div>

    <!-- Action Buttons -->
    <div style="margin:24px 32px 32px 32px;padding-top:20px;border-top:1px solid #DFD8CB;text-align:center;">
      <a href="tel:+91${record.mobile}" style="display:inline-block;padding:10px 22px;background:#14532D;color:#FFFFFF;text-decoration:none;border-radius:24px;font-weight:600;font-size:13px;margin-right:10px;">
        📞 Call Citizen (+91 ${record.mobile})
      </a>
      ${record.email ? `
      <a href="mailto:${record.email}?subject=Re:%20Secretariat%20Representation%20${record.referenceNumber}" style="display:inline-block;padding:10px 22px;background:#FFFFFF;border:1px solid #DFD8CB;color:#15241D;text-decoration:none;border-radius:24px;font-weight:600;font-size:13px;">
        ✉️ Reply via Email
      </a>
      ` : ""}
    </div>

    <!-- Footer -->
    <div style="padding:16px 32px;background:#F5F1E9;border-top:1px solid #DFD8CB;font-size:12px;color:#64748B;text-align:center;">
      Secretariat Camp Desk &middot; BRS State Official Spokesperson &middot; Mahabubabad Incharge<br/>
      Bio-Data Registration: TLPC-6428/648/32384 &middot; Boduppal, Telangana &ndash; 500092
    </div>
  </div>
</body>
</html>
`.trim();

  const transporter = getTransporter();

  if (!transporter) {
    logger.info(
      {
        referenceNumber: record.referenceNumber,
        targetEmail: SECRETARIAT_EMAIL,
        citizen: record.name,
        category: record.category,
      },
      `[EMAIL DISPATCH] Stored in register for ${SECRETARIAT_EMAIL}. (SMTP not configured in env; set SMTP_USER and SMTP_PASS for live SMTP transmission)`
    );

    return {
      success: true,
      delivered: false,
      target: SECRETARIAT_EMAIL,
      message: `Enquiry recorded for Secretariat desk (${SECRETARIAT_EMAIL}). Configure SMTP_USER & SMTP_PASS in .env for automated live inbox delivery.`,
    };
  }

  try {
    const fromAddress =
      process.env.SMTP_FROM ||
      process.env.SMTP_USER ||
      `"Secretariat Portal" <portal@nalamasa.in>`;

    const info = await transporter.sendMail({
      from: fromAddress,
      to: SECRETARIAT_EMAIL,
      replyTo: record.email || undefined,
      subject,
      text: plainText,
      html,
    });

    logger.info(
      {
        messageId: info.messageId,
        target: SECRETARIAT_EMAIL,
        referenceNumber: record.referenceNumber,
      },
      `[EMAIL DISPATCH] Successfully delivered email to ${SECRETARIAT_EMAIL}`
    );

    return {
      success: true,
      delivered: true,
      target: SECRETARIAT_EMAIL,
      message: `Representation email delivered directly to ${SECRETARIAT_EMAIL}`,
    };
  } catch (err) {
    logger.error(
      { err, target: SECRETARIAT_EMAIL, referenceNumber: record.referenceNumber },
      `[EMAIL DISPATCH] Failed to send email to ${SECRETARIAT_EMAIL}`
    );

    return {
      success: false,
      delivered: false,
      target: SECRETARIAT_EMAIL,
      message: `Failed to deliver email to ${SECRETARIAT_EMAIL}: ${(err as Error).message}`,
    };
  }
}

