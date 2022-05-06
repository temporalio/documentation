import React from "react";
import ReactPlayer from "react-player";

function ResponsivePlayer({url, loop, playing}) {
  return (
    <div
      className="relative rounded-lg shadow-lg"
      // https://github.com/CookPete/react-player#responsive-player
      style={{position: "relative", paddingTop: "56.25%", marginBottom: 20}}
    >
      <ReactPlayer
        url={url}
        loop={loop}
        playing={playing}
        width="100%"
        height="100%"
        controls={true}
        style={{position: "absolute", top: 0, left: 0}}
      />
    </div>
  );
}

export default ResponsivePlayer;
