import "./App.css";
import { useState, useEffect } from "react";
import Result from "./Result";
import reel from "./images/reel.png";
import clapperboard from "./images/clapperboard.png";
import { library } from "@fortawesome/fontawesome-svg-core";
// import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faVideo, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Roll from "react-reveal/Roll";
import Footer from "./Footer";
import AddFavourite from "./AddFavourite";
import RemoveFavourities from "./RemoveFavourites";
import firebase from "./firebase";

// import Slide from "react-reveal/Slide";

library.add(faTrash, faVideo, faHeart);
// library.add(faHeart);
// library.add(faVideo);

function App() {
  // 2... initialize state
  const [movieArray, setMovieArray] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [submitValue, setSubmitValue] = useState("");
  const [favourites, setFavourites] = useState([]);

  const getResult = async (movieSearch) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=46db2b181f46bc95d47d6bc10ae9bd13&query=${movieSearch}`;

    const response = await fetch(url);
    const responseJson = await response.json();
    console.log(responseJson);

    if (responseJson.results) {
      setMovieArray(responseJson.results);
    }
  };

  useEffect(() => {
    getResult(submitValue);
  }, [submitValue]);

  useEffect(() => {
    const dbRef = firebase.database().ref();
    dbRef.on("value", (snapshot) => {
      console.log(snapshot);
      const myData = snapshot.val();
      // console.log(myData);
      const newArray = [];
      for (let item in myData) {
        // console.log(myData[item].adult);

        const movieList = {
          key: item,
          poster_path: myData[item].poster_path,
          title: myData[item].title,
          release_date: myData[item].release_date,
          overview: myData[item].overview,
          vote_average: myData[item].vote_average,
        };
        // console.log(movieList);
        newArray.push(movieList);
      }
      // console.log(newArray);
      setFavourites(newArray);
    });
  }, []);

  // Event listener for input change
  const inputHandleChange = (event) => {
    setUserInput(event.target.value);
  };

  // event listener for submit
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitValue(userInput);
    setUserInput("");
  };

  // event listener for favourite movie

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    const dbRef = firebase.database().ref();
    dbRef.push(movie);
  };

  // Event listner for removing the favorite movie
  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.id !== movie.id
    );
    setFavourites(newFavouriteList);
    const dbRef = firebase.database().ref();
    dbRef.child(movie).remove();
  };

  return (
    <div className="App">
      <header>
        <div className="headerContainer">
          <Roll left>
            <h1> Filmy Studio</h1>
            <img src={reel} alt="some reel" />
          </Roll>

          <div className="form">
            <Roll right>
              <form action="#" onSubmit={handleSubmit}>
                <label htmlFor="search" className="sr-only"></label>
                <input
                  type="text"
                  id="search"
                  value={userInput}
                  onChange={inputHandleChange}
                  placeholder="Search for the movies"
                />
                <span>
                  <FontAwesomeIcon className="faicons, video" icon="video" />
                </span>
                <button>Search</button>
              </form>
            </Roll>
          </div>
        </div>

        <div className="headerPara">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis
            tempore commodi officia aliquam in veritatis saepe omnis perferendis
            excepturi cum!
          </p>
        </div>
      </header>

      <main>
        <section className="movieContainer">
          {movieArray.map((movieObj) => {
            return (
              <Result
                movieObj={movieObj}
                key={movieObj.id}
                handleFavouritesClick={addFavouriteMovie}
                favouriteComponent={AddFavourite}
              />
            );
          })}
        </section>

        <section>
          <div className="favouriteContainer">
            <Roll left>
              <h2>Favourites:</h2>
            </Roll>
          </div>

          <div className="movieContainer">
            {favourites.map((movieObj) => {
              const deferrerFunction = () => {
                removeFavouriteMovie(movieObj.key);
              };
              return (
                <Result
                  movieObj={movieObj}
                  key={movieObj.id}
                  handleFavouritesClick={deferrerFunction}
                  favouriteComponent={RemoveFavourities}
                />
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
