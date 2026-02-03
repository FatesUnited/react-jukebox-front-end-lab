import { useState, useEffect } from 'react';
import './App.css';
import * as trackService from './services/trackService';
import TrackList from './components/TrackList/TrackList.jsx';
import TrackDetail from './components/TrackDetail/TrackDetail.jsx';
import TrackForm from './components/TrackForm/TrackForm.jsx';

const App = () => {
  const [tracks, setTracks] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const fetchedTracks = await trackService.index();

        if (fetchedTracks.err) {
          throw new Error(fetchedTracks.err);
        }

        setTracks(fetchedTracks);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTracks();
  }, [isFormOpen]);

  const handleSelect = (track) => {
    setSelected(track);
    setIsFormOpen(false);
  }

  const handleFormView = (track) => {
  if (track?._id) {
    setSelected(track);     // editing
  } else {
    setSelected(null);      // creating
  }
  setIsFormOpen(!isFormOpen);      // always open form
};

  const handleAddTrack = async (formData) => {
    try {
      const newTrack = await trackService.create(formData);
      
      if (newTrack.err) {
        throw new Error(newTrack.err);
      }
      
      setTracks([...tracks, newTrack]);
      setIsFormOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateTrack = async (formData, trackId) => {
    try {
      const updatedTrack = await trackService.update(formData, trackId);

      if (updatedTrack.err) {
        throw new Error(updatedTrack.err);
      }

      const updatedTracksList = tracks.map((track) => (
        track._id !== updatedTrack._id ? track : updatedTrack.track
      ));
      
      setTracks(updatedTracksList);
      
      setSelected(updatedTrack.track);
      setIsFormOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteTrack = async (trackId) => {
    try {
      const deletedTrack = await trackService.deleteTrack(trackId);
      
      if (deletedTrack.err) {
        throw new Error(deletedTrack.err);
      }
      
      setTracks(tracks.filter((track) => track._id !== deletedTrack.track._id));
      setSelected(null);
      setIsFormOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <TrackList 
        tracks={tracks} 
        handleSelect={handleSelect} 
        handleFormView={handleFormView}
        isFormOpen={isFormOpen}
        handleDeleteTrack={handleDeleteTrack}
      />

      {isFormOpen ? (
        <TrackForm 
          handleAddTrack={handleAddTrack} 
          selected={selected}
          handleUpdateTrack={handleUpdateTrack}
        />
      ) : (
        <TrackDetail 
          selected={selected} 
          handleFormView={handleFormView}
        />
      )}
    </>
  );
};

export default App;
