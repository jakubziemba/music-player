import {
  faAngleLeft,
  faAngleRight,
  faPause,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Player({
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  allSongs,
  setCurrentSong,
  setAllSongs,
}) {
  const activeLibraryHandler = (nextPrev) => {
    const newSongs = allSongs.map((song) => {
      if (song.id === nextPrev.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setAllSongs(newSongs);
  };

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipTrackHandler = async (direction) => {
    let currentIndex = allSongs.findIndex((song) => song.id === currentSong.id);

    if (direction === 'skip-forward') {
      // Check if it's the last song in library and move to first song if true
      if (currentIndex === allSongs.length - 1) {
        await setCurrentSong(allSongs[0]);
        activeLibraryHandler(allSongs[0]);
      } else {
        await setCurrentSong(allSongs[currentIndex + 1]);
        activeLibraryHandler(allSongs[currentIndex + 1]);
      }
    }

    if (direction === 'skip-back') {
      // Check if it's the first song in library and move to the last one if true
      if (currentIndex === 0) {
        await setCurrentSong(allSongs[allSongs.length - 1]);
        activeLibraryHandler(allSongs[allSongs.length - 1]);
      } else {
        await setCurrentSong(allSongs[currentIndex - 1]);
        activeLibraryHandler(allSongs[currentIndex - 1]);
      }
    }
    if (isPlaying) audioRef.current.play();
  };

  //Add the styles

  const trackAnimation = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  return (
    <div className='player'>
      <div className='time-control'>
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          className='track'
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
        >
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            type='range'
            onChange={dragHandler}
          />
          <div className='animate-track' style={trackAnimation}></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
      </div>
      <div className='play-control'>
        <FontAwesomeIcon
          onClick={() => skipTrackHandler('skip-back')}
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
          onClick={() => skipTrackHandler('skip-forward')}
          className='skip-forward'
          icon={faAngleRight}
          size='2x'
        />
      </div>
    </div>
  );
}
