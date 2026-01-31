import React,{Fragment} from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import Thankyou from '@/components/Thankyou'
import Helpline from '@/components/Helpline'




const page = () => {
  return (
    <Fragment>
        <Navbar/>
        
        <Hero/>
        <Footer/>
        <Thankyou/>
        <Helpline/>
        
       
    </Fragment>
  )
}

export default page;
