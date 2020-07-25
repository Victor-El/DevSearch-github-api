const BASE_API_URL = "https://api.github.com/search/users";

const searchTextInput = document.getElementById("search-text");
const searchBtn = document.getElementById("search-btn");
const spinner = document.getElementById("spinner");
const noResultPara = document.getElementById("empty-result-para");

searchTextInput.addEventListener('keyup', e => {
    if (e.keyCode == 13) {
        startSearch();
    }
});

const toggleNoResult = function toggleNoResultPara() {
    const initialState = "block";
    let mutableState = initialState;
    noResultPara.style.display = mutableState;
    
    function toggle() {
        if (mutableState === initialState) {
            mutableState = "none";
            noResultPara.style.display = mutableState;
        } else {
            mutableState = initialState;
            noResultPara.style.display = mutableState;
        }
    }
    
    return toggle;
}();

function toggleAnimation() {
    let state = spinner.style.visibility;
    
    const toggleVisibility = () => {
        if (state == "" || state == "hidden") {
            state = "visible";
            spinner.style.visibility = state;
        } else {
            state = "hidden";
            spinner.style.visibility = state;
        }
    };
    
    return {
        toggleVisibility
    };
}

function populateDOMWithResult() {
    
}

const anim = toggleAnimation();

function toggleInputsDisabled() {
    searchTextInput.disabled = !searchTextInput.disabled;
    searchBtn.disabled = !searchBtn.disabled;
    anim.toggleVisibility();
}

function startSearch(event) {
    toggleInputsDisabled();
    getUsersByLocation(searchTextInput.value).then(function(res) {
        res.json().then(data => {
            console.log(data);
            toggleNoResult();
            toggleInputsDisabled();
        });
    });
    searchTextInput.value = "";
}

searchBtn.addEventListener('click', startSearch);

async function getUsersByLocation(loc) {
    const result = await fetch(`${BASE_API_URL}?q=location:${loc}`);
    return result;
}
