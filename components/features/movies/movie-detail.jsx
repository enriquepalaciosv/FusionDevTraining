/*  /components/features/movies/movie-detail.jsx  */

/* React */
import React, { Component } from 'react'

class MovieDetail extends Component {
  constructor (props) {
    super(props)
    this.state = { isPlotShown: false }
  }

  togglePlot () {
    this.setState(({ isPlotShown }) => ({ isPlotShown: !isPlotShown }))
  }

  render () {
    const { isPlotShown } = this.state

    const plotButton = (
      <button onClick={this.togglePlot.bind(this)}>
        {isPlotShown ? 'Hide Plot' : 'Show Plot'}
      </button>
    )

    const Plot = 'Lorem ipsum'

    return (
      <div className='movie-detail col-sm-12 col-md-8'>
        <h1>Jurassic Park</h1>
        <p><strong>Director:</strong> Steven Spielberg</p>
        <p><strong>Actors:</strong> Sam Neill, Laura Dern, Jeff Goldblum, Richard Attenborough</p>
        <p><strong>Plot:</strong> {isPlotShown && Plot} {plotButton}</p>
        <p><strong>Rated:</strong> PG-13</p>
        <p><strong>Writer:</strong> Michael Crichton (novel), Michael Crichton (screenplay), David Koepp (screenplay)</p>
        <p><strong>Year:</strong> 1993</p>
        <img src='https://m.media-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_SX300.jpg' alt={`Poster for Jurassic Park`} />
      </div>
    )
  }
}

MovieDetail.label = 'Movie Detail'

export default MovieDetail
