import { get } from 'svelte/store';
import { rateLimitMemory } from '$lib/stores/store.js';




let lastRequestTime = 0;
const minInterval = 5000; // Minimum interval between requests in milliseconds


export async function makeRateLimitedRequest(url, options) {
	const lastRequestTime = get(rateLimitMemory)

	const now = Date.now();
	const timeSinceLastRequest = now - lastRequestTime;
	console.log("[makeRateLimitedRequest] url", url, lastRequestTime, now, timeSinceLastRequest)

	if (timeSinceLastRequest < minInterval) {
		console.log("[makeRateLimitedRequest] delaying request", minInterval - timeSinceLastRequest)
		const delay = minInterval - timeSinceLastRequest;
		await new Promise(resolve => setTimeout(resolve, delay));
	}
	rateLimitMemory.set(now);
	return fetch(url, options)
		.then(r => r.json())
		.then((response) => {
			if (response.response_code != 5) return response
			console.log("[makeRateLimitedRequest] rate limited", response.response_code)
			throw new Error("rate limited")
		})
		.catch((response) => {
			console.log(1, response.status, response.statusText);

			// console.error("[makeRateLimitedRequest] error", error)
		});
}
// get data from the opentrivia api
export const getQuestions = async ({ category, difficulty, type, count = 2, }) => {

	var url = new URL('https://opentdb.com/api.php');
	var params = { amount: count, category: category?.id, difficulty, type };
	console.log({ params })
	Object.keys(params).filter(k => params[k]).forEach(key => url.searchParams.append(key, params[key]));
	console.log(url.toString());



	var example = JSON.parse(`{
		"response_code": 0,
		"results": [
		{
		"type": "multiple",
		"difficulty": "medium",
		"category": "Science: Computers",
		"question": "Nvidia&#039;s headquarters are based in which Silicon Valley city?",
		"correct_answer": "Santa Clara",
		"incorrect_answers": [
		"Palo Alto",
		"Cupertino",
		"Mountain View"
		]
		},
		{
		"type": "boolean",
		"difficulty": "medium",
		"category": "Science: Computers",
		"question": "The HTML5 standard was published in 2014.",
		"correct_answer": "True",
		"incorrect_answers": [
		"False"
		]
		},
		{
		"type": "multiple",
		"difficulty": "medium",
		"category": "Science: Computers",
		"question": "What does &quot;LCD&quot; stand for?",
		"correct_answer": "Liquid Crystal Display",
		"incorrect_answers": [
		"Language Control Design",
		"Last Common Difference",
		"Long Continuous Design"
		]
		}
		]
		}`)

	// return example.results


	const data = await fetch(url.toString())
		.then(r => r.json())
		.catch((response) => {
			console.log(2, response.status, response.statusText);

			// console.error("[makeRateLimitedRequest] error", error)
		});
	return data.results;
}


let categoryCache = null
export const getCategories = async () => {
	if (categoryCache) return categoryCache
	const api_category = await fetch("https://opentdb.com/api_category.php").then(r => r.json())
	const api_count_global = await fetch("https://opentdb.com/api_count_global.php").then(r => r.json())
	console.log({ api_category, api_count_global })
	for (const category of api_category.trivia_categories) {
		const { id } = category
		const count = api_count_global.categories[id].total_num_of_verified_questions
		category.count = count
	}


	categoryCache = api_category.trivia_categories
	return api_category.trivia_categories;
}


