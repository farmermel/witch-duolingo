import React from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../Header/Header'
import './UserHome.css';

export const UserHome = () => {
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

    return (
        <body className="Userhome">
            <Header className="header" />
            <main>
                {makeMoreLessons()}
            </main>
        </body>
    )
}