export default function Song({ currentSong }) {
  return (
    <div className='song-container'>
      <img src={currentSong.cover} alt={`${currentSong.name} Album Cover`} />
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
}
