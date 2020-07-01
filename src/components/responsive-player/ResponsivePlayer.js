import React from 'react';
import ReactPlayer from 'react-player';

import styles from './ResponsivePlayer.module.css';

function ResponsivePlayer({ url }) {
  return (
    <div className={styles.playerWrapper}>
      <ReactPlayer
        className={styles.player}
        url={url}
        width="100%"
        height="100%"
      />
    </div>
  );
}

export default ResponsivePlayer;
