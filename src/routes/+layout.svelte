<script>
	import GameHud from './GameHud.svelte';
	import { browser } from '$app/environment';
	// get current page
	let currentPage = null;
	if (browser) {
		currentPage = window.location.pathname;
	}
</script>

<div>
	<div class="nav">
		<div class={(currentPage == '/' ? 'current' : '') + ' nav-option '}>
			<!-- quiz -->
			<a href="/">Category Selection</a>
		</div>
		<div class="nav-option">
			<!-- quiz -->
			<a href="/quiz">Quiz</a>
		</div>
		<div class="nav-option">
			<!-- quiz -->
			<a href="/reset">Settings</a>
		</div>
		<GameHud />
	</div>
	<slot />
</div>

<style>
	/* layout as nav bar */
	.nav {
		display: flex;
		/* justify-content: space-around; */
	}
	.nav-option {
		margin: 1rem;
	}
	.nav-option a {
		text-decoration: none;
	}
	.nav-option a:hover {
		text-decoration: underline;
	}
	.current {
		font-weight: bold;
	}
</style>
