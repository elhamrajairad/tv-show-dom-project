// select element from DOM:
const cardsEl = document.querySelector(".cards");
const searchEl = document.getElementById("search");
const filterEl = document.getElementById("filter");
const searchCountEl = document.querySelector(".form__count__result");
//global variable:
let episodes = [];
const URL = "https://api.tvmaze.com/shows/5/episodes";

const filterResponse = {
  search: "",
  filter: "",
};
// render data to DOM:
function renderData(data) {
  const result = data
    .map((item) => {
      return `<a href="${item.url}" class="${item.name}">
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
    })
    .join("");
  cardsEl.innerHTML = result;
}
// send request to API:
async function sendRequest() {
  const response = await fetch(URL);
  try {
    episodes = await response.json();
    renderData(episodes);
  } catch (error) {
    console.log(error);
  }
}
// search data:
searchEl.addEventListener("input", (e) => {
  filterResponse.search = e.target.value;
  const filterSearch = episodes.filter((film) => {
    return (
      film.name.toLowerCase().includes(filterResponse.search.toLowerCase()) ||
      film.summary.toLowerCase().includes(filterResponse.search.toLowerCase())
    );
  });
  renderData(filterSearch);
  if (filterSearch.length > 0) {
    searchCountEl.textContent = `${filterSearch.length} items found 😍`;
  } else {
    searchCountEl.textContent = `not found 🙄`;
  }
  if (filterResponse.search == "") {
    searchCountEl.textContent = "";
  }
});
// filter episod:
filterEl.addEventListener("change", (e) => {
  filterResponse.filter = e.target.value;
  const result = episodes.filter((film) => {
    if (filterResponse.filter == 0) {
      return true;
    } else {
      return film.season == filterResponse.filter;
    }
  });
  renderData(result);
});

// fetch data:
sendRequest();
