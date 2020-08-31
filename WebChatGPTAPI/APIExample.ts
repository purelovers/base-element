//Word Search API
async function WordSearch(query, numResults, timePeriod, region) {
    const headers = new Headers({
        Origin: "https://chat.openai.com",
        "X-RapidAPI-Key": "YOUR_KEY",
        "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com", "Content-Type": "application/json",
    });
    const url = `https://wordsapiv1.p.rapidapi.com/words/${query}`;
    const response = await fetch(url, { method: "GET", headers, });
    const results = await response.json(); console.log(results); return results;
}

//Google Entity Search API
async function GoogleEntitySearch(query, numResults, timePeriod, region) {
    const headers = new Headers({ Origin: "https://chat.openai.com", });
    const searchParams = new URLSearchParams();
    searchParams.set('query', query);
    searchParams.set('key', 'YOUR_KEY');
    searchParams.set('indent', 'true');
    searchParams.set('limit', numResults.toString());
    const url = `https://kgsearch.googleapis.com/v1/entities:search?${searchParams.toString()}`;
    console.log(url);
    const response = await fetch(url, { method: "GET", headers, });
    const results = await response.json(); console.log(results); return results;
}

//Google search API
async function GoogleSearch(query, numResults, timePeriod, region) {
    const headers = new Headers({ Origin: "https://chat.openai.com", });
    const searchParams = new URLSearchParams();
    searchParams.set('q', query);
    searchParams.set('key', 'YOUR_KEY');
    searchParams.set('cx', 'YOUR_GOOGLE_CLIENT_ID');
    searchParams.set('c2coff', '0');
    searchParams.set('num', numResults.toString());
    const url = `https://customsearch.googleapis.com/customsearch/v1?${searchParams.toString()}`;
    console.log(url);
    const response = await fetch(url, { method: "GET", headers, });
    const results = await response.json();
    const items = results.items;
    const filteredData = items.map(({ title, link, snippet }) => ({
        title,
        link,
        snippet
    }));
    return filteredData;
}
//Google search summarazation API
async function GoogleSearchSimply(query, numResults, timePeriod, region) {
    const headers = new Headers({ Origin: "https://chat.openai.com", });
    const searchParams = new URLSearchParams();
    searchParams.set('q', query);
    searchParams.set('key', 'YOUR_KEY');
    searchParams.set('cx', 'YOUR_GOOGLE_CLIENT_ID');
    searchParams.set('c2coff', '0');
    searchParams.set('num', numResults.toString());
    const url = `https://customsearch.googleapis.com/customsea