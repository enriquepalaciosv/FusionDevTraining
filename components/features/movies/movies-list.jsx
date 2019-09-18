import Consumer from 'fusion:consumer'
import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types';

@Consumer
class MovieList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      movies: []
    };
    this.fetch(props);
  }

  fetch (props) {
    this.fetchContent({
      movies: {
        source: 'movie-search', 
        query: { movieQuery: props.customFields.movieQuery }, 
        filter: '{ totalResults Search { Title Year Poster } }'
      }
    })
  }

  render () {
    if (this.state.movies && this.state.movies.Search && this.state.movies.Search.length > 0) {
      const movies = this.state.movies.Search
      return (
        <Fragment>
          <h2>Movies</h2>
          <div>
            {movies && movies.map((movie, idx) =>
              <div key={`movie-${idx}`}>
                {this.props.customFields.showTitle 
                  ? <h4>{movie.Title}</h4>  
                  : null
                }
                <p><strong>Year:</strong> {movie.Year}</p>
                <img src={movie.Poster} />
              </div>
            )}
          </div>
        </Fragment>
      )
    }
    return null;
  }
}

MovieList.propTypes = {
  customFields: PropTypes.shape({
    movieQuery: PropTypes.string,
    showTitle: PropTypes.bool,
  })
};

export default MovieList

