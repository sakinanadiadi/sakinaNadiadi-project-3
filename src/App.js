import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Search from "./Search";

function App() {
  // 2... initialize state
  const [artArray, setArtArray] = useState([]);
  // 2.a... const artArray =[]
  // 2.b...setArtArray is a function that updates the artArray variable state
  // 1... Running the API CALL once on component mount
  useEffect(() => {
    const apiKey = "d3T6aBXi";
    // 1.a.... using the axios library to make an API call
    axios({
      url: "https://www.rijksmuseum.nl/api/en/collection",
      method: "GET",
      dataResponse: "json",
      params: {
        key: apiKey,
        format: "json",
        imgonly: true,
        q: "da vinci",
      },
    }).then((responseData) => {
      console.log(responseData.data.artObjects);

      // 3.... Calling setArtArray to display our call
      // Once we get the data back, we want to update our state that holds the data, so we can use it ouu JSX

      setArtArray(responseData.data.artObjects);
    });
  }, []);

  return (
    <div className="App">
      <h1>Find Some Movie</h1>
      <Search />
    </div>
  );
}

export default App;
