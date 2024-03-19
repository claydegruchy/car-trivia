<script>
	import { browser } from '$app/environment';
	let resetComplete = false;
	const reset = () => {
		if (browser) {
			if (localStorage.selectedCategories) {
				localStorage.selectedCategories = JSON.stringify([]);
				resetComplete = true;
			}
		}
	};
</script>

<main>
	<button on:click={reset}>{resetComplete ? 'Reset complete' : 'Click to reset'}</button>
</main>
