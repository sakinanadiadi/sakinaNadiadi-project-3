import "./App.css";
import { useState, useEffect } from "react";
import Result from "./Result";
import reel from "./reel.png";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import Roll from "react-reveal/Roll";
import Footer from "./Footer";
import AddFavourite from "./AddFavourite";
import RemoveFavourities from "./RemoveFavourites";
import firebase from "./firebase";

// import RecentlyViewed from "./RecentlyViewed";
// import Slide from "react-reveal/Slide";

library.add(faTrash);
library.add(faHeart);

function App() {
  // 2... initialize state
  const [movieArray, setMovieArray] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [favourites, setFavourites] = useState([]);

  const getResult = async (userInput) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=46db2b181f46bc95d47d6bc10ae9bd13&query=${userInput}`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.results) {
      setMovieArray(responseJson.results);
    }
  };

  useEffect(() => {
    getResult(userInput);
  }, [userInput]);

  useEffect(() => {
    const dbRef = firebase.database().ref();
    dbRef.on("value", (snapshot) => {
      console.log(snapshot);
      const myData = snapshot.val();
      console.log(myData);
      const newArray = [];
      for (let item in myData) {
        // console.log(item);

        const movieList = {
          key: item,
          image: myData[item],
        };
        // console.log(movieList);
        newArray.push(movieList);
      }
      console.log(newArray);
      setFavourites(newArray);
    });
  }, []);

  // Saving things on the page
  // const saveToLocalStorage = (items) => {
  //   localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  // };

  // Event listener for input change
  const inputHandleChange = (event) => {
    setUserInput(event.target.value);
  };

  // event listener for submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const dbRef = firebase.database().ref();
    dbRef.push(userInput);
    setUserInput("");
  };

  // event listener for favourite movie

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    // saveToLocalStorage(newFavouriteList);
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
            <h1>Filmy</h1>
          </Roll>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <img src={reel} alt="some reel" />
        </div>
        <div className="form">
          <Roll right>
            <form action="#" onSubmit={handleSubmit}>
              <label htmlFor="search" className="sr-only"></label>
              <input
                type="text"
                id="search"
                value={userInput}
                onChange={inputHandleChange}
                placeholder="search for the movie or tv shows"
              />
              <button>Search</button>
            </form>
          </Roll>
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
