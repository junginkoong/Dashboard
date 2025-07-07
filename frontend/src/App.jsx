import './App.css'
import Homepage from './pages/homepage/Homepage'
import Header from './utils/Header'

function App() {

  return (
    <>
      <Header/>
      <div style={{maxWidth: "1280px", margin: "0 auto", padding: "2rem", textAlign: "center"}}>
        <Homepage />
      </div>
    </>
  )
}

export default App
