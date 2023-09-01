import { writable } from "svelte/store";

export const createModal = writable(false);
export const editorModal = writable(false);