import React, { useEffect, useState } from 'react';
import { compareTwoStrings, fetchData, randomSubarray } from '../helpers';
import { Link, useParams } from 'react-router-dom';
import { Card } from '../Card/Card';
import lessons from '../lessons.js';
import '../styles/Lesson.css';

export const Lesson = () => {
  const [translation, setTranslation] = useState([]);
  const [text, setText] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [buttonState, setButtonState] = useState({
    disabled: true,
    className: "disabled"
  });

  const { id } = useParams();

  useEffect(() => {
    let lessonSet = randomSubarray(lessons[id], 5);
    setText(lessonSet);
    const arrStr = encodeURIComponent(JSON.stringify(lessonSet));
    const fullURL = `http://localhost:8081/latin/${arrStr}`;

    fetchData(fullURL, setTranslation);
  }, []);

  const waitAndResetCard = () => {
    setTimeout(() => {
      setCurrentCard(currentCard + 1);
      setUserAnswer("");
      setButtonState({...buttonState, className: "correct"});
    }, 2500);
  }

  const handleSubmit = e => {
    e.preventDefault();

    compareTwoStrings([translation[currentCard], userAnswer])
        ? setButtonState({...buttonState, className: "correct"}) 
        : setButtonState({...buttonState, className: "incorrect"})

    waitAndResetCard();
  }

  const handleChange = event => {
    setUserAnswer(event.target.value);

    if (event.target.value.length && buttonState.disabled) {
      setButtonState({buttonState, disabled: false});
    } else if (!event.target.value.length && buttonState.enabled) {
      setButtonState({className: "disabled", disabled: true});
    }
  }

  const handleOnKeyDown = event => {
    if(event.keyCode == 13 && event.shiftKey == false) {
      handleSubmit(event);
    }
  }

  const containerInsides = () => {
    return (
      <textarea placeholder="Type the latin translation"
                value={userAnswer}
                onChange={handleChange}
                onKeyDown={handleOnKeyDown}>
      </textarea> 
    )
  }

   return (
     <main>
      <Link tag="button" to="/user-home"><button className="back-home">Home</button></Link>
      <Card prompt="Translate this sentence"
            children={containerInsides()}
            currentText={text[currentCard]}
            handleSubmit={handleSubmit}
            buttonState={buttonState}
            />
      <div>hint the answer is {translation[currentCard]}</div>
     </main>
  )
}