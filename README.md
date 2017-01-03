# Flashcard-Generator
Homework Nine: Create basic flashcards and "cloze-deleted" flashcards, using javascript.

## Table of contents

- [Basic Flashcard](#basic-flashcard)
- [Forms](#forms)

---

## Basic Flashcard
```js
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
```
Use the `createBasicCard` function and `displayBasicCards` functions to create and then review Basic Flashcards.

```js
if(cardInput.enterCard){
	var newCard = new BasicFlashcard(cardInput.cardFront, cardInput.cardBack);
	cardsArray.push(newCard);
	console.log('created and added card to cardsArray!!!');
}
if(cardInput.makeAnotherCard){
	createBasicCard();
}
```
In createBasicCard, the user enters data for both a card front and card back. If they approve, they can choose to create the card. This creates a new BasicFlashcard object, using the entered cardFront and cardBack data. If the user selects to make another card, then the method calls upon itself so the user may enter new data for a new card front and card back.

