import React, { useContext, useEffect, useState } from "react";
import { CheckAnswerButton } from "../CheckAnswerButton/CheckAnswerButton";
import { isAnswerRight } from "../helpers";
import { ThemeContext } from "../themeContext";

export const MatchingCard = ({
  translationAnswers,
  setCurrentCard
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [buttonState, setButtonState] = useState("disabled");
  const [buttonTranslationState, setButtonTranslationState] = useState([]);
  const value = useContext(ThemeContext);

  useEffect(() => {

    const modified = Object.entries(translationAnswers)
      .slice(0, 5)
      .flat()
      .reduce((acc, val) => {
        return {...acc, ...{[val]: "untouched"}};
      }, {});
    setButtonTranslationState(modified);
  }, [translationAnswers]);

  //Right now, handling reset directly by calling it
  //useEffect to have one that changes on userAnswer,
  //have userAnswer be an array and have a sentinel condition 
  //that returns when userAnswer is length one
  //but handles setting correct and incorrect when userAnswer is length two?

  const waitAndResetCard = isRight => {
    const evaluated = Object.entries(buttonTranslationState).map(val => {
      if (val[1] === "selected") {
        val[1] = isRight ? "correct" : "incorrect";
      }
      return val;
    });
    setButtonTranslationState(Object.fromEntries(evaluated));
    //still need to handle final correct answer (enable check button)
    setTimeout(() => {

      setUserAnswer("");
    }, 1000);
  };
    
  const handleSubmit = error => {
    error.preventDefault();
    setCurrentCard(currentCard + 1);
    setButtonState("enabled");
  };

  const hanldeFirstClick = (value) => {
    setUserAnswer(value);
    setButtonTranslationState({
      ...buttonTranslationState,
      [value]: "selected"
    });
  };

  const handleSecondClick = (value) => {
    const isRight = isAnswerRight(translationAnswers, userAnswer, value);
    setButtonTranslationState({...buttonTranslationState, [value]: "selected"});

    waitAndResetCard(isRight);
    //wait, then disable those buttons and clear userAnswer
    //when all buttons are disabled, then enable submit button
    //set aria state as well

  };

  const handleOnClick = ({ target }) => {
    userAnswer === ""
      ? hanldeFirstClick(target.value)
      : handleSecondClick(target.value);
    //check if answers is empty string
    //if it isnt add target value to answer
    //if it is, pass answer and target value to checking function
    //then set states of buttons accordingly 
    //(either reset buttons as unclicked)
    //or flash green then disable
  };

  return (
    <>
      <h4>Click the pairs</h4>
      <article className={`${value.theme} lesson-card matching`}>
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
          <CheckAnswerButton theme={value.theme} 
            buttonState={buttonState}>
          </CheckAnswerButton>
        </form>
      </article>
      <div>hint the answers are right next to each other</div>
    </>
  );
};