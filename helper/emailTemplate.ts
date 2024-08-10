import { smtpUserName } from "./secret";
import { client_local_url, client_production_url } from "./secret";

const clientURL =
  process.env.NODE_ENV === "production"
    ? client_production_url
    : client_local_url;

if (!clientURL) {
  throw new Error(
    "clientURL URL (clientURL) is not defined in the environment variables."
  );
}

export const generateActivationEmailTemplate = (
  name: string,
  token: string
): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>User Activation Email</title>
      <style>
        /* Add your custom styles here */
        body {
          font-family: Arial, sans-serif;
          background-color: #f3f3f3;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        .header h1 {
          color: #333333;
        }
        .content {
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 5px;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>User Activation Email</h1>
        </div>
        <div class="content">
          <p>Dear ${name},</p>
          <p>Thank you for registering with us!</p>
          <p>Please click the following link to activate your account:</p>
          <p><a href="${clientURL}/user/activate/${token}" target="_blank">Activate Account</a></p>
          <p>If you did not request this registration, you can ignore this email.</p>
          <p>Best regards,</p>
          <p>The [ADJPA] Team</p>
        </div>
        <div class="footer">
          <p>This email was sent to ${smtpUserName}. If you received this email by mistake, please contact us.</p>
        </div>
      </div>
    </body>
    </html>
    `;
};
