export default function LibrarySong({
  allSongs,
  song,
  setCurrentSong,
  audioRef,
  isPlaying,
  setAllSongs,
  id,
}) {
  const songSelectHandler = async () => {
    await setCurrentSong(song);
    //Add Active State
    const newSongs = allSongs.map((song) => {
      if (song.id === id) {
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
    await setAllSongs(newSongs);
    // Check if the song is playing

    if (isPlaying) audioRef.current.play();
  };
  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.active ? 'selected' : ''}`}
    >
      <img src={song.cover} alt={`${song.name} Album Cover`}></img>
      <div className='song-description'>
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
}
