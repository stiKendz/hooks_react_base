import { useState } from 'react'

import ExternalAccess from './components/ExternalAccess'

function App() {
  return (
    <>
      <div className="external-access-base-container">
        <h1>Механизмы внешнего доступа и основы их использования</h1>
        <hr></hr>
        <h2>Основы механизмов внешнего доступа - useRefs</h2>
        <ExternalAccess />
      </div>
    </>
  )
}

export default App
