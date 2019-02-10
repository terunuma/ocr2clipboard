// chrome.browserAction.onClicked.addListener(async() => {
//   const item = await chrome.storage.sync.get('apiKey');
//   if(item && item.apiKey){
//     chrome.tabs.executeScript({ file: 'js/chrome-extension-async.js' });
//     chrome.tabs.executeScript({ file: 'js/content-script.js' });
//   }
// });

chrome.runtime.onMessage.addListener(async (_1, _2, sendResponse) => {
  const base64Img = await chrome.tabs.captureVisibleTab().catch(e => {
    console.log(e);
  });
  const tabs = (await chrome.tabs.query({ active: true, currentWindow: true }).catch(e => {
    console.log(e);
  })) as chrome.tabs.Tab[];
  await chrome.tabs
    .sendMessage(tabs[0].id!, {
      base64Img,
    })
    .catch(e => {
      console.log(e);
    });
  sendResponse(true);
  return true;
});