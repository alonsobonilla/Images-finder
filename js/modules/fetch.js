import { showImages, calculatePages } from "./functions.js";
import { currentPage } from "./functions.js";

const resultsByPage = 40;

function getImages(term) {
    console.log(currentPage);
    const key = '33829705-d86a2ac4485ff315a80e9ab75';
    const url = `https://pixabay.com/api/?key=${key}&q=yellow+flowers&q=${term}&per_page=${resultsByPage}&page=${currentPage}`;
    
    console.log(currentPage);
    fetch(url)
        .then(answer => answer.json())
        .then(result => {
            calculatePages(result.totalHits, resultsByPage);
            showImages(result.hits);
        })
}

export { getImages };