//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  allEpisodes.forEach((episode) => {
    makePageForEpisodes(episode);
  });
}

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

window.onload = setup;
