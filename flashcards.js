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
var fs = require('fs');

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
		fs.appendFile('basic-cards.txt',this.front + ',' + this.back + '\n**', function(err){
			if(err){
				console.log(err);
			}
		});
	};
};

var ClozeFlashcard = function(cloze, text){
	this.text = text;
	this.cloze = cloze;
	this.displayCloze = function(){
		return this.cloze;
	};
	this.printCards = function(){
		fs.appendFile('cloze-cards.txt',this.cloze + ',' + this.text + '\n**', function(err){
			if(err){
				console.log(err);
			}
		});
	};
};

ClozeFlashcard.prototype.fullText = function(){
	console.log(this.cloze + ' ' + this.text);
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

var clozeCardsArray = [];
var createClozeCard = function(){
	inquirer.prompt([
	{
		type: 'input',
		name: 'cardCloze',
		message: 'enter the answer: ',
		validate: function(value){
			if(isAlphaNumeric(value)){
				return true;
			}
			return 'Please enter alpha numeric values only.'; 
		}
	},
	{
		type: 'input',
		name: 'cardText',
		message: 'enter the clue or text: ',
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
			var newCard = new ClozeFlashcard(cardInput.cardCloze, cardInput.cardText);
			clozeCardsArray.push(newCard);
			console.log('created and added card to clozeCardsArray!!!');
		}
		if(cardInput.makeAnotherCard){
			createClozeCard();
		}
		if(!cardInput.makeAnotherCard){
			console.log('done creating cards');
			//they're done creating. So print cards:
			for(var j = 0; j < clozeCardsArray.length; j ++){
				clozeCardsArray[j].printCards();
			}
		}
	});
};

var displayBasicCards = function(){
	fs.readFile('basic-cards.txt', 'utf8', function(err, data){
		if(err){
			return console.log(err);
		}
		var dataArray = data.split('**');
		var totalCards = [];
		//each element of dataArray will be frontText comma backText
		for(var i = 0; i < dataArray.length; i++){
			//split each element into the "card front" and 'card back'
			var individualCardArray = dataArray[i].split(',');
			//create a new card object
			var thisCard = new BasicFlashcard(individualCardArray[0],individualCardArray[1]);
			totalCards.push(thisCard);
		}
		showOneCard(totalCards, cardNumber);
	});
};

var cardNumber = 0;
var showOneCard = function(arrayOfCards, currentCard){
	inquirer.prompt(
	{
		type: 'list',
		name: 'cardFront',
		message: 'Card Front: ' + arrayOfCards[currentCard].front,
		choices: ['See card back?', 'done with cards']
	}).then(function(answer){
		if(answer.cardFront === 'See card back?'){
			inquirer.prompt({
				type: 'confirm',
				name: 'cardBack',
				message: 'Card Back: ' + arrayOfCards[currentCard].back + '| Next card?'
			}).then(function(answer){
				cardNumber++;
				//must compare against arrayOfCards.length-1 because the totalCards array has an empty last element due to elements being separated by **
				return cardNumber < arrayOfCards.length-1 ? showOneCard(arrayOfCards, cardNumber) : console.log('no more cards to review');
				// if(cardNumber < arrayOfCards.length-1){
				// 	showOneCard(arrayOfCards, cardNumber);
				// }
				// else{
				// 	console.log('no more cards to review.');
				// }
			});
		}else if(answer.cardFront === 'done with cards'){
			console.log('thanks for reviewing cards.');
			return;
		}
	});
};

var displayClozeCards = function(){
	fs.readFile('cloze-cards.txt', 'utf8', function(err, data){
		if(err){
			return console.log(err);
		}
		var dataArray = data.split('**');
		var totalCards = [];
		//each element of dataArray will be frontText comma backText
		for(var i = 0; i < dataArray.length; i++){
			//split each element into the "card front" and 'card back'
			var individualCardArray = dataArray[i].split(',');
			//create a new card object
			var thisCard = new ClozeFlashcard(individualCardArray[0],individualCardArray[1]);
			totalCards.push(thisCard);
		}
		showClozeCard(totalCards, 0);
	});
};

var showClozeCard = function(arrayOfCards, currentCard){
	var nowCard = currentCard;
	inquirer.prompt(
	{
		type: 'list',
		name: 'cardText',
		message: '??? ' + arrayOfCards[currentCard].text,
		choices: ['See answer?', 'done with cards']
	}).then(function(answer){
		if(answer.cardText === 'See answer?'){
			inquirer.prompt({
				type: 'confirm',
				name: 'cardCloze',
				message: arrayOfCards[currentCard].cloze + '\n' + arrayOfCards[currentCard].cloze + ' ' + arrayOfCards[currentCard].text + '\nNext card?'
			}).then(function(answer){
				nowCard++;
				//must compare against arrayOfCards.length-1 because the totalCards array has an empty last element due to elements being separated by **
				return nowCard < arrayOfCards.length-1 ? showClozeCard(arrayOfCards, nowCard) : console.log('no more cards to review');
			});
		}else if(answer.cardFront === 'done with cards'){
			console.log('thanks for reviewing cards.');
			return;
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
	createBasicCard: createBasicCard,
	createClozeCard: createClozeCard,
	reviewCards: displayBasicCards,
	reviewClozeCards: displayClozeCards
};