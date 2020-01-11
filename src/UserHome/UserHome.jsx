import React from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../Header/Header'
import './UserHome.css';

export const UserHome = () => (
    <main>
        <Header />
        <section>
            <div className="lesson">
                <Link to={`/lesson/2`} className="router-link">First Lesson</Link>
            </div>
        </section>
    </main>
    )