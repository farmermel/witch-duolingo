import '../styles/Lesson.css';
import { fetchData } from '../helpers';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Card } from '../Card/Card';
import lessons from '../lessons.js';
import { ModeButton } from '../ModeButton/ModeButton';

export const Lesson = () => {
  const [allTranslations, setAllTranslations] = useState([]);
  const [text, setText] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const { id } = useParams();
  const lessonLength = 4;

  useEffect(() => {
    const allLessons = lessons[id];
    setIsLoading(true);
    setText(allLessons)
    const arrStr = encodeURIComponent(JSON.stringify(allLessons));
    const fullURL = `http://localhost:8081/latin/${arrStr}`;
    fetchData(fullURL, setAllTranslations);
    setIsLoading(false);
  }, []);

  const nextCard = max => {
    if (currentCard === lessonLength) {
      return "final";
    }

    const randomNum = Math.floor(Math.random() * max);
    const cardTypes = ["textarea", "input"];
    return cardTypes[randomNum];
  }

  return (
    <main>
      <Link tag="button" to="/user-home">
        <button className="back-home">
          Home
        </button>
      </Link>
      <ModeButton />
      {
        console.log(text, currentCard) &&
        isLoading ?
        <div>LOADING</div>
        :
        <Card prompt="Translate this sentence "
          type={nextCard(2)}
          currentText={text[currentCard]}
          currentCard={currentCard}
          setCurrentCard={setCurrentCard}
          translation={allTranslations[currentCard]}
        />
      }
      
    </main>
  );
};