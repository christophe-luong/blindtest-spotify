/*global swal*/
import products from "./products"
import React from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';
import { useState } from 'react';
import { useEffect } from 'react';

const apiToken =
	'BQCcNXGH1TBtCV15wfzFPg3MRWfyR3qoJtRGAgoBEyKN7bgIYxijsFnvbD1t4tS48-mdc6W7IdVTlWL-ohjA4yItd7uMp5jKrQdhBrC3Bs6ScAE2UgUl3AhnoNCoAZ2L-ARfrrd3T5C7vhdam0jXUV8DGFfkWHoRK42Nq5U7Oou4foek';

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
	let randomNumber = Math.floor(Math.random() * x);
	while (targets.includes(randomNumber)) {
		randomNumber = Math.floor(Math.random() * x);
	}
	return randomNumber;
}

const AlbumCover = ({ track }) => {
	const albumCoverUrl = track.album.images[0].url;
	return <img src={albumCoverUrl} style={{ width: 400, height: 400 }} />;
};

const App = () => {
	const [ tracks, setTracks ] = useState();
	const [ songsLoaded, setSongsLoaded ] = useState(false);
	const [ randomIndex, setRandomIndex ] = useState(0);

	// useEffect(() => {
	// 	fetch('https://api.spotify.com/v1/me/tracks', {
	// 		method: 'GET',
	// 		headers: {
	// 			Authorization: 'Bearer ' + apiToken
	// 		}
	// 	})
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			console.log("Réponse reçue ! Voilà ce que j'ai reçu : ", data);
	// 			setTracks(data.items); // Load tracks in data
	// 			setSongsLoaded(true); // Loading done
	// 			setRandomIndex(getRandomNumber(data.items.length));
	// 		});
	// }, []);

	useEffect(async () => {
		const response = await fetch('https://api.spotify.com/v1/me/tracks', {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + apiToken
			}
		});

		// const data = await response.json()
		// const items = data.items
		const { items } = await response.json();

		console.log("Réponse reçue ! Voilà ce que j'ai reçu : ", items);
		setTracks(items); // Load tracks in 		
    setSongsLoaded(true); // Loading done
		setRandomIndex(getRandomNumber(items.length));
	}, []);

	if (!songsLoaded) {
		// Loading Page
		return (
			<div className="App">
				<img src={loading} className="App-logo" alt="loading" />
			</div>
		);
	}
  const shuffledTracks = new Array(3)
	shuffledTracks[0] = tracks[randomIndex].track;
	const secondIndex = getRandomNumber(tracks.length, randomIndex);
	shuffledTracks[1] = tracks[secondIndex].track;
  // suffledTracks['1']
	shuffledTracks[2] = tracks[getRandomNumber(tracks.length, randomIndex, secondIndex)].track;
	shuffleArray(shuffledTracks);
  products.push({})

  // const a = {}
  // function getJson() {
  //   return 'json'
  // }
  // a.json
  // a[getJson()]
  // a?.json ?? b
  // a.items // but items is undefined
  // a?.items ?? b
  // const value = data?.items[0]
  // if (data.items.length) {
  //   value = ""
  // }
  // const value = data?.items[0] ?? ""

  // const i = 0
  // setState(i++)
  
  // response.json()
  // response['json']()
  // const hash = {}
  // hash['json'] = () => console.log("coucou")
  // hash['json']()
  // hash.json()

  // products[productId] = {}

	const checkAnswer = (trackId) => {
		if (trackId === tracks[randomIndex].track.id) {
			swal('Bravo', 't tro for', 'success');
		} else {
			swal('Raté', 'retente pa', 'error');
		}
	};

  function title() {
    return <h1>coucou</h1>
  }

	// Home Page
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<h1 className="App-title">Bienvenue sur le Blindtest</h1>
			</header>
			<div className="App-images">
				<p>On va faire un giga Blindtest avec Juannes Enigma Tourdes !</p>
				<AlbumCover track={tracks[randomIndex].track} />
				<Sound url={tracks[randomIndex].track.preview_url} playStatus={Sound.status.PLAYING} />
			</div>
      {title()}
			<div className="App-buttons">
				{shuffledTracks.map((track) => (
					<Button onClick={() => checkAnswer(track.id)} key={track.id}>
						{track.name}
					</Button>
				))}
			</div>
		</div>
	);
};

export default App;
