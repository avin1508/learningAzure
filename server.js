const express = require("express");
const nodemailer = require("nodemailer");
const puppeteer = require("puppeteer");
const handlebars = require("handlebars");

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ SMTP Config (Office365)
const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: "billingsupport@revappayyaitservices.com",
    pass: "rbvnkkwvmlxxfjkd",
  },
});

// ✅ API: Generate PDF and Send Email
app.get("/api/send-invoice", async (req, res) => {
  try {
    const { email } = req.query; // 👉 user email from query param
    if (!email) {
      return res.status(400).json({ error: "Email is required in query params" });
    }

    // 1. Define HBS template (inline)
    const templateSource = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Invoice</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #007bff; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
            th { background: #007bff; color: #fff; }
          </style>
        </head>
        <body>
          <h1>Invoice</h1>
          <p><strong>Customer:</strong> {{customerName}}</p>
          <p><strong>Invoice #:</strong> {{invoiceNumber}}</p>
          <p><strong>Date:</strong> {{date}}</p>
          <table>
            <tr>
              <th>Description</th>
              <th>Amount</th>
            </tr>
            <tr>
              <td>Billing Service</td>
              <td>{{amount}}</td>
            </tr>
          </table>
        </body>
      </html>
    `;

    const template = handlebars.compile(templateSource);

    // 2. Pass dynamic data
    const html = template({
      customerName: "Avinash Kumar",
      invoiceNumber: "INV-1001",
      amount: "₹1500",
      date: new Date().toLocaleDateString(),
    });

    // 3. Generate PDF with Puppeteer
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setContent(html);
    const pdfBuffer = await page.pdf({ format: "A4" });
    await browser.close();

    // 4. Send Email with PDF
    const mailOptions = {
      from: `"Revappayya Billing" <billingsupport@revappayyaitservices.com>`,
      to: email,
      subject: "Your Invoice from Revappayya Billing",
      text: "Please find attached invoice PDF.",
      attachments: [
        {
          filename: "invoice.pdf",
          content: pdfBuffer,
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: `Invoice sent to ${email}` });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: "Failed to send invoice" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
