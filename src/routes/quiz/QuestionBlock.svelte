<script>
	export let question;
	import { answeredQuestions } from '$lib/stores/store.js';

	function decodeHTMLEntities(text) {
		const textarea = document.createElement('textarea');
		textarea.innerHTML = text;
		const v = textarea.value;
		textarea.remove();
		return v;
	}
	answeredQuestions.set([]);

	$: isAnswered = $answeredQuestions.includes(question.question);

	// when an answer is clicked, add it to the list of answered questions
	function answerClicked() {
		console.log('Answer clicked', $answeredQuestions, question.question);
		// toggle the question in the list of answered questions
		if ($answeredQuestions.includes(question.question)) {
			answeredQuestions.update((list) => list.filter((q) => q !== question.question));
		} else {
			answeredQuestions.update((list) => [...list, question.question]);
		}
	}
</script>

<div class="question">
	<div>{decodeHTMLEntities(question.question)}</div>
	<div>{question.difficulty}</div>
</div>
<div class="answers">
	<div class="answer correct">
		{decodeHTMLEntities(question.correct_answer)}
	</div>
	{#each question.incorrect_answers as answer, index}
		<div class="answer incorrect">
			{decodeHTMLEntities(answer)}
		</div>
	{/each}
	<button on:click={answerClicked}>Answered {isAnswered ? '✅' : ''}</button>
</div>

<style>
	/* put a box around each answer, make wrong answers red and correct ones green */
	.question {
		margin: 1rem 0;
	}
	.answers {
		display: flex;
		flex-wrap: wrap;
	}
	.answer {
		padding: 0.5rem;
		margin: 0.5rem;
		border: 1px solid black;
		border-radius: 0.5rem;
	}
	.answer:nth-child(odd) {
		background-color: #f0f0f0;
	}
	.answer:nth-child(even) {
		background-color: #e0e0e0;
	}

	.answer.correct {
		background-color: lightgreen;
	}
	.answer.incorrect {
		background-color: lightcoral;
	}
</style>
