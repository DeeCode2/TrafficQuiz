import { useState } from 'react'
import {Route, Routes} from "react-router-dom";
import './App.scss'

import Homescreen from './Homescreen'
import Questions from './Questions';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' element={<Homescreen/>}/>
      <Route path='/questions' element={<Questions/>}/>
    </Routes>
  )
}

export default App
