import React, { useEffect, useState } from 'react';
import { isAnswerRight } from '../helpers';
import { ThemeContextConsumer } from '../themeContext'; 
import { wait } from '@testing-library/react';

//is this component unmounting ever?

//pass props for prompt, current text
//pass render renderquizcards as children to Card
export const MatchingCard = ({
    translationAnswers
  }) => {
    const [userAnswer, setUserAnswer] = useState("");
    const [buttonState, setButtonState] = useState({
      disabled: true,
      className: "disabled"
    });
    const [buttonTranslationState, setButtonTranslationState] = useState([])

    useEffect(() => {
        const modified = Object.entries(translationAnswers).slice(0,5).flat().reduce((acc, val) => {
            return {...acc, ...{[val]: "untouched"}}
        }, {})
        console.log(modified)
        setButtonTranslationState(modified);
    }, [translationAnswers])

    //Right now, handling reset directly by calling it
    //would it be a bastardisation of useEffect to have one that changes on userAnswer,
    //have userAnswer be an array and have a sentinel condition that returns when userAnswer is length one
    //but handles setting correct and incorrect when userAnswer is length two?
    //whats the proper way to deal with the async nature of setting state with hooks?

    const waitAndResetCard = isRight => {
      const evaluated = Object.entries(buttonTranslationState).map(val => {
        if (val[1] === "selected") {
          val[1] = isRight ? "correct" : "incorrect";
        }
        return val;
      })
      setButtonTranslationState(Object.fromEntries(evaluated))
      //still need to handle final correct answer (enable check button)
        setTimeout(() => {

          setUserAnswer("");
        }, 1000);
      };
    
      const handleSubmit = error => {
        error.preventDefault();
    
        setCurrentCard(currentCard + 1);
        //This is the reset behavior, really need to come up with a default that isn't correct
        setButtonState({...buttonState, className: "correct"});
      };

      const hanldeFirstClick = (value) => {
        setUserAnswer(value)
        setButtonTranslationState({...buttonTranslationState, [value]: "selected"})
      }

      const handleSecondClick = (value) => {
        const isRight = isAnswerRight(translationAnswers, userAnswer, value)
        setButtonTranslationState({...buttonTranslationState, [value]: "selected"})

        waitAndResetCard(isRight)
        //wait, then disable those buttons and clear userAnswer
        //when all buttons are disabled, then enable submit button
        //set aria state as well

      }

      const handleOnClick = ({ target }) => {
        userAnswer === ""
          ? hanldeFirstClick(target.value)
          : handleSecondClick(target.value)
        //check if answers is empty string
        //if it isnt add target value to answer
        //if it is, pass answer and target value to checking function
        //then set states of buttons accordingly 
        //(either reset buttons as unclicked)
        //or flash green then disable
      }

    return (
        <ThemeContextConsumer>
      { value => 
        <>
          <h4>{prompt}</h4>
          <article className={`${value.theme} lesson-card`}>
            <form onSubmit={handleSubmit}>
            <section>
                {Object.entries(buttonTranslationState).map((word, index) => (
                <input key={`${word}${index}`}
                   onClick={handleOnClick}
                   type="button"
                   value={word[0]}
                   className={`${word[1]} match-button`}/>
                ))}
            </section>
              <button className={`${value} medium-button ${buttonState.className}`}
                type="submit"
                disabled={buttonState.disabled}>
                      Check
              </button>
            </form>
          </article>
          <div>hint the answers are right next to each other</div>
        </>
      }
    </ThemeContextConsumer>
)}