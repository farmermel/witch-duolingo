import React, { useEffect, useState } from 'react'

export const Lesson = () => {
  let [translation, setTranslation] = useState("");
  let text ="Hello world"

  useEffect(() => {
    async function fetchData() {
      
      let resp = await fetch(`http://localhost:8081/latin/${text}`);
      const translationJson = await resp.json();
      setTranslation(translationJson[0])
    }
    fetchData();
  }, []);

   return (
    <article>
      <div>{text}</div>
      <div>{translation}</div> 
    </article>
  )
}