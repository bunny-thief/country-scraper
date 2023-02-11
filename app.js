const puppeteer = require('puppeteer')

async function scrape() {
    try {
        console.log('Starting scrape')
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto('https://www.scrapethissite.com/pages/simple/')

        const countries = await page.evaluate(() =>
            Array.from(document.querySelectorAll('#countries .country'), (country) => ({
                country: country.querySelector('.country-name').innerText,
                capital: country.querySelector('.country-capital').innerText,
                population: country.querySelector('.country-population').innerText,
                area: country.querySelector('.country-area').innerText
            }))
        )
        console.log('Finished scraping')

        await browser.close()
    }

    catch (err) {
        console.error(err)
    }
}

scrape()