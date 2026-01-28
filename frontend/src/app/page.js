import React,{Fragment} from 'react'
import Navbar from '@/components/Navbar'
import Home from '@/components/Home'
import Footer from '@/components/Footer'
import Thankyou from '@/components/Thankyou'




const page = () => {
  return (
    <Fragment>
        <Navbar/>
        
        <Home/>
        <Footer/>
        <Thankyou/>
        
       
    </Fragment>
  )
}

export default page;
