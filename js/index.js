
// const settings = {
//     "async": true,
//     "crossDomain": true,
//     "url": `https://api.themoviedb.org/3/discover/movie?api_key=db5b8bfc146e2c55ab2417c30811f11f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`,
//     "method": "GET",
// }
$(document).ready(function() {
    $.ajax({
    url: "https://api.themoviedb.org/3/discover/movie?api_key=db5b8bfc146e2c55ab2417c30811f11f&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=true&page=1&with_watch_monetization_types=flatrate"
    }).then(function(data) {
    data=data.results;
    console.log(data);
    var cardDiv = document.getElementById("top_movies");
    cardDiv.innerHTML = ""
    for (var i = 0; i < data.length; i++) {
        try {
            movie_name = data[i].original_title.slice(0,10);
            rating = data[i].vote_average;
            photos = data[i].poster_path;

            var card = document.createElement('div');
            card.classList.add("card1");
            card.classList.add("col-2");
            // card.classList.add("col-xs-2");
            // card.classList.add("col-md-2");
            // card.classList.add("col-sm-2");
            card.innerHTML = `
                                    <img src="http://image.tmdb.org/t/p/original${photos}" class="card-img-top" alt="...">
                                    <div class="card-body">
                                    <h6 class="card-title">${movie_name}</h6>
                                    <p class="card-text">Rating: ${rating}</p>
                                    </div>
                                `

            cardDiv.appendChild(card);
        } catch (e) { console.log(e) }
    }
    });
    });
    
