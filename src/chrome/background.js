/* The following comment is needed for the build to succeed */
/*global chrome*/
/* src/chrome/background.js */

export {};

const changeTabsListener = () => {
  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    let curUrl = "";
    if (tab) {
      curUrl = tab.url;
    }

    if (curUrl && changeInfo.status === "complete") {
      checkUrlMatchesYoutubePage(curUrl, tabId);
    }
  });
};

changeTabsListener();

const checkUrlMatchesYoutubePage = (curUrl, tabId) => {
  const matchUrl =
    /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;

  if (matchUrl.test(curUrl)) {
    console.log(curUrl);
    sendMessageToContent(tabId, curUrl);
  }
};

const sendMessageToContent = (tabId, curUrl) => {
  console.log("send message to tabId " + tabId);
  const message = {
    type: "youtube_page",
    sender: "background",
    url: curUrl,
  };

  chrome.tabs.sendMessage(tabId, message);
};
