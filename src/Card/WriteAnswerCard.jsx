import React, { useState } from 'react';
import { isAnswerRight, normalizeString } from '../helpers';
import { ThemeContextConsumer } from '../themeContext'; 

export const WriteAnswerCard = ({
    prompt,
    currentEnglish,
    currentCard,
    setCurrentCard,
    translation,
    translationAnswers
    // text
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


      isAnswerRight(translationAnswers, normalizeString(userAnswer));

    //   compareTwoStrings([translation, userAnswer])
    //     ? setButtonState({...buttonState, className: "correct"}) 
    //     : setButtonState({...buttonState, className: "incorrect"});
  
      waitAndResetCard();
    };
  
  //commonalities:
  //check button
  //prompt (ie translate this sentence)
  //progress bar on the top
  //english and latin 
  
  //differences:
  //Type the answer, 1:1 of latin and english
  //Select the answer from a list, many:1 latin:english
  //Make the answer from provided words, many:1 latin:english
  //pairing, many:many latin and english
  

    
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

    return (
        <ThemeContextConsumer>
      { value => 
        <>
          <h4>{prompt}</h4>
          <article className={`${value.theme} lesson-card`}>
            <div>{currentEnglish}</div>
            <form onSubmit={handleSubmit}>
            <textarea placeholder="Type the latin translation"
                value={userAnswer}
                onChange={handleChange}
                onKeyDown={handleOnKeyDown}>
            </textarea>
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
      )
}