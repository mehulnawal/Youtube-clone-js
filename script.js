/*
show yt video on search ✅
toggle between categories ✅
view,  trim title ✅
remove toggle on pressing backspace in search input ✅
add to watch later button toggle ✅
save watch later to localStorage ✅
hide previous search data on every search ✅
theme toggle ✅
show text of "search for viewing videos" ✅
onClick the video should redirect to original video on yt ✅
duration & video uploaded  ✅
toast animation on performing any functionality ✅
music on saving watch later✅
search and filter in watch later ✅
show search in - dropdown✅
if data if taking time in fetch - a message should be displayed - show loader ✅
responsiveness ✅
// on selecting category then entering value in input the data is not fetched(); ✅
also if quota is finished for that day then is should show warning ✅
add to proper videos in watch later
can remove from watch later
*/

// theme toggle
let darkTheme = document.getElementById("darkTheme");
let lightTheme = document.getElementById("lightTheme");
let body = document.querySelector("body");
let header = document.querySelector("header");
let category = document.getElementById("category");
let watchLaterIcon = document.getElementById("watchLaterIcon");
let title = document.querySelector("#title h1");
let search = document.querySelector("#search input");
let noResultMessages = document.querySelector("#noResultMessage");
let loaderMain = document.getElementById("loaderMain");
let loader = true;

watchLaterIcon.addEventListener('click', function () {
    window.location.href = "watchLater.html";
});

darkTheme.addEventListener("click", function () {
    this.style.display = "none";
    lightTheme.style.display = "block";
    body.style.backgroundColor = "#FFFFFF";
    header.style.backgroundColor = "#FFFFFF";
    title.style.color = "#0F0F0F";
    search.style.color = "#0F0F0F";
    category.style.borderTopColor = "#e5e5e5";
    category.style.borderBottomColor = "#e5e5e5";
    watchLaterIcon.style.color = "#000"
    noResultMessages.style.color = "#000";
    document.querySelector("h1 a").style.color = "#000";
    sessionStorage.setItem("Theme", "Light");
});

lightTheme.addEventListener("click", function () {
    this.style.display = "none";
    darkTheme.style.display = "block";
    body.style.backgroundColor = "#0F0F0F";
    header.style.backgroundColor = "#0F0F0F";
    category.style.borderTopColor = "#303030"
    category.style.borderBottomColor = "#303030"
    title.style.color = "#fff";
    search.style.color = "#fff";
    watchLaterIcon.style.color = "#fff"
    noResultMessages.style.color = "#fff";
    document.querySelector("h1 a").style.color = "#fff";
    sessionStorage.setItem("Theme", "Dark");
});

function getTheme() {
    let get = sessionStorage.getItem("Theme");

    if (get == "Light") {
        darkTheme.style.display = "none";
        lightTheme.style.display = "block";
        body.style.backgroundColor = "#FFFFFF";
        header.style.backgroundColor = "#FFFFFF";
        title.style.color = "#0F0F0F";
        search.style.color = "#0F0F0F";
        category.style.borderTopColor = "#e5e5e5"
        category.style.borderBottomColor = "#e5e5e5"
        watchLaterIcon.style.color = "#000"
        noResultMessages.style.color = "#000";
        document.querySelector("h1 a").style.color = "#000";
        sessionStorage.setItem("Theme", "Light");
    }
    else {
        lightTheme.style.display = "none";
        darkTheme.style.display = "block";
        body.style.backgroundColor = "#0F0F0F";
        header.style.backgroundColor = "#0F0F0F";
        category.style.borderTopColor = "#303030"
        category.style.borderBottomColor = "#303030"
        title.style.color = "#fff";
        search.style.color = "#fff";
        watchLaterIcon.style.color = "#fff"
        noResultMessages.style.color = "#fff";
        document.querySelector("h1 a").style.color = "#fff";
        sessionStorage.setItem("Theme", "Dark");
    };
};
getTheme();

// category toggle
let categoryCard = document.querySelectorAll(".categoryCard");
let categorySelect = 0;

for (let value of categoryCard) {
    value.addEventListener("click", function () {
        for (let card of categoryCard) {
            card.classList.remove("categoryCardToggle")
        }

        value.classList.add("categoryCardToggle")
        categorySelect = 1;
        localStorage.setItem("categoryValue", value.innerText);
        categorySearchValue()
    });
}

let searchInput = document.getElementById("searchInput");
let searchValue = "";
let videoBody = document.getElementById("videoBody");
let videoArray = [];

document.getElementById("showWarning").style.display = "none";

