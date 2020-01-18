import React from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../Header/Header'
import '../styles/UserHome.css';

function makeMoreLessons() {
    let i = 0;
    let lessons = [];
    while (i < 6) {
        lessons = [...lessons, 
        <div className="lesson">
            <Link to={`/lesson/${i}`} className="router-link">Lesson {i}</Link>
        </div>
            ]
        i++;
    }
    return lessons
}

export const UserHome = () => (
        <body className="Userhome">
            <Header className="header" />
            <main>
                {makeMoreLessons()}
            </main>
        </body>
    )