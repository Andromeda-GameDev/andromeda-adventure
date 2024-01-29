import { w as writable } from "./index.js";
import "./firebase.js";
import "firebase/auth";
import "firebase/database";
const authStore = writable({
  isLogged: false,
  uid: null,
  email: null,
  role: null,
  name: null
});
export {
  authStore as a
};
