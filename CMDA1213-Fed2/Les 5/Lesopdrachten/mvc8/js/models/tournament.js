/* filename: js/models/tournament.js */

(function () {
	"use strict";
	define([
		'config'
	], function (config) {
		var TournamentModel = Backbone.Model.extend({
			
			initialize: function () {
   				var self = this;

				var loadData = function (data) {
					self.set(data);
				};

			    $.ajax({
			    	// Tournament data
					url: config.api + 'tournaments/' + config.tournamentID + "/?callback=?",
					// Pool data
					// url: 'https://api.leaguevine.com/v1/pools/?tournament_id=18519&callback=?',
					success: loadData,
					dataType: 'json'
				});

 			},

			defaults: {
				name: 'Leaguevine Tournament',
				scheduling_format: 'Bracket',
				info: '...',
				season: {
					id: 1
				}
			}
		});
		
		return TournamentModel;
	});
}());