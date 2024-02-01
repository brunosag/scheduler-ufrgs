import { getPortal } from '@/lib/server';

export async function GET() {
  const { browser, page } = await getPortal();

  const selectElement = await page.$('#selecionado');
  const cursos = await selectElement.$$eval('option', (options) =>
    options.slice(1).map((option) => ({ id: option.value, name: option.textContent.trim() }))
  );

  await browser.close();
  return Response.json({ cursos });
}
