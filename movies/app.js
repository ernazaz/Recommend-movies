var Movies = [];
var moviesList = [];
var i = 0;
var timer;
var path = [];
var firstCol;
var secondCol;
var step = 2;
var position;
var slideIndex = 0;
var initialDot = 0;
var mobileIndex = 0;
var interval =1000;
var imagess = ['assets/images/bugs.jpg','assets/images/front.jpg','assets/images/forest.jpg','assets/images/godfather.jpg','assets/images/matrix.jpg','assets/images/pianist.jpg','assets/images/pulp.jpg','assets/images/schindler.jpg','assets/images/shawsank.jpg','assets/images/starwars.jpg',]
var Movie = function(name,imgLink,rate,description,genres){
    this.name = name;
    this.imgLink = imgLink;
    this.rate = rate;
    this.description = description;
    this.genres = genres;
}
var bugs = new Movie("A Bug's Life",0,"7.2",'A misfit ant, looking for "warriors" to save his colony from greedy grasshoppers, recruits a group of bugs that turn out to be an inept circus troupe.',['Animation','Adventure','Comedy',]);
var front = new Movie("All Quiet on the Western Front",1,"8.1",'A young soldier faces profound disillusionment in the soul-destroying horror of World War I.',['DRAMA','WAR']);
var forrest = new Movie ("Forrest Gump",2,"8.8",'The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other history unfold through the perspective of an Alabama man with an IQ of 75.',['DRAMA','ROMANCE']);
var godfather = new Movie("The Godfather",3,'9.2','The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',['CRIME','DRAMA']);
var matrix = new Movie("The Matrix",4,'8.7','A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',['ACTION','SCI-FI']);
var pianist = new Movie("The Pianist",5,'8.5','A Polish Jewish musician struggles to survive the destruction of the Warsaw ghetto of World War II.',['BIOGRAPHY','DRAMA','MUSIC']);
var pulp = new Movie("Pulp Fiction",6,'8.9',"The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",['CRIME','DRAMA']);
var schindler = new Movie("Schindler’s List",7,'8.9','In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.',['BIOGRAPHY','DRAMA','HISTORY']);
var shawsank = new Movie("The Shawshank Redemption",8,'9.3','Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',['DRAMA']);
var starWars = new Movie("Star Wars: Episode IV – A New Hope",9,'8.6',"Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.",['ACTION','ADVENTURE','FANTASY']);

Movies = [bugs,front,forrest,godfather,matrix,pianist,pulp,schindler,shawsank,starWars];
var numOfPairs = imagess.length /2;

var slide = document.getElementById('slider');
slider.oninput = function() {
  showDivs(this.value);
}
var x = window.matchMedia("(min-width: 430px)")

function plusDivs(n) {
    slideIndex += n
    if(x.matches) {
      if( slideIndex >= numOfPairs ) {
        slideIndex = 0;
      } else if (slideIndex < 0) {
        slideIndex = numOfPairs;
      }
    }
     else if( slideIndex >= imagess.length-1) {
      slideIndex = 0;
    } 
     if (slideIndex < 0) {
      slideIndex = imagess.length-1;
    }
    showDivs(slideIndex);
    slide.value = slideIndex;
  }
function clear() {

}

  function showDivs(n) {
    var dots = document.querySelectorAll(".dot");
    dots[initialDot].classList.remove("active");
     dots[n].classList.add("active");
     initialDot = n;
      firstCol = 0;
      secondCol = 1;
      position = step *n;
      firstCol = firstCol+ position;
      secondCol = secondCol + position;

  if(x.matches) {
    var list;
    var secondGenres = document.querySelector('.b').querySelector('#genres');
    secondGenres.innerHTML ="";
    document.getElementById('secondImg').style.backgroundImage = " url(" + imagess[secondCol] + ")";
    document.querySelector('.b').querySelector('.name').innerText = Movies[secondCol].name;
    document.querySelector('.b').querySelector('#genres').innerHTML = Movies[secondCol].genres.toString();
    document.querySelector('.b').querySelector('#decription').innerText = Movies[secondCol].description;
    document.querySelector('.b').querySelector('#rating').innerText = Movies[secondCol].rate;

  } 
  else {
    firstCol = n;
  }
  var firstGenres = document.querySelector('.a').querySelector('#genres');
  firstGenres.innerHTML = "";
  document.getElementById('firstColImg').style.backgroundImage = " url(" + imagess[firstCol] + ")";
  document.querySelector('.a').querySelector('.name').innerText = Movies[firstCol].name;
   document.querySelector('.a').querySelector('#genres').innerHTML = Movies[firstCol].genres.toString();
  document.querySelector('.a').querySelector('#decription').innerText = Movies[firstCol].description;
  document.querySelector('.a').querySelector('#rating').innerText = Movies[firstCol].rate;


}
showDivs(slideIndex);

function init() {
   initialInterval =  setInterval(function(n){
    if (x.matches) {
      plusDivs(n);
    }
  }, interval, 1);
}

init();
function clearInt() {
  clearInterval(initialInterval);
}
function initial() {
  init();
  }

window.onload = function() {
  var pozx;
  var pozx1;
  var dist;
  var touch = document.querySelector('#touch');
  touch.addEventListener("touchstart",function (e) {
    e = e || window.event;
    pozx = e.changedTouches[0].pageX;
  });

  touch.addEventListener("touchend",function (e) {
    e = e || window.event;
    pozx1 = e.changedTouches[0].pageX;``
    var dist = pozx1-pozx;
    if (dist >20) {
      plusDivs(-1);
    } else if (dist < -20) {
      plusDivs(1);
    }
  })
}
