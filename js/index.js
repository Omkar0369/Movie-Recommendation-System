"use strict";
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

//For Movies
$(document).ready(function() {
    $.ajax({
        url: `https://api.themoviedb.org/3/discover/movie?api_key=${myApi}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=true&page=1&with_watch_monetization_types=flatrate`,
    }).then(function(data) {
        data = data.results;
        console.log(data);
        const cardDiv = document.getElementById("top_movies");
        cardDiv.innerHTML = "";

        for (let i = 0; i < data.length; i++) {
            try {
                const movie_name = data[i].original_title;
                const rating = data[i].vote_average;
                if (rating === 0) continue;
                const photosId = data[i].poster_path;
                let photos = `http://image.tmdb.org/t/p/original${photosId}`;
                if (photosId === null || photosId === undefined)
                    photos = "../images/show_placeholder.png";

                const card = document.createElement("div");
                card.classList.add("showCard");
                card.classList.add("col-2");
                card.innerHTML = `  <a href="movie_data.html" onclick="movieSelected(${data[i].id})" style="text-decoration: none;">
                                    <img src="${photos}" class="card-img-top" alt="..." style="color:white; box-shadow: 2px 2px 2px 2px rgba(255, 255, 255, 0.1);">
                                    <div class="card-body">
                                        <h6 class="card-title" style="color:white;">${movie_name}</h6>
                                        <p class="card-text" style="color:white;">Rating: ${rating}</p>
                                    </div>
                                    </a>
                                `;
                cardDiv.appendChild(card);
            } catch (e) {
                console.log(e);
            }
        }
    });
});

//For Web Series
$(document).ready(function() {
    $.ajax({
        url: `https://api.themoviedb.org/3/discover/tv?api_key=${myApi}&language=en-US&sort_by=popularity.desc`,
    }).then(function(data) {
        data = data.results;
        console.log(data);
        const cardDiv = document.getElementById("top_webSeries");
        cardDiv.innerHTML = "";

        for (let i = 0; i < data.length; i++) {
            try {
                const web = data[i].name;
                const rating = data[i].vote_average;
                if (rating === 0) continue;
                const photosId = data[i].poster_path;
                let photos = `http://image.tmdb.org/t/p/original${photosId}`;
                if (photosId === null || photosId === undefined)
                    photos = "../images/show_placeholder.png";

                const card = document.createElement("div");
                card.classList.add("showCard");
                card.classList.add("col-2");
                card.innerHTML = `      <a href="web_series.html" onclick="webseriesSelected(${data[i].id})" style="text-decoration: none;">
                                    <img src="${photos}" class="card-img-top" alt="..." style="color:white; box-shadow: 2px 2px 2px 2px rgba(255, 255, 255, 0.1);">
                                    <div class="card-body">
                                    <h6 class="card-title" style="color:white;">${web}</h6>
                                    <p class="card-text" style="color:white;">Rating: ${rating}</p>
                                    </div>
                                    </a>
                                `;

                cardDiv.appendChild(card);
            } catch (e) {
                console.log(e);
            }
        }
    });
});

const f = document.getElementById("form");
const q = document.getElementById("search_bar");
const google = "../search.html?search=";

function submitted(event) {
    event.preventDefault();
    const url = google + q.value;
    window.location.href = url;
    console.log(url);
}

f.addEventListener("submit", submitted);