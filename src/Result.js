import React from "react";
import { useEffect, useState } from "react";
import firebase from "./firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Result(props) {
  const { title, overview, poster_path, release_date, vote_average } =
    props.movieObj;

  const [addWatch, setAddWatch] = useState("");

  useEffect(() => {
    const dbRef = firebase.database().ref();
    dbRef.on("value", (snapshot) => {
      const myData = snapshot.val();
      console.log(myData);
      const newArray = [];
      for (let item in myData) {
        console.log(item);

        const movieObjectList = {
          key: item,
          title: myData[item],
        };
        console.log(movieObjectList);
        newArray.push(movieObjectList);
      }
      console.log(newArray);
      setAddWatch(newArray);
    });
  }, []);

  const buttonTrigger = (keySubmit) => {
    console.log(keySubmit);
    // addWatch(keySubmit);
    const dbRef = firebase.database().ref();
    dbRef.push(addWatch);
  };

  const setVoteClass = (vote) => {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 6) {
      return "orange";
    } else {
      return "red";
    }
  };

  // Event listner to delete the movie
  // const deleteItem = (keyToDeleteMovie) => {
  //   console.log(keyToDeleteMovie);
  // };

  return (
    <div className="movie ">
      <div className="movieImage">
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={`Movie poster for ${title}`}
        />
        <span>
          <FontAwesomeIcon className="faicons" icon="times" />
        </span>
        <p> {release_date} </p>
      </div>

      <div className="movieInfo">
        <h3>{title}</h3>
        <span className={`tag ${setVoteClass(vote_average)}`}>
          {vote_average}
        </span>
      </div>

      <div className="movieOver">
        <h2>Overview:</h2>
        <p>{overview}</p>
        <button onClick={buttonTrigger}>Add to watchlist</button>
      </div>
    </div>
  );
}

export default Result;
