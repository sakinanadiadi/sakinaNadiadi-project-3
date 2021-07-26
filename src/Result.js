function Result(props) {
  // console.log(props);

  const { title, overview, poster_path, release_date, vote_average } =
    props.movieObj;

  return (
    <div className="movie ">
            <img
              src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
              alt={`Movie poster for ${title}`}
            />
            <div className="movieInfo">
            <h3>{title}</h3>
          {release_date}
          <span>{vote_average}</span>
          {overview}
          </div>
    </div>
  );
}

export default Result;
