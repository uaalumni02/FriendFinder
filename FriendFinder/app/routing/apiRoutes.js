var friendScores = require('../data/friends.js');


module.exports = function (app) {

	app.get('/api/friends', function(req, res){
		res.json(friendScores);
	})


	app.post('/api/friends', function(req, res){
		var friendPick = req.body;

		for(var i = 0; i < friendPick.scores.length; i++) {
			if(friendPick.scores[i] == "1 (Strongly Disagree)") {
				friendPick.scores[i] = 1;
			} else if(friendPick.scores[i] == "5 (Strongly Agree)") {
				friendPick.scores[i] = 5;
			} else {
				friendPick.scores[i] = parseInt(friendPick.scores[i]);
			}
		}

		var differencesArray = [];

		for(var i = 0; i < friendScores.length; i++) {

			var comparedFriend = friendScores[i];
			var totalDifference = 0;
			
			for(var k = 0; k < comparedFriend.scores.length; k++) {
				var differenceOneScore = Math.abs(comparedFriend.scores[k] - friendPick.scores[k]);
				totalDifference += differenceOneScore;
			}

			differencesArray[i] = totalDifference;
		}

		var matchNumber = differencesArray[0];
		var matchIndex = 0;

		for(var i = 1; i < differencesArray.length; i++) {
			if(differencesArray[i] < matchNumber) {
				matchNumber = differencesArray[i];
				matchIndex = i;
			}
		}

		friendScores.push(friendPick);

		res.json(friendScores[matchIndex]);
	})
}