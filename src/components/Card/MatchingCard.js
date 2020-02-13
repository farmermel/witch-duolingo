import React, { useContext, useEffect, useState } from "react";
import { CheckAnswerButton } from "../CheckAnswerButton/CheckAnswerButton";
import { ThemeContext } from "../../contexts/themeContext";

export const MatchingCard = ({
  translationAnswers,
  incrementCard
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [buttonState, setButtonState] = useState("disabled");
  const [buttonTranslationState, setButtonTranslationState] = useState([]);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    const untouchedOptions = Object.entries(translationAnswers)
      .slice(0, 5)
      .flat()
      .reduce((acc, val) => {
        return {...acc, ...{[val]: "untouched"}};
      }, {});
    setButtonTranslationState(untouchedOptions);
  }, [translationAnswers]);

  const waitAndResetCard = (isRight, newButtonTranslationState) => {
    const newClass = isRight ? "disabled" : "untouched";
    const resolvedState = Object.entries(newButtonTranslationState).map(val => {
      if (val[1] === "correct" || val[1] === "incorrect") {
        val[1] = newClass;
      }
      return val;
    });

    setTimeout(() => {
      setButtonTranslationState(Object.fromEntries(resolvedState));
      setUserAnswer("");
      checkAllCorrect(resolvedState);
    }, 1000);
  };

  const checkAllCorrect = resolvedState => {
    const stillUnanswered = resolvedState.find(([_, val]) => val !== "disabled");
    !stillUnanswered && setButtonState("correct")
  }
    
  const handleSubmit = error => {
    error.preventDefault();
    incrementCard();
  };

  const hanldeFirstClick = theme => {
    if (buttonTranslationState[theme] === "disabled") return;

    setUserAnswer(theme);
    setButtonTranslationState({
      ...buttonTranslationState,
      [theme]: "selected"
    });
  };

  const handleSecondClick = theme => {
    const isRight = isAnswerRight(translationAnswers, userAnswer, theme);
    const evaluated = Object.entries(buttonTranslationState).map(val => {
      if (val[1] === "selected" || val[0] === theme) {
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
      ? hanldeFirstClick(target.theme)
      : handleSecondClick(target.theme);
  };


const isAnswerRight = (translationAnswers, opt1, opt2) => (
  translationAnswers[opt1] === opt2 || translationAnswers[opt2] === opt1
)

  return (
    <>
      <h4>Click the pairs</h4>
      <article className={`${theme.theme} lesson-card matching`}>
        <form onSubmit={handleSubmit}>
          <section>
            {Object.entries(buttonTranslationState).map((word, index) => (
              <input key={`${word}${index}`}
                onClick={handleOnClick}
                type="button"
                theme={word[0]}
                className={`${word[1]} match-button`}/>
            ))}
          </section>
          <CheckAnswerButton theme={theme.theme} 
            buttonState={buttonState}>
          </CheckAnswerButton>
        </form>
      </article>
      <div>hint the answers are right next to each other</div>
    </>
  );
};