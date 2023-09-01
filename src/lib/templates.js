import { writable } from "svelte/store";

export const DISABLED_FIELDS = writable(["_id"]);
export const HIDDEN_FIELDS = writable(["__v", "type"]);

export const skillTemplate = writable({
  "_id": "string",
  "title": "string",
  "goals": "array",
  "xp": "number",
  "category": "string",
  "requires": "array",
  "link": "string",
  "tips": "array"
})

export const itemTemplate = writable({
  "_id": "string",
  "name": "string",
  "link": "string",
  "emoji": "string",
  "requires": "array",
})

export const challengeTemplate = writable({
  "_id": "string",
  "title": "string",
  "goals": "array",
  "tips": "array",
  "xp": "number",
  "category": "string",
  "requires": "array",
  "link": "string",
})