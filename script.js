// select element from DOM:
const cardsEl = document.querySelector(".cards");
const searchEl = document.getElementById("search");
const filterEl = document.getElementById("filter");
//global variable:
const filterResponse = {
  search: "",
  filter: "",
};
// render data to DOM:
function renderData(data) {
  data.map((item) => {
    cardsEl.innerHTML += `<a href="${item.url}" class="${item.name}">
      <div class="cards__card">
                  <img src="${item.image.medium}"
                      alt="${item.name}">
                  <div
                      class="cards__card__details flex flex-direction-row align-items-center justify-content-space-between">
                      <span class="cards__card__details__name">${
                        item.name
                      }</span>
                      <span class="cards__card__details__season">S${
                        item.season.toString().length === 1
                          ? "0" + item.season
                          : item.season
                      }E${
      item.number.toString().length === 1 ? "0" + item.number : item.number
    }</span>
                  </div>
                  <summary>${item.summary}</summary>
                  </div>
      </a>`;
  });
}
// send request to API:
async function sendRequest() {
  const response = await fetch("https://api.tvmaze.com/shows/5/episodes");
  if (!response.status === 200) {
    throw "Error";
  } else {
    const responseJson = await response.json();
    return responseJson;
  }
}
// fetchData:
sendRequest().then((data) => {
  renderData(data);
  const cards = cardsEl.childNodes;
  // search Data
  searchEl.addEventListener("input", (e) => {
    filterResponse.search = e.target.value;
    cards.forEach((episod) => {
      if (
        !episod.className
          .toLowerCase()
          .includes(filterResponse.search.toLowerCase())
      ) {
        episod.classList.add("none");
      }
      if (!filterResponse.search) {
        episod.classList.remove("none");
      }
    });
  });
  // select season
  const seasonDetails = document.querySelectorAll(
    ".cards__card__details__season"
  );
  filterEl.addEventListener("change", (e) => {
    filterResponse.filter = e.target.value;
    seasonDetails.forEach((episod) => {
      if (!(episod.textContent.slice(2, 3) === filterResponse.filter)) {
        episod.parentElement.parentElement.parentElement.classList.add("none");
      }
      if (episod.textContent.slice(2, 3) === filterResponse.filter) {
        episod.parentElement.parentElement.parentElement.classList.remove(
          "none"
        );
      }
    });
  });
});
