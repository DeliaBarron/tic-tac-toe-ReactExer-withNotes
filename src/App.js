import React from 'react'
import Game from './components/Game'
import background from '../src/img/planets.png'

const App = () => {
  return (
    <div className='img-fluid' style={{ backgroundImage:`url(${background})` }}>
      <Game />
    </div>
  )
}

export default App