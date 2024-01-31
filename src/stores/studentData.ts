import { writable } from "svelte/store";
import type { Student } from "../types";

export const studentInfo = writable<Student>();