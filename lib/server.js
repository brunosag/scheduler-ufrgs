import puppeteer from 'puppeteer';

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

async function signIn(page) {
  const user = process.env.PORTAL_USER;
  const password = process.env.PORTAL_PASSWORD;

  if (user === undefined || password === undefined) {
    throw new Error('Please set PORTAL_USER and PORTAL_PASSWORD environment variables');
  }

  await page.type('#usuario', user);
  await page.type('#senha', password);
  await page.click('input[name="login"]', { waitUntil: 'networkidle0' });
  await page.goto('https://www1.ufrgs.br/intranet/portal/public/index.php?cods=1,1,1,224', {
    waitUntil: 'networkidle0',
  });
}

export async function getPortal() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1024 });
  await page.goto('https://www1.ufrgs.br/sistemas/portal/', { waitUntil: 'networkidle0' });
  await signIn(page);

  return { browser, page };
}
