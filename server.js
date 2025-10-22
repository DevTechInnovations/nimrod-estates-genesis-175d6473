// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import crypto from "crypto";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local dev
      "https://autofirstmechanicalaid.co.za",
      "https://www.autofirstmechanicalaid.co.za",
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
app.post("/send-email", async (req, res) => {
  const {
    fullName,
    contactNumber,
    email,
    vehicleMake,
    vehicleModel,
    vehicleYear,
    issueDescription,
    pickupLocation,
    preferredDate,
    preferredTime,
    serviceType,
    urgency,
  } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_PORT == 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Email to admin
    await transporter.sendMail({
      from: `"Auto First Bookings" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: `New Service Booking - ${serviceType.toUpperCase()}`,
      html: `
        <h2>New Service Request</h2>
        <p><b>Name:</b> ${fullName}</p>
        <p><b>Contact:</b> ${contactNumber}</p>
        <p><b>Email:</b> ${email}</p>
        <hr />
        <p><b>Vehicle:</b> ${vehicleMake} ${vehicleModel} (${vehicleYear || "N/A"})</p>
        <p><b>Issue:</b> ${issueDescription}</p>
        <hr />
        <p><b>Pickup Location:</b> ${pickupLocation}</p>
        <p><b>Preferred Date:</b> ${preferredDate}</p>
        <p><b>Preferred Time:</b> ${preferredTime || "Anytime"}</p>
        <p><b>Service Type:</b> ${serviceType}</p>
        <p><b>Urgency:</b> ${urgency}</p>
      `,
    });

    // Email to customer
    await transporter.sendMail({
      from: `"Auto First Bookings" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Booking Confirmation - ${serviceType}`,
      html: `
        <h2>Hi ${fullName},</h2>
        <p>Thank you for booking your ${serviceType} service with us!</p>
        <p><b>Pickup Location:</b> ${pickupLocation}</p>
        <p><b>Preferred Date & Time:</b> ${preferredDate} ${preferredTime || "Anytime"}</p>
        <p>We will contact you shortly to confirm the details.</p>
        <p>Regards,<br/>Auto First Team</p>
        <img src="https://i.ibb.co/kszWcWpn/auto-first.png" alt="Auto First Logo" style="width:150px; margin-bottom: 20px;"/>
      `,
    });

    res.status(200).json({ success: true, message: "Booking email sent!" });
  } catch (error) {
    console.error("Email sending failed:", error);
    res.status(500).json({ success: false, message: "Email sending failed" });
  }
});


// ✅ EMAIL ROUTE - for checkout form
app.post("/send-checkout-email", async (req, res) => {
  const {
    firstName,
    lastName,
    idNumber,
    email,
    phone,
    address,
    city,
    postalCode,
  } = req.body;

  try {
    // Use a different transporter for admin
    const adminTransporter = nodemailer.createTransport({
      host: process.env.SMTP_ADMIN_HOST,
      port: Number(process.env.SMTP_ADMIN_PORT) || 587,
      secure: process.env.SMTP_ADMIN_PORT == 465,
      auth: {
        user: process.env.SMTP_ADMIN_USER,
        pass: process.env.SMTP_ADMIN_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

await adminTransporter.sendMail({
  from: `"Auto First Checkout" <${process.env.SMTP_ADMIN_USER}>`,
  to: process.env.ADMIN_RECEIVER_EMAIL,
  subject: "New Checkout Submission",
  html: `
    <h2>New Checkout Submission</h2>
    <p><b>First Name:</b> ${firstName}</p>
    <p><b>Last Name:</b> ${lastName}</p>
    <p><b>ID Number:</b> ${idNumber}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Phone:</b> ${phone}</p>
    <p><b>Address:</b> ${address}</p>
    <p><b>City:</b> ${city}</p>
    <p><b>Postal Code:</b> ${postalCode}</p>
    <br/>
    <span style="color: red; font-weight: bold;">
      YOU AS THE OWNER SHOULD ALWAYS DOUBLE CHECK ON PAYFAST IF A TRANSACTION WENT THROUGH BEFORE RENDERING ANY SERVICES!
    </span>
    <p>
      <b>NB:</b> YOU AND THE POTENTIAL CUSTOMER/USER WILL GET AN INVOICE FROM PAYFAST DIRECTLY ONCE THE TRANSACTION GOES THROUGH.
    </p>
  `,
});


    // ✅ Optional: Send confirmation to the customer too
    await adminTransporter.sendMail({
      from: `"Auto First" <${process.env.SMTP_ADMIN_USER}>`,
      to: email,
      subject: "Checkout Confirmation",
      html: `
        <h2>Hi ${firstName},</h2>
        <p>Wellcome onboard and thank you for choosing Auto First Mechanical Aid!</p>
        <p>We’ve received your details and will be in touch soon.</p>
        <p>Regards,<br/>Auto First Team</p>
        <img src="https://i.ibb.co/kszWcWpn/auto-first.png" alt="Auto First Logo" style="width:150px; margin-top:10px;"/>
      `,
    });

    res.status(200).json({ success: true, message: "Checkout email sent!" });
  } catch (error) {
    console.error("Checkout Email Error:", error);
    res.status(500).json({ success: false, message: "Checkout email failed" });
  }
});


// ✅ Contact Form Email Route
app.post("/api/contact", async (req, res) => {
  const { firstName, lastName, email, phone, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_ADMIN_HOST,
      port: Number(process.env.SMTP_ADMIN_PORT) || 587,
      secure: process.env.SMTP_ADMIN_PORT == 465,
      auth: {
        user: process.env.SMTP_ADMIN_USER,
        pass: process.env.SMTP_ADMIN_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Send to admin
    await transporter.sendMail({
      from: `"Auto First Contact" <${process.env.SMTP_ADMIN_USER}>`,
      to: process.env.ADMIN_RECEIVER_EMAIL,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><b>First Name:</b> ${firstName}</p>
        <p><b>Last Name:</b> ${lastName}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone || "N/A"}</p>
        <p><b>Subject:</b> ${subject}</p>
        <p><b>Message:</b><br/>${message}</p>
      `,
    });

    // ✅ Optional: Send confirmation to user
    await transporter.sendMail({
      from: `"Auto First" <${process.env.SMTP_ADMIN_USER}>`,
      to: email,
      subject: "We Received Your Message",
      html: `
        <h2>Hi ${firstName},</h2>
        <p>Thank you for reaching out to us. We have received your message:</p>
        <p>Our team will get back to you shortly.</p>
         <p>Regards,<br/>Auto First Team</p>
        <img src="https://i.ibb.co/kszWcWpn/auto-first.png" alt="Auto First Logo" style="width:150px; margin-top:10px;"/>
      `,
    });

    res.status(200).json({ success: true, message: "Contact email sent!" });
  } catch (error) {
    console.error("Contact Email Error:", error);
    res.status(500).json({ success: false, message: "Contact email failed" });
  }
});



app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🌐 PayFast environment: ${PAYFAST_ENVIRONMENT}`);
});
