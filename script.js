const url = "https://api.tvmaze.com/shows/82/episodes";
let allEpisodes = [];
const allShows = getAllShows();
let contentGrid = document.querySelector("#episodeGrid");
let episodeSelector = document.getElementById("episodeSelector");
let showSelect = document.getElementById("showSelect");
let searchInput = document.getElementById("search");
let validSearchCount = document.getElementById("validSearchCount");
let svgIcon = document.getElementById("svgIcon");
let backHomeBtn = document.getElementById("backHomeBtn");
let filterShow = document.getElementById("filterShow");
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((episode) => {
      allEpisodes.push(episode);
    });
  })
  .finally((window.onload = showListSetup));

// Setting up
function setup() {
  allEpisodes.forEach((episode) => {
    makePageForEpisodes(episode);
    // Creating options using JS, so HTMl wont get too, making big 73options elements
    let option = document.createElement("option");
    option.setAttribute("value", episode.id);
    let episodeName = document.createElement("span");
    episodeName.innerText = episode.name;
    let episodeNumber = document.createElement("span");
    let currentSeason = episode.season;
    let currentEpisode = episode.number;
    if (currentSeason <= 9 && currentEpisode > 9) {
      episodeNumber.innerText = ` - S0${currentSeason}E${currentEpisode}`;
    } else if (currentSeason > 9 && currentEpisode <= 9) {
      episodeNumber.innerText = ` - S${currentSeason}E0${currentEpisode}`;
    } else if (currentEpisode <= 9 && currentEpisode <= 9) {
      episodeNumber.innerText = ` - S0${currentSeason}E0${currentEpisode}`;
    }
    option.appendChild(episodeName);
    option.appendChild(episodeNumber);
    episodeSelector.appendChild(option);
  });
  let validShowList = [];
  allShows.forEach((show) => {
    validShowList.push(show.name);
  });
  validShowListSorted = validShowList.sort();
  validShowListSorted.forEach((showName) => {
    let showOption = document.createElement("option");
    showOption.setAttribute("value", showName);
    showOption.innerText = showName;
    showSelect.appendChild(showOption);
  });
}
//Testing
function makePageForShows(show) {
  let showDiv = document.createElement("div");
  showDiv.className = "episode";
  contentGrid.appendChild(showDiv);
  let showTitle = document.createElement("div");
  showTitle.setAttribute("value", show.id);
  showTitle.addEventListener("click", (e) => {
    removeAllChildNodes(contentGrid);
    removeAllChildNodes(episodeSelector);
    urlShow = `https://api.tvmaze.com/shows/${show.id}/episodes`;
    function buildNewShowList(data) {
      setup(data);
      validSearchCount.innerText = `Displaying ${data.length}/${data.length} episodes`;
    }
    fetch(urlShow)
      .then((response) => response.json())
      .then((data) => {
        allEpisodes = data;
        buildNewShowList(data);
      });
  });
  showTitle.className = "episodeTitle";
  let showName = document.createElement("span");
  showName.setAttribute("id", "episodeName");
  showTitle.appendChild(showName);
  showName.innerText = show.name;
  showDiv.appendChild(showTitle);
  let showImg = document.createElement("img");
  showImg.className = "episodeimg";
  showImg.setAttribute("src", show.image.medium);
  showImg.setAttribute("style", "padding-top: 1.1rem; width: 90%;");
  showDiv.appendChild(showImg);
  let showSummary = document.createElement("p");
  showSummary.className = "episodeParagraph";
  showSummary.innerHTML = show.summary;
  let showGenre = document.createElement("p");
  showGenre.className = "showGenre";
  showGenre.innerText = `Show genre: ${show.genres}`;
  let showStatus = document.createElement("p");
  showStatus.innerText = `Show Status: ${show.status}`;
  showStatus.className = "showStatus";
  let showRating = document.createElement("p");
  showRating.innerText = `Show Rating: ${show.rating.average}`;
  showRating.className = "showRating";
  let showRuntime = document.createElement("p");
  showRuntime.className = "showRuntime";
  showRuntime.innerText = `Show runtime: ${show.runtime}minutes`;
  showDiv.appendChild(showRuntime);
  showDiv.appendChild(showRating);
  showDiv.appendChild(showStatus);
  showDiv.appendChild(showGenre);
  showDiv.appendChild(showSummary);
}

