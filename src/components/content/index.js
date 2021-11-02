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
      <div className="fun-gce-card">
        <div className="fun-gce-container">
          <div className="fun-gce-d-flex">
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
              placeholder="Video name"
              className="fun-gce-box fun-gce-input"
              value={videoName}
              onChange={(e) => handleNameChange(e)}
            />
          </div>
          <button
            className={classNames([
              "fun-gce-box fun-gce-button",
              !videoNameTrim && " fun-gce-disabled",
            ])}
            onClick={() => addSongToPlayList()}
          >
            Add video to My playlist
          </button>
        </div>
      </div>
      <br />
    </>
  );
};

export default AddToPlayList;
