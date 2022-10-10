const allEpisodes = getAllEpisodes();
// Setting up
function setup() {
  allEpisodes.forEach((episode) => {
    makePageForEpisodes(episode);
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
// Filtering array of objs based on the search
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
// Adding event listener for input
searchInput.addEventListener("input", (e) => filterAndCreateEpisodeBox(e, allEpisodes));

window.onload = setup;
