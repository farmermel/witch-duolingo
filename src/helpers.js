const parseJson = translationJson => (
    JSON.parse(translationJson[0].replace(/'/g, '"'))
  )

export async function fetchData(url, stateUpdateFunction) {
    let resp = await fetch(url);
    const respJson = await resp.json();
    stateUpdateFunction(parseJson(respJson));
  }

export const compareTwoStrings = strings => {
  const normalized = strings.map( str => str.replace(/\s\s+/g, ' ').trim().toLowerCase() );
  return  normalized[0] === normalized[1];
}

