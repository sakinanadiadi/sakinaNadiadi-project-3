import "./App.css";
import { useState, useEffect } from "react";
import Result from "./Result";
import reel from "./images/reel.png";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Fade from "react-reveal/Roll";
import Footer from "./Footer";
import AddFavourite from "./AddFavourite";
import RemoveFavourities from "./RemoveFavourites";
import firebase from "./firebase";

library.add(faVideo);

function App() {
  //  initialize state to hold movies from API, userinput,search valur and favourites list.
  const [movieArray, setMovieArray] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [submitValue, setSubmitValue] = useState("");
  const [favourites, setFavourites] = useState([]);

  // Calling the API into the variable
  const getResult = async (movieSearch) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=46db2b181f46bc95d47d6bc10ae9bd13&query=${movieSearch}`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.results) {
      setMovieArray(responseJson.results);
    }
  };

  // Calling API (getResult) into useEffect
  useEffect(() => {
    getResult(submitValue);
  }, [submitValue]);

  // useEffect to store favourite movies into the state.
  useEffect(() => {
    const dbRef = firebase.database().ref();
    dbRef.on("value", (snapshot) => {
      const myData = snapshot.val();
      const newArray = [];
      for (let item in myData) {
        const movieList = {
          key: item,
          poster_path: myData[item].poster_path,
          title: myData[item].title,
          release_date: myData[item].release_date,
          overview: myData[item].overview,
          vote_average: myData[item].vote_average,
        };
        newArray.push(movieList);
      }
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

    if (userInput === "") {
      alert("Please enter a movie");
    }
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
          <Fade left>
            <h1> Filmy Studio</h1>
            <img src={reel} alt="some reel" />
          </Fade>

          <div className="form">
            <Fade right>
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
              </form>
            </Fade>
          </div>
        </div>

        <div className="headerPara">
          <Fade left>
            <p>
              One stop destination to get a collection of highly rated movies
              and TV shows, which you can add to your favourites.
            </p>
          </Fade>
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
            <Fade left>
              <h2>Favourites</h2>
            </Fade>
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
