let lastLocationSearched = "";

const BASE_API_URL = "https://api.github.com/search/users";
const BASE_USER_API_URL = "https://api.github.com/users"

const devsLocationHeader = document.getElementById("devs-loc");
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

function showSearchLoc() {
    const devsLocTextNode = document.createTextNode(`Showing Developers in "${lastLocationSearched.trim().toUpperCase()}"`);
    
    // Remove all child nodes
    while(devsLocationHeader.firstChild) {
        devsLocationHeader.removeChild(devsLocationHeader.firstChild);
    }
    
    // Put new textNode into devsLocationHeader
    devsLocationHeader.appendChild(devsLocTextNode);
}

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

const anim = toggleAnimation();

const toggleNoResult = function() {
    let toggleCount = 0;
    const initialState = "block";
    let mutableState = initialState;
    noResultPara.style.display = mutableState;
    
    function toggle(state) {
    
        if (state && (state == "none" || state == "block")) {
            mutableState = state;
            noResultPara.style.display = mutableState;
            return;
        }
        
        if (toggleCount > 0) {
            return;
        }
        
        if (mutableState === initialState) {
            mutableState = "none";
            noResultPara.style.display = mutableState;
        } else {
            mutableState = initialState;
            noResultPara.style.display = mutableState;
        }
        
        toggleCount++;
    }
    
    return toggle;
}();

function populateDOMWithResult(userData) {
    // Could have used template string but I'll stick to the hard
    // way just this time
    
    const afterImageDiv = document.createElement('div');
    afterImageDiv.classList.add("after-image-div");
    
    const enclosingListItem = document.createElement('li');

    const userItem = document.createElement('div');
    userItem.classList.add("user-item");
    
    const image = document.createElement('img');
    image.classList.add("user-item-avatar");
    image.src = userData.avatar;
    image.alt = userData.alt;
    // Put image into userItem
    userItem.appendChild(image);
    
    userItem.appendChild(afterImageDiv);
    
    const userInfoDiv = document.createElement('div');
    userInfoDiv.classList.add("user-info");
    // Put userInfoDiv into userItem
    afterImageDiv.appendChild(userInfoDiv);
    
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
    const followingTextNode = document.createTextNode("Following: " + userData.following);
    // Put textNode into following
    following.appendChild(followingTextNode);
    // Put following into userStatsDiv
    userStatsDiv.appendChild(following);
    
    const followers = document.createElement('h4');
    followers.classList.add("user-item-followers");
    const followersTextNode = document.createTextNode("Followers: " + userData.followers);
    // Put textNode into followers
    followers.appendChild(followersTextNode);
    // Put followers into userStatsDiv
    userStatsDiv.appendChild(followers);
    
    const repos = document.createElement('h4');
    repos.classList.add("user-item-repos");
    const reposTextNode = document.createTextNode("Public Repos: " + userData.repos);
    // Put textNode into repos
    repos.appendChild(reposTextNode);
    // Put repos into userStatsDiv
    userStatsDiv.appendChild(repos);
    
    const userBio = document.createElement('p');
    userBio.classList.add("user-bio");
    const userBioTextNode = document.createTextNode(userData.bio);
    //Put textNode into userBio
    userBio.appendChild(userBioTextNode);
    // Put userBio into userItem
    afterImageDiv.appendChild(userBio);
    
    const userItemExtra = document.createElement('div');
    userItemExtra.classList.add("user-item-extra");
    // Put userItemExtra into userItem
    afterImageDiv.appendChild(userItemExtra);
    
    const type = document.createElement('h4');
    type.classList.add("user-item-type");
    const typeTextNode = document.createTextNode("Account Type: " + userData.type);
    // Put typeTextNode into type
    type.appendChild(typeTextNode);
    // Put type into userItemExtra
    userItemExtra.appendChild(type);
    
    const hireable = document.createElement('h4');
    hireable.classList.add("user-item-hireable");
    const hireableTextNode = document.createTextNode(userData.hireable ? "Hireable" : "Unavailable");
    // Put hireableTextNode into hireable
    hireable.appendChild(hireableTextNode);
    // Put hireable into userItemExtra
    userItemExtra.appendChild(hireable);
    
    const userLinks = document.createElement('div');
    userLinks.classList.add("user-links");
    // Put userLinks into userItem
    afterImageDiv.appendChild(userLinks);
    
    const twitterProfile = document.createElement('a');
    twitterProfile.classList.add("user-item-twitter-profile");
    twitterProfile.setAttribute("href", `https://twitter.com/${userData.twitter}`);
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
    
    // enclose the userItem within an li
    enclosingListItem.appendChild(userItem);
    
    // add enclosingListItem to userList
    usersList.appendChild(enclosingListItem);
    
    showSearchLoc();
    
}

function toggleInputsDisabled() {
    searchTextInput.disabled = !searchTextInput.disabled;
    searchBtn.disabled = !searchBtn.disabled;
    anim.toggleVisibility();
}

function fetchMore(userUrl) {
    let UserData = function(data) {
        this.github = data.github; // html_url
        this.avatar = data.avatar; // avatar_url
        this.login = data.login; // login
        this.alt = `${this.login}'s avatar`;
        
        this.following = data.following; // following
        this.followers = data.followers; // followers
        this.repos = data.repos; // public_repos
        this.bio = data.bio; // bio
        this.twitter = data.twitter; // twitter_username
        this.name = data.name; // name
        this.hireable = data.hireable; // hireable
        this.type = data.type; // type
    };
    
    fetchMoreExt(userUrl).then(res => {
        if (!res || !res.status == 200) {
            if (res.status == 403) {
                toggleNoResult("none");
                return;
            }
        }
        res.json().then(data => {
        
            let model = {
                github: data.html_url,
                avatar: data.avatar_url,
                login: data.login,
                following: data.following,
                followers: data.followers,
                repos: data.public_repos,
                bio: data.bio,
                twitter: data.twitter_username,
                name: data.name,
                hireable: data.hireable,
                type: data.type
            };
            console.log(model);
            value = new UserData(model);
            // Start working
            populateDOMWithResult(value);
            
        });
        
    });
    
}

async function fetchMoreExt(url) {
    const result = await fetch(url);
    return result;
}

function startSearch(event) {
    clearUsersList();
    toggleInputsDisabled();
    getUsersByLocation(searchTextInput.value.trim()).then(function(res) {
        res.json().then(data => {
            showSearchLoc();
            if (data.items.length < 1) {
                anim.toggleVisibility();
                toggleNoResult("block");
                return;
            }
            
            for (item of data.items) {
                fetchMore(item.url);
                if (res.status == 403) {
                    console.log("RetVal", retVal);
                    alert("Search rate limit exceeded");
                    break;
                }
            }
            
            toggleNoResult(null);
            toggleInputsDisabled();
            
        });
    });
    lastLocationSearched = searchTextInput.value;
    searchTextInput.value = "";
}

function clearUsersList() {
    while(usersList.firstChild) {
        usersList.removeChild(usersList.firstChild);
    }
}

searchBtn.addEventListener('click', startSearch);

async function getUsersByLocation(loc) {
    const result = await fetch(`${BASE_API_URL}?q=location:${loc}`);
    return result;
}
