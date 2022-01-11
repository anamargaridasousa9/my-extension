/* The following comment is needed for the build to succeed */
/*global chrome*/

import ReactDOM from "react-dom";
import AddToPlayList from "../components/content";

const ELEMENT_TYPE = "div";
const ELEMENT_ID = "fun-gce";
const PLAYER_ADS_ID = "player-ads";

const musicLogoDir = "/icons/music-logo.png";

let hasElement = false;

const messagesFromBackground = (message, sender, sendResponse) => {
  if (message && message.sender === "background") {
    switch (message.type) {
      case "youtube_page":
        handleYoutubePage(message);
        break;
      default:
        break;
    }
    sendResponse("content.js got your message");
  }
};

const listenToBackground = () => {
  chrome.runtime.onMessage.addListener(messagesFromBackground);
};

listenToBackground();

export const handleYoutubePage = (message) => {
  const url = message.url;

  if (hasElement) {
    removeElementFromPage();
  }

  addElementToPage(url);
};

const removeElementFromPage = () => {
  let funElement = document.getElementById(ELEMENT_ID);
  if (funElement) funElement.remove();
};

const addElementToPage = (url) => {
  let youtubeElem = document.getElementById(PLAYER_ADS_ID);
  if (!youtubeElem) {
    console.log("did not found player ads element");
    addListenerToYoutubePage(url);
  } else {
    youtubeElem = document.getElementById(PLAYER_ADS_ID);
    injectElement(youtubeElem, url);
  }
};

const injectElement = (youtubeElem, url) => {
  const app = document.createElement(ELEMENT_TYPE);
  app.id = ELEMENT_ID;

  let parentElem = youtubeElem.parentElement;
  if (parentElem) parentElem.prepend(app);

  const musicLogoSrc = chrome.runtime.getURL(musicLogoDir);

  ReactDOM.render(<AddToPlayList musicLogo={musicLogoSrc} url={url} />, app);

  hasElement = true;
};

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

const addListenerToYoutubePage = (url) => {
  // Select the node that will be observed for mutations
  const divContainer = document.getElementsByTagName("body")[0];

  // Callback function to execute when mutations are observed
  const callback = function (mutationsList, observer) {
    const playerAdsElement = document.getElementById("player-ads");
    if (playerAdsElement) {
      console.log("found player ads element");
      injectElement(playerAdsElement, url);
      // You can stop observing
      observer.disconnect();
    }
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(divContainer, config);
};
