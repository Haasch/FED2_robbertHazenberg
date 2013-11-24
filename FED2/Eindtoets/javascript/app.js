//Namespace: zorgt ervoor dat functies buiten de globale scope worden gehouden om (o.a.) conflicten te voorkomen
var APP = APP || {};

//self invoking function
(function () {

// Loader wordt aangemaakt en gekoppeld aan div id 'circleG'
var loader = document.getElementById('circleG');

// Nieuwe instantie van object 'swiper' wordt aangemaakt genaamd 'swipe'

/* [REVIEW] Probeer deze variabele ook in een object te zetten. */
var swipe = new Swiper ('.swiper-container',{
	mode:'horizontal',
	loop: false
});

	// Object literal genaamd 'controller'. Verantwoordelijk voor het initieren van APP.router en APP.update.
	APP.controller = {
		init: function () {
			APP.router.init();
			APP.update.init();
		}
	};

	APP.update = {
		init: function () {
			//selecteert id 'submit'
			var button = document.getElementById('submit');
			//wanneer er op hetgeen met id 'submit' wordt geklikt start de anonieme functie
			button.addEventListener('click', function(){
			loader.style.display = 'block';

			var score1 = document.getElementById('team1score').value; //haalt teamscores op en plaatst deze in desbetreffend veld
			var score2 = document.getElementById('team2score').value;

			//Get game_id
			//pakt url, maakt er een string van en koppelt dit aan de nieuwe variabele url
			var url = window.location.toString();
			//split de variable url bij elke slash en koppelt dit aan de nieuwe variable array
			var array = url.split("/");
			//van de hele array, pakt hij de achterste
			// Een array begint altijd te tellen bij nul, length begint altijd te tellen bij 1. Dus om het laatste stukje url te kunnen selecteren kun je niet -0 doen maar -1.
			var game_id = array[array.length - 1];

					//voert methode post uit
					APP.data.post({
						game_id: game_id,
						team_1_score: score1,
						team_2_score: score2,
						is_final: 'True'
					});
			});
		}
	};

	APP.data = {
		post: function(postData) {
			var url = 'https://api.leaguevine.com/v1/game_scores/';

			var postData = JSON.stringify(postData); //zet postData in een string
			console.log(postData);

			// Doe een request
			// xhr is een nieuwe instantie van XMLHtttpRequest
			var xhr = new XMLHttpRequest();
			xhr.open('POST',url,true);

			//Check for response
				xhr.onreadystatechange = function() {
					if (xhr.readyState == 4 && xhr.status == 201) { //Als xhr.readystate gelijk is aan 4 of xhr.status aan 201, verberg loader, geef schedule weer
						loader.style.display = 'none';
						APP.router.change('schedule');

					} else if (xhr.readyState == 4) {
						alert('Error tijdens het posten');
				}
			};
			// Set request headers
			//geeft aan json mee te sturen
			xhr.setRequestHeader('Content-type','application/json');
			//Authuriseert post door acces_token te checken
			xhr.setRequestHeader('Authorization','bearer 4737fcca2c');

			// Send request (with data as a json string)
			xhr.send(postData);
		},
	};

	// Router
	APP.router = {
		init: function () {
			routie({
				'/game/:game_id': function(game_id) { //{ Wanneer url /game is gevondnen + game_id, voer dan fucntion(game_id) uit en geef ook game_id weer
					APP.page.game(game_id);
				},
				'/ranking': function() {
					APP.page.ranking();
					swipe.swipeTo(0,1000); // 1000ms swipe
				},

				'/schedule': function() {
					APP.page.schedule();
					swipe.swipeTo(1,1000);
				},
				'*': function() {
					APP.page.ranking();
					swipe.swipeTo(0,1000);
				}
			});
		},

		change: function (section_name) { // Voert methode change uit en section wordt meegegeven
			var sections = qwery('section'), // Selecteert alle sections
				section = qwery('[data-route=' + section_name + ']')[0]; // Pakt data-route + section name

			// Show active section, hide all other
			if (section) {
				for (var i=0; i < sections.length; i++){ //met sections.length geeft ie het aantal resultaten in de array terug. In dit geval is dat altijd 3. i=0 is kleiner dan 3, dus de class active wordt weggehaald en i wordt 1. etc.
					sections[i].classList.remove('active');
				}
				section.classList.add('active'); // Op het moment dat i=3 dan is i niet meer kleiner dan sections.length dan wordt er aan 1 sections de class active toegevoegd
			}
		}
	};

	// Pages
	APP.page = {
		game: function (game_id) {
		loader.style.display = 'block';
			promise.get('https://api.leaguevine.com/v1/games/'+game_id+'/?access_token=4737fcca2c').then(function(error, data, xhr) {
				if (error) {
					alert('Error er gaat iets fout ' + xhr.status);
					return; // stopt functie
				}

				data = JSON.parse(data); // zet data om in JSON.
				console.log(data);

				Transparency.render(qwery('[data-route=game]')[0], data); // bindt data van game
				APP.router.change('game');
				loader.style.display = 'none';
			});
		},

		schedule: function () {
		loader.style.display = 'block';
			promise.get('https://api.leaguevine.com/v1/games/?tournament_id=19389&access_token=4737fcca2c').then(function(error, data, xhr) {
				if (error) {
					alert('Error ' + xhr.status);
					return;
				}
				data = JSON.parse(data);
				console.log(data);

				var directives = APP.directives.schedule;

				Transparency.render(qwery('[data-route=schedule]')[0], data, directives);
				APP.router.change('schedule');
				loader.style.display = 'none';
			});
		},

		ranking: function () {
		loader.style.display = 'block';
			promise.get('https://api.leaguevine.com/v1/pools/?tournament_id=19389&access_token=4737fcca2c').then(function(error, data, xhr) {
				if (error) {
					alert('Error ' + xhr.status);
					return;
				}
				data = JSON.parse(data);
				console.log(data);

				Transparency.render(qwery('[data-route=ranking]')[0], data);
				APP.router.change('ranking');
				loader.style.display = 'none';
			});
		}
	};

	//geeft href + game id mee
	APP.directives = {
		schedule: {
			objects: {
			//loopt af bij binden van de data
				update_score: {
					href: function() {
						return '#/game/' + this.id;
					}
				}
			}
		}
	};

	// DOM ready-functie: zorgt dat alle HTML ontvangen en geparsed is door browser voordat deze gerenderd wordt
	domready(function () {
	// Kickstart application
		APP.controller.init();
	});
})();
