
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
            movie_name = data[i].original_title;
            rating = data[i].vote_average;
            photos = data[i].poster_path;

            var card = document.createElement('div');
            card.innerHTML = `<div class="card" style="width: 18rem;">
                                    <img src="http://image.tmdb.org/t/p/original${photos}" class="card-img-top" alt="...">
                                    <div class="card-body">
                                    <h5 class="card-title">${movie_name}</h5>
                                    <p class="card-text">Rating: ${rating}</p>
                                    </div>
                                </div>`

            cardDiv.appendChild(card);
        } catch (e) { console.log(e) }
    }
    });
    });
    
// $.ajax(settings).done(function(response) {
//     data = response.data;
//     console.log(data);
//     // var cardDiv = document.getElementById("cardDiv");
//     // cardDiv.innerHTML = ""
//     // for (var i = 0; i < data.length; i++) {
//     //     try {
//     //         // hname = data[i].name;
//     //         // rating = data[i].rating;
//     //         // address = data[i].location_string;
//     //         // price_range = data[i].price;
//     //         // photos = data[i].photo.images.original.url;

//     //         // var card = document.createElement('div');
//     //         // card.innerHTML = `<div class="card mb-3" style="margin-left: 5vw; margin-top:5vh ; max-width: 85vw; box-shadow: 4px 4px 4px 4px rgba(80, 79, 79, 0.753);">
//     //         //                         <div class="row g-0">
//     //         //                             <div class="col-md-4">
//     //         //                                 <img src="${photos}" class="img-fluid rounded-start" style="height:50vh;">
//     //         //                             </div>
//     //         //                             <div class="col-md-8">
//     //         //                                 <div class="card-body">
//     //         //                                     <h5 class="card-title" id="cardid1">${hname}</h5>
//     //         //                                     <p class="card-text">${price_range}</p>
//     //         //                                     <p class="card-text">${address}</p>
//     //         //                                     <p class="card-text"><small class="text-muted">${rating}</small></p>
//     //         //                                 </div>
//     //         //                             </div>
//     //         //                         </div>
//     //         //                     </div>`

//     //         // cardDiv.appendChild(card);
//     //     } catch (e) { console.log(e) }
//     // }
// });