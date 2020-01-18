import React, { useEffect, useState } from 'react';
import { compareTwoStrings, fetchData, randomSubarray } from '../helpers';
import { useParams } from 'react-router-dom';
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

    if (compareTwoStrings([translation[currentCard], userAnswer])) {
      setButtonState({...buttonState, className: "correct"});
    } else {
      setButtonState({...buttonState, className: "incorrect"});
    }
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

   return (
     <main>
      <h4>Translate this sentence</h4>
      <article className="lesson-card">
          <div>{text[currentCard]}</div>
          <form onSubmit={handleSubmit}>
            <textarea placeholder="Type the latin translation"
                      value={userAnswer}
                      onChange={handleChange}
                      onKeyDown={handleOnKeyDown}>
            </textarea> 
            <button className={`medium-button ${buttonState.className}`}
                    type="submit"
                    disabled={buttonState.disabled}>
              Check
            </button>
          </form>
      </article>
      <div>hint the answer is {translation[currentCard]}</div>
     </main>
  )
}