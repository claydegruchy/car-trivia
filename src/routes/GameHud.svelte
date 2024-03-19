<script>
  import { selectedCategories } from '$lib/stores/store.js';
</script>

<div class="category-display">
  {#each $selectedCategories as option, index}
    <div class="category">
      {option.name}
    </div>
  {/each}
  <button on:click={() => selectedCategories.set([])}>Reset selection</button>
</div>

<style>
  /* put in top right of page */
  .category-display {
    position: fixed;
    top: 0;
    right: 0;
    padding: 1rem;
    background-color: white;
    border: 1px solid black;
  }
</style>
