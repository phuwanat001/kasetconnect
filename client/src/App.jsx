
import './App.css'
import Navbar from './components/Navbar'
import { Outlet } from "react-router-dom"

function App() {
  return (
    <>
        <Navbar />
        <main className="p-4">
        <Outlet /> {/* ส่วนที่จะแสดงหน้าจาก route.jsx */}
        </main>
    </>
  )
}

export default App
