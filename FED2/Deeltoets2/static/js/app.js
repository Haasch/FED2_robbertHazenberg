//Namespace: zorgt ervoor dat functies buiten de globale scope worden gehouden om (o.a.) conflicten te voorkomen
var APP = APP || {};


(function () { //self invoking function
	// Data voor pagina schedule
	
	APP.schedule = {
		title:'Pool A - Schedule',
		description:'Hier vindt u het schema van de wedstrijden',
		items: [
    { date: "Monday, 9:00am", team1: "Chasing", team1Score: "13", team2: "Amsterdam Money Gang", team2Score: "9"},
    { date: "Monday, 9:00am", team1: "Boomsquad", team1Score: "15", team2: "Beast Amsterdam", team2Score: "11"},
    { date: "Monday, 10:00am", team1: "Beast Amsterdam", team1Score: "14", team2: "Amsterdam Money Gang", team2Score: "12"},
    { date: "Monday, 10:00am", team1: "Chasing", team1Score: "5", team2: "Burning Snow", team2Score: "15"},
    { date: "Monday, 11:00am", team1: "Boomsquad", team1Score: "11", team2: "Amsterdam Money Gang", team2Score: "15"},
    { date: "Monday, 11:00am", team1: "Burning Snow", team1Score: "15", team2: "Beast Amsterdam", team2Score: "6"},
    { date: "Monday, 12:00pm", team1: "Chasing", team1Score: "8", team2: "Beast Amsterdam", team2Score: "15"},
    { date: "Monday, 12:00pm", team1: "Boomsquad", team1Score: "15", team2: "Burning Snow", team2Score: "8"},
    { date: "Monday, 1:00pm", team1: "Chasing", team1Score: "15", team2: "Boomsquad", team2Score: "14"},
    { date: "Monday, 1:00pm", team1: "Burning Snow", team1Score: "15", team2: "Amsterdam Money Gang", team2Score: "11"}
]

};
// Data voor pagina game
	APP.game = {
		title:'Game',
		description:'Deze pagina geeft informatie over de gespeelde wedstrijden',
		items: [
	{ score: "1", team1: "Boomsquad", team1Score: "1", team2: "Burning Snow", team2Score: "0"},
	{ score: "2", team1: "Boomsquad", team1Score: "2", team2: "Burning Snow", team2Score: "0"},
	{ score: "3", team1: "Boomsquad", team1Score: "2", team2: "Burning Snow", team2Score: "1"},
	{ score: "4", team1: "Boomsquad", team1Score: "2", team2: "Burning Snow", team2Score: "2"},
	{ score: "5", team1: "Boomsquad", team1Score: "3", team2: "Burning Snow", team2Score: "2"},
	{ score: "6", team1: "Boomsquad", team1Score: "4", team2: "Burning Snow", team2Score: "2"},
	{ score: "7", team1: "Boomsquad", team1Score: "5", team2: "Burning Snow", team2Score: "2"},
	{ score: "8", team1: "Boomsquad", team1Score: "5", team2: "Burning Snow", team2Score: "3"},
	{ score: "9", team1: "Boomsquad", team1Score: "6", team2: "Burning Snow", team2Score: "3"},
	{ score: "10", team1: "Boomsquad", team1Score: "7", team2: "Burning Snow", team2Score: "3"},
	{ score: "11", team1: "Boomsquad", team1Score: "7", team2: "Burning Snow", team2Score: "4"},
	{ score: "12", team1: "Boomsquad", team1Score: "8", team2: "Burning Snow", team2Score: "4"},
	{ score: "13", team1: "Boomsquad", team1Score: "8", team2: "Burning Snow", team2Score: "5"},
	{ score: "14", team1: "Boomsquad", team1Score: "8", team2: "Burning Snow", team2Score: "6"},
	{ score: "15", team1: "Boomsquad", team1Score: "9", team2: "Burning Snow", team2Score: "6"},
	{ score: "16", team1: "Boomsquad", team1Score: "9", team2: "Burning Snow", team2Score: "7"},
	{ score: "17", team1: "Boomsquad", team1Score: "10", team2: "Burning Snow", team2Score: "7"},
	{ score: "18", team1: "Boomsquad", team1Score: "11", team2: "Burning Snow", team2Score: "7"},
	{ score: "19", team1: "Boomsquad", team1Score: "12", team2: "Burning Snow", team2Score: "7"},
	{ score: "20", team1: "Boomsquad", team1Score: "13", team2: "Burning Snow", team2Score: "7"},
	{ score: "21", team1: "Boomsquad", team1Score: "14", team2: "Burning Snow", team2Score: "7"},
	{ score: "22", team1: "Boomsquad", team1Score: "14", team2: "Burning Snow", team2Score: "8"},
	{ score: "23", team1: "Boomsquad", team1Score: "15", team2: "Burning Snow", team2Score: "8"}
	]
	};

	APP.ranking = {
	//Data voor pagina ranking
		title:'Ranking',
		description:'Dit is de rankingpagina',
		items: [
	{ team: "Chasing", Win: "2", Lost: "2", Sw: "7", Sl: "9", Pw: "35", Pl: "39"},
    { team: "Boomsquad", Win: "2", Lost: "2", Sw: "9", Sl: "8", Pw: "36", Pl: "34"},
    { team: "Burning Snow", Win: "3", Lost: "1", Sw: "11", Sl: "4", Pw: "36", Pl: "23"},
    { team: "Beast Amsterdam", Win: "2", Lost: "2", Sw: "6", Sl: "8", Pw: "30", Pl: "34"},
    { team: "Amsterdam Money Gang", Win: "1", Lost: "3", Sw: "6", Sl: "10", Pw: "30", Pl: "37"}
	]
	};
	
	// Router object met Routie lib
	APP.router = {
		init: function () {
			routie({ //Routie zoekt in de HTML naar de hash in URL en wat er achter staat. En bijv. wanneer index.html#/schedule voert ie uit APP.page.schedule functie
				'/schedule': function() {
				APP.page.schedule();
				},
				'/game': function() {
				APP.page.game();
				},
				'/ranking': function() {
				APP.page.ranking();
				},
				'*': function() { //als er iets anders na de 'index.html#/' komt dan 'schedule', 'game', of 'ranking', wordt de pagina 'schedule getoond'
				APP.page.schedule();
				}
			});
		},

		change: function () { //kleine DOM selector voor het selecteren van 'section' en 'data-routes' zodat class 'active' verwijderd kan worden
            var route = window.location.hash.slice(2),
                sections = qwery('section'), //selecteert 'sections'
                section = qwery('[data-route=' + route + ']')[0]; //selecteert 'data-routes'

            // Show active section, hide all other 
            if (section) {
				for (var i=0; i < sections.length; i++){
					sections[i].classList.remove('active');
					}
					section.classList.add('active');
            }

            // Default route
            if (!route) {
				sections[0].classList.add('active');
            }
		}
	};

/*Transparancy is een client-side template engine wat 'data-bind' met DOM. 
QWERY selecteert het DOM element via CSS en vervolgens koppelt transparency de data aan het desbetreffende DOM element
	    */

            APP.page = {
        schedule: function() {
            Transparency.render(qwery('[data-route=schedule]')[0], APP.schedule); 
            APP.router.change();
        },
        game: function() {
            Transparency.render(qwery('[data-route=game]')[0], APP.game);
            APP.router.change();
        },
        ranking: function() {
            Transparency.render(qwery('[data-route=ranking]')[0], APP.ranking);
            APP.router.change();
        }
    };

	// DOM ready-functie: zorgt dat alle HTML ontvangen en geparsed is door browser voordat deze gerenderd wordt
	domready(function () {
		// Kickstart application
		APP.router.init();
	});
	
})();