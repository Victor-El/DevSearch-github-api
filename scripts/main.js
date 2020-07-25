const BASE_API_URL = "https://api.github.com/search/users";
const BASE_USER_API_URL = "https://api.github.com/users"

const usersList = document.getElementById("users-list");
const searchTextInput = document.getElementById("search-text");
const searchBtn = document.getElementById("search-btn");
const spinner = document.getElementById("spinner");
const noResultPara = document.getElementById("empty-result-para");

searchTextInput.addEventListener('keyup', e => {
    if (e.keyCode == 13) {
        startSearch();
    }
});

const toggleNoResult = function() {
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

function populateDOMWithResult(userData) {
    // Could have used template string but I'll stick to the hard
    // way just this time
    
    const enclosingListItem = document.createElement('li');

    const userItem = document.createElement('div');
    userItem.classList.add("user-item");
    
    const image = document.createElement('img');
    image.classList.add("user-item-avatar");
    image.src = userData.imgSrc;
    image.alt = userData.imgAlt;
    // Put image into userItem
    userItem.appendChild(image);
    
    const userInfoDiv = document.createElement('div');
    userInfoDiv.classList.add("user-info");
    // Put userInfoDiv into userItem
    userItem.appendChild(userInfoDiv);
    
    const userItemName = document.createElement('h3');
    userInfoDiv.classList.add("user-item-name");
    const userItemNameTextNode = document.createTextNode(userData.name);
    // Put text node inside h3
    userItemName.appendChild(userItemNameTextNode);
    // Put userItemName into userInfoDiv
    userInfoDiv.appendChild(userItemName);
    
    const userItemLogin = document.createElement("h5");
    userItemLogin.classList.add("user-item-login");
    const userItemLoginTextNode = document.createTextNode(userData.login);
    // Put text into h5
    userItemLogin.appendChild(userItemLoginTextNode);
    // Put userItemLogin into userInfoDiv
    userInfoDiv.appendChild(userItemLogin);
    
    const userStatsDiv = document.createElement('div');
    userStatsDiv.classList.add("user-stats");
    // Put userStatsDiv into userInfoDiv
    userInfoDiv.appendChild(userStatsDiv);
    
    const following = document.createElement('h4');
    following.classList.add("user-item-following");
    const followingTextNode = document.createTextNode(userData.following);
    // Put textNode into following
    following.appendChild(followingTextNode);
    // Put following into userStatsDiv
    userStatsDiv.appendChild(following);
    
    const followers = document.createElement('h4');
    followers.classList.add("user-item-followers");
    const followersTextNode = document.createTextNode(userData.followers);
    // Put textNode into followers
    followers.appendChild(followersTextNode);
    // Put followers into userStatsDiv
    userStatsDiv.appendChild(followers);
    
    const repos = document.createElement('h4');
    repos.classList.add("user-item-repos");
    const reposTextNode = document.createTextNode(userData.repos);
    // Put textNode into repos
    repos.appendChild(reposTextNode);
    // Put repos into userStatsDiv
    userStatsDiv.appendChild(repos);
    
    const userBio = document.createElement('p');
    userBio.classList.add("user-bio");
    // Put userBio into userItem
    userItem.appendChild(userBio);
    
    const userLinks = document.createElement('div');
    userLinks.classList.add("user-links");
    // Put userLinks into userItem
    userItem.appendChild(userLinks);
    
    const twitterProfile = document.createElement('a');
    twitterProfile.classList.add("user-item-twitter-profile");
    twitterProfile.setAttribute("href", `${userData.twitter}`);
    twitterProfile.setAttribute("target", "_blanck");
    const twitterProfileTextNode = document.createTextNode("Twitter Profile");
    // Put twitterProfileTextNode into twitterProfile
    twitterProfile.appendChild(twitterProfileTextNode);
    // Put twitterProfile into userLinks
    userLinks.appendChild(twitterProfile);
    
    const githubProfile = document.createElement('a');
    githubProfile.classList.add("user-item-github-profile");
    githubProfile.setAttribute("href", `${userData.github}`);
    githubProfile.setAttribute("target", "_blanck");
    const githubProfileTextNode = document.createTextNode("Github Profile");
    // Put githubProfileTextNode into githubProfile
    githubProfile.appendChild(githubProfileTextNode);
    // Put githubProfile into userLinks
    userLinks.appendChild(githubProfile);
}

const anim = toggleAnimation();

function toggleInputsDisabled() {
    searchTextInput.disabled = !searchTextInput.disabled;
    searchBtn.disabled = !searchBtn.disabled;
    anim.toggleVisibility();
}

function fetchMore(userUrl, data) {
    let userData = function() {
        this.github: github, // html_url
        this.avatar: avatar, // avatar_url
        this.login: login, // login
        
        this.following: following, // following
        this.followers: followers, // followers
        this.repos: repos, // public_repos
        this.bio: bio, // bio
        this.twitter: twitter, // twitter_username
        this.name: name, // name
        this.hirable: hireable, // hireable
        this.type: type // type
    };
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
