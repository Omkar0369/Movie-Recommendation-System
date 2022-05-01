"use strict";
import { getwebseries } from "./utillity.js";

// const myApi1 = "db5b8bfc146e2c55ab2417c30811f11f";

// function getwebseries() {
//   const webseriesId = sessionStorage.getItem("webseriesId");
//   console.log(webseriesId);
//   $(document).ready(function () {
//     $.ajax({
//       url: `https://api.themoviedb.org/3/tv/${webseriesId}?api_key=${myApi1}&language=en-US&append_to_response=videos,credits`,
//     }).then(function (data) {
//       console.log(data);
//       const currwebseries = document.getElementById("webseries-content");
//       const currCast = document.getElementById("webseries_cast");
//       currCast.innerHTML = "";
//       currwebseries.innerHTML = "";

//       try {
//         const webseries_name = data.original_name;
//         const rating = data.vote_average;
//         const photosId = data.poster_path;
//         let photos = `https://image.tmdb.org/t/p/original${photosId}`;
//         if (photosId === null || photosId === undefined)
//           photos = "../images/show_placeholder.png";
//         const description = data.overview;
//         const date = data.first_air_date;
//         const genre = data.genres[0].name;
//         const language = data.original_language;
//         let video;
//         let key;
//         let video_link;
//         // const production = data.production_companies[0].name;
//         for (let i = 0; i < data.videos.results.length; i++) {
//           if (data.videos.results[i].type == "Trailer") {
//             video = data.videos.results[i].name;
//             key = data.videos.results[i].key;
//             video_link = `https://www.youtube.com/embed/${key}?autoplay=1&mute=1&loop=forever`;
//             console.log(i, video, key, video_link);
//             break;
//           }
//         }
//         currwebseries.innerHTML = ` <div id="webseries-data">
//                                                 <div id="Img">
//                                                     <img src="${photos}" id="webseriesImg"/>
//                                                 </div>
//                                                 <div id="content">
//                                                     <h1 id="webseriesHead">${webseries_name}</h1>
//                                                     <p style="color:rgba(255, 255, 255, 0.658);"> ${date} &#149; ${genre} &#149; ${language}</p>
//                                                     <p>${description}</p>
//                                                     <iframe src="${video_link}" id="trailer"></iframe>
//                                                 </div>
//                                             </div>
//                                     `;
//         for (let i = 0; i < data.credits.cast.length; i++) {
//           try {
//             const cast_name = data.credits.cast[i].name;
//             const character_name = data.credits.cast[i].character;
//             const photosId = data.credits.cast[i].profile_path;
//             let photos = `https://image.tmdb.org/t/p/original${photosId}`;
//             if (photosId === null || photosId === undefined)
//               photos = "../images/show_placeholder.png";

//             const card = document.createElement("div");
//             card.classList.add("showCard");
//             card.classList.add("col-2");
//             card.innerHTML = `  <img src="${photos}" class="card-img-top" alt="..." style="color:white; box-shadow: 2px 2px 2px 2px rgba(255, 255, 255, 0.1);width:10vw;">
//                                             <div class="card-body">
//                                                 <h6 class="card-title" style="color:white;">${cast_name}</h6>
//                                                 <p class="card-text" style="color:white;">${character_name}</p>
//                                             </div>
//                                          `;
//             currCast.appendChild(card);
//           } catch (e) {
//             console.log(e);
//           }
//         }
//       } catch (e) {
//         console.log(e);
//       }
//     });
//   });
// }

if (localStorage.getItem("login") == 1) {
  document.getElementById("login").style.visibility = "hidden";
  document.getElementById("logout").style.visibility = "visible";
} else {
  document.getElementById("login").style.visibility = "visible";
  document.getElementById("logout").style.visibility = "hidden";
}
getwebseries();
