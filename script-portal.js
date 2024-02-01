const { Builder, By, until } = require('selenium-webdriver');

(async function white() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://www1.ufrgs.br/sistemas/portal/');

    // login
    await driver.wait(until.elementLocated(By.id('usuario')), 10000);
    await driver.findElement(By.id('usuario')).sendKeys('550452');
    await driver.findElement(By.id('senha')).sendKeys('Activia01!!');
    await driver.findElement(By.name('login')).click();

    // acessar página de horários e vagas
    await driver.get('https://www1.ufrgs.br/intranet/portal/public/index.php?cods=1,1,1,224');

    // obter cursos
    let selectElement = await driver.findElement(By.id('selecionado'));
    let options = await selectElement.findElements(By.css('option'));
    let cursos = [];
    for (let option of options) {
      let innerHTML = (await option.getAttribute('innerHTML')).trim();
      let value = await option.getAttribute('value');
      cursos.push({
        name: innerHTML,
        value,
      });
    }
    cursos.shift();

    // imprimir cursos
    console.log(JSON.stringify(cursos));

    // selecionar curso
    await driver.findElement(By.id('selecionado')).sendKeys('CIÊNCIA DA COMPUTAÇÃO');

    // selecionar período letivo
    await driver.findElement(By.name('PL')).sendKeys('2024/1');

    // obter cadeiras
    let rows = await driver.findElement(By.id('Horarios')).findElement(By.css('tbody')).findElements(By.css('tr'));
    rows.shift();
    let cadeiras = [];
    for (let row of rows) {
      let tdElement = await row.findElement(By.css('td'));
      let content = await tdElement.getAttribute('innerHTML');
      if (content !== '&nbsp;') {
        cadeiras.push(content);
      }
    }

    // imprimir cadeiras
    console.log(JSON.stringify(cadeiras));

    // // access tickets page
    // await driver.findElement(By.id('M5500')).click();
    // await driver.findElement(By.css('a[href="/RU/tru/"]')).click();

    // // count tickets
    // let ticketTableBody = await driver.findElement(By.css('#yw0 tbody'));
    // let tickets = await ticketTableBody.findElements(By.css('tr'));
    // let ticketCount = tickets.length;

    // // get last ticket
    // let lastTicketRow = tickets[ticketCount - 1];
    // let lastTicket = await lastTicketRow.findElement(By.css('td')).getAttribute('innerHTML');

    // // print results
    // console.log(`Number of tickets: ${ticketCount}`);
    // console.log(`Last Ticket: ${JSON.stringify(lastTicket)}`);

    // // access buy tickets page
    // await driver.findElement(By.css('a[href="/RU/tru/tiquete/compra"]')).click();
    // await driver.findElement(By.id('refeicoes')).sendKeys('1');
    // await driver.findElement(By.id('tipoTiqueteU')).click();
    // await driver.findElement(By.css('input[value="Prosseguir »"]')).click();

    // wait 10 seconds
    await driver.sleep(10000);
  } finally {
    await driver.quit();
  }
})();
