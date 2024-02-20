import { getPortal } from '@/lib/server';

export async function GET() {
  const { browser, page } = await getPortal();

  let data = [];
  const expires = Date.now() + 24 * 60 * 60 * 1000;
  try {
    const selectElement = await page.$('#selecionado');
    data = await selectElement.$$eval('option', (options) =>
      options.slice(1).map((option) => ({ id: option.value, name: option.textContent.trim() }))
    );
  } catch (error) {
    console.error(error);
  } finally {
    await browser.close();
  }

  return Response.json({ data, expires });
}
