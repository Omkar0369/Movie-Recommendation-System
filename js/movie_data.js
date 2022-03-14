// import './index';
function movieSelected(id){
    sessionStorage.setItem('movieId',id);
    window.location='movie_data.html';
    return false;
}
function getMovie(){
    let movieId=sessionStorage.getItem('movieId');
    console.log(movieId);
    $(document).ready(function(){
        $.ajax({
        url: `https://api.themoviedb.org/3/movie/${movieId}?api_key=db5b8bfc146e2c55ab2417c30811f11f&language=en-US`
        
        }).then(function(data){
            console.log(data);
            // console.log(`https://api.themoviedb.org/3/movie/${movieId}?api_key=db5b8bfc146e2c55ab2417c30811f11f&language=en-US`)
            var currMovie=document.getElementById("movie-content");
            currMovie.innerHTML="";

            try {
                movie_name = data.original_title;
                rating = data.vote_average;
                photos = data.poster_path;
                description=data.overview;
                time=data.runtime;
                hrs=Math.floor(time/60);
                min=time%60;
                date=data.release_date;
                genre=data.genres[0].name;
                language=data.original_language;
                video=data.url1;
                // var card = document.createElement('div');
                // card.classList.add("card1");
                // card.classList.add("col-2");
                // card.classList.add("col-xs-2");
                // card.classList.add("col-md-2");
                // card.classList.add("col-sm-2");
                currMovie.innerHTML = `     <div id="movie-data">
                                                <div id="Img"><img src="http://image.tmdb.org/t/p/original${photos}" id="movieImg"/></div>
                                                <div id="content">
                                                    <h1 id="movieHead">${movie_name}</h1>
                                                    <p style="color:rgba(255, 255, 255, 0.658);">${hrs} hrs ${min} min &#149; ${date} &#149; ${genre} &#149; ${language}</p>
                                                    <p>${description}</p>
                                                </div>
                                            </div>
                                            <div id="movie-video">
                                                <video src="${video}"></video>
                                            </div>
                                    `
                // currMovie.appendChild(currMovie);
                
            } catch (e) { console.log(e) }
        });
    });
    $(document).ready(function(){
        $.ajax({
            url:`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=db5b8bfc146e2c55ab2417c30811f11f&language=en-US`
        }).then(function(data){
            console.log(data);
            console.log(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=db5b8bfc146e2c55ab2417c30811f11f&language=en-US`)
            var currMovie=document.getElementById("movie-content");
            currMovie.innerHTML="";

            try {
                // movie_name = data.original_title.slice(0,10);
                // rating = data.vote_average;
                // photos = data.poster_path;
                // description=data.overview;
                // time=data.runtime;
                // hrs=Math.floor(time/60);
                // min=time%60;
                // date=data.release_date;
                // genre=data.genres[0].name;
                // language=data.original_language;
                for(var i=0 ;i<results.length;i++){
                    if(data.results[i].type=='Trailer'){
                        video=data.results[i].name;
                        console.log(i);
                    }
                }
                // var card = document.createElement('div');
                // card.classList.add("card1");
                // card.classList.add("col-2");
                // card.classList.add("col-xs-2");
                // card.classList.add("col-md-2");
                // card.classList.add("col-sm-2");
                currMovie.innerHTML = `     <div id="movie-data">
                                                <div id="Img"><img src="http://image.tmdb.org/t/p/original${photos}" id="movieImg"/></div>
                                                <div id="content">
                                                    <h1 id="movieHead">${movie_name}</h1>
                                                    <p style="color:rgba(255, 255, 255, 0.658);">${hrs} hrs ${min} min &#149; ${date} &#149; ${genre} &#149; ${language}</p>
                                                    <p>${description}</p>
                                                </div>
                                            </div>
                                            <div id="movie-video">
                                                <p>${video}</p>
                                            </div>
                                    `
                // currMovie.appendChild(currMovie);
                
            } catch (e) { console.log(e) }
        });
    });  
}
getMovie();

// url:`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=db5b8bfc146e2c55ab2417c30811f11f&language=en-US`