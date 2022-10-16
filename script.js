const url = "https://api.tvmaze.com/shows/82/episodes";
const allEpisodes = [];
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((episode) => {
      allEpisodes.push(episode);
    });
  })
  .then((window.onload = setup()));
// Setting up
function setup() {
  let episodeSelector = document.getElementById("episodeSelector");
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
}

// Creating a box of episode details
function makePageForEpisodes(episode) {
  let episodeGrid = document.querySelector("#episodeGrid");
  let episodeDiv = document.createElement("div");
  episodeDiv.className = "episode";
  episodeGrid.appendChild(episodeDiv);
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

let searchInput = document.getElementById("search");
// Creating a function to filter array of objs based on the search and showing the result
function filterAndCreateEpisodeBox(e, allEpisodes) {
  let searchWord = e.target.value;
  let validSearchCount = document.getElementById("validSearchCount");
  let validEpisodes = allEpisodes.filter((episode) => {
    return (
      episode.name.includes(searchWord) ||
      episode.summary.includes(searchWord) ||
      episode.name.toLowerCase().includes(searchWord) ||
      episode.summary.toLowerCase().includes(searchWord)
    );
  });
  let validEpisodesLength = validEpisodes.length;
  validSearchCount.innerText = `Displaying ${validEpisodesLength}/73 episodes`;
  // Declaring a function just to clear the page from all episodes
  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
  // Defining the parent of episodes
  let episodeGrid = document.querySelector("#episodeGrid");
  // Deleting all episodes
  removeAllChildNodes(episodeGrid);
  // creating box of episode details
  validEpisodes.forEach((episode) => {
    makePageForEpisodes(episode);
  });
}

// Adding Event listener for Select input
episodeSelector.addEventListener("input", (e) => {
  let selectID = e.target.value;
  let validSearchCount = document.getElementById("validSearchCount");
  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
  let episodeGrid = document.querySelector("#episodeGrid");
  if (selectID === "false") {
    removeAllChildNodes(episodeGrid);
    allEpisodes.forEach((episode) => {
      makePageForEpisodes(episode);
    });
    validSearchCount.innerText = `Displaying 73/73 episodes`;
  }
  if (selectID && selectID !== "false") {
    let selectedEpisode = allEpisodes.filter((episode) => {
      if (selectID == episode.id) {
        return episode;
      }
    });
    removeAllChildNodes(episodeGrid);
    selectedEpisode.forEach((episode) => {
      makePageForEpisodes(episode);
    });
    validSearchCount.innerText = `Displaying 1/73 episodes`;
  }
});

// Adding event listener for reset button
let svgIcon = document.getElementById("svgIcon");
svgIcon.addEventListener("click", (e) => {
  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
  let episodeGrid = document.querySelector("#episodeGrid");
  removeAllChildNodes(episodeGrid);
  allEpisodes.forEach((episode) => {
    makePageForEpisodes(episode);
  });
  validSearchCount.innerText = `Displaying 73/73 episodes`;
});

// Adding event listener for Search input
searchInput.addEventListener("input", (e) =>
  filterAndCreateEpisodeBox(e, allEpisodes)
);

window.onload = setup;
