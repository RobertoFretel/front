import { useState, useRef, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

// Componenti per le pagine
const ClientPage = () => {
  const [ image, setImage ] = useState<string>('')
  const imageElement = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const ws = new WebSocket('ws://sir-project-75ae1df03f75.herokuapp.com/ws')
    
    ws.onopen = () => {
      console.log('Connessione a WebSocket stabilita')
    }

    ws.onclose = () => {
      console.log('Connessione a WebSocket chiusa')
    }

    ws.onmessage = (event) => {
      const url = URL.createObjectURL(event.data)
      console.log(url)
      setImage(url)

      console.log(event.data)
    }
  }, [])

  return <>
    <img src={image} ref={imageElement} alt="image" />
    <button onClick={() => {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else if (imageElement.current) {
        imageElement.current.requestFullscreen()
      }
    }}>
      fullscreen
    </button>
  </>
}

const AdminPage = () => {
  const ws = new WebSocket('ws://sir-project-75ae1df03f75.herokuapp.com/ws')
  
  useEffect(() => {
    ws.onopen = () => {
      console.log('Connessione a WebSocket stabilita')
    }
  }, [])
  
  return <>
    <button onClick={() => ws.send('show_image')}>
      send image
    </button>
    <button onClick={() => ws.send('show_image2')}>
      send image2
    </button>
    <button onClick={() => ws.send('show_image3')}>
      send image3
    </button>
  </>
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/client" element={<ClientPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/" element={<>
          <button><Link to="/client">Client</Link></button>
          <button><Link to="/admin">Admin</Link></button>
        </>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
