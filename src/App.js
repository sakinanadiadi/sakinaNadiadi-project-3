import "./App.css";
import axios from "axios";
import { useState } from "react";
import Result from "./Result";
import reel from "./reel.png";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Roll from "react-reveal/Roll";
import Footer from "./Footer";
// import RecentlyViewed from "./RecentlyViewed";
// import Slide from "react-reveal/Slide";

library.add(faTimes);

function App() {
  // 2... initialize state
  const [movieArray, setMovieArray] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [searchMovie, setSearchMovie] = useState("");

  const getResult = () => {
    const apiKey = "46db2b181f46bc95d47d6bc10ae9bd13";
    // 1.a.... using the axios library to make an API call
    const baseUrl = "https://api.themoviedb.org/3/search/movie";

    const targetMovies = searchMovie;
    console.log(targetMovies);

    axios({
      url: baseUrl,
      method: "GET",
      dataResponse: "json",
      params: {
        api_key: apiKey,
        query: userInput,
        include_adult: false,
      },
    })
      .then((responseData) => {
        setMovieArray(responseData.data.results);
      })
      .then(() => {
        setSearchMovie(userInput);
        setUserInput("");
      });
  };

  // Event listener for input change
  const inputHandleChange = (event) => {
    setUserInput(event.target.value);
  };

  // event listener for submit
  const handleSubmit = (event) => {
    event.preventDefault();
    getResult();
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
            return <Result movieObj={movieObj} key={movieObj.id} />;
          })}
        </section>

        <section className="viewedContainer">
          {/* <RecentlyViewed /> */}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
