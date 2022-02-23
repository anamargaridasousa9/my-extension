import "../../styles.css";

const Body = ({ playlist }) => {
  const funLogoSrc = process.env.PUBLIC_URL + "/icons/music-logo.png";

  return (
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
  );
};

export default Body;
