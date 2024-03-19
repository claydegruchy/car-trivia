

import { writable } from "svelte/store";
import { browser } from "$app/environment"
// categories
var storedSelectedCategories = [];
if (browser) {
	if (localStorage.selectedCategories) {
		storedSelectedCategories = JSON.parse(localStorage.selectedCategories);
	}
}
export const selectedCategories = writable(storedSelectedCategories);
selectedCategories.subscribe((value) => {
	if (browser) {
		localStorage.selectedCategories = JSON.stringify(value);
	}
});
// questions
var storedAnsweredQuestions = [];
if (browser) {
	if (localStorage.answeredQuestions) {
		storedAnsweredQuestions = JSON.parse(localStorage.answeredQuestions);
	}
}
export const answeredQuestions = writable(storedAnsweredQuestions);
answeredQuestions.subscribe((value) => {
	if (browser) {
		localStorage.answeredQuestions = JSON.stringify(value);
	}
});

// rate limit
var storedRateLimitMemory = 0;
if (browser) {
	if (localStorage.rateLimitMemory) {
		storedRateLimitMemory = Number(localStorage.rateLimitMemory);
	}
}
export const rateLimitMemory = writable(storedRateLimitMemory);
rateLimitMemory.subscribe((value) => {
	if (browser) {
		localStorage.rateLimitMemory = value;
	}
});