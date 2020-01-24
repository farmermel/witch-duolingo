const parseJson = translationJson => (
    JSON.parse(translationJson[0].replace(/'/g, '"'))
  )

export async function fetchData(url, stateUpdateFunction) {
    let resp = await fetch(url);
    const respJson = await resp.json();
    stateUpdateFunction(parseJson(respJson));
  }

export const isAnswerRight = (translationAnswers, opt1, opt2) => {
  const maybeRight1 = translationAnswers[opt1];
  const maybeRight2 = translationAnswers[opt2];
  console.log("if user answers are right one should not be undefined", maybeRight1, maybeRight2)
  return maybeRight1 !== undefined || maybeRight2 !== undefined
}

export const normalizeString = string => {
  return string.replace(/\s\s+/g, ' ').trim().toLowerCase();
}

// export const compareTwoStrings = strings => {
//   const normalized = strings.map( str => str.replace(/\s\s+/g, ' ').trim().toLowerCase() );
//   return  normalized[0] === normalized[1];
// }

