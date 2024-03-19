<script>
	import { selectedCategories, answeredQuestions } from '$lib/stores/store.js';
	import { getQuestions, getCategories } from '$lib/api.js';
	import QuestionBlock from './QuestionBlock.svelte';

	let totalQuestions = 3;
	let questions = [];

	// let selectedCategory = selectedCategories
	const randomCategory = () =>
		$selectedCategories[Math.floor(Math.random() * $selectedCategories.length)];

	questions = getQuestions({ category: randomCategory() });
</script>

<main>
	{#await questions}
		Loading...
	{:then questions}
		{#each questions as question, index}
			<QuestionBlock {question} />
		{/each}
	{:catch error}
		Something went wrong, probably ratelimit error from Open Trivia DB. Try again in a few seconds.
	{/await}
</main>
