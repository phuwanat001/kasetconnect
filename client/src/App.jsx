
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Outlet } from "react-router-dom"
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
    <div className='flex flex-col min-h-screen'>
        <Navbar />
        <main className="flex-grow">
        <Outlet />
        </main>
        <Footer />
    </div>
    </AuthProvider>
  );
}

export default App
