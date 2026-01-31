import React,{Fragment} from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import Thankyou from '@/components/Thankyou'
import Helpline from '@/components/Helpline'
import BookingModel from '@/components/BookingModel'




const page = () => {
  return (
    <Fragment>
        <Navbar/>
        
        <Hero/>
        
        <Thankyou/>
        <Helpline/>
        <Footer/>
        <BookingModel/>
        
       
    </Fragment>
  )
}

export default page;
