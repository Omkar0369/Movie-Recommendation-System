"use strict";
import {
  myApi,
  genreNameId,
  homeMovieList,
  homeWebList,
  homeRecommend,
} from "./utillity.js";
import { selectData, doc, db } from "./data_base.js";
// const myApi = "db5b8bfc146e2c55ab2417c30811f11f";

// function movieSelected(id) {
//   sessionStorage.setItem("movieId", id);
//   window.location = "movie_data.html";
//   return false;
// }

// function webseriesSelected(id) {
//   sessionStorage.setItem("webseriesId", id);
//   window.location = "web_series.html";
//   return false;
// }

if (localStorage.getItem("login") == 1) {
  document.getElementById("login").style.visibility = "hidden";
  document.getElementById("logout").style.visibility = "visible";
} else {
  document.getElementById("login").style.visibility = "visible";
  document.getElementById("logout").style.visibility = "hidden";
}

//For Movies
$(document).ready(function () {
  $.ajax({
    url: `https://api.themoviedb.org/3/discover/movie?api_key=${myApi}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=true&page=1&with_watch_monetization_types=flatrate`,
  }).then(function (data) {
    data = data.results;
    console.log(data);
    const cardDiv = document.getElementById("top_movies");
    cardDiv.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
      try {
        homeMovieList(data[i], cardDiv);
      } catch (e) {
        console.log(e);
      }
    }
  });
});

//For Web Series
$(document).ready(function () {
  $.ajax({
    url: `https://api.themoviedb.org/3/discover/tv?api_key=${myApi}&language=en-US&sort_by=popularity.desc`,
  }).then(function (data) {
    data = data.results;
    console.log(data);
    const cardDiv = document.getElementById("top_webSeries");
    cardDiv.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
      try {
        homeWebList(data[i], cardDiv);
      } catch (e) {
        console.log(e);
      }
    }
  });
});

const f = document.getElementById("form");
const q = document.getElementById("search_bar");
const google = "/search.html?search=";

function submitted(event) {
  event.preventDefault();
  const url = google + q.value;
  window.location.href = url;
  console.log(url);
  document.getElementById("search_bar").value = q.value;
}

f.addEventListener("submit", submitted);
