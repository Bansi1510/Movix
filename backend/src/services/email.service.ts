import nodemailer from "nodemailer";

// =========================
// TRANSPORTER
// =========================

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// =========================
// SEND EMAIL
// =========================

export const sendEmail = async (
  to: string,
  subject: string,
  html: string
) => {
  await transporter.sendMail({
    from: `"Movix" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

// =========================
// WELCOME EMAIL
// =========================

export const sendWelcomeEmail = async (
  email: string,
  name?: string
) => {
  const html = `
    <div style="font-family: Arial; padding:20px;">
      <h2>Welcome to Movix 🎉</h2>

      <p>Hello ${name || "User"},</p>

      <p>
        Your account has been created successfully.
      </p>

      <p>
        Thank you for joining Movix.
      </p>

      <br/>

      <p>Enjoy streaming 🚀</p>
    </div>
  `;

  await sendEmail(
    email,
    "Welcome to Movix",
    html
  );
};

// =========================
// PAYMENT SUCCESS EMAIL
// =========================

export const sendPaymentSuccessEmail = async ({
  email,
  name,
  amount,
  transactionId,
  videoTitle,
}: {
  email: string;
  name?: string;
  amount: number;
  transactionId: string;
  videoTitle: string;
}) => {
  const html = `
    <div style="font-family: Arial; padding:20px;">
      <h2>Payment Successful ✅</h2>

      <p>Hello ${name || "User"},</p>

      <p>
        Your payment has been completed successfully.
      </p>

      <hr />

      <h3>Payment Receipt</h3>

      <p>
        <strong>Video:</strong> ${videoTitle}
      </p>

      <p>
        <strong>Amount:</strong> ₹${amount}
      </p>

      <p>
        <strong>Transaction ID:</strong> ${transactionId}
      </p>

      <br/>

      <p>
        Thank you for your purchase ❤️
      </p>
    </div>
  `;

  await sendEmail(
    email,
    "Payment Successful",
    html
  );
};