// place files you want to import through the `$lib` alias in this folder.
interface Item {
	value: number,
	selected: boolean
}

enum SortStrategy {
	BubbleSort,
	QuickSort,
	InsertionSort,
	SleepSort,
}

const Strategies = [
	'Bubble Sort',
	'Quick Sort',
	'Insertion Sort',
	'Sleep Sort'
];

function sortInitiator(items: Item[], strategy: SortStrategy) {
	let steps: number[][] = [];
	switch (strategy) {
		case SortStrategy.BubbleSort:
			steps = bubbleSort(items);
			break;
		case SortStrategy.QuickSort:
			steps = quickSort(items);
			break;
		case SortStrategy.InsertionSort:
			steps = insertionSort(items);
			break;
		default:
			break;
	}
	return steps;
}

function swap(arr: Item[], i: number, j: number) {
	const temp = arr[i];
	arr[i] = arr[j];
	arr[j] = temp;
}

function bubbleSort(items: Item[]) {
	const steps: number[][] = [];
	const copy = [...items];
	for (let i = 0; i < items.length; i++) {
		let swapped = false;
		for (let j = 0; j < items.length - i - 1; j++) {
			if (copy[j].value > copy[j + 1].value) {
				steps.push([j, j + 1]);
				swap(copy, j, j + 1);
				swapped = true;
			}
		}
		if (!swapped)
			break;
	}
	return steps;
}

function partition(arr: Item[], steps: number[][], low: number, high: number) {
	const pivot = arr[high].value;
	let i = low - 1;
	for (let j = low; j < high; j++) {
		if (arr[j].value < pivot) {
			++i;
			steps.push([i, j]);
			swap(arr, i, j);
		}
	}
	++i;
	steps.push([i, high]);
	swap(arr, i, high);
	return i;
}

function quickSortRec(arr: Item[], steps: number[][], low: number, high: number) {
	if (low < high) {
		const i = partition(arr, steps, low, high);
		quickSortRec(arr, steps, low, i - 1);
		quickSortRec(arr, steps, i + 1, high);
	}
}

function quickSort(items: Item[]) {
	const steps: number[][] = [];
	const copy = [...items];
	quickSortRec(copy, steps, 0, copy.length - 1);
	return steps;
}

function insertionSort(items: Item[]) {
	const steps: number[][] = [];
	const copy: Item[] = [...items];
	for (let i = 1; i < copy.length; i++) {
		const current = copy[i];
		let j = i - 1;
		while (j >= 0 && copy[j].value > current.value) {
			swap(copy, j + 1, j);
			steps.push([j + 1, j]);
			j -= 1;
		}
	}
	return steps;
}

export { sortInitiator, SortStrategy, swap, Strategies };
export type { Item };