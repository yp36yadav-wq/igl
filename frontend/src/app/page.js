'use client';
import { Fragment } from 'react';
import Navbar from '@/components/Navbar';  // Adjust path
import Home from '@/components/Hero';      // Your Hero component
import Footer from '@/components/Footer';  // Adjust path


export default function Page() {
  return (
    <Fragment>
      <Navbar />
      <Home />      
      <Footer />
    </Fragment>
  );
}