searchInput.addEventListener("keypress", async function (event) {
    searchValue = searchInput.value;
    for (let card of categoryCard) {
        card.classList.remove("categoryCardToggle")
    }
    if (event.key == "Enter") {
        videoBody.innerHTML = "";
        loaderMain.style.display = "block";

        try {
            await loadSearchData();
            loaderMain.style.display = "none";
        } catch (error) {
            document.getElementById("showWarning").style.display = "block";
            loaderMain.style.display = "block";
        }

        // if (loader == true) {
        // }
        // else {
        // }
    }
});

searchInput.addEventListener("keydown", function (event) {
    searchValue = searchInput.value;

    if (event.key === "Backspace") {
        for (let card of categoryCard) {
            card.classList.remove("categoryCardToggle")
        }
    }
});

let searchDiv = document.getElementById("searchDiv");
searchDiv.addEventListener("click", function () {
    videoBody.innerHTML = "";
    loadSearchData();
    if (loader == true) {
        loaderMain.style.display = "none";
    }
    else {
        loaderMain.style.display = "block";
    }
});

function categorySearchValue() {
    let categoryLocalStorage = localStorage.getItem("categoryValue");

    if (categoryLocalStorage) {
        searchValue = localStorage.getItem("categoryValue");
        searchInput.value = localStorage.getItem("categoryValue");
    }
};

let card = "";
let videoId = 0;
let watchLaterArray = JSON.parse(localStorage.getItem("WatchLater")) || [];
let noResultMessage = document.getElementById("noResultMessage");
let duration = "";
let videoUploaded = "";
let hoursData = "";
let minutesData = "";
let secondsData = "";

async function loadSearchData() {


    loader = false;
    noResultMessage.style.display = "none"
    let maxVideo = 50;
    const apiKey = "AIzaSyCVKvuOKkrK5rA2nRcoiqWzj1aDWf422Ts";

    URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxVideo}&q=${searchValue}&type=video&key=${apiKey}`;

    localStorage.removeItem("categoryValue");

    videoBody.innerHTML = "";
    card = "";

    let response = await fetch(URL);
    let data = await response.json();
    // console.log(data);

    for (let value of data.items) {

        let videoIdApi = value["id"]["videoId"];

        async function statsFunc(videoIdApi) {

            let URL = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIdApi}&key=${apiKey}`;

            let statsResponse = await fetch(URL);
            let statsValue = await statsResponse.json();

            videoBody.innerHTML = "";
            for (let sValue of statsValue.items) {

                duration = sValue["contentDetails"]["duration"];
                let constDuration = durationFun(duration);

                videoUploaded = sValue["snippet"]["publishedAt"];
                let videoUploadedFunc = uploadedFun(videoUploaded);

                let viewsData = 0;
                let views = Number(sValue["statistics"]["viewCount"]);

                if (views < 1000) {
                    viewsData = views;
                }
                else if (views >= 1000 && views < 1000000) {
                    viewsData = (views / 1000).toFixed(1) + "K";
                }
                else if (views >= 1000000 && views < 1000000000) {
                    viewsData = (views / 1000000).toFixed(1) + "M";
                }
                else if (views >= 1000000000) {
                    viewsData = (views / 1000000000).toFixed(1) + "B";
                }

                let tileValue = sValue["snippet"]["title"];
                let title = "";
                if (tileValue.length > 50) {
                    title = tileValue.slice(0, 50) + "..";
                }

                card += `<div class="col-lg-4 col-md-6 col-12">
                <div class="videoCard">
                    <div class="videoThumbnail">
                        <img src="${sValue["snippet"]["thumbnails"]["high"]["url"]}"
                            alt="">

                        <div class="videoThumbnailHover" videoId = ${videoIdApi}>
                        <a href="https://www.youtube.com/watch?v=${videoIdApi}">
                        <i class="fa-solid fa-play"></i>
                        </a>    
                        </div>

                        <div class="videoDuration">
                            <div class="videoHours">${constDuration}</div>
                        </div>
                    </div>

                    <div class="videoDescription">
                        <div class="title">${title}</div>

                        <div class="channel">${sValue["snippet"]["channelTitle"]}</div>

                        <div>
                            <div class="views">
                                <span class="viewsData">${viewsData}</span>
                                <span>views</span>
                            </div>

                            <div class="videoUploadedDate">
                                <span class="viewsData">${videoUploadedFunc}</span>
                            </div>
                        </div>

                        <div class="buttons d-flex gap-2 align-items-center">

                            <button type="button" class="saveToWatchLater">
                                <i class="fa-regular fa-clock"></i>
                                <span>Save to watch later</span>
                            </button>

                            <button type="button" class="savedLater">
                                <i class="fa-solid fa-check"></i>
                                <span>Saved</span>
                            </button>
                        </div>
                    </div>
                </div>
                         </div>`;

                videoId++;
                // videoArray.push(obj);

                videoBody.innerHTML = card;

                let obj = {
                    id: videoId,
                    videoId: videoIdApi,
                    thumbnail: sValue["snippet"]["thumbnails"]["high"]["url"],
                    title: sValue["snippet"]["title"],
                    channel: sValue["snippet"]["channelTitle"],
                    views: viewsData,
                    videoDuration: constDuration,
                    uploaded: videoUploadedFunc,
                    "search-value": searchValue,
                };

                let saveToWatchLater = document.querySelectorAll(".saveToWatchLater");
                for (let watchLaterBtn of saveToWatchLater) {
                    watchLaterBtn.addEventListener("click", function () {
                        this.style.display = "none";
                        this.nextElementSibling.style.display = "block";
                        watchLaterArray.push(obj);
                        localStorage.setItem("WatchLater", JSON.stringify(watchLaterArray));
                        watchLaterAmt.innerText = watchLaterArray.length;
                        toastAnimation();
                    });
                };
            };

            // 
            let videoCard = document.querySelectorAll(".videoCard");

            for (let value of videoCard) {
                value.addEventListener("mouseover", function () {
                    let hoverElement = value.querySelector(".videoThumbnailHover");
                    if (hoverElement) {
                        hoverElement.style.visibility = "visible";
                    };
                });

                value.addEventListener("mouseleave", function () {
                    let hoverElement = value.querySelector(".videoThumbnailHover");
                    if (hoverElement) {
                        hoverElement.style.visibility = "hidden";
                    }
                });
            }

        };

        statsFunc(videoIdApi);
    }

};


