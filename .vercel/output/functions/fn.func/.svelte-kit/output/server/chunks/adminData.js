import { w as writable } from "./index.js";
const Groups = writable([]);
const Students = writable([]);
const Professors = writable([]);
const GlobalValues = writable([]);
const dbStatus = writable(true);
export {
  GlobalValues as G,
  Professors as P,
  Students as S,
  Groups as a,
  dbStatus as d
};
