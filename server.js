const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.get('/invoice', async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });

    const page = await browser.newPage();
    const html = `
      <h1>Invoice</h1>
      <p>Customer: John Doe</p>
      <p>Amount: $100</p>
    `;
    await page.setContent(html);
    const pdf = await page.pdf({ format: 'A4' });

    await browser.close();

    res.contentType('application/pdf');
    res.send(pdf);

  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating invoice');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
