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

//https://github.com/SBoudrias/Inquirer.js/tree/master/examples
var inquirer = require('inquirer');
//include the FS package for reading and writing packages
//fs = file streaming
//https://nodejs.org/api/fs.html
var fs = require('fs');

var Cards = require('./flashcards.js');

//create new basic flashcard. Remember that Cards.fcB is a constructor, not an object.
var pineapple = new Cards.fcB();
//create new cloze flashcard
var kiwi = new Cards.fcCD();
//now can run the various functions from fcB and fcCD on pineapple and kiwi

inquirer.prompt({
	type: 'input',
	name: 'userName',
	message: 'Welcome. What is your name?'
}).then(function(nameGiven){
	inquirer.prompt([
	{
		type: 'list',
		name: 'cardsType',
		message: 'Thank you ' + nameGiven.userName + '. Please select which type of card you wish to use.',
		choices: ['basic', 'cloze']
	},
	{
		type: 'list',
		name: 'createOrReview',
		message: 'Would you like to create cards or review cards, ' + nameGiven.userName + '?',
		choices: ['create cards', 'review cards']
	}]).then(function(answers){
		if(answers.cardsType === 'basic'){
			console.log("basic cards selected.");
			if(answers.createOrReview === 'create cards'){
				console.log('create cards selected.');
				Cards.createBasicCard();
			}
			if(answers.createOrReview === 'review cards'){
				console.log('review cards selected.');
				Cards.reviewCards();
			}
		}
		if(answers.cardsType === 'cloze'){
			console.log('cloze cards selected.');
			if(answers.createOrReview === 'create cards'){
				console.log('create cloze cards selected.');
				Cards.createClozeCard();
			}
			if(answers.createOrReview === 'review cards'){
				Cards.reviewClozeCards();
			}
		}
	});
});