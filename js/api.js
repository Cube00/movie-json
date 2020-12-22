const mov = document.querySelector(".movies");
const modal = document.querySelector(".modal");
const fixed = document.querySelector(".fixed-menu");

modal.addEventListener("click", () => {
  fixed.classList.toggle("active");
  const close = document.querySelector(".close");
  close.addEventListener("click", () => {
    fixed.classList.remove("active");
  });
});

const api = async (url) => {
  const response = await fetch(url);
  const responseMovie = await response.json();
  return responseMovie.results;
};

api(
  "https://api.themoviedb.org/3/movie/6/similar?api_key=0c8eba5d41d59379c0d9a98afd4738fe&language=en-US&page=1"
)
  .then((movie) => {
    movie.map((e, index) => {
      const eachMovie = document.createElement("div");
      //main division for movie
      const img = document.createElement("img");
      eachMovie.classList.add("movie");
      img.src =
        "https://image.tmdb.org/t/p/w220_and_h330_face/" + e.poster_path;
      eachMovie.append(img);
      //img elements
      const title = document.createElement("h2");
      title.innerHTML = e.title;
      eachMovie.append(title);
      //title element and text
      const release_date = document.createElement("h3");
      release_date.innerHTML = e.release_date;
      eachMovie.append(release_date);
      //relase
      const rating = document.createElement("h4");
      rating.innerHTML = e.vote_average;
      eachMovie.append(rating);
      const voteCount = document.createElement("span");
      voteCount.innerHTML = "(" + e.vote_count + ")";
      voteCount.classList.add("voteCount");
      eachMovie.append(voteCount);
      //ratings and vote numbers
      const btn = document.createElement("button");
      btn.classList.add("btn");
      btn.innerHTML = "add to Favourites";
      eachMovie.append(btn);
      //btn for add movies to favourites
      mov.appendChild(eachMovie);
      //append elements in html page
      btn.addEventListener("click", () => {
        console.log(e.vote_average);
      });
      // btm for add items to favourite
    });
  })
  .catch((error) => {
    console.log("error");
  });
