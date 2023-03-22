import { showImages, calculatePages } from "./functions.js";
import { currentPage } from "./functions.js";

const resultsByPage = 40;

async function getImages(term) {
    const key = '33829705-d86a2ac4485ff315a80e9ab75';
    const url = `https://pixabay.com/api/?key=${key}&q=yellow+flowers&q=${term}&per_page=${resultsByPage}&page=${currentPage}`;
    
    try {
        const answer = await fetch(url);
        const result = await answer.json();

        calculatePages(result.totalHits, resultsByPage);
        showImages(result.hits);
    } catch(error) {
        console.log(error);
    }
}

export { getImages };