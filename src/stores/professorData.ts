import { writable } from "svelte/store";
import type { Student, Group, Media } from "../types";

export const Groups = writable<Group[]>([]);
export const Students = writable<Student[]>([]);
export const FetchedData = writable<Media>(undefined);

