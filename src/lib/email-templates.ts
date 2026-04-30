/**
 * Email HTML templates.
 *
 * Deliberately simple. Email clients (especially Gmail/Outlook) render HTML
 * unreliably — a plain, text-forward layout looks good everywhere and avoids
 * spam filters that flag heavy marketing templates.
 */

interface ConfirmationEmailArgs {
    siteUrl: string;
    token: string;
}

export function confirmationEmail({ siteUrl, token }: ConfirmationEmailArgs) {
    const confirmUrl = `${siteUrl}/api/confirm?token=${encodeURIComponent(token)}`;

    const subject = "Confirm your subscription";

    const text = [
        "Thanks for signing up for my newsletter.",
        "",
        "Click the link below to confirm your email address. If you didn't sign up, just ignore this email — you won't hear from me again.",
        "",
        confirmUrl,
        "",
        "— Varun",
    ].join("\n");

    const html = `<!DOCTYPE html>
<html>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1a1a1a; max-width: 560px; margin: 0 auto; padding: 32px 24px; line-height: 1.6;">
    <p style="font-size: 16px; margin: 0 0 16px;">Thanks for signing up for my newsletter.</p>
    <p style="font-size: 16px; margin: 0 0 24px;">Click the button below to confirm your email address. If you didn't sign up, just ignore this email — you won't hear from me again.</p>
    <p style="margin: 0 0 32px;">
      <a href="${confirmUrl}" style="display: inline-block; background: #1a1a1a; color: #ffffff; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 15px;">Confirm subscription</a>
    </p>
    <p style="font-size: 13px; color: #666; margin: 0 0 4px;">Or paste this link into your browser:</p>
    <p style="font-size: 13px; color: #666; word-break: break-all; margin: 0 0 32px;">
      <a href="${confirmUrl}" style="color: #666;">${confirmUrl}</a>
    </p>
    <p style="font-size: 15px; margin: 0;">— Varun</p>
  </body>
</html>`;

    return { subject, text, html };
}
