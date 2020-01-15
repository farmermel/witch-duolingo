import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import lessons from '../lessons.js'
import '../styles/Lesson.css'

export const Lesson = () => {
  let [translation, setTranslation] = useState([]);
  let [text, setText] = useState([]);
  let [currentCard, setCurrentCard] = useState(0);
  let [userAnswer, setUserAnswer] = useState("");
  let [buttonState, setButtonState] = useState({
    disabled: true,
    className: "disabled"
  });

  const { id } = useParams();

  const randomSubarray = (arr, size) => {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}

  const parseJson = translationJson => {
    return JSON.parse(translationJson[0].replace(/'/g, '"'))
  }

  useEffect(() => {
    let theseLessons = randomSubarray(lessons[id], 5);
    setText(theseLessons);
    var arrStr = encodeURIComponent(JSON.stringify(theseLessons));

    async function fetchData() {
      let resp = await fetch(`http://localhost:8081/latin/${arrStr}`);
      const translationJson = await resp.json();
      const parsedTranslation = parseJson(translationJson)
      setTranslation(parsedTranslation);
    }
    fetchData();
  }, []);

  const handleChange = event => {
    setUserAnswer(event.target.value);
    if (event.target.value.length && buttonState.disabled) {
      setButtonState({buttonState, disabled: false});
    }
  }

  const waitAndResetCard = () => {
    setTimeout(() => {
      setCurrentCard(currentCard + 1);
      setUserAnswer("");
      setButtonState({...buttonState, className: "correct"});
    }, 1500);
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log(translation)
    console.log(translation[currentCard], userAnswer)
    // TODO deal with random spaces at beginning and end
    if (translation[currentCard] === userAnswer) {
      setButtonState({...buttonState, className: "correct"});
    } else {
      setButtonState({...buttonState, className: "incorrect"});
    }
    waitAndResetCard();
  }

   return (
     <main>
       <h4>Translate this sentence</h4>
      <article className="lesson-card">
          <div>{text[currentCard]}</div>
          <form>
            <textarea placeholder="Type the latin translation"
                      value={userAnswer}
                      onChange={handleChange}>
            </textarea> 
            <button className={`medium-button ${buttonState.className}`}
                    onClick={handleSubmit}
                    disabled={buttonState.disabled}>
              Check
            </button>
          </form>
          
      </article>
     </main>
  )
}