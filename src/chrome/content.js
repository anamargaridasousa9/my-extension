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
  const app = document.createElement(ELEMENT_TYPE);
  app.id = ELEMENT_ID;

  let youtubeElem = document.getElementById(PLAYER_ADS_ID);
  while (!youtubeElem) {
    youtubeElem = document.getElementById(PLAYER_ADS_ID);
  }
  var parentElem = youtubeElem.parentElement;
  if (parentElem) parentElem.prepend(app);

  const musicLogoSrc = chrome.runtime.getURL(musicLogoDir);

  ReactDOM.render(<AddToPlayList musicLogo={musicLogoSrc} url={url} />, app);

  hasElement = true;
};
