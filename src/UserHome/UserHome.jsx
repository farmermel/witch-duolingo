import React from 'react';
import { Link } from 'react-router-dom';
import './UserHome.css';

export const UserHome = () => {
    return (
    <main>
        <section>
            <div className="lesson">
                <Link to="/lesson">First Lesson</Link>
            </div>
        </section>
    </main>
    )
}