import React from 'react';
import './Footer.css'

export const Footer = () => {
    return <>
        <div className='disclaimer'>
            <p>
                Disclaimer I don't know Latin at all
            </p>
            <a
                className="App-link"
                href="https://www.duolingo.com/course/la/en/Learn-Latin"
                target="_blank"
                rel="noopener noreferrer"
            >
                Here's Duolingo's Latin go learn it there for real
            </a>
        </div>
    </>
}