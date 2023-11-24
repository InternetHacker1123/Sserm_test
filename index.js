// импорт нужных библиотек
const puppeteer = require('puppeteer')
const readline = require('readline')

// создание интерфейса ввода\ввывода
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})



// асинхронная функция для получения значения введенного из консоли
function askQuestion(question) {
    return new Promise((resolve) => {
      rl.question(question, resolve);
    });
}

// асинхронная функция для отправки письма из почты мейл.ру, имитируя действия пользователя
async function SendEmail() {

    const senderEmail = await askQuestion('Введите почту: ')
    const senderEmailPassword = await askQuestion('Введите пароль от почты: ')
    const recepientEmail = await askQuestion('Введите почту получателя: ')
    const message = await askQuestion('Введите сообщение: ')
    rl.close();

    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()

    await page.goto('https://account.mail.ru/login')

    await page.waitForSelector('#root > div:nth-child(2) > div > div > div > div > div > form > div:nth-child(2) > div:nth-child(2) > div.login-row.username > div > div > div > div > div > div.base-0-2-64.first-0-2-70 > div > input')

    await page.focus('#root > div:nth-child(2) > div > div > div > div > div > form > div:nth-child(2) > div:nth-child(2) > div.login-row.username > div > div > div > div > div > div.base-0-2-64.first-0-2-70 > div > input')

    await page.keyboard.type(senderEmail)

    await page.click('#root > div:nth-child(2) > div > div > div > div > div > form > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) > div > div > div.submit-button-wrap > button')

    
    await page.waitForTimeout(1500)
   
    await page.keyboard.type(senderEmailPassword)


    await page.click('#root > div:nth-child(2) > div > div > div > div > div > form > div:nth-child(2) > div > div:nth-child(3) > div > div > div.submit-button-wrap > div > button')

    await page.waitForSelector('#app-canvas > div > div.application-mail > div.application-mail__overlay.js-promo-id_new-toolbar > div > div.application-mail__layout.application-mail__layout_main > span > div.layout__column.layout__column_left > div.layout__column-wrapper > div > div > div > div:nth-child(1) > div > div > a > span')

    await page.click('#app-canvas > div > div.application-mail > div.application-mail__overlay.js-promo-id_new-toolbar > div > div.application-mail__layout.application-mail__layout_main > span > div.layout__column.layout__column_left > div.layout__column-wrapper > div > div > div > div:nth-child(1) > div > div > a > span')

    await page.waitForSelector('body > div:nth-child(1) > div > div.compose-app.compose-app_fix.compose-app_fullscreen.compose-app_window > div > div > div > div.container--rp3CE > div.scrollview--SiHhk.scrollview_main--3Vfg9 > div.head_container--3W05z > div > div > div.wrap--2sfxq > div > div.contacts--1ofjA > div > div')

    await page.focus('body > div:nth-child(1) > div > div.compose-app.compose-app_fix.compose-app_fullscreen.compose-app_window > div > div > div > div.container--rp3CE > div.scrollview--SiHhk.scrollview_main--3Vfg9 > div.head_container--3W05z > div > div > div.wrap--2sfxq > div > div.contacts--1ofjA > div > div')

    await page.keyboard.type(recepientEmail)

    await page.click('body > div:nth-child(1) > div > div.compose-app.compose-app_fix.compose-app_fullscreen.compose-app_window > div > div > div > div.container--rp3CE > div.scrollview--SiHhk.scrollview_main--3Vfg9 > div.subject__container--HWnat > div.subject__wrapper--2mk6m')

    await page.click('body > div:nth-child(1) > div > div.compose-app.compose-app_fix.compose-app_fullscreen.compose-app_window > div > div > div > div.container--rp3CE > div.scrollview--SiHhk.scrollview_main--3Vfg9 > div.editor_container--3Rj-8 > div > div > div:nth-child(1) > div > div > div:nth-child(1) > div:nth-child(3) > button > div > div > svg')

    await page.click('body > div:nth-child(1) > div > div.compose-app.compose-app_fix.compose-app_fullscreen.compose-app_window > div > div > div > div.container--rp3CE > div.scrollview--SiHhk.scrollview_main--3Vfg9 > div.editor_container--3Rj-8 > div > div > div:nth-child(1) > div > div > div:nth-child(1) > div:nth-child(3) > button > div > div > svg')

    await page.keyboard.type(message)

    await page.click('body > div:nth-child(1) > div > div.compose-app.compose-app_fix.compose-app_fullscreen.compose-app_window > div > div > div > div.footer--2dyxG > div.buttons--2Kfbb > div:nth-child(1) > div > button > span.vkuiButton__in')

}

// запуск функции, представленной выше
SendEmail()