<script lang="ts">
	import Visualizer from './Visualizer.svelte';
	import { SortStrategy, Strategies } from '$lib';

	let itemQty: number = 50;
	let sort: () => void;
	let strategy: SortStrategy;
	let generateItems: (qty: number) => void;
	let sorted: boolean = false;

	$: strategy;
</script>
<div class="p-4">
	<label>Items
		<input bind:value={itemQty} type="range" min="5" max="50">
		{itemQty}
	</label>
	<select on:change={()=>{generateItems(itemQty); sorted= false;}} bind:value={strategy}
					class="ring-gray-300 ring-1 rounded-md px-2">
		{#each Strategies as strat, i}
			<option value={i}>{strat}</option>
		{/each}
	</select>
	<button class="ring-gray-300 ring-1 rounded-md px-2"
					on:click={()=>
						{
							if(sorted){
								generateItems(itemQty);
							}
							setTimeout(()=>sort(),500);
						}
					}>Sort
	</button>
</div>
<div class="h-[80vh] flex items-center justify-center p-4">
	<Visualizer bind:sorted bind:generateItems bind:itemQty bind:sort={sort} {strategy} />
</div>