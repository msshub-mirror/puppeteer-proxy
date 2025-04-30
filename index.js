const express = require('express');
const { fetchPage } = require('./browser');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/xproxy', async (req, res) => {
  const target = req.query.url;
  if (!target || !target.startsWith('https://x.com')) {
    return res.status(400).send('Invalid URL');
  }

  try {
    const html = await fetchPage(target);
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching page: ' + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Puppeteer proxy running on port ${PORT}`);
});
