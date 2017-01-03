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


// constructor function used to create programmers objects
// function Programmer(name, position, age, language) {
//   this.name = name;
//   this.position = position;
//   this.age = age;
//   this.language = language;
//   //this.printInfo = ....
// }

// // creates the printInfo method and applies it to all programmer objects

// Programmer.prototype.printInfo = function() {
//   console.log("Name: " + this.name + "\nPosition: " + this.position + "\nAge: " +
//   this.age + "\nLanguages: " + this.language);
// };


// // runs inquirer and asks the user a series of questions whose replies are
// // stored within the variable answers inside of the .then statement.
// inquirer.prompt([
//   {
//     name: "name",
//     message: "What is your name?"
//   }, {
//     name: "position",
//     message: "What is your current position?"
//   }, {
//     name: "age",
//     message: "How old are you?"
//   }, {
//     name: "language",
//     message: "What is your favorite programming language?"
//   }
// ]).then(function(answers) {
//   // initializes the variable newguy to be a programmer object which will take
//   // in all of the user's answers to the questions above
//   var newGuy = new Programmer(answers.name, answers.position, answers.age, answers.language);
//   // printInfo method is run to show that the newguy object was successfully created and filled
//   newGuy.printInfo();
// });
