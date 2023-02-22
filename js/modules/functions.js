import { form, result, paginationDiv } from "./selectors.js";
import { getImages } from "./fetch.js";

let totalPages;
let iterator;
let currentPage = 1;
let term;

function validateForm(e) {
    e.preventDefault();
    term = document.querySelector('#term').value;

    if(term === '') {
        showAlert('Add a search term');
    } else {
        currentPage = 1;
        getImages(term);
    }
}

function showAlert(mensaje) {
    if(form.children.length > 1) {
        return;
    }

    const alerta = document.createElement('P');
    alerta.classList.add('bg-red-100','border-red-400','text-red-700','px-4','py-3','rounded','max-w-lg','mx-auto','mt-6','text-center');
    alerta.innerHTML = 
    `
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline">${mensaje}</span>
    `
    form.appendChild(alerta);

    setTimeout(() => {
        alerta.remove();
    }, 3000);
}

function showImages(images) {
    cleanHTML(result)
    console.log(images);
    images.forEach(image => {
        const { id, previewURL, likes, views, largeImageURL } = image;

        const img = scripting('IMG',['w-full']);
        img.src = previewURL;

        const divMain = scripting('DIV',['w-1/2','md:w-1/3','lg:w-1/4','p-3','mb-4'])
        const divSec = scripting('DIV',['bg-white']);
        const divInfo = scripting('DIV',['p-4']);

        const pLikes = scripting('P',['p-4','font-bold'], likes);
        const spanLikes = scripting('SPAN',['font-light'],'Likes');

        const pViews = scripting('P',['font-bold'],views);
        const spanView = scripting('SPAN',['font-light'],' Times viewed');
        
        const link = scripting('A',['block','w-full','bg-blue-800','hover:bg-blue-500','text-white','uppercase','font-bold','text-center','rounded','mt-5','p-1'],'Show image');
        link.href = largeImageURL;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        divInfo.appendChild(pLikes);
        divInfo.appendChild(pViews);
        divInfo.appendChild(link);

        pLikes.appendChild(spanLikes);
        pViews.appendChild(spanView);

        divSec.appendChild(img);
        divSec.appendChild(divInfo);

        divMain.appendChild(divSec);
        result.appendChild(divMain);
    });
    showPagination();
}
 
function scripting(etiqueta, clases = [], mensaje,) {
    const crearEtiqueta = document.createElement(etiqueta);
    if(clases.length != 0) {
        clases.forEach( clase => {
            crearEtiqueta.classList.add(clase);
        });
    }
    if(mensaje)
        crearEtiqueta.textContent = mensaje;
    return crearEtiqueta;
}

function cleanHTML(nodo) {
    while(nodo.firstChild) {
        nodo.removeChild(nodo.firstChild);
    }
}

function calculatePages(total, resultsByPage) {
    totalPages = parseInt(Math.ceil(total/resultsByPage));
}

function *pagination(totalPages) {
    for(let i=1; i<=totalPages; i++) {
        yield i;
    }
}

function showPagination() {
    cleanHTML(paginationDiv);

    iterator = pagination(totalPages);
    while(true) {
        const { value, done} = iterator.next();
        if(done) return;

        const button = document.createElement('A');
        button.href = '#';
        button.dataset.pag = value;
        button.textContent = value;
        button.classList.add('next','bg-yellow-400','px-4','py-1','mr-2','font-bold','mb-4','rounded');

        button.onclick = function() {
            currentPage = value;
            getImages(term); 
        }
        paginationDiv.appendChild(button);
    }
        
    // for(let i=1; i<=total; i++){
    //     const button = document.createElement('A');
    //     button.href = '#';
    //     button.dataset.pag = i;
    //     button.textContent = i;
    //     button.classList.add('next','bg-yellow-400','px-4','py-1','mr-2','font-bold','mb-4','rounded');

    //     button.onclick = function() {
    //         currentPage = i;
    //         getImages(term); 
    //     }
    //     paginationDiv.appendChild(button);
    // }
}
export { validateForm, showImages, calculatePages, currentPage};