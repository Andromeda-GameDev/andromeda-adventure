import { writable } from "svelte/store";
import type { Student, Media } from "../types";

export const studentInfo = writable<Student>();
export const FetchedData = writable<Media>(undefined);