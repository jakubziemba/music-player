import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';

export default function Player({
  currentSong,
  isPlaying,
  setIsPlaying,
}) {
  const [songInfo, setSongInfo] = useState({
    currentTime: null,
    duration: null,
  });

  const audioRef = useRef(null);
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
    });
  };

  return (
    <div className='player'>
      <div className='time-control'>
        <p>Start Time</p>
        <input type='range' />
        <p>End Time</p>
      </div>
      <div className='play-control'>
        <FontAwesomeIcon
          className='skip-back'
          icon={faAngleLeft}
          size='2x'
        />
        {isPlaying ? (
          <FontAwesomeIcon
            onClick={playSongHandler}
            className='pause'
            icon={faPause}
            size='2x'
          />
        ) : (
          <FontAwesomeIcon
            onClick={playSongHandler}
            className='play'
            icon={faPlay}
            size='2x'
          />
        )}
        <FontAwesomeIcon
          className='skip-forward'
          icon={faAngleRight}
          size='2x'
        />
      </div>
      <audio
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
}
