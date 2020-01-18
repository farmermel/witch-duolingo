const parseJson = translationJson => (
    JSON.parse(translationJson[0].replace(/'/g, '"'))
  )

export async function fetchData(url, stateUpdateFunction) {
    let resp = await fetch(url);
    const respJson = await resp.json();
    stateUpdateFunction(parseJson(respJson));
  }

export const randomSubarray = (arr, size) => {
  let shuffled = [...arr];
  let i = arr.length
  let temp;
  let index;

  while (i--) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
  }
  return shuffled.slice(0, size);
}

export const compareTwoStrings = strings => {
  const normalized = strings.map( str => str.replace(/\s\s+/g, ' ').trim().toLowerCase() );
  return  normalized[0] === normalized[1];
}

