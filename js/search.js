"use strict";
// const myApi3 = "db5b8bfc146e2c55ab2417c30811f11f";

const t = document.getElementById("form");
const p = document.getElementById("Search_bar");
const google1 = "../search.html?search=";

function submitted(event) {
  event.preventDefault();
  const url = google1 + p.value;
  window.location.href = url;
  // console.log(url);
}
t.addEventListener("submit", submitted);

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
let value = params.search;

// function search_result(value, genre, adult, language) {
//   let search_url = `https://api.themoviedb.org/3/search/multi?api_key=${myApi3}&language=en-US&page=1&query=${value}`;
//   $(document).ready(function () {
//     $.ajax({
//       url: search_url,
//     }).then(function (data) {
//       data = data.results;
//       console.log(data);
//       // console.log(document.getElementById("Genre").value);
//       const cardDiv = document.getElementById("searchItems");
//       cardDiv.innerHTML = "";

//       for (let i = 0; i < data.length; i++) {
//         try {
//           if (data[i].media_type === "movie") {
//             if (genre == null && data[i].genre_ids.includes(genre)) {
//               continue;
//             }

//             if (
//               language == null &&
//               data[i].original_language.toLowerCase() == language?.toLowerCase()
//             ) {
//               continue;
//             }

//             if (data[i].adult == adult) {
//               continue;
//             }

//             const movie_name = data[i].original_title;
//             if (movie_name === undefined) {
//               movie_name = data[i].original_name;
//             }

//             const rating = data[i].vote_average;
//             if (rating === 0) continue;

//             const photosId = data[i].poster_path;
//             let photos = `http://image.tmdb.org/t/p/original${photosId}`;
//             if (photosId === null || photosId === undefined)
//               photos = "../images/show_placeholder.png";

//             const card = document.createElement("div");
//             card.classList.add("showCard");
//             card.classList.add("col-3");
//             card.innerHTML = `
//                                     <a href="movie_data.html" onclick="movieSelected(${data[i].id})" style="text-decoration: none;">
//                                         <img src="${photos}" class="card-img-top" alt="..." style="color:white; box-shadow: 2px 2px 2px 2px rgba(255, 255, 255, 0.1);">
//                                         <div class="card-body">
//                                             <h6 class="card-title" style="color:white;">${movie_name}</h6>
//                                             <p class="card-text" style="color:white;">Rating: ${rating}</p>
//                                         </div>
//                                     </a>
//                                 `;
//             cardDiv.appendChild(card);
//           }
//           if (data[i].media_type === "tv") {
//             if (genre !== null && !data[i].genre_ids.includes(genre)) {
//               continue;
//             }

//             if (
//               language !== null &&
//               !data[i].original_language.toLowerCase() ===
//                 language.toLowerCase()
//             ) {
//               continue;
//             }

//             if (data[i].adult !== adult) {
//               continue;
//             }

//             const webseries_name = data[i].name;

//             const rating = data[i].vote_average;
//             if (rating === 0) continue;

//             const photosId = data[i].poster_path;
//             let photos = `http://image.tmdb.org/t/p/original${photosId}`;
//             if (photosId === null || photosId === undefined)
//               photos = "../images/show_placeholder.png";

//             const card = document.createElement("div");
//             card.classList.add("showCard");
//             card.classList.add("col-3");
//             card.innerHTML = `      <a href="webseries_name_series.html" onclick="webseries_nameseriesSelected(${data[i].id})" style="text-decoration: none;">
//                                         <img src="${photos}" class="card-img-top" alt="..." style="color:white; box-shadow: 2px 2px 2px 2px rgba(255, 255, 255, 0.1);">
//                                         <div class="card-body">
//                                         <h6 class="card-title" style="color:white;">${webseries_name}</h6>
//                                         <p class="card-text" style="color:white;">Rating: ${rating}</p>
//                                         </div>
//                                         </a>
//                                     `;
//             cardDiv.appendChild(card);
//           }
//         } catch (e) {
//           console.log(e);
//         }
//       }
//     });
//   });
// }

// document.getElementById("search_bar").value=value;
// let search_url=`https://api.themoviedb.org/3/search/multi?api_key=db5b8bfc146e2c55ab2417c30811f11f&language=en-US&page=1&include_adult=false&query=${value}`
// $(document).ready(function() {
//     $.ajax({
//         url: search_url,
//     }).then(function(data) {
//         data = data.results;
//         console.log(data);
//         console.log(document.getElementById("Genre").value)
//         const cardDiv = document.getElementById("searchItems");
//         cardDiv.innerHTML = "";

//         for (let i = 0; i < data.length; i++) {
//             try {
//                 if(data[i].media_type==="movie"){
//                 const webseries_name = data[i].original_title;
//                 if(webseries_name===undefined){
//                     webseries_name=data[i].original_name;
//                 }
//                 const rating = data[i].vote_average;
//                 if (rating === 0) continue;
//                 const photosId = data[i].poster_path;
//                 let photos = `http://image.tmdb.org/t/p/original${photosId}`;
//                 if (photosId === null || photosId === undefined)
//                     photos = "../images/show_placeholder.png";

//                 const card = document.createElement("div");
//                 card.classList.add("showCard");
//                 card.classList.add("col-3");
//                 card.innerHTML = `      <a href="movie_data.html" onclick="movieSelected(${data[i].id})" style="text-decoration: none;">
//                                     <img src="${photos}" class="card-img-top" alt="..." style="color:white; box-shadow: 2px 2px 2px 2px rgba(255, 255, 255, 0.1);">
//                                     <div class="card-body">
//                                     <h6 class="card-title" style="color:white;">${webseries_name}</h6>
//                                     <p class="card-text" style="color:white;">Rating: ${rating}</p>
//                                     </div>
//                                     </a>
//                                 `;
//                 console.log(data[i].id);
//                 cardDiv.appendChild(card);
//                 }
//                 if(data[i].media_type==="tv"){
//                     const webseries_name = data[i].name;
//                     const rating = data[i].vote_average;
//                     if (rating === 0) continue;
//                     const photosId = data[i].poster_path;
//                     let photos = `http://image.tmdb.org/t/p/original${photosId}`;
//                     if (photosId === null || photosId === undefined)
//                         photos = "../images/show_placeholder.png";

//                     const card = document.createElement("div");
//                     card.classList.add("showCard");
//                     card.classList.add("col-3");
//                     card.innerHTML = `      <a href="webseries_name_series.html" onclick="webseries_nameseriesSelected(${data[i].id})" style="text-decoration: none;">
//                                         <img src="${photos}" class="card-img-top" alt="..." style="color:white; box-shadow: 2px 2px 2px 2px rgba(255, 255, 255, 0.1);">
//                                         <div class="card-body">
//                                         <h6 class="card-title" style="color:white;">${webseries_name}</h6>
//                                         <p class="card-text" style="color:white;">Rating: ${rating}</p>
//                                         </div>
//                                         </a>
//                                     `;
//                     console.log(data[i].id);
//                     cardDiv.appendChild(card);
//                 }
//             } catch (e) {
//                 console.log(e);
//             }
//         }
//     });
// });

search_result(value, null, null, null);
