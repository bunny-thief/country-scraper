# country-scraper
A Node.js (v18.13.0) project that scrapes information about countries of the World from https://www.scrapethissite.com/pages/simple/.

## Country Example:  
**Andorra**  
**Capital**: Andorra la Vella  
**Population**: 84000  
**Area (km2)**: 468.0  

Scrapping is done with [Puppeteer 19.6.3](https://www.npmjs.com/package/puppeteer)

Once the information is scrapped it is inserted into a Mongodb collection hosted on Mondogb Atlas. [Mongodb driver 5.0.1](https://www.npmjs.com/package/mongodb)

