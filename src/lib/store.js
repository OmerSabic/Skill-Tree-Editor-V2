import { writable } from "svelte/store";

// Define the initial tree data
const initialTree = [];

// Create a writable store with the initial data
export const treeData = writable(null);
export const pausePan = writable(false);
export const editingNode = writable({ empty: true });

export const apiURL = writable("");
export const apiKey = writable("");

export const loading = writable(false);
