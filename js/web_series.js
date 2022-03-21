function webseriesSelected(id) {
    sessionStorage.setItem("webseriesId", id);
    window.location = "web_series.html";
    return false;
}

function getwebseries() {
    let webseriesId = sessionStorage.getItem("webseriesId");
    console.log(webseriesId);
    $(document).ready(function() {
        $.ajax({
            url: `https://api.themoviedb.org/3/tv/${webseriesId}?api_key=db5b8bfc146e2c55ab2417c30811f11f&language=en-US&append_to_response=videos,credits`,
        }).then(function(data) {
            console.log(data);
            // console.log(`https://api.themoviedb.org/3/movie/${movieId}?api_key=db5b8bfc146e2c55ab2417c30811f11f&language=en-US`)
            var currwebseries = document.getElementById("webseries-content");
            var currCast=document.getElementById("webseries_cast");
            currCast.innerHTML="";
            currwebseries.innerHTML = "";

            try {
                webseries_name = data.original_name;
                rating = data.vote_average;
                photos = data.poster_path;
                description = data.overview;
                date = data.first_air_date;
                genre = data.genres[0].name;
                language = data.original_language;
                video = data.url1;
                production=data.production_companies[0].name;
                for (var i = 0; i < data.videos.results.length; i++) {
                    if (data.videos.results[i].type == "Trailer") {
                        video = data.videos.results[i].name;
                        key = data.videos.results[i].key;
                        video_link = `https://www.youtube.com/embed/${key}?autoplay=1&mute=1&loop=forever`;
                        console.log(i, video, key, video_link);
                    }
                }
                // var card = document.createElement('div');
                // card.classList.add("card1");
                // card.classList.add("col-2");
                // card.classList.add("col-xs-2");
                // card.classList.add("col-md-2");
                // card.classList.add("col-sm-2");
                currwebseries.innerHTML = `     <div id="webseries-data">
                                                <div id="Img"><img src="http://image.tmdb.org/t/p/original${photos}" id="webseriesImg"/></div>
                                                <div id="content">
                                                    <h1 id="webseriesHead">${webseries_name}</h1>
                                                    <p style="color:rgba(255, 255, 255, 0.658);"> ${date} &#149; ${genre} &#149; ${language}</p>
                                                    <p>${description}</p>
                                                    <iframe src="${video_link}" id="trailer"></iframe>
                                                </div>
                                            </div>
                                    `;
                for (var i = 0; i < data.credits.cast.length; i++) {
                    try {
                            cast_name = data.credits.cast[i].name;
                            character_name= data.credits.cast[i].character;
                            photos = data.credits.cast[i].profile_path;
                
                            var card = document.createElement('div');
                            card.classList.add("card1");
                            card.classList.add("col-2");
                            // card.classList.add("col-xs-2");
                            // card.classList.add("col-md-2");
                            // card.classList.add("col-sm-2");
                            card.innerHTML = `  
                                                    <img src="http://image.tmdb.org/t/p/original${photos}" class="card-img-top" alt="..." style="color:white; box-shadow: 2px 2px 2px 2px rgba(255, 255, 255, 0.1);width:10vw;">
                                                    <div class="card-body">
                                                    <h6 class="card-title" style="color:white;">${cast_name}</h6>
                                                    <p class="card-text" style="color:white;">${character_name}</p>
                                                    </div>
                                                    
                                                `
                                currCast.appendChild(card);
                        } catch (e) { console.log(e) }
                    }
                // currMovie.appendChild(currMovie);
            } catch (e) {
                console.log(e);
            }
        });
    });
}
getwebseries();

// url:`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=db5b8bfc146e2c55ab2417c30811f11f&language=en-US`