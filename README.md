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

