export const forgotPasswordTemplate = (name, otp) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Password Reset OTP</title>
</head>

<body style="margin:0;padding:0;background:#f6f6f6;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f6f6;padding:20px 0;">
  <tr>
    <td align="center">

      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="background:#ff4d2d;color:#ffffff;padding:20px;text-align:center;font-size:24px;font-weight:bold;">
            Cravio
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:30px;color:#333333;">

            <h2 style="margin-top:0;">Hi ${name},</h2>

            <p style="font-size:14px;line-height:1.6;">
              We received a request to reset your password.
            </p>

            <p style="font-size:14px;line-height:1.6;">
              Use the OTP below to continue. This OTP will expire in <b>10 minutes</b>.
            </p>

            <div style="text-align:center;margin:25px 0;">
              <div style="
                display:inline-block;
                letter-spacing:6px;
                font-size:28px;
                font-weight:bold;
                padding:12px 24px;
                border-radius:6px;
                background:#fff2ef;
                color:#ff4d2d;
              ">
                ${otp}
              </div>
            </div>

            <p style="font-size:13px;color:#666;">
              If you didn’t request this, please ignore this email.
            </p>

            <p style="font-size:13px;color:#666;">
              Thanks,<br/>
              Team Cravio
            </p>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#fafafa;padding:15px;text-align:center;font-size:12px;color:#999;">
            © ${new Date().getFullYear()} Cravio. All rights reserved.
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>

</body>
</html>
`;
