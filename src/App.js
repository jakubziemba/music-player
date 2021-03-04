import './styles/app.scss';

import { useRef, useState } from 'react';

import Library from './components/Library';
import Nav from './components/Nav';
import Player from './components/Player';
import Song from './components/Song';
import data from './data';

export default function App() {
  // State
  const [allSongs, setAllSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(allSongs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);

  const audioRef = useRef(null);

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    //Calculate Precentage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animationPercentage: animation,
    });
  };

  const songEndedHandler = async () => {
    let currentIndex = allSongs.findIndex((song) => song.id === currentSong.id);

    // Check if it's the last song in library and move to first song if true
    if (currentIndex === allSongs.length - 1) {
      await setCurrentSong(allSongs[0]);
    } else {
      await setCurrentSong(allSongs[currentIndex + 1]);
    }

    // Check if it's the first song in library and move to the last one if true
    if (currentIndex === 0) {
      await setCurrentSong(allSongs[allSongs.length - 1]);
    } else {
      await setCurrentSong(allSongs[currentIndex - 1]);
    }
    if (isPlaying) audioRef.current.play();
  };

  return (
    <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        allSongs={allSongs}
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        audioRef={audioRef}
        setCurrentSong={setCurrentSong}
        setAllSongs={setAllSongs}
      />
      <Library
        libraryStatus={libraryStatus}
        audioRef={audioRef}
        allSongs={allSongs}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setAllSongs={setAllSongs}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndedHandler}
      ></audio>
    </div>
  );
}
