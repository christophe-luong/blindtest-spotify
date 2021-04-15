/*global swal*/

import React from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';
import { useState } from 'react';
import { useEffect } from 'react';

const apiToken = 'BQCcNXGH1TBtCV15wfzFPg3MRWfyR3qoJtRGAgoBEyKN7bgIYxijsFnvbD1t4tS48-mdc6W7IdVTlWL-ohjA4yItd7uMp5jKrQdhBrC3Bs6ScAE2UgUl3AhnoNCoAZ2L-ARfrrd3T5C7vhdam0jXUV8DGFfkWHoRK42Nq5U7Oou4foek'

function shuffleArray(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = getRandomNumber(counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x, ...targets) {
  let res = Math.floor(Math.random() * x);
  while (targets.includes(res)) {
    res = Math.floor(Math.random() * x);
  }
  return res;
}

const AlbumCover = ({track}) => {
  const src = track.album.images[0].url;
  return (
    <img src={src} style={{ width: 400, height: 400 }}/>
  );
}

const App = () => {
  const [tracks, setTracks] = useState();
  const [songsLoaded, setSongsLoaded] = useState(false);
  const [randomIndex, setRandomIndex] = useState(0);

  useEffect(() => {
  
    fetch('https://api.spotify.com/v1/me/tracks', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + apiToken,
      },
    })
  
    .then(response => response.json())
    .then((data) => {
      console.log("Réponse reçue ! Voilà ce que j'ai reçu : ", data);
      setTracks(data.items); // Load tracks in data
      setSongsLoaded(true); // Loading done
      setRandomIndex(getRandomNumber(data.items.length));
    })

  }, []);

  if (!songsLoaded) {
    // Loading Page
    return (
      <div className="App">
        <img src={loading} className="App-logo" alt="loading"/>
      </div>
    )
  }

  const track0 = tracks[randomIndex].track;
  const secondIndex = getRandomNumber(tracks.length, randomIndex);
  const track1 = tracks[secondIndex].track;
  const track2 = tracks[getRandomNumber(tracks.length, randomIndex, secondIndex)].track;
  const shuffledTracks = shuffleArray([track0, track1, track2]);

  const checkAnswer = (trackId) => {
    if (trackId === tracks[randomIndex].track.id) {
      swal('Bravo', 't tro for', 'success');
    }
    else {
      swal('Raté', 'retente pa', 'error');
    }
  }

  // Home Page
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="App-title">Bienvenue sur le Blindtest</h1>
      </header>
      <div className="App-images">
        <p>On va faire un giga Blindtest avec Juannes Enigma Tourdes !</p>
        <AlbumCover track={tracks[randomIndex].track}/>
        <Sound url={tracks[randomIndex].track.preview_url} playStatus={Sound.status.PLAYING}/>
      </div>
      <div className="App-buttons">
        {
          shuffledTracks.map(track => (
            <Button onClick={() => checkAnswer(track.id)} key={track.id}>
              {track.name}
            </Button>
            )
          )
        }
      </div>
    </div>
  );
}

export default App;
