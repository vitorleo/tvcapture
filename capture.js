

export const capture  = async function capture(page, chartURL, fileName) {    
    // Navigate the page to a URL
    await page.goto(chartURL);
  
    // Wait and click on first result
    await page.waitForSelector('.chart-gui-wrapper');
    await page.waitForNetworkIdle({timeout: 10000});
    await page.screenshot({
      type: 'jpeg',
      path: `./capture/${fileName}`,
      clip: {
        x: 56, y: 44, width: 1270, height: 850
      }
    })
}