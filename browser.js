const puppeteer = require('puppeteer');
const fs = require('fs');

async function fetchPage(url) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Cookieの読み込み
  const cookies = JSON.parse(fs.readFileSync('./cookies.json', 'utf8'));
  await page.setCookie(...cookies);

  // ページへ移動
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

  // HTMLの取得
  const content = await page.content();
  await browser.close();
  return content;
}

module.exports = { fetchPage };
