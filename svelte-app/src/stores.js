// svelte stores for query and dataset
import { writable } from 'svelte/store';

export const query = writable('');
export const dataset = writable('courses');