// import { capture } from "./capture.js";
import puppeteer from 'puppeteer';

const captureCharts  = async function openBrowser() {    
  const browser = await puppeteer.launch({
    headless: false
  });
  
  const page = await browser.newPage({ deviceScaleFactor: 2 });
  
  await page.setViewport({
    width: 1280,
    height: 940,
    deviceScaleFactor: 2
  });

  await page.setContent(`
  <div id="tradingview_widget" style="height:100%;width:100%"></div>
  <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
  <script type="text/javascript">
  
  const widget = new TradingView.widget(
  {
      "autosize": true,
      "symbol": "BLACKBULL:USDCAD",
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

  const message = async function message(id, symbol) {
    console.log(id, symbol.replace(":","-"))
    await page.screenshot({
      type: 'jpeg',
      path: `./capture/f-${symbol.replace(":","-")}.jpg`,
    })
    const frame = page.frames().find(frame => frame.name() === id);
    await frame.evaluate(()=>{
      chartWidget.setSymbol("BLACKBULL:USDCAD");
    })
    await frame.evaluate(()=>{
      chartWidget.setSymbol("BMFBOVESPA:ARZZ3");
    })
  }

  await page.exposeFunction('message', message);

  await page.evaluate(() => {
    window.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data)
        if (data.provider === 'TradingView' && data.id === 0) {
          message(widget.id, widget.options?.symbol)
        }
      } catch (err) {
          console.error("Error parsing message:", err);
      }
    });
  });

}

await captureCharts();







// const data = [
//   { exchange: "BMFBOVESPA", ticker: "SLCE3" },
//   { exchange: "BMFBOVESPA", ticker: "ARZZ3" },
//   { exchange: "BLACKBULL", ticker: "USDCAD" },
//   { exchange: "NASDAQ", ticker: "SHC" },  
// ]


// for (let i=0; i<data.length; i++) {
//   let asset = data[i]
//   await capture(page, `${baseURl}${asset.exchange}:${asset.ticker}`, `${asset.exchange}-${asset.ticker}.jpg`, i==0);
// }


// await browser.close();
