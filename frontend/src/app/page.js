import React,{Fragment} from 'react'
import Navbar from '@/components/Navbar'
import Home from '@/components/Home'



const page = () => {
  return (
    <Fragment>
        <Navbar/>
        
        <Home/>
       
    </Fragment>
  )
}

export default page;
