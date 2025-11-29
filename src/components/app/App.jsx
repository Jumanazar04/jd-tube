import { Route, Routes } from 'react-router';
import './App.css'
import { Channal, Main, Navbar, Search, Video } from '..';


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/video/:id' element={<Video />} />
        <Route path='/channal/:id' element={<Channal />} />
        <Route path='/search' element={<Search />} />
      </Routes>
    </div>
  )
}

export default App
