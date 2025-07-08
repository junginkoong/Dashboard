import './App.css'
import Homepage from './pages/homepage/Homepage'
import Header from './utils/Header'

function App() {

  return (
    <>
      <Header/>
      <div style={{maxWidth: "100vw", padding: "2rem", textAlign: "center"}}>
        <Homepage />
      </div>
    </>
  )
}

export default App
