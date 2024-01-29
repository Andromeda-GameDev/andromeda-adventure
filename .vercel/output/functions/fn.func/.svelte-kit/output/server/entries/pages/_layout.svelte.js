import { c as create_ssr_component, a as subscribe } from "../../chunks/ssr.js";
import "../../chunks/firebase.js";
import { a as authStore } from "../../chunks/auth.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_authStore;
  $$unsubscribe_authStore = subscribe(authStore, (value) => value);
  $$unsubscribe_authStore();
  return `${slots.default ? slots.default({}) : ``} `;
});
export {
  Layout as default
};
