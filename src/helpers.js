const parseJson = translationJson => (
    JSON.parse(translationJson[0].replace(/'/g, '"'))
  )

export async function fetchData(url, stateUpdateFunction) {
    let resp = await fetch(url);
    const respJson = await resp.json();
    stateUpdateFunction(parseJson(respJson));
  }

export const isAnswerRight = (translationAnswers, opt1, opt2) => {
  return (translationAnswers[opt1] === opt2 || translationAnswers[opt2] === opt1)
}

export const normalizeString = string => {
  return string.replace(/\s\s+/g, ' ').trim().toLowerCase();
}
