import React,{Fragment} from 'react'
import Navbar from '@/components/Navbar'
import Home from '@/components/Home'
import Footer from '@/components/Footer'




const page = () => {
  return (
    <Fragment>
        <Navbar/>
        
        <Home/>
        <Footer/>
        
       
    </Fragment>
  )
}

export default page;
