import { fetchData, normalizeString } from '../helpers';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { MatchingCard } from '../Card/MatchingCard';
import { WriteAnswerCard } from '../Card/WriteAnswerCard';
import lessons from '../lessons.js';
import { ModeButton } from '../ModeButton/ModeButton';
import { ThemeContextConsumer } from '../themeContext';

export const Lesson = () => {
  const [allTranslations, setAllTranslations] = useState([]);
  const [allEnglish, setAllEnglish] = useState([]);
  const [translationAnswers, setTranslationAnswers] = useState({})
  const [currentCard, setCurrentCard] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const { id } = useParams();
  const lessonLength = 4;

  useEffect(() => {
    const allLessons = lessons[id];
    setIsLoading(true);
    setAllEnglish(allLessons)
    const arrStr = encodeURIComponent(JSON.stringify(allLessons));
    const fullURL = `http://localhost:8081/latin/${arrStr}`;
    fetchData(fullURL, setAllTranslations);
  }, []);

  useEffect(() => {
    if (allTranslations != {}) {
      console.log(allTranslations)
      console.log(allEnglish)


      const translationMap = allEnglish.reduce((acc, word, index) => {
        const normalizedTranslation = normalizeString(allTranslations[index])
        acc[word] = normalizedTranslation;
        acc[normalizedTranslation] = word;
        return acc;
        }, {})
      setTranslationAnswers(translationMap);
    }
    return setIsLoading(false);
  }, [allTranslations])

  const nextCard = (max, theme) => {
    if (currentCard === lessonLength) {
      return (
        <>
          <h3>YOU DID IT PROUD OF YOU</h3>
          <article className={`${theme} final-card`}>
          </article>
       </>
      );
    }

    const randomNum = Math.floor(Math.random() * max);
    const cardTypes = ["textarea", "matching"];

    if (cardTypes[randomNum] === "matching") {
      return(<MatchingCard prompt="Make pairs"
          currentCard={currentCard}
          setCurrentCard={setCurrentCard}
          translationAnswers={translationAnswers}
        />)
    } else {
      return (<WriteAnswerCard prompt="Translate this sentence"
          currentEnglish={allEnglish[currentCard]}
          currentCard={currentCard}
          setCurrentCard={setCurrentCard}
          translation={allTranslations[currentCard]}
          translationAnswers={translationAnswers}
        />)
    }
  }

  return (
    <ThemeContextConsumer>
      {
        value =>
        <main>
          <Link tag="button" to="/user-home">
            <button className="back-home">
              Home
            </button>
          </Link>
          <ModeButton />
          {
            isLoading ?
            <div>LOADING</div>
            :
            //this is a bug because the first render when getting data it goes twice and
            //flashes the second option sometimes
            nextCard(2, value.theme)

          }
        </main>
      }
    </ThemeContextConsumer>
  );
};