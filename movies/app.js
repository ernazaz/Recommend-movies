
const images = ['assets/images/bugs.jpg', 'assets/images/front.jpg', 'assets/images/forest.jpg', 'assets/images/godfather.jpg', 'assets/images/matrix.jpg', 'assets/images/pianist.jpg', 'assets/images/pulp.jpg', 'assets/images/schindler.jpg', 'assets/images/shawsank.jpg', 'assets/images/starwars.jpg',]
const Movie = function (name, imgLink, rate, description, genres, image) {
    this.name = name;
    this.imgLink = imgLink;
    this.rate = rate;
    this.description = description;
    this.genres = genres;
    this.image = image;
}
const bugs = new Movie("A Bug's Life", 0, "7.2", 'A misfit ant, looking for "warriors" to save his colony from greedy grasshoppers, recruits a group of bugs that turn out to be an inept circus troupe.', ['Animation', 'Adventure', 'Comedy',], images[0]);
const front = new Movie("All Quiet on the Western Front", 1, "8.1", 'A young soldier faces profound disillusionment in the soul-destroying horror of World War I.', ['DRAMA', 'WAR'], images[1]);
const forrest = new Movie("Forrest Gump", 2, "8.8", 'The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other history unfold through the perspective of an Alabama man with an IQ of 75.', ['DRAMA', 'ROMANCE'], images[2]);
const godfather = new Movie("The Godfather", 3, '9.2', 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', ['CRIME', 'DRAMA'], images[3]);
const matrix = new Movie("The Matrix", 4, '8.7', 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.', ['ACTION', 'SCI-FI'], images[4]);
const pianist = new Movie("The Pianist", 5, '8.5', 'A Polish Jewish musician struggles to survive the destruction of the Warsaw ghetto of World War II.', ['BIOGRAPHY', 'DRAMA', 'MUSIC'], images[5]);
const pulp = new Movie("Pulp Fiction", 6, '8.9', "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.", ['CRIME', 'DRAMA'], images[6]);
const schindler = new Movie("Schindler’s List", 7, '8.9', 'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.', ['BIOGRAPHY', 'DRAMA', 'HISTORY'], images[7]);
const shawsank = new Movie("The Shawshank Redemption", 8, '9.3', 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', ['DRAMA'], images[8]);
const starWars = new Movie("Star Wars: Episode IV – A New Hope", 9, '8.6', "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.", ['ACTION', 'ADVENTURE', 'FANTASY'], images[9]);

let movies = [bugs, front, forrest, godfather, matrix, pianist, pulp, schindler, shawsank, starWars];
let first = 0;
let second = 1;
let slideIndex = 0;
let loading;
let interval = 10000;

let slide = document.getElementById('slider');
const width = window.matchMedia("(min-width: 430px)")
let moviesList = document.getElementsByClassName('item');
let dot = document.getElementsByClassName('dot');

// Get values from slider and call function to change items
slider.oninput = function () {
    slideIndex = parseInt(this.value);
    showMovies(slideIndex);
}

function plusDivs(n) {
    slideIndex += n
    if (slideIndex >= movies.length) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = movies.length - 1;
    }
    showMovies(slideIndex);
    slide.value = slideIndex;
}


function showMovies(n) {
    first = n;
    second = n + 1;
    if (second >= movies.length) {
        second = 0;
    }
    const wrapper = document.querySelector('.wrapper');
    let newList = [movies[first], movies[second]]
    wrapper.innerHTML = "";

    for (let i = 0; i < newList.length; i++) {
        var card = document.createElement("div");
        card.className = "item";
        card.setAttribute("id", "touch")
        var div = ` <div class="headers">
        <div class="movieImg"></div> </div>`

        card.innerHTML = div;
        wrapper.appendChild(card);
    }
    let dots = document.querySelector("#dots");
    dots.innerHTML = "";

    for (let i = 0; i < movies.length; i++) {
        let span = document.createElement('span');
        span.className = 'dot';
        span.addEventListener('click', getIndex);
        dots.appendChild(span);
    }
    dot[first].className += " active"
    for (let i = 0; i < newList.length; i++) {
        // moviesList[i].querySelector('#genres').innerHTML = newList[i].genres.toString();
        moviesList[i].querySelector('.movieImg').style.backgroundImage = " url(" + newList[i].image + ")";
    }
    if (width.matches) {
        moviesList[1].style.display = "block";

    } else {
        moviesList[1].style.display = "none"
    }
    loading = setTimeout(function () { lazyLoad(slideIndex, newList) }, 1000);
}

function clearTimeout() {
    clearTimeout(loading);
}

function lazyLoad(slideIndex, newList) {
    for (let i = 0; i < newList.length; i++) {
        let headers = document.getElementsByClassName('headers');
        let item = document.getElementsByClassName('item');
        let info = document.createElement('div');
        info.classList = 'info';
        info.innerHTML = ` <div class="nameCard"><h2 class="name">${newList[i].name}</h2></div><p id="genres"></p><button>more</button>`;
        let description = document.createElement('div');
        description.classList = 'description';
        description.innerHTML = `<div class="rates"><img id="star" src="assets/images/star.png"><p id="rating">${newList[i].rate}</p></div><div><p id="description">${newList[i].description}</p></div>  `;
        headers[i].appendChild(info);
        item[i].appendChild(description)
        moviesList[i].querySelector('#genres').innerHTML = newList[i].genres.toString();
    }
}
showMovies(slideIndex);

window.onload = function () {
    let pozx;
    let pozx1;
    let touch = document.querySelector('.wrapper');
    touch.addEventListener("touchstart", function (e) {
        e = e || window.event;
        pozx = e.changedTouches[0].pageX;
    });

    touch.addEventListener("touchend", function (e) {
        e = e || window.event;
        pozx1 = e.changedTouches[0].pageX; ``
        var dist = pozx1 - pozx;
        if (dist > 20) {
            plusDivs(-1);
        } else if (dist < -20) {
            plusDivs(1);
        }
    })
}

function resize(width) {
    if (width.matches) {
        moviesList[1].style.display = "block";
    } else {
        moviesList[1].style.display = "none"
    }
}


resize(width) // Call listener function at run time
width.addListener(resize) // Attach listener function on state changes

function getIndex() {
    slideIndex = Array.prototype.indexOf.call(dot, this);
    showMovies(slideIndex);
}

function init() {
    initialInterval = setInterval(function (n) {
        if (width.matches) {
            plusDivs(n);
        }
    }, interval, 1);
}

init();
function clearInt() {
    clearInterval(initialInterval);
}