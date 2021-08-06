/* The following comment is needed for the build to succeed */
/*global chrome*/

import React from "react";

class FunPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
    };

    this.getSongsFromStorage = this.getSongsFromStorage.bind(this);
  }

  componentDidMount() {
    chrome.storage.local.get(
      { funSongs: [] },
      function (result) {
        this.getSongsFromStorage(result.funSongs);
      }.bind(this)
    );
  }

  getSongsFromStorage(reply) {
    this.setState({ songs: reply });
  }

  render() {
    const funLogoSrc = process.env.PUBLIC_URL + "/icons/music-logo.png";
    const { songs } = this.state;

    return (
      <div className="card border-secondary">
        <div className="card-header text-center" id="fun-header">
          <h5>My youtube playlist</h5>
        </div>
        <div className="card-body">
          <div className="list-group">
            {songs.map((song, index) => (
              <a
                key={index}
                href={song.url}
                className="list-group-item list-group-item-action list-group-item-danger me-auto"
                target="_blank"
                rel="noreferrer"
                style={{ height: "100%" }}
              >
                <img
                  style={{ width: "20px" }}
                  src={funLogoSrc}
                  alt="Fun Logo"
                />
                {song.name}
              </a>
            ))}
          </div>
        </div>
        <div id="fun-footer" className="card-footer text-center">
          <a
            href="https://romantic-fibula-b7b.notion.site/React-Google-Chrome-Extension-for-beginners-or-not-Onboarding-92da8245f8234e1bb44abf7a6e90405c"
            className="text-muted"
            target="_blank"
            rel="noreferrer"
          >
            React GCE Tutorial 2021
          </a>
        </div>
      </div>
    );
  }
}

export default FunPopup;
