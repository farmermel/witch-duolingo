const parseJson = translationJson => (
    JSON.parse(translationJson[0].replace(/'/g, '"'))
  )

export async function fetchData(url, stateUpdateFunction) {
    let resp = await fetch(url);
    const respJson = await resp.json();
    stateUpdateFunction(parseJson(respJson));
  }

export const normalizeString = string => (
  string.replace(/\s\s+/g, ' ').trim().toLowerCase()
)
