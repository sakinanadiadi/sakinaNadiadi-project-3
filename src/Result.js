function Result(props) {
  // console.log(props);

  const { title, overview, poster_path, release_date, vote_average } =
    props.movieObj;

  return (
    <div className="mainResult">
      <div className="movieResult">
        <div className="resultImage">
          <img
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            alt={`Movie poster for ${title}`}
          />
        </div>
        <div className="resultDeatils">
          <h2>{title}</h2>
          <ul>
            <li>{release_date}</li>
            <li>{vote_average}</li>
            <li>{overview}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Result;
