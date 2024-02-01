import { getPortal } from '@/lib/server';

export async function GET(request, { params }) {
  const { browser, page } = await getPortal();

  // select curso and período letivo
  await page.select('#selecionado', params.id);
  await page.waitForSelector('select[name="PL"]');
  const plOptions = await page.$$('select[name="PL"] option');
  if (plOptions.length > 0) {
    const firstOptionValue = await (await plOptions[0].getProperty('value')).jsonValue();
    await page.select('select[name="PL"]', firstOptionValue);
  }
  await page.waitForNavigation({ waitUntil: 'networkidle0' });

  // get information from table
  const table = await page.$('#Horarios tbody');
  const rowElements = await table.$$('tr');
  const cadeiras = [];
  let cadeira;
  for (const rowElement of rowElements.slice(1)) {
    const tds = await rowElement.$$('td');

    // proccess horarios
    let horarios = await tds[8].$$eval('li', (items) => items.map((item) => item.textContent.trim()));
    if (horarios[0] === 'Horário não definido.') {
      horarios = null;
    } else {
      horarios = horarios.map((item) => {
        const [dia, horario] = item.split(' ');
        return { dia, horario };
      });
    }

    // proccess professores
    let professores = await tds[9].$$eval('li', (items) => items.map((item) => item.textContent.trim()));
    if (professores[0] === 'Professor não definido.') {
      professores = null;
    } else {
      professores = professores.map((item) => {
        return {
          nome: item.split('-')[0].trim(),
          regente: item.includes('Regente'),
          ministrante: item.includes('Ministrante'),
          responsavel_conceito: item.includes('Responsável conceito'),
        };
      });
    }

    // assemble cadeira and turma
    const turma = {
      turma: (await (await tds[2].getProperty('textContent')).jsonValue()).trim(),
      vagas_veteranos: parseInt((await (await tds[3].getProperty('textContent')).jsonValue()).trim(), 10),
      vagas_calouros: parseInt((await (await tds[4].getProperty('textContent')).jsonValue()).trim(), 10),
      horarios,
      professores,
    };
    const cadeiraName = (await (await tds[0].getProperty('textContent')).jsonValue()).trim();
    if (cadeiraName) {
      if (cadeira) {
        cadeiras.push(cadeira);
      }
      cadeira = {
        name: cadeiraName,
        creditos: parseInt((await (await tds[1].getProperty('textContent')).jsonValue()).trim(), 10),
        turmas: [turma],
      };
    } else {
      cadeira.turmas.push(turma);
    }
  }

  await browser.close();
  return Response.json({ cadeiras });
}
