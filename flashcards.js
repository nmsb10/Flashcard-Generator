// 5: Pushed project to github
// 5: Constructor and prototype used to hold methods for basic flash
//cards
// 5: Constructor and prototype used to hold basic methods for
//cloze-deleted flash cards
// 5: Properly fill out readme with examples of each constructor and
//the methods (use request's npm page as an example of the depth
//we're looking for)
// 5: 2 modules used to hold each constructor, and a 3rd file used as
//a single entry point which exports both.
// 5: ClozeCard has property or method that returns only the
//cloze-deleted portion of the text
// 5: ClozeCard has property or method that returns only the partial text
// 5: ClozeCard throws error if it is not able to figure out where
//the cloze-deletion should go.
// +5: create a review script "front end (in node)" that is recursive
//and uses inquirer
// +5: use promise for reading json from separate file along with any
//other async functions that may be needed

var inquirer = require('inquirer');

var BasicFlashcard = function(front, back){
	this.front = front;
	this.back = back;
	this.showFront = function(){
		console.log(this.front);
	};
	this.showBack = function(){
		console.log(this.back);
	};
	this.printCards = function(){
		this.showFront();
		this.showBack();
	};
};

var ClozeFlashcard = function(text, cloze){
	this.text = text;
	this.cloze = cloze;
	this.displayCloze = function(){
		return this.cloze;
	};
	this.fullText = function(){
		return this.cloze + ' ' + this.text;
	};
};

var cardsArray = [];
var createBasicCard = function(){
	inquirer.prompt([
	{
		type: 'input',
		name: 'cardFront',
		message: 'enter a question (the card\'s front): ',
		validate: function(value){
			if(isAlphaNumeric(value)){
				return true;
			}
			return 'Please enter alpha numeric values only.'; 
		}
	},
	{
		type: 'input',
		name: 'cardBack',
		message: 'enter the answer (the card\'s back): ',
		validate: function(value){
			if(isAlphaNumeric(value)){
				return true;
			}
			return 'Please enter alpha numeric values only.'; 
		}
	},
	{
		type: 'confirm',
		name: 'enterCard',
		message: 'create a new card with the information you entered?'
	},
	{
		type: 'confirm',
		name: 'makeAnotherCard',
		message: 'would you like to make another card?'
	}]).then(function(cardInput){
		if(cardInput.enterCard){
			//if user elects to create a new card, initialize the variable
			//newCard to be a BasicFlashcard object which takes in the
			//card inputs entered above
			var newCard = new BasicFlashcard(cardInput.cardFront, cardInput.cardBack);
			cardsArray.push(newCard);
			console.log('created and added card to cardsArray!!!');
		}
		if(cardInput.makeAnotherCard){
			createBasicCard();
		}
		if(!cardInput.makeAnotherCard){
			console.log('done creating cards');
			//they're done creating. So print cards:
			for(var j = 0; j < cardsArray.length; j ++){
				var cardNumber = j+1;
				console.log('Card #' + cardNumber + ': ');
				cardsArray[j].printCards();
				console.log('=============');
			}
		}
	});
};

function isAlphaNumeric(str) {
	var code, i, len;
	for (i = 0, len = str.length; i < len; i++) {
		code = str.charCodeAt(i);
		if (!(code > 47 && code < 58) && // numeric (0-9)
		!(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 31 && code < 33) && //space
        !(code > 96 && code < 123) ) { // lower alpha (a-z)
			return false;
		}
	}
	return true;
}

module.exports = {
	fcB: BasicFlashcard,
	fcCD: ClozeFlashcard,
	createBasicCard: createBasicCard
};