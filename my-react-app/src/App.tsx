import AppCart from './Components/File/AppCart'
import backgroundImage from './assets/background.avif'
import Navbar from './Components/File/NavBar'
import NotePage from './Components/File/Note'
import { useApp } from './Context'


import './App.css'

function App() {
  const { shownote } = useApp()

  return (
      <div className="App" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <Navbar />
        {shownote ? <NotePage /> : <AppCart />}
      </div>
  
  )
}

export default App
