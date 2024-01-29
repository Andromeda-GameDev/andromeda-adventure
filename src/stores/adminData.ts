import { writable } from "svelte/store";
import type { Student, Group, Professor, globalValues } from "../types";

export const Groups = writable<Group[]>([]);
export const Students = writable<Student[]>([]);
export const Professors = writable<Professor[]>([]);
export const GlobalValues = writable<globalValues[]>([])
export const dbStatus = writable<boolean>(true);