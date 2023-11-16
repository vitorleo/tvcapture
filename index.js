// import { capture } from "./capture.js";
import puppeteer from 'puppeteer';

const openBrowser  = async function openBrowser() {    
  const browser = await puppeteer.launch({
    headless: 'new'
  });
  
  const page = await browser.newPage({ deviceScaleFactor: 2 });
  
  page.setViewport({
    width: 1280,
    height: 940,
    deviceScaleFactor: 2
  });

  return {browser, page}
}

const captureWidget = async function capture(page, symbol, fileName, wait) {    
  console.log(`${symbol} to ${fileName}`);
  
  await page.setContent(`
  <div id="tradingview_widget" style="height:100%;width:100%"></div>
  <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
  <script type="text/javascript">
  
  const widget = new TradingView.widget(
  {
      "autosize": true,
      "symbol": "${symbol}",
      "interval": "D",
      "timezone": "Etc/UTC",
      "theme": "dark",
      "style": "1",
      "locale": "br",
      "enable_publishing": false,
      "hide_top_toolbar": true,
      "allow_symbol_change": true,
      "save_image": false,
      "container_id": "tradingview_widget"
  }
  );
  </script>
`)

// await page.addScriptTag({
//   content: `window.addEventListener('message', function(event) {
//       try {
//           var data = JSON.parse(event.data);
//           if (data.provider === 'TradingView' && data.name === 'widgetReady') {
//               alert('ok')
//           }
//       } catch (err) {
//           console.error("Error parsing message:", err);
//       }
//   });`
// })


  // Wait and click on first result
  // await page.waitForSelector('iframe');
  if(wait) {
    await page.waitForNetworkIdle({timeout: 15000});
  }

  await page.waitForTimeout(1500);

  await page.screenshot({
    type: 'jpeg',
    path: `./capture/${fileName}`,
  })
} 

const capture  = async function capture(page, chartURL, fileName, wait) {    
  console.log(`${chartURL} to ${fileName}`);

  // Navigate the page to a URL
  await page.goto(chartURL);

  if(wait) {
    await page.waitForNetworkIdle({timeout: 15000});
  }

  await page.waitForSelector('.chart-container')

  await page.waitForTimeout(1500);

  await page.screenshot({
    type: 'jpeg',
    path: `./capture/${fileName}`,
    clip: {
      x: 56, y: 44, width: 1170, height: 850
    }
  })
}

const captureFull  = async function capture(page, symbol, fileName, wait) {    
  // Navigate the page to a URL
  const chartURL = `https://s.tradingview.com/widgetembed/?locale=br#{"symbol":"${symbol}","interval":"D","hide_top_toolbar":"1","allow_symbol_change":"1","save_image":"0","studies":"[]","theme":"dark","style":"1","timezone":"Etc/UTC","studies_overrides":"{}","utm_medium":"widget_new","utm_campaign":"chart","utm_term":"${symbol}","page-uri":"__NHTTP__"}`
  console.log(chartURL)
  await page.goto(chartURL);

  if(wait) {
    await page.waitForNetworkIdle({timeout: 15000});
  }

  await page.waitForSelector('.chart-container')

  await page.waitForTimeout(1500);

  await page.screenshot({
    type: 'jpeg',
    path: `./capture/${fileName}`,
  })
}


const {browser, page} = await openBrowser();

const baseURl = `https://www.tradingview.com/chart/VZwoOSuF/?interval=D&fullscreen=true&symbol=`



const data = [
  { exchange: "BMFBOVESPA", ticker: "SLCE3" },
  { exchange: "BMFBOVESPA", ticker: "ARZZ3" },
  { exchange: "BLACKBULL", ticker: "USDCAD" },
  { exchange: "NASDAQ", ticker: "SHC" },  
]


// for (let i=0; i<data.length; i++) {
//   let asset = data[i]
//   await capture(page, `${baseURl}${asset.exchange}:${asset.ticker}`, `${asset.exchange}-${asset.ticker}.jpg`, i==0);
// }

for (let i=0; i<data.length; i++) {
  let asset = data[i]
  await captureWidget(page, `${asset.exchange}:${asset.ticker}`, `w_${asset.exchange}-${asset.ticker}.jpg`, i==0);
}

// await captureFull(page, 'BMFBOVESPA:ARZZ3', 'inline2.jpg');
// await capture(page, 'https://www.tradingview.com/chart/VZwoOSuF/?symbol=BMFBOVESPA:ARZZ3&interval=D', '2.jpg');
// await capture(page, 'https://www.tradingview.com/chart/VZwoOSuF/?symbol=BLACKBULL:USDCAD&interval=240', '3.jpg');
// await capture(page, 'https://www.tradingview.com/chart/VBGIPA3l/?symbol=NASDAQ:SHC&interval=D', '4.jpg');


await browser.close();

// https://s.tradingview.com/widgetembed/?locale=br#{"symbol":"BMFBOVESPA:SMTO3","interval":"D","hide_top_toolbar":"1","allow_symbol_change":"1","save_image":"0","watchlist":["BMFBOVESPA:SLCE3","BLACKBULL:USDCAD"],"studies":"[]","theme":"dark","style":"1","timezone":"Etc/UTC","studies_overrides":"{}","utm_medium":"widget_new","utm_campaign":"chart","utm_term":"BMFBOVESPA:SMTO3","page-uri":"__NHTTP__"}