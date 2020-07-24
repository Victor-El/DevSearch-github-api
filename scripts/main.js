const BASE_API_URL = "https://api.github.com/search/users";

const searchTextInput = document.getElementById("search-text");
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener('click', (event) => {
    getUsersByLocation(searchTextInput.value).then(function(res) {
        res.json().then(data => {
            console.log(data);
        });
    });
    searchTextInput.value = "";
});

async function getUsersByLocation(loc) {
    const result = await fetch(`${BASE_API_URL}?q=location:${loc}`);
    return result;
}
