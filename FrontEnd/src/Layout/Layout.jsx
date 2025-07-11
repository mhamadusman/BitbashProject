import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import Home from '../Components/Home/Home'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
        <Navbar/>
            <Outlet/>
        <Footer />
    </>
  )
}
