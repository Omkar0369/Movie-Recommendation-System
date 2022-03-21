
// const settings = {
//     "async": true,
//     "crossDomain": true,
//     "url": `https://api.themoviedb.org/3/discover/movie?api_key=db5b8bfc146e2c55ab2417c30811f11f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`,
//     "method": "GET",
// }

//For Movies
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
            card.innerHTML = `      <a href="movie_data.html" onclick="movieSelected(${data[i].id})" style="text-decoration: none;">
                                    <img src="http://image.tmdb.org/t/p/original${photos}" class="card-img-top" alt="..." style="color:white; box-shadow: 2px 2px 2px 2px rgba(255, 255, 255, 0.1);">
                                    <div class="card-body">
                                    <h6 class="card-title" style="color:white;">${movie_name}</h6>
                                    <p class="card-text" style="color:white;">Rating: ${rating}</p>
                                    </div>
                                    </a>
                                `

            cardDiv.appendChild(card);
        } catch (e) { console.log(e) }
    }
    });
});

function movieSelected(id){
    sessionStorage.setItem('movieId',id);
    window.location='movie_data.html';
    return false;
}


//For Web Series
$(document).ready(function() {
    $.ajax({
    url: "https://api.themoviedb.org/3/tv/popular?api_key=db5b8bfc146e2c55ab2417c30811f11f&language=en-US&page=1"
    }).then(function(data) {
    data=data.results;
    console.log(data);
    var cardDiv = document.getElementById("top_webSeries");
    cardDiv.innerHTML = ""
    
    for (var i = 0; i < data.length; i++) {
        try {
            web = data[i].name;
            rating = data[i].vote_average;
            photos = data[i].poster_path;

            var card = document.createElement('div');
            card.classList.add("card1");
            card.classList.add("col-2");
            // card.classList.add("col-xs-2");
            // card.classList.add("col-md-2");
            // card.classList.add("col-sm-2");
            card.innerHTML = `      <a href="web_series.html" onclick="webseriesSelected(${data[i].id})" style="text-decoration: none;">
                                    <img src="http://image.tmdb.org/t/p/original${photos}" class="card-img-top" alt="..." style="color:white; box-shadow: 2px 2px 2px 2px rgba(255, 255, 255, 0.1);">
                                    <div class="card-body">
                                    <h6 class="card-title" style="color:white;">${web}</h6>
                                    <p class="card-text" style="color:white;">Rating: ${rating}</p>
                                    </div>
                                    </a>
                                `

            cardDiv.appendChild(card);
        } catch (e) { console.log(e) }
    }
    });
});
function webseriesSelected(id){
    sessionStorage.setItem('webseriesId',id);
    window.location='web_series.html';
    return false;
}
// Language
// $(document).ready(function() {
//     $.ajax({
//     url: "https://api.themoviedb.org/3/discover/movie?api_key=db5b8bfc146e2c55ab2417c30811f11f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_original_language=hi&with_watch_monetization_types=flatrate"
//     }).then(function(data) {
//     data=data.results;
//     console.log(data);
//     var cardDiv = document.getElementById("top_webSeries");
//     cardDiv.innerHTML = ""
    
//     for (var i = 0; i < data.length; i++) {
//         try {
//             web = data[i].original_title;
//             rating = data[i].vote_average;
//             photos = data[i].poster_path;

//             var card = document.createElement('div');
//             card.classList.add("card1");
//             card.classList.add("col-2");
//             // card.classList.add("col-xs-2");
//             // card.classList.add("col-md-2");
//             // card.classList.add("col-sm-2");
//             card.innerHTML = `      
//                                     <img src="http://image.tmdb.org/t/p/original${photos}" class="card-img-top" alt="..." style="color:white; box-shadow: 2px 2px 2px 2px rgba(255, 255, 255, 0.1);">
//                                     <div class="card-body">
//                                     <h6 class="card-title" style="color:white;">${web}</h6>
//                                     <p class="card-text" style="color:white;">Rating: ${rating}</p>
//                                     </div>
//                                 `

//             cardDiv.appendChild(card);
            
//         } catch (e) { console.log(e) }
//     }
//     });
// });
