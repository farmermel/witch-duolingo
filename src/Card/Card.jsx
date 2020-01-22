import React, { useState } from 'react';
import { compareTwoStrings } from '../helpers';
import { ThemeContextConsumer } from '../themeContext';

export const Card = ({
  prompt,
  currentText,
  type,
  currentCard,
  setCurrentCard,
  translation
}) => {

  const [userAnswer, setUserAnswer] = useState("");
  const [buttonState, setButtonState] = useState({
    disabled: true,
    className: "disabled"
  });

  const waitAndResetCard = () => {
    setTimeout(() => {
      setCurrentCard(currentCard + 1);
      setUserAnswer("");
      setButtonState({...buttonState, className: "correct"});
    }, 2500);
  };

  const handleSubmit = error => {
    error.preventDefault();

    compareTwoStrings([translation, userAnswer])
      ? setButtonState({...buttonState, className: "correct"}) 
      : setButtonState({...buttonState, className: "incorrect"});

    waitAndResetCard();
  };

  const handleChange = event => {
    setUserAnswer(event.target.value);

    if (event.target.value.length && buttonState.disabled) {
      setButtonState({buttonState, disabled: false});
    } else if (!event.target.value.length && buttonState.enabled) {
      setButtonState({className: "disabled", disabled: true});
    }
  };

  const handleOnKeyDown = event => {
    if (event.keyCode === 13 && event.shiftKey === false) {
      handleSubmit(event);
    }
  };

  const renderFinal = theme  => (
    <>
      <h3>YOU DID IT PROUD OF YOU</h3>
      <article className={`${theme} final-card`}>
      </article>
    </>
  )

  const renderQuizCards = (type) => {
    if (type === "textarea") {
      return (
        <textarea placeholder="Type the latin translation"
          value={userAnswer}
          onChange={handleChange}
          onKeyDown={handleOnKeyDown}>
        </textarea>
      )
    } else if (type === "input") {
      return (
        <input type="text"
          placeholder="Type the latin translation"
          value={userAnswer}
          onChange={handleChange}
          onKeyDown={handleOnKeyDown}>
        </input>
      )
    }
  }

  return (
    <ThemeContextConsumer>
      { value => 
        type === "final" 
        ? 
        renderFinal(value.theme)
        :
        <>
          <h4>{prompt}</h4>
          <article className={`${value.theme} lesson-card`}>
            <div>{currentText}</div>
            <form onSubmit={handleSubmit}>
              {
                renderQuizCards(type)
              }
              <button className={`${value} medium-button ${buttonState.className}`}
                type="submit"
                disabled={buttonState.disabled}>
                      Check
              </button>
            </form>
          </article>
          <div>hint the answer is {translation}</div>
        </>
      }
    </ThemeContextConsumer>
  );
};