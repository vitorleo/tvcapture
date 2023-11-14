// import { capture } from "./capture.js";
import puppeteer from 'puppeteer';

const openBrowser  = async function openBrowser() {    
  const browser = await puppeteer.launch({
    headless: 'new'
  });
  
  const page = await browser.newPage({ deviceScaleFactor: 2 });
  
  page.setViewport({
    width: 1680,
    height: 940,
    deviceScaleFactor: 2
  });

  return {browser, page}
}

const capture  = async function capture(page, chartURL, fileName, wait) {    
  console.log(`${chartURL} to ${fileName}`);

  // Navigate the page to a URL
  await page.goto(chartURL);

  // Wait and click on first result
  await page.waitForSelector('.chart-gui-wrapper');
  if(wait) {
    await page.waitForNetworkIdle({timeout: 15000});
  }

  await page.waitForTimeout(1000);

  await page.screenshot({
    type: 'jpeg',
    path: `./capture/${fileName}`,
    clip: {
      x: 56, y: 44, width: 1270, height: 850
    }
  })
}

const {browser, page} = await openBrowser();

const baseURl = `https://www.tradingview.com/chart/VZwoOSuF/?interval=D&symbol=`



const data = [
  { exchange: "BMFBOVESPA", ticker: "SLCE3" },
  { exchange: "BMFBOVESPA", ticker: "ARZZ3" },
  { exchange: "BLACKBULL", ticker: "USDCAD" },
  { exchange: "NASDAQ", ticker: "SHC" },  
]


for (let i=0; i<=data.length; i++) {
  let asset = data[i]
  await capture(page, `${baseURl}${asset.exchange}:${asset.ticker}`, `${asset.exchange}-${asset.ticker}.jpg`, i==0);
}


// await capture(page, 'https://www.tradingview.com/chart/VZwoOSuF/?symbol=BMFBOVESPA:SLCE3&interval=D', '1.jpg', true);
// await capture(page, 'https://www.tradingview.com/chart/VZwoOSuF/?symbol=BMFBOVESPA:ARZZ3&interval=D', '2.jpg');
// await capture(page, 'https://www.tradingview.com/chart/VZwoOSuF/?symbol=BLACKBULL:USDCAD&interval=240', '3.jpg');
// await capture(page, 'https://www.tradingview.com/chart/VBGIPA3l/?symbol=NASDAQ:SHC&interval=D', '4.jpg');


await browser.close();