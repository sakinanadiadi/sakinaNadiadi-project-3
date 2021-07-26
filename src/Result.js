function Result(props) {
  // console.log(props);

  const { title, overview, poster_path, release_date, vote_average } =
    props.movieObj;

    const setVoteClass = (vote) => {
      if(vote >= 8) {
        return "green";
      }else if (vote >= 6) {
        return "orange";
      }else {
        return "red";
      }
    };

  return (
    <div className="movie ">
          <div className="movieImage">
            <img
              src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
              alt={`Movie poster for ${title}`}
            />
            <p> {release_date} </p>
            <button>+</button>
          </div>

          <div className="movieInfo">
              <h3>{title}</h3>
              <span className={`tag ${setVoteClass(vote_average)}`}>{vote_average}</span>  
          </div>

          <div className="movieOver">
            <h2>Overview:</h2>
            <p>{overview}</p>
             <button>Add to watchlist</button>

          </div>
          
    </div>
  );
}

export default Result;
