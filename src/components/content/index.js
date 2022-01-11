/* The following comment is needed for the build to succeed */
/*global chrome*/

import { useState } from "react";
import classNames from "classnames";

const AddToPlayList = ({ url, musicLogo }) => {
  const [videoName, setVideoName] = useState("");
  const videoNameTrim = videoName.trim(); //Removes whitespace from the beginning and end of the videoName string

  const handleNameChange = (event) => {
    setVideoName(event.target.value);
  };

  const addSongToPlayList = () => {
    if (videoNameTrim) {
      chrome.storage.local.get({ funSongs: [] }, function (result) {
        var funSongs = result.funSongs;
        funSongs.push({ name: videoNameTrim, url: url });

        chrome.storage.local.set({ funSongs: funSongs });
      });

      setVideoName("");
    }
  };

  return (
    <>
      <div className="fun-gce-card fun-font">
        <div className="fun-gce-container fun-gce-d-flex fun-gce-align-center">
          <div className="fun-gce-d-flex fun-gce-align-center fun-gce-video">
            <div className="fun-gce-me-auto">
              <img
                className="fun-small-logo fun-gce-me-auto"
                src={musicLogo}
                alt="Music Logo"
              />
            </div>
            <input
              type="text"
              name="videoName"
              placeholder="Insert video name here..."
              className="fun-gce-input"
              value={videoName}
              onChange={(e) => handleNameChange(e)}
            />
          </div>
          <div>
            <button
              className={classNames([
                "fun-gce-button",
                !videoNameTrim && "fun-gce-disabled",
              ])}
              onClick={() => addSongToPlayList()}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <br />
    </>
  );
};

export default AddToPlayList;
