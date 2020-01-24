import React, { useState } from 'react';
import { compareTwoStrings } from '../helpers';
import { ThemeContextConsumer } from '../themeContext'; 

export const Card = ({
  prompt,
  currentText,
  type,
  currentCard,
  setCurrentCard,
  translation,
  allTranslations,
  text,
  children
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
      //will need to somehow reset other kinds of cards as well
      //maybe pass up button state, currentCard
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

  const renderFinal = theme  => (
    <>
      <h3>YOU DID IT PROUD OF YOU</h3>
      <article className={`${theme} final-card`}>
      </article>
    </>
  )

  //move this up to lesson and just set wrapper instead
  // const renderQuizCards = (type) => {
  //   if (type === "textarea") {
  //     return (
  //       <textarea placeholder="Type the latin translation"
  //         value={userAnswer}
  //         onChange={handleChange}
  //         onKeyDown={handleOnKeyDown}>
  //       </textarea>
  //     )
  //   } else if (type === "matching") {
  //       const transl = allTranslations.slice(4, 8);
  //       const answers = text.slice(4, 8);

  //       const toRender = [...transl, ...answers].map((word, index) => (
  //         <button key={`${word}${index}`}>{word}</button>
  //       ))

  //   return <section>{toRender}</section>
  //   }
  // }

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

  return (
    <ThemeContextConsumer>
      { value => 
        type === "final" 
        ? renderFinal(value.theme)
        : <>
          <h4>{prompt}</h4>
          <article className={`${value.theme} lesson-card`}>
            <div>{currentText}</div>
            <form onSubmit={handleSubmit}>
              {
                children
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