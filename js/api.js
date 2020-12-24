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

const api = async(url) => {
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
            eachMovie.classList.add("movie");
            let btnName = "add to Favourites";
            eachMovie.innerHTML = `<img src="https://image.tmdb.org/t/p/w220_and_h330_face/${e.poster_path}">
            <h2>${e.title}</h2>
            <h3>${e.release_date}</h3>
            <h4>${e.vote_average}</h4>
            <span>(${e.vote_count})</span>
            `;
            const btn = document.createElement("button");
            btn.classList.add("btn");
            btn.textContent = "add to Favourites";
            eachMovie.append(btn);
            mov.appendChild(eachMovie);
            const btnRemove = document.createElement("button");
            btnRemove.classList.add("bt-remove");
            btnRemove.textContent = "remove from Favourites";
            eachMovie.append(btnRemove);
            mov.appendChild(eachMovie);

            btn.addEventListener("click", () => {
                btn.style.display = "none";
                btnRemove.style.display = "block";
                getItem(e.id);
            });
            btnRemove.addEventListener("click", () => {
                removeItem(e.id);
                btnRemove.style.display = "none";
                btn.style.display = "block";
            });
        });
    })
    .catch((error) => {
        console.log("error");
    });

const getDateBase = () => {
    const movId = JSON.parse(localStorage.getItem("item"));
    return movId;
};
const getItem = (key) => {
    const movieId = getDateBase();
    localStorage.setItem("item", JSON.stringify([...movieId, key]));
};
const removeItem = (key) => {
    const movieId = getDateBase();

    localStorage.setItem(
        "item",
        JSON.stringify(movieId.filter((id) => id !== key))
    );
};