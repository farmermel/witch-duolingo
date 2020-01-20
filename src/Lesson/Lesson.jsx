import React, { useEffect, useState } from 'react';
import { fetchData, randomSubarray } from '../helpers';
import { Link, useParams } from 'react-router-dom';
import { Card } from '../Card/Card';
import lessons from '../lessons.js';
import '../styles/Lesson.css';

export const Lesson = () => {
  const [translation, setTranslation] = useState([]);
  const [text, setText] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  

  const { id } = useParams();

  useEffect(() => {
    let lessonSet = randomSubarray(lessons[id], 5);
    setText(lessonSet);
    const arrStr = encodeURIComponent(JSON.stringify(lessonSet));
    const fullURL = `http://localhost:8081/latin/${arrStr}`;

    fetchData(fullURL, setTranslation);
  }, []);

  

   return (
     <main>
      <Link tag="button" to="/user-home"><button className="back-home">Home</button></Link>
      <Card prompt="Translate this sentence "
            type="textarea"
            currentText={text[currentCard]}
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
            translation={translation[currentCard]}
            />
      <div>hint the answer is {translation[currentCard]}</div>
     </main>
  )
}