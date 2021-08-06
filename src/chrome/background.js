/* The following comment is needed for the build to succeed */
/*global chrome*/
/* src/chrome/background.js */

export {};

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  let curUrl = "";
  if (tab) {
    curUrl = tab.url;
  }

  if (curUrl && changeInfo.status === "complete") {
    const matchUrl =
      /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;

    if (matchUrl.test(curUrl)) {
      const message = {
        type: "youtube_page",
        sender: "background",
        url: curUrl,
      };

      sendMessageToContent(tabId, message);
    }
  }
});

const sendMessageToContent = (tabId, message) => {
  chrome.tabs.sendMessage(tabId, message);
};
