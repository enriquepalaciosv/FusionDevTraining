/*  /components/features/movies/movie-list.jsx  */

import Consumer from 'fusion:consumer'
import React, { Fragment, Component } from 'react'

@Consumer
class MovieList extends Component {
  constructor (props) {
    super(props);
    this.state = { movies: { list: [] }};
    this.fetch();
  }

  fetch () {
    this.fetchContent({
      movies: {
        source: 'movie-search', 
        query: { movieQuery: 'Jurassic' }, 
        filter: '{ totalResults Search { Title Year Poster } }'
      }
    })
  }


  render () {
    const { list: movies } = this.state.movies
    return (
      <Fragment>
        <h2>Movies</h2>
        <div>
          {movies && movies.map((movie, idx) =>
            <div key={`movie-${idx}`}>
              <h4>{movie.Title}</h4>
              <p><strong>Year:</strong> {movie.Year}</p>
              <img src={movie.Poster} />
            </div>
          )}
        </div>
      </Fragment>
    )
  }
}

export default MovieList
