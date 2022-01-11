/* The following comment is needed for the build to succeed */
/*global chrome*/

import { useEffect, useState } from "react";
import { songs } from "./mockData";
import "./styles.css";

const FunPopup = () => {
  const [playlist, setPlaylist] = useState([]);
  const funLogoSrc = process.env.PUBLIC_URL + "/icons/music-logo.png";
  const rrLogoSrc = process.env.PUBLIC_URL + "/icons/rr-logo-white.svg";
  const githubLogoSrc = process.env.PUBLIC_URL + "/icons/github-logo-white.svg";

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
    <div>
      <div className="fun-header d-flex" id="fun-header">
        <div className="me-auto">My Youtube Playlist</div>

        <div>
          <a
            href="https://romantic-fibula-b7b.notion.site/React-Google-Chrome-Extension-for-beginners-or-not-Final-df8567b3dc774744aff44385a18c289a"
            target="_blank"
            rel="noreferrer"
          >
            <img className="fun-footer-logo" src={rrLogoSrc} alt="Blog" />
          </a>
          <a
            href="https://github.com/anamargaridasousa9/my-extension/tree/hooks"
            target="_blank"
            rel="noreferrer"
          >
            <img className="fun-footer-logo" src={githubLogoSrc} alt="Github" />
          </a>
        </div>
      </div>
      <div className="fun-body">
        <div>
          {playlist.map((song, index) => (
            <a
              key={index}
              href={song.url}
              className="fun-list-group text-start btn btn-light mb-1"
              target="_blank"
              rel="noreferrer"
            >
              <img className="fun-logo" src={funLogoSrc} alt="Fun Logo" />
              {song.name}
            </a>
          ))}
        </div>
      </div>
      <div id="fun-footer" className="fun-footer text-center">
        React GCE Tutorial 2022
      </div>
    </div>
  );
};

export default FunPopup;
