import {
  auth,
  doc,
  updateDataGenre,
  db,
  userDocRef,
  updateDataSearchHistory,
  updateDataHistory,
} from "./data_base.js";

const myApi = "db5b8bfc146e2c55ab2417c30811f11f";

function movieSelected(id) {
  sessionStorage.setItem("movieId", id);
  window.location = "movie_data.html";
  return false;
}

function webseriesSelected(id) {
  sessionStorage.setItem("webseriesId", id);
  window.location = "web_series.html";
  return false;
}
window.movieSelected = movieSelected;
window.webseriesSelected = webseriesSelected;

function getMovie() {
  let movieId = sessionStorage.getItem("movieId");
  updateDataHistory(movieId);
  console.log(movieId);
  $(document).ready(function () {
    $.ajax({
      url: `https://api.themoviedb.org/3/movie/${movieId}?api_key=${myApi}&language=en-US&append_to_response=videos,credits`,
    }).then(function (data) {
      console.log(data);
      const currMovie = document.getElementById("movie-content");
      const currCast = document.getElementById("movie_cast");
      currCast.innerHTML = "";
      currMovie.innerHTML = "";

      try {
        const movie_name = data.title;
        const rating = data.vote_average;
        const photosId = data.poster_path;
        let photos = `http://image.tmdb.org/t/p/original${photosId}`;
        if (photosId === null || photosId === undefined)
          photos = "../images/show_placeholder.png";
        const description = data.overview;
        const time = data.runtime;
        const hrs = Math.floor(time / 60);
        const min = time % 60;
        const date = data.release_date;
        let genre = data.genres;
        if (genre != null) {
          for (let g of genre) {
            updateDataGenre(genreIdName[g["id"]]);
          }
        }
        genre = data.genres[0].name;
        const language = data.original_language;
        let video = data.url1;
        let video_link;
        // const production = data.production_companies[0].name;
        for (let i = 0; i < data.videos.results.length; i++) {
          if (data.videos.results[i].type == "Trailer") {
            video = data.videos.results[i].name;
            const key = data.videos.results[i].key;
            video_link = `https://www.youtube.com/embed/${key}?autoplay=1&mute=1&loop=forever`;
            console.log(i, video, key, video_link);
            break;
          }
        }
        currMovie.innerHTML = `     <div id="movie-data">
                                                  <div id="Img"><img src="${photos}" id="movieImg"/></div>
                                                  <div id="content">
                                                      <h1 id="movieHead">${movie_name}</h1>
                                                      <p style="color:rgba(255, 255, 255, 0.658);">${hrs} hrs ${min} min &#149; ${date} &#149; ${genre} &#149; ${language}</p>
                                                      <p>${description}</p>
                                                      <iframe src="${video_link}" id="trailer"></iframe>
                                                  </div>
                                              </div>
                                      `;
        for (let i = 0; i < data.credits.cast.length; i++) {
          try {
            const cast_name = data.credits.cast[i].name;
            const character_name = data.credits.cast[i].character;
            const photosId = data.credits.cast[i].profile_path;
            let photos = `http://image.tmdb.org/t/p/original${photosId}`;
            if (photosId === null || photosId === undefined)
              photos = "../images/show_placeholder.png";

            const card = document.createElement("div");
            card.classList.add("showCard");
            card.classList.add("col-2");
            card.innerHTML = `  
                                                      <img src="${photos}" class="card-img-top" alt="..." style="color:white; box-shadow: 2px 2px 2px 2px rgba(255, 255, 255, 0.1);width:10vw;">
                                                      <div class="card-body">
                                                      <h6 class="card-title" style="color:white;">${cast_name}</h6>
                                                      <p class="card-text" style="color:white;">${character_name}</p>
                                                      </div>
                                                      
                                                  `;
            currCast.appendChild(card);
          } catch (e) {
            console.log(e);
          }
        }
      } catch (e) {
        console.log(e);
      }
    });
  });
}

