/* The following comment is needed when using the chrome api, for the build to succeed */
/*global chrome*/

import { useEffect, useState } from "react";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import { songs } from "../values";
import "../styles.css";

const FunPopup = () => {
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    if (chrome.storage) {
      chrome.storage.local.get({ funSongs: [] }, function (result) {
        setPlaylist(result.funSongs);
      });
    } else {
      setPlaylist(songs);
    }
  }, []);

  return (
    <div className="fun-font">
      <Header />
      <Body playlist={playlist} />
      <Footer />
    </div>
  );
};

export default FunPopup;
