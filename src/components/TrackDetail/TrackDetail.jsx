const TrackDetail = (props) => {
    if (!props.selected) {
        return (
            <div>
                <h1>NO TRACK SELECTED</h1>
            </div>
        );
    };

    return (
        <div>
            <h1>{props.selected.title}</h1>
            <h2>by {props.selected.artist}</h2>
        </div>
    );
};

export default TrackDetail;