function getwebseries() {
  const webseriesId = sessionStorage.getItem("webseriesId");
  updateDataHistory(webseriesId);
  console.log(webseriesId);
  $(document).ready(function () {
    $.ajax({
      url: `https://api.themoviedb.org/3/tv/${webseriesId}?api_key=${myApi}&language=en-US&append_to_response=videos,credits`,
    }).then(function (data) {
      console.log(data);
      const currwebseries = document.getElementById("webseries-content");
      const currCast = document.getElementById("webseries_cast");
      currCast.innerHTML = "";
      currwebseries.innerHTML = "";

      try {
        const webseries_name = data.original_name;
        const rating = data.vote_average;
        const photosId = data.poster_path;
        let photos = `http://image.tmdb.org/t/p/original${photosId}`;
        if (photosId === null || photosId === undefined)
          photos = "../images/show_placeholder.png";
        const description = data.overview;
        const date = data.first_air_date;
        let genre = data.genres;
        if (genre != null) {
          for (let g of genre) {
            updateDataGenre(genreIdName[g["id"]]);
          }
        }
        genre = data.genres[0].name;
        const language = data.original_language;
        let video;
        let key;
        let video_link;
        // const production = data.production_companies[0].name;
        for (let i = 0; i < data.videos.results.length; i++) {
          if (data.videos.results[i].type == "Trailer") {
            video = data.videos.results[i].name;
            key = data.videos.results[i].key;
            video_link = `https://www.youtube.com/embed/${key}?autoplay=1&mute=1&loop=forever`;
            console.log(i, video, key, video_link);
            break;
          }
        }
        currwebseries.innerHTML = ` <div id="webseries-data">
                                                  <div id="Img">
                                                      <img src="${photos}" id="webseriesImg"/>
                                                  </div>
                                                  <div id="content">
                                                      <h1 id="webseriesHead">${webseries_name}</h1>
                                                      <p style="color:rgba(255, 255, 255, 0.658);"> ${date} &#149; ${genre} &#149; ${language}</p>
                                                      <p>${description}</p>
                                                      <iframe src="${video_link}" id="trailer"></iframe>
                                                  </div>
                                              </div>
                                      `;
        for (let i = 0; i < data.credits.cast.length; i++) {
          try {
            const cast_name = data.credits.cast[i].name;
            const character_name = data.credits.cast[i].character;
            const photosId = data.credits.cast[i].profile_path;
            let photos = `http://image.tmdb.org/t/p/original${photosId}`;
            if (photosId === null || photosId === undefined)
              photos = "../images/show_placeholder.png";

            const card = document.createElement("div");
            card.classList.add("showCard");
            card.classList.add("col-2");
            card.innerHTML = `  <img src="${photos}" class="card-img-top" alt="..." style="color:white; box-shadow: 2px 2px 2px 2px rgba(255, 255, 255, 0.1);width:10vw;">
                                              <div class="card-body">
                                                  <h6 class="card-title" style="color:white;">${cast_name}</h6>
                                                  <p class="card-text" style="color:white;">${character_name}</p>
                                              </div>
                                           `;
            currCast.appendChild(card);
          } catch (e) {
            console.log(e);
          }
        }
      } catch (e) {
        console.log(e);
      }
    });
  });
}
const genreIdName = {
  10759: "Action & Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  10762: "Kids",
  9648: "Mystery",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
  37: "Western",
  28: "Action",
  12: "Adventure",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
};

function search_result(value, genre, adult, language, sortby) {
  updateDataSearchHistory(value);
  let search_url = `https://api.themoviedb.org/3/search/multi?api_key=${myApi}&language=en-US&page=1&query=${value}`;
  // if (sortby !== null) {
  //   search_url += `&sort_by=${sortby}`;
  // }
  console.log(search_url);
  console.log(value, genre, adult, language, sortby);
  if (genre != null) {
    updateDataGenre(genreIdName[genre]);
  }
  $(document).ready(function () {
    $.ajax({
      url: search_url,
    }).then(function (data) {
      data = data.results;
      console.log(data);
      if (sortby !== null) {
        data = sort_data(data, sortby);
      }
      const cardDiv = document.getElementById("searchItems");
      cardDiv.innerHTML = "";

      for (let i = 0; i < data.length; i++) {
        try {
          if (data[i].media_type === "movie") {
            if (genre !== null && !data[i].genre_ids.includes(genre)) {
              console.log(i, data[i].id, "genre filtered");
              continue;
            }

            if (language !== null && data[i].original_language !== language) {
              console.log(i, data[i].id, "launguage filtered");
              continue;
            }

            if (adult !== null && data[i].adult !== adult) {
              console.log(i, data[i].id, "adult filtered");
              continue;
            }

            const movie_name = data[i].title;
            if (movie_name === undefined) {
              movie_name = data[i].original_name;
            }

            const rating = data[i].vote_average;
            if (rating === 0) continue;

            const photosId = data[i].poster_path;
            let photos = `http://image.tmdb.org/t/p/original${photosId}`;
            if (photosId === null || photosId === undefined)
              photos = "../images/show_placeholder.png";

            const card = document.createElement("div");
            card.classList.add("showCard");
            card.classList.add("col-3");
            card.innerHTML = `
                                      <a href="movie_data.html" onclick="movieSelected(${data[i].id})" style="text-decoration: none;">
                                          <img src="${photos}" class="card-img-top" alt="..." style="color:white; box-shadow: 2px 2px 2px 2px rgba(255, 255, 255, 0.1);">
                                          <div class="card-body">
                                              <h6 class="card-title" style="color:white;">${movie_name}</h6>
                                              <p class="card-text" style="color:white;">Rating: ${rating}</p>
                                          </div>
                                      </a>
                                  `;
            cardDiv.appendChild(card);
          }
          if (data[i].media_type === "tv") {
            if (
              genre !== null &&
              data[i].genre_ids !== undefined &&
              !data[i].genre_ids.includes(genre)
            ) {
              console.log(i, data[i].id, "genre filtered");
              continue;
            }

            if (
              language !== null &&
              data[i].original_language !== undefined &&
              data[i].original_language !== language
            ) {
              console.log(i, data[i].id, "launguage filtered");
              continue;
            }

            if (
              adult !== null &&
              data[i].adult !== undefined &&
              data[i].adult !== adult
            ) {
              console.log(i, data[i].id, "adult filtered", data[i].adult);
              continue;
            }

            const webseries_name = data[i].name;

            const rating = data[i].vote_average;
            if (rating === 0) continue;

            const photosId = data[i].poster_path;
            let photos = `http://image.tmdb.org/t/p/original${photosId}`;
            if (photosId === null || photosId === undefined)
              photos = "../images/show_placeholder.png";

            const card = document.createElement("div");
            card.classList.add("showCard");
            card.classList.add("col-3");
            card.innerHTML = `      <a href="web_series.html" onclick="webseriesSelected(${data[i].id})" style="text-decoration: none;">
                                          <img src="${photos}" class="card-img-top" alt="..." style="color:white; box-shadow: 2px 2px 2px 2px rgba(255, 255, 255, 0.1);">
                                          <div class="card-body">
                                          <h6 class="card-title" style="color:white;">${webseries_name}</h6>
                                          <p class="card-text" style="color:white;">Rating: ${rating}</p>
                                          </div>
                                          </a>
                                      `;
            cardDiv.appendChild(card);
          }
        } catch (e) {
          console.log(e);
        }
      }
    });
  });
}

