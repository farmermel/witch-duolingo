import React, { useContext, useEffect, useState } from "react";
import { CheckAnswerButton } from "../CheckAnswerButton/CheckAnswerButton";
import { ThemeContext } from "../../contexts/themeContext";

export const MatchingCard = ({
  translationAnswers,
  setCurrentCard
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [buttonState, setButtonState] = useState("disabled");
  const [buttonTranslationState, setButtonTranslationState] = useState([]);
  const value = useContext(ThemeContext);

  useEffect(() => {
    const untouchedOptions = Object.entries(translationAnswers)
      .slice(0, 5)
      .flat()
      .reduce((acc, val) => {
        return {...acc, ...{[val]: "untouched"}};
      }, {});
    setButtonTranslationState(untouchedOptions);
  }, [translationAnswers]);

  //Right now, handling reset directly by calling it
  //useEffect to have one that changes on userAnswer,
  //have userAnswer be an array and have a sentinel condition 
  //that returns when userAnswer is length one
  //but handles setting correct and incorrect when userAnswer is length two?

  const waitAndResetCard = (isRight, newButtonTranslationState) => {
    const newClass = isRight ? "disabled" : "untouched";
    const resolvedState = Object.entries(newButtonTranslationState).map(val => {
      if (val[1] === "correct" || val[1] === "incorrect") {
        val[1] = newClass;
      }
      return val;
    });
    //still need to handle final correct answer (enable check button)
    setTimeout(() => {
      setButtonTranslationState(Object.fromEntries(resolvedState));
      setUserAnswer("");
    }, 1000);
  };
    
  const handleSubmit = error => {
    error.preventDefault();
    setCurrentCard(currentCard + 1);
    setButtonState("enabled");
  };

  const hanldeFirstClick = value => {
    if (buttonTranslationState[value] === "disabled") return;

    setUserAnswer(value);
    setButtonTranslationState({
      ...buttonTranslationState,
      [value]: "selected"
    });
  };

  const handleSecondClick = value => {
    const isRight = isAnswerRight(translationAnswers, userAnswer, value);
    const evaluated = Object.entries(buttonTranslationState).map(val => {
      if (val[1] === "selected" || val[0] === value) {
        val[1] = isRight ? "correct" : "incorrect";
      }
      return val;
    });
    const newButtonTranslationState = Object.fromEntries(evaluated);

    setButtonTranslationState(newButtonTranslationState);
    waitAndResetCard(isRight, newButtonTranslationState);

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


const isAnswerRight = (translationAnswers, opt1, opt2) => (
  translationAnswers[opt1] === opt2 || translationAnswers[opt2] === opt1
)

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