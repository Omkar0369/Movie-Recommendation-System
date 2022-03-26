"use strict";
const myApi = "db5b8bfc146e2c55ab2417c30811f11f";

function movieSelected(id) {
    sessionStorage.setItem("movieId", id);
    window.location = "movie_data.html";
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem("movieId");
    console.log(movieId);
    $(document).ready(function() {
        $.ajax({
            url: `https://api.themoviedb.org/3/movie/${movieId}?api_key=${myApi}&language=en-US&append_to_response=videos,credits`,
        }).then(function(data) {
            console.log(data);
            const currMovie = document.getElementById("movie-content");
            const currCast = document.getElementById("movie_cast");
            currCast.innerHTML = "";
            currMovie.innerHTML = "";

            try {
                const movie_name = data.original_title;
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
                const genre = data.genres[0].name;
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
getMovie();