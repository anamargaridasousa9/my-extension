/* The following comment is needed for the build to succeed */
/*global chrome*/

import React from "react";

function buttonClassState(videoName) {
  let disabled = "";

  if (!videoName) {
    disabled = " fun-gce-disabled";
  }

  return "fun-gce-box fun-gce-button" + disabled;
}

class AddToPlayList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoName: "",
      url: this.props.url,
    };
  }

  handleNameChange(event) {
    this.setState({ videoName: event.target.value });
  }

  addSongToPlayList() {
    if (this.state.videoName) {
      const { videoName, url } = this.state;

      chrome.storage.local.get({ funSongs: [] }, function (result) {
        var funSongs = result.funSongs;
        funSongs.push({ name: videoName, url: url });

        chrome.storage.local.set({ funSongs: funSongs });
      });

      this.setState({ videoName: "" });
    }
  }

  render() {
    const { musicLogo } = this.props;
    const { videoName } = this.state;

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
                onChange={(e) => this.handleNameChange(e)}
              />
            </div>
            <button
              class={buttonClassState(videoName)}
              onClick={() => this.addSongToPlayList()}
            >
              Add video to My playlist
            </button>
          </div>
        </div>
        <br />
      </>
    );
  }
}

export default AddToPlayList;
