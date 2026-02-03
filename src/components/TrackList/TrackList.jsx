const TrackList = (props) => {
  return (
    <div>
      <h1>Track List</h1>
      <button onClick={props.handleFormView}>
        {props.isFormOpen ? 'Close Form' : 'New Track'}
      </button>
      <div>
        {!props.tracks.length ? (
            <h2>No Tracks!</h2>
        ) : (
            <ul>
                {props.tracks.map((track) => (
                    <li 
                        key={track._id}
                    >
                    <strong>{track.title}</strong> by {track.artist}
                    <div>
                        <button onClick={() => props.handleSelect(track)}>
                            Play
                        </button>
                        <button onClick={() => props.handleFormView(track)}>
                            Edit
                        </button>
                        <button onClick={() => props.handleDeleteTrack(track._id)}>
                            Delete
                        </button>
                    </div>
                    </li>
                ))}
            </ul>
        )}
      </div>
    </div>
  );
};

export default TrackList;
