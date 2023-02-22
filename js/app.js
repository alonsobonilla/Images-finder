import { form } from "./modules/selectors.js";
import { validateForm } from "./modules/functions.js";

document.addEventListener('DOMContentLoaded',initialApp);

function initialApp() {
    form.addEventListener('submit', validateForm);
}