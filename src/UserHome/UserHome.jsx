import '../styles/UserHome.css';
import { Header } from '../Header/Header';
import { Link } from 'react-router-dom';
import React from 'react';

function makeMoreLessons() {
  let index = 0;
  let lessons = [];
  while (index < 6) {
    lessons = [...lessons, 
      <div className="lesson"
        // TODO: when something is substantively different 
        // about lessons make key not an index
        key={`lesson{$index}`}>
        <Link to={`/lesson/${index}`} 
          className="router-link">
          Lesson {index}
        </Link>
      </div>
    ];
    index++;
  }
  return lessons;
}

export const UserHome = () => (
  <body className="Userhome">
    <Header className="header" />
    <main>
      {makeMoreLessons()}
    </main>
  </body>
);