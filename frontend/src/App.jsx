import Comander from "./components/Comander/Comander"
import Footer from "./components/Footer/Footer"
import Navbar from "./components/Navbar/Navbar"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Report from "./components/Report/Report"
import File from "./components/File/File"

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Comander/>} />
        <Route exact path="/Files" element={<File/>} />
        <Route exact path="/reports" element={<Report/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
