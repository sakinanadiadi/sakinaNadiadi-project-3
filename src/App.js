import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Result from "./Result";

function App() {
  // 2... initialize state
  const [movieArray, setMovieArray] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [searchMovie, setSearchMovie] = useState("Titan");

  // 2.a... const artArray =[]
  // 2.b...setArtArray is a function that updates the artArray variable state
  // 1... Running the API CALL once on component mount

  useEffect(() => {
    const apiKey = "46db2b181f46bc95d47d6bc10ae9bd13";
    const targetMovie = searchMovie;
    // 1.a.... using the axios library to make an API call
    const baseUrl = "https://api.themoviedb.org/3/search/movie?";

    axios({
      url: baseUrl + userInput,
      method: "GET",
      dataResponse: "json",
      params: {
        api_key: apiKey,
        query: targetMovie,
        include_adult: false,
      },
    }).then((responseData) => {
      console.log(responseData.data.results);
      setMovieArray(responseData.data.results);
    });
  }, [searchMovie]);

  // const query = userInput;
  // console.log(userInput);

  // Event listener for input change
  const inputHandleChange = (event) => {
    setUserInput(event.target.value);
    console.log(event.target.value);
  };

  // event listener for submit
  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchMovie(userInput);
    setUserInput("");
  };

  return (
    <div className="App">
      <header>
        <h1>Moviessss</h1>
        <p>Some text realated to App!</p>
      </header>
      <section className="form">
        <form action="#" onSubmit={handleSubmit}>
          <label htmlFor="search" className="sr-only"></label>
          <input
            type="text"
            id="search"
            // name="query"
            value={userInput}
            onChange={inputHandleChange}
            placeholder="search for the movie or tv shows"
          />
        </form>
      </section>
      <main>
      
        {movieArray.map((movieObj) => {
          return <Result movieObj={movieObj} key={movieObj.id} />;
        })}
      </main>
    </div>
  );
}

export default App;
