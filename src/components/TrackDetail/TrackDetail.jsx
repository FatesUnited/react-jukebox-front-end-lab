const TrackDetail = (props) => {
    if (!props.selected) {
        return (
            <div>
                {/* <h1>NO TRACK SELECTED</h1> */}
            </div>
        );
    };

    return (
        <div>
            <h3>Now Playing:</h3>
            <h3>Title: {props.selected.title}</h3>
            <h3>Artist: {props.selected.artist}</h3>
        </div>
    );
};

export default TrackDetail;