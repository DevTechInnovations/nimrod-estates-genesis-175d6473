// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import crypto from "crypto";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// SMTP transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,      
  secure: false,                     
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});



app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:8080", // local dev
      "https://nimrodestates.com",
      "https://nimrodestates.com/",
    ],
    methods: ["GET", "POST", "OPTIONS"],
  })
);



// ✅ PayFast Config
const PAYFAST_ENVIRONMENT = process.env.PAYFAST_ENVIRONMENT || "live"; // "live" or "sandbox"

let PAYFAST_MERCHANT_ID, PAYFAST_MERCHANT_KEY, PAYFAST_BASE_URL;

if (PAYFAST_ENVIRONMENT === "live") {
  PAYFAST_MERCHANT_ID = process.env.PAYFAST_MERCHANT_ID;
  PAYFAST_MERCHANT_KEY = process.env.PAYFAST_MERCHANT_KEY;
  PAYFAST_BASE_URL = "https://www.payfast.co.za/eng/process";
} else {
  PAYFAST_MERCHANT_ID = "10040920";
  PAYFAST_MERCHANT_KEY = "jfjoti7md44jo";
  PAYFAST_BASE_URL = "https://sandbox.payfast.co.za/eng/process";
}

const PAYFAST_RETURN_URL = "http://localhost:5173/confirmation";
const PAYFAST_CANCEL_URL = "http://localhost:5173/cart";
const PAYFAST_NOTIFY_URL = "http://localhost:5173/api/payfast/notify";

// Helper: Generate PayFast query string
const generatePayFastForm = (data) => {
  const params = new URLSearchParams();
  for (const key in data) {
    if (data[key] !== undefined) {
      params.append(key, data[key]);
    }
  }
  return params.toString();
};

// ✅ Health check
app.get("/", (req, res) => {
  res.send("🚀 Backend is running!");
});

// ✅ Initiate Recurring Subscription
app.post("/api/payfast/create-subscription", (req, res) => {
  const { items, customer } = req.body;

  // Generate a unique payment reference
  const paymentRef = `AFMA-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`;

  // Calculate total amount (monthly subscription)
  let totalAmount = items.reduce((acc, item) => {
    const price = parseFloat(item.price.replace(/\D/g, ""));
    return acc + price * item.quantity;
  }, 0);

  if (totalAmount < 1) {
    return res
      .status(400)
      .json({ error: "Recurring amount must be at least R1.00" });
  }

  totalAmount = totalAmount.toFixed(2);

  // Recurring subscription data
  const subscriptionData = {
    merchant_id: PAYFAST_MERCHANT_ID,
    merchant_key: PAYFAST_MERCHANT_KEY,
    return_url: PAYFAST_RETURN_URL,
    cancel_url: PAYFAST_CANCEL_URL,
    notify_url: PAYFAST_NOTIFY_URL,
    subscription_type: 1, // 1 = recurring billing
    billing_date: new Date().toISOString().split("T")[0],
    recurring_amount: totalAmount,
    cycles: 0, // 0 = infinite cycles
    frequency: 3, // 3 = monthly
    amount: totalAmount,
    item_name: items.map((i) => i.name).join(", "),
    name_first: customer.firstName,
    name_last: customer.lastName,
    email_address: customer.email,
    m_payment_id: paymentRef,
  };

  const queryString = generatePayFastForm(subscriptionData);
  const payFastURL = `${PAYFAST_BASE_URL}?${queryString}`;

  res.json({ url: payFastURL });
});

// ✅ PayFast IPN Listener
app.post("/api/payfast/notify", (req, res) => {
  console.log("🔔 PayFast IPN Received:", req.body);
  // TODO: Validate signature & store recurring payment info in DB
  res.sendStatus(200);
});


// ✅ Email Route
app.post('/api/contact', async (req, res) => {
  const { firstName, lastName, email, phone, subject, message } = req.body;

  const companyMailOptions = {
    from: `"Nimrod Estates" <${process.env.SMTP_USER}>`,
    replyTo: email,
    to: process.env.CONTACT_RECEIVER,
    subject,
    text: `
      Name: ${firstName} ${lastName}
      Email: ${email}
      subject: ${subject}
      Phone: ${phone || 'N/A'}
      Message: ${message}
    `,
  };

  const userMailOptions = {
    from: `"Nimrod Estates" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Thank you for contacting Nimrod Estates!',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
        <h2>Hello ${firstName},</h2>
        <p>Thank you for reaching out to Nimrod Estates. We have received your message and will get back to you as soon as possible.</p>
        <p><strong>Your message:</strong></p>
        <p>${message}</p>
        <p>Best regards,<br />Nimrod Estates Team</p>
         <img src="https://drive.google.com/uc?export=view&id=13daKou4JFP1lpxRdgZONnIBxHl551nW6" 
           alt="Nimrod Estates Logo" 
           style="margin-top:5px; width:150px; height:auto;" />
    </div>
  `,
  };

  try {
    console.log('Sending company email...');
    await transporter.sendMail(companyMailOptions);

    console.log('Sending auto-reply to user...');
    await transporter.sendMail(userMailOptions);

    res.status(200).json({ success: true, message: 'Emails sent successfully!' });
  } catch (err) {
    console.error('Email sending error:', err);
    res.status(500).json({ success: false, message: 'Failed to send emails.' });
  }
});




app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🌐 PayFast environment: ${PAYFAST_ENVIRONMENT}`);
});
