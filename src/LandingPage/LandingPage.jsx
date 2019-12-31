import React from 'react'
import { Footer } from '../Footer/Footer'
import hamsa from '../assets/hamsa.svg'
import './LandingPage.css'

export const LandingPage = () => {
    return (
        <>
            <img className="hamsa" src={hamsa} alt="ominous hamsa" />
            <h3>Learn to speak like a witch. Nothing is free but it won't cost you money.</h3>
            <Footer />
        </>
    )
};