function durationFun(duration) {
    let hours = duration.indexOf("H");
    hoursData = "00";
    if (hours != -1) {
        hoursData = duration.substring(2, hours);
    }

    let minutes = duration.indexOf("M");
    minutesData = "00";
    if (hours != -1 && minutes != -1) {
        minutesData = duration.substring(hours + 1, minutes);
    }
    else if (hours == -1 && minutes != -1) {
        minutesData = duration.substring(3, minutes);
    }

    let seconds = duration.indexOf("S");
    secondsData = "00";
    if (hours != -1 && minutes != -1 && seconds != -1) {
        secondsData = duration.substring(minutes + 1, seconds);
    }
    else if (hours == -1 && minutes != -1 && seconds != -1) {
        secondsData = duration.substring(minutes + 1, seconds);
    }
    else if (hours == -1 && minutes == -1 && seconds != -1) {
        secondsData = duration.substring(3, seconds);
    }


    hoursData = hoursData.padStart(2, "0");
    minutesData = minutesData.padStart(2, "0");
    secondsData = secondsData.padStart(2, "0");

    if (hours != -1) {
        return `${hoursData}:${minutesData}:${secondsData}`;
    }
    else {
        return `${minutesData}:${secondsData}`;
    }
}

function uploadedFun(videoUploaded) {
    let videoYear = videoUploaded.slice(0, 4);
    // console.log(videoYear);

    let date = new Date();
    let todayYear = date.getFullYear();

    if (videoYear - todayYear != 0) {
        let a = String(videoYear - todayYear);
        let ab = a.substring(1,);
        return `${ab} years ago`;
    }
    else if (videoYear - todayYear == 0) {
        let todayMonth = date.getMonth() + 1;
        let videoMonth = parseInt(videoUploaded.slice(5, 7));
        let a = String(videoMonth - todayMonth).substring(1,);

        if (videoMonth - todayMonth != 0) {
            return `${a} months ago`;
        }
        else if (videoMonth - todayMonth == 0) {
            let todayDate = date.getDate();
            let videoDate = parseInt(videoUploaded.slice(8, 10));
            let a = String(videoDate - todayDate).substring(1,);

            if (videoDate - todayDate != 0) {
                return `${a} days ago`;
            }
            else if (videoDate - todayDate == 0) {
                return `today uploaded`;
            };
        };
    }
};

let watchLaterAmt = document.getElementById("watchLaterAmt");
let getWatchLater = JSON.parse(localStorage.getItem("WatchLater"));
watchLaterAmt.innerText = watchLaterArray.length;

// toast animations
let toastBody = document.getElementById("toastBody");
let popAudio = new Audio('pop-soundEffect.mp3');

function toastAnimation() {
    popAudio.play();
    let toast = document.createElement("div");
    toast.classList.add("toastCard");
    toast.innerHTML = `<i class='fa-regular fa-circle-check'></i>Added to watch later`;

    toastBody.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
};
