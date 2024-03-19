<script>
	// @ts-nocheck

	// this is svelte
	import { getQuestions, getCategories } from '$lib/api.js';
	
	import { selectedCategories } from '$lib/stores/store.js';
	import { goto } from '$app/navigation';

	// get categories
	// ask for preferences
	// get questions for categories
	// render on page with answer behind button or slider

	const maxSelected = 3;
	// let selectedCategories = [];
	const options = getCategories();

	function gotoQuiz() {
		goto('/quiz');
	}
</script>

<main>
	
	<h1>Select {maxSelected} categories</h1>
	<div>
		{#await options}
			Loading category options...
		{:then categories}
			{#each categories as option, index}
				<div class="option">
					<input
						type="checkbox"
						bind:group={$selectedCategories}
						name="options"
						value={option}
						id="option{index}"
						disabled={$selectedCategories.length === maxSelected &&
							!$selectedCategories.includes(option)}
					/>
					<label for="option{index}">{option.name} ({option.count})</label>
				</div>
			{/each}
		{:catch someError}
			System error: {someError.message}
		{/await}
	</div>
	<button disabled={$selectedCategories.length != maxSelected} on:click={gotoQuiz}
		>{$selectedCategories.length != maxSelected
			? `Please select ${maxSelected - $selectedCategories.length} option(s)`
			: 'Continue'}</button
	>
</main>

<style>
	.option {
		display: flex;
		align-items: center;
	}
	input {
		margin: 0 0.3rem 0 0;
	}
	input:disabled + :global(label) {
		color: lightgrey;
	}
	label {
		user-select: none;
	}
</style>
