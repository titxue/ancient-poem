import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div className="poem-container">
      <h1>静夜思</h1>
      <p className="author">李白</p>
      <div className="poem-content">
        <p>床前明月光，</p>
        <p>疑是地上霜。</p>
        <p>举头望明月，</p>
        <p>低头思故乡。</p>
      </div>
    </div>
  )
}

export default App
