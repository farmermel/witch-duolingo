import { normalizeString } from "../../helpers";
import React, { useContext, useState } from "react";
import { CheckAnswerButton } from "../CheckAnswerButton/CheckAnswerButton";
import { ThemeContext } from "../../contexts/themeContext";

export const WriteAnswerCard = ({
  //cut down on things being passed, probably don't need translation or currentEnglish?
  prompt,
  currentEnglish,
  incrementCard,
  translation,
  translationAnswers
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [buttonState, setButtonState] = useState("disabled");
  const value = useContext(ThemeContext);

  const waitAndResetCard = () => {
    setTimeout(() => {
      incrementCard();
      setUserAnswer("");
      setButtonState("disabled");
    }, 2500);
  };

  const handleSubmit = error => {
    error.preventDefault();

    const isRight = isAnswerRight(
      translationAnswers, normalizeString(userAnswer)
    );

    isRight
      ? setButtonState("correct") 
      : setButtonState("incorrect");
  
    waitAndResetCard();
  };
    
  const handleChange = event => {
    setUserAnswer(event.target.value);

    if (event.target.value.length && buttonState === "disabled") {
      setButtonState("enabled");
    } else if (!event.target.value.length && buttonState === "enabled") {
      setButtonState("disabled");
    }
  };
    
  const handleOnKeyDown = event => {
    if (event.keyCode === 13 && event.shiftKey === false) {
      handleSubmit(event);
    }
  };


const isAnswerRight = (translationAnswers, opt1) => {
  const found = Object.values(translationAnswers).find(val => (normalizeString(val) === opt1) );
  return !!found;
}

  return (
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
          <CheckAnswerButton theme={value.theme} 
            buttonState={buttonState}>
          </CheckAnswerButton>
        </form>
      </article>
      <div>hint the answer is {translation}</div>
    </>
  );
};