// Testing
function showListSetup() {
  allShows.forEach((show) => {
    makePageForShows(show);
  });
}
// Testing
// Creating a box of episode details
function makePageForEpisodes(episode) {
  let episodeDiv = document.createElement("div");
  episodeDiv.className = "episode";
  contentGrid.appendChild(episodeDiv);
  let episodeTitle = document.createElement("div");
  episodeTitle.className = "episodeTitle";
  let episodeName = document.createElement("span");
  episodeName.setAttribute("id", "episodeName");
  episodeTitle.appendChild(episodeName);
  episodeName.innerText = episode.name;
  let episodeNumber = document.createElement("span");
  episodeNumber.setAttribute("id", "episodeNumber");
  episodeTitle.appendChild(episodeNumber);
  let currentSeason = episode.season;
  let currentEpisode = episode.number;
  if (currentSeason <= 9 && currentEpisode > 9) {
    episodeNumber.innerText = ` - S0${currentSeason}E${currentEpisode}`;
  } else if (currentSeason > 9 && currentEpisode <= 9) {
    episodeNumber.innerText = ` - S${currentSeason}E0${currentEpisode}`;
  } else if (currentEpisode <= 9 && currentEpisode <= 9) {
    episodeNumber.innerText = ` - S0${currentSeason}E0${currentEpisode}`;
  }
  episodeDiv.appendChild(episodeTitle);
  let episodeImg = document.createElement("img");
  episodeImg.className = "episodeimg";
  episodeImg.setAttribute("src", episode.image.medium);
  episodeImg.setAttribute("style", "padding-top: 1.1rem; width: 90%;");
  episodeDiv.appendChild(episodeImg);
  let episodeParagraph = document.createElement("p");
  episodeParagraph.className = "episodeParagraph";
  episodeDiv.appendChild(episodeParagraph);
  episodeParagraph.innerHTML = episode.summary;
}
// Creating a function to filter array of objs based on the search and showing the result
function filterAndCreateEpisodeBox(e, allEpisodes) {
  let searchWord = e.target.value;
  let validEpisodes = allEpisodes.filter((episode) => {
    return (
      episode.name.includes(searchWord) ||
      episode.summary.includes(searchWord) ||
      episode.name.toLowerCase().includes(searchWord) ||
      episode.summary.toLowerCase().includes(searchWord)
    );
  });
  let validEpisodesLength = validEpisodes.length;
  validSearchCount.innerText = `Displaying ${validEpisodesLength}/${allEpisodes.length} episodes`;
  // Deleting all episodes
  removeAllChildNodes(contentGrid);
  // creating box of episode details
  validEpisodes.forEach((episode) => {
    makePageForEpisodes(episode);
  });
}
// Adding Event listener for Select input
episodeSelector.addEventListener("input", (e) => {
  let selectID = e.target.value;
  if (selectID === "false") {
    removeAllChildNodes(contentGrid);
    allEpisodes.forEach((episode) => {
      makePageForEpisodes(episode);
    });
    validSearchCount.innerText = `Displaying ${allEpisodes.length}/${allEpisodes.length} episodes`;
  }
  if (selectID && selectID !== "false") {
    let selectedEpisode = allEpisodes.filter((episode) => {
      if (selectID == episode.id) {
        return episode;
      }
    });
    removeAllChildNodes(contentGrid);
    selectedEpisode.forEach((episode) => {
      makePageForEpisodes(episode);
    });
    validSearchCount.innerText = `Displaying 1/${allEpisodes.length} episodes`;
  }
});
// Adding event listener for show select
showSelect.addEventListener("input", (e) => {
  removeAllChildNodes(contentGrid);
  removeAllChildNodes(episodeSelector);
  let showID = e.target.value;
  let urlShow = "";
  allShows.forEach((show) => {
    if (show.name == showID) {
      urlShow = `https://api.tvmaze.com/shows/${show.id}/episodes`;
    } else if (showID === "false") {
      // urlShow = "https://api.tvmaze.com/shows/82/episodes";
      removeAllChildNodes(contentGrid);
      removeAllChildNodes(episodeSelector);
      let defaultOption = document.createElement("option");
      defaultOption.setAttribute("value", "false");
      defaultOption.setAttribute("id", "deafultOption");
      defaultOption.innerText = "Select Episode";
      episodeSelector.appendChild(defaultOption);
      showListSetup();
    }
  });
  function buildNewShowList(data) {
    setup(data);
    validSearchCount.innerText = `Displaying ${data.length}/${data.length} episodes`;
  }
  fetch(urlShow)
    .then((response) => response.json())
    .then((data) => {
      allEpisodes = data;
      buildNewShowList(data);
    });
});
// Adding event listener for reset button
svgIcon.addEventListener("click", (e) => {
  removeAllChildNodes(contentGrid);
  allEpisodes.forEach((episode) => {
    makePageForEpisodes(episode);
  });
  validSearchCount.innerText = `Displaying ${allEpisodes.length}/${allEpisodes.length} episodes`;
});
// Adding event listener for Search input
searchInput.addEventListener("input", (e) => {
  filterAndCreateEpisodeBox(e, allEpisodes);
});
backHomeBtn.addEventListener("click", (e) => {
  removeAllChildNodes(contentGrid);
  removeAllChildNodes(episodeSelector);
  removeAllChildNodes(showSelect);
  let defaultOption = document.createElement("option");
  defaultOption.setAttribute("value", "false");
  defaultOption.setAttribute("id", "deafultOption");
  defaultOption.innerText = "Select Episode";
  episodeSelector.appendChild(defaultOption);
  validSearchCount.innerText = "Displaying 0/73 episodes";
  let defaultShowOption = document.createElement("option");
  defaultShowOption.setAttribute("id", "deafultShowOption");
  defaultShowOption.setAttribute("value", "false");
  defaultShowOption.innerText = "Select Show";
  showSelect.appendChild(defaultShowOption);
  let validShowList = [];
  allShows.forEach((show) => {
    validShowList.push(show.name);
  });
  validShowListSorted = validShowList.sort();
  validShowListSorted.forEach((showName) => {
    let showOption = document.createElement("option");
    showOption.setAttribute("value", showName);
    showOption.innerText = showName;
    showSelect.appendChild(showOption);
  });
  validSearchCount.innerText = "Displaying 0/0 episodes";
  showListSetup();
});
filterShow.addEventListener("input", (e) => {
  let searchWord = e.target.value;
  console.log(searchWord);
  if (searchWord.length === 0) {
    window.onload = showListSetup();
  }
  let allShow = [];
  allShows.forEach((element, index, array) => {
    element.genres.forEach((genre) => {
      if (genre.toLowerCase() === searchWord || genre === searchWord) {
        allShow.push(element);
      }
    });
    if (element.name.toLowerCase().includes(searchWord.toLowerCase())) {
      allShow.push(element);
    }
    if (element.summary.toLowerCase().includes(searchWord.toLowerCase())) {
      allShow.push(element);
    }
  });
  console.log(allShow);
  removeAllChildNodes(contentGrid);
  allShow.forEach((show) => {
    makePageForShows(show);
  });
});
window.onload = setup;
