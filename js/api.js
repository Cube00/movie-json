const mov = document.querySelector(".movies");

async function api(url) {
  const response = await fetch(url);
  const responseMovie = await response.json();
  return responseMovie.results;
}

api(
  "https://api.themoviedb.org/3/movie/6/similar?api_key=0c8eba5d41d59379c0d9a98afd4738fe&language=en-US&page=1"
).then((movie) => {
  movie.map((e, index) => {
    const eachMovie = document.createElement("div");
    eachMovie.classList.add("movie");
    const img = document.createElement("img");
    const title = document.createElement("h2");
    const release_date = document.createElement("h3");
    const rating = document.createElement("h4");
    const voteCount = document.createElement("span");
    voteCount.classList.add("voteCount");
    title.innerHTML = e.title;
    img.src = "https://image.tmdb.org/t/p/w220_and_h330_face/" + e.poster_path;
    rating.innerHTML = e.vote_average;
    voteCount.innerHTML = "(" + e.vote_count + ")";
    release_date.innerHTML = e.release_date;
    eachMovie.append(img);
    eachMovie.append(title);
    eachMovie.append(release_date);
    eachMovie.append(rating);
    eachMovie.append(voteCount);
    mov.appendChild(eachMovie);
    // let randomMovie = Math.floor(Math.random() * movie.length);
  });
});
