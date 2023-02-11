require('dotenv').config()
const puppeteer = require('puppeteer')
const MongoClient = require('mongodb').MongoClient

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
        // open connection to database
        const client = await MongoClient.connect(process.env.CONNECTION_STRING)
        console.log('Connected to database')
        const DB = client.db(process.env.DB)
        const COLLECTION = DB.collection(process.env.COLLECTION)

        console.log('Inserting countries into database')
        await COLLECTION.insertMany(countries)
        console.log('Finished inserting countries into database')

        // close connection to database
        await client.close()

        await browser.close()
    }

    catch (err) {
        console.error(err)
    }
}

scrape()