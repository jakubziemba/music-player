import LibrarySong from './LibrarySong';

export default function Library({
  allSongs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setAllSongs,
  libraryStatus,
}) {
  return (
    <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
      <h2>Library</h2>
      <div className='library-songs'>
        {allSongs.map((song) => (
          <LibrarySong
            audioRef={audioRef}
            key={song.id}
            song={song}
            allSongs={allSongs}
            setCurrentSong={setCurrentSong}
            isPlaying={isPlaying}
            setAllSongs={setAllSongs}
            id={song.id}
          />
        ))}
      </div>
    </div>
  );
}
