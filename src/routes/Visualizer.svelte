<script lang="ts">
	import type { Item } from '$lib';
	import { sortInitiator, SortStrategy } from '$lib';

	export let itemQty: number;
	export let strategy: SortStrategy;
	export let sorted = false;
	let delay = 25;
	let items: Item[] = [];
	let otherItems: Item[] = [];
	let timeouts: number[] = [];
	export const sort = () => {
		let count = 0;
		let steps = sortInitiator(items, strategy);
		steps.forEach(([i, j]) => {
			let swapTimeout = setTimeout(() => {
				let temp = items[i];
				items[i] = items[j];
				items[j] = temp;
			}, delay * count++);
			timeouts.push(swapTimeout);
		});
		let finishCount = 0;
		let finishTimeout = setTimeout(() => {
			console.log('Finish');
			items.forEach((item) => {
				let itemFinishTimeout = setTimeout(() => {
					item.selected = true;
					items = [...items];
				}, (delay / 2) * finishCount++);
				timeouts.push(itemFinishTimeout);
			});
		}, delay * count);
		timeouts.push(finishTimeout);
		sorted = true;
	};

	export function generateItems(qty: number) {
		timeouts.forEach(timeout => clearTimeout(timeout));
		items = [];
		for (let i = 0; i < qty; i++) {
			items.push({ value: Math.round((Math.random() * 100)) + 1, selected: false });
		}
	}

	$: generateItems(itemQty);


</script>
<div class="flex flex-row gap-10 w-full">
	<div class="w-full h-[60dvh] flex flex-row items-center gap-0.5">
		{#each items as { value, selected }}
			<div class="{!selected ? 'bg-blue-500' : 'bg-red-500'} basis-2/4 rounded-md" style="height: {value}%">&nbsp;</div>
		{/each}
	</div>
	{#if strategy === 3}
		<div>
			<span class="flex justify-center">Sleep</span>
			<div class="w-full h-[60dvh] flex flex-row items-center gap-0.5">
				{#each items as { value, selected }}
					<div class="{!selected ? 'bg-blue-500' : 'bg-red-500'} basis-2/4 rounded-md" style="height: {value}%">&nbsp;
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