function filter_result() {
  let value = params.search;

  let genre =
    document.getElementById("Genre").value !== "null"
      ? Number(document.getElementById("Genre").value)
      : null;

  let language =
    document.getElementById("Language").value !== "null"
      ? document.getElementById("Language").value
      : null;
  let adult = true
    ? document.querySelector('input[name="Adult-content"]:checked').value ===
      "true"
    : false;

  search_result(value, genre, adult, language, null);
  var myModalEl = document.getElementById("filterModal");
  var modal = bootstrap.Modal.getInstance(myModalEl);
  modal.hide();
}

function sort_result(sortby) {
  let value = params.search;
  let genre =
    document.getElementById("Genre").value !== "null"
      ? Number(document.getElementById("Genre").value)
      : null;
  let language =
    document.getElementById("Language").value !== "null"
      ? document.getElementById("Language").value
      : null;
  let adult = true
    ? document.querySelector('input[name="Adult-content"]:checked').value ===
      "true"
    : false;
  console.log(value, genre, language, adult, sortby);
  search_result(value, genre, adult, language, sortby);
}

function sort_data(data, sortby) {
  let sort_by_split = sortby.split(".");
  if (sort_by_split[0] == "popularity" && sort_by_split[1] == "desc") {
    data = data;
  } else if (sort_by_split[0] == "popularity" && sort_by_split[1] == "asc") {
    data = data.reverse();
  } else if (
    sort_by_split[0] == "original_title" &&
    sort_by_split[1] == "asc"
  ) {
    data = data.sort((a, b) => {
      if (a.original_title > b.original_title) return 1;
      if (a.original_title < b.original_title) return -1;
      if (a.original_title == b.original_title) return 0;
    });
  } else if (
    sort_by_split[0] == "original_title" &&
    sort_by_split[1] == "desc"
  ) {
    data = data.sort((a, b) => {
      if (a.original_title < b.original_title) return 1;
      if (a.original_title > b.original_title) return -1;
      if (a.original_title == b.original_title) return 0;
    });
  } else if (sort_by_split[0] == "vote_average" && sort_by_split[1] == "asc") {
    data = data.sort((a, b) => {
      if (a.vote_average > b.vote_average) return 1;
      if (a.vote_average < b.vote_average) return -1;
      if (a.vote_average == b.vote_average) return 0;
    });
  } else if (sort_by_split[0] == "vote_average" && sort_by_split[1] == "desc") {
    data = data.sort((a, b) => {
      if (a.vote_average < b.vote_average) return 1;
      if (a.vote_average > b.vote_average) return -1;
      if (a.vote_average == b.vote_average) return 0;
    });
    // } else if (sort_by_split[0] == "release_date" && sort_by_split[1] == "asc") {
    //   if (a.release_date > b.release_date) return 1;
    //   if (a.release_date < b.release_date) return -1;
    //   if (a.release_date == b.release_date) return 0;
    // } else if (sort_by_split[0] == "release_date" && sort_by_split[1] == "desc") {
    //   if (a.release_date < b.release_date) return 1;
    //   if (a.release_date > b.release_date) return -1;
    //   if (a.release_date == b.release_date) return 0;
  } else if (sort_by_split[0] == "vote_count" && sort_by_split[1] == "asc") {
    data = data.sort((a, b) => {
      if (a.vote_count > b.vote_count) return 1;
      if (a.vote_count < b.vote_count) return -1;
      if (a.vote_count == b.vote_count) return 0;
    });
  } else if (sort_by_split[0] == "vote_count" && sort_by_split[1] == "desc") {
    data = data.sort((a, b) => {
      if (a.vote_count < b.vote_count) return 1;
      if (a.vote_count > b.vote_count) return -1;
      if (a.vote_count == b.vote_count) return 0;
    });
  }
  return data;
}

export {
  myApi,
  movieSelected,
  webseriesSelected,
  getMovie,
  getwebseries,
  genreIdName,
  search_result,
  filter_result,
  sort_result,
  sort_data,
};
