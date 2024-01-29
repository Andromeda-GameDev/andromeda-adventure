import { c as create_ssr_component, b as compute_rest_props, s as setContext, d as spread, f as escape_object, h as escape_attribute_value, g as getContext, a as subscribe, v as validate_component } from "../../chunks/ssr.js";
import { B as Button } from "../../chunks/Button.js";
import { twMerge } from "tailwind-merge";
import { c as clampSize, I as Input } from "../../chunks/Input.js";
import { E as EyeSlashOutline } from "../../chunks/EyeSlashOutline.js";
import { a as authStore } from "../../chunks/auth.js";
import { A as Alert_1 } from "../../chunks/Alert.js";
const ButtonGroup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "divClass"]);
  let { size = "md" } = $$props;
  let { divClass = "inline-flex rounded-lg shadow-sm" } = $$props;
  setContext("group", { size });
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.divClass === void 0 && $$bindings.divClass && divClass !== void 0)
    $$bindings.divClass(divClass);
  return `<div${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge(divClass, $$props.class))
      },
      { role: "group" }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div> `;
});
const InputAddon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let _size;
  let divClass;
  let $$restProps = compute_rest_props($$props, ["size"]);
  let { size = void 0 } = $$props;
  let background = getContext("background");
  let group = getContext("group");
  const borderClasses = {
    base: "border-gray-300 dark:border-gray-600",
    tinted: "border-gray-300 dark:border-gray-500"
  };
  const darkBgClasses = {
    base: "dark:bg-gray-600 dark:text-gray-400",
    tinted: "dark:bg-gray-500 dark:text-gray-300"
  };
  const divider = {
    base: "dark:border-r-gray-700 dark:last:border-r-gray-600",
    tinted: "dark:border-r-gray-600 dark:last:border-r-gray-500"
  };
  const textSizes = {
    sm: "sm:text-xs",
    md: "text-sm",
    lg: "sm:text-base"
  };
  const prefixPadding = { sm: "px-2", md: "px-3", lg: "px-4" };
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  _size = size || clampSize(group?.size) || "md";
  divClass = twMerge(
    textSizes[_size],
    prefixPadding[_size],
    background ? borderClasses["tinted"] : borderClasses["base"],
    "text-gray-500 bg-gray-200",
    background ? darkBgClasses.tinted : darkBgClasses.base,
    background ? divider.tinted : divider.base,
    "inline-flex items-center border-t border-b first:border-l border-r",
    "first:rounded-l-lg last:rounded-r-lg",
    $$props.class
  );
  return `<div${spread([escape_object($$restProps), { class: escape_attribute_value(divClass) }], {})}>${slots.default ? slots.default({}) : ``}</div> `;
});
const EnvelopeSolid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "role", "ariaLabel"]);
  const ctx = getContext("iconCtx") ?? {};
  const sizes = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8"
  };
  let { size = ctx.size || "md" } = $$props;
  let { role = ctx.role || "img" } = $$props;
  let { ariaLabel = "envelope solid" } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.role === void 0 && $$bindings.role && role !== void 0)
    $$bindings.role(role);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: "currentColor" },
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge("shrink-0", sizes[size], $$props.class))
      },
      { role: escape_attribute_value(role) },
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      { viewBox: "0 0 20 16" }
    ],
    {}
  )}><g fill="currentColor"><path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"></path><path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"></path></g></svg> `;
});
const css = {
  code: '.main-container.svelte-1efa6wq.svelte-1efa6wq{display:flex;flex-direction:row;height:100vh}.left-half.svelte-1efa6wq.svelte-1efa6wq{flex:1;background-image:url("/loginImage.jpg")}.right-half.svelte-1efa6wq.svelte-1efa6wq{flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center}.welcome-title.svelte-1efa6wq.svelte-1efa6wq{font-size:2.5rem;font-weight:600;color:#000}.login-form-container.svelte-1efa6wq.svelte-1efa6wq{display:flex;flex-direction:column;justify-content:center;align-items:center;margin-top:2rem;width:80%}.login-form-container.svelte-1efa6wq h1.svelte-1efa6wq{font-size:1.8rem;font-weight:500;color:#000;margin-bottom:1.5rem;text-align:center}.login-form-container.svelte-1efa6wq a.svelte-1efa6wq{font-size:1rem;font-weight:500;color:rgb(77, 147, 226);margin-top:1rem}.form-container.svelte-1efa6wq.svelte-1efa6wq{width:100%;box-sizing:border-box}.google-icon.svelte-1efa6wq.svelte-1efa6wq{height:1.2rem;margin-right:1rem}@media(max-width: 600px){.main-container.svelte-1efa6wq.svelte-1efa6wq{flex-direction:column}.left-half.svelte-1efa6wq.svelte-1efa6wq{flex:0 0 100%;order:2}.right-half.svelte-1efa6wq.svelte-1efa6wq{flex:0 0 100%;order:1}.login-form-container.svelte-1efa6wq.svelte-1efa6wq{width:80%}.welcome-title.svelte-1efa6wq.svelte-1efa6wq{font-size:2rem}}',
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $authStore, $$unsubscribe_authStore;
  $$unsubscribe_authStore = subscribe(authStore, (value) => $authStore = value);
  let email = "";
  let password = "";
  let alert = {
    visible: false,
    type: "error",
    message: ""
  };
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if ($authStore.isLogged) {
        let userRole = $authStore.role;
        if (userRole == "admin") {
          window.location.href = "/admin";
        } else if (userRole == "student") {
          window.location.href = "/student";
        } else if (userRole == "professor") {
          window.location.href = "/professor";
        }
      }
    }
    $$rendered = `<div class="main-container svelte-1efa6wq"><div class="left-half svelte-1efa6wq"></div> <div class="right-half svelte-1efa6wq"><h1 class="welcome-title svelte-1efa6wq" data-svelte-h="svelte-nf6hlf">Bienvenido a Andromeda</h1> <div class="login-form-container svelte-1efa6wq"><h1 class="svelte-1efa6wq" data-svelte-h="svelte-1m9dt7e">Iniciar sesión</h1> <form class="form-container svelte-1efa6wq">${validate_component(ButtonGroup, "ButtonGroup").$$render($$result, { class: "w-full mb-6" }, {}, {
      default: () => {
        return `${validate_component(InputAddon, "InputAddon").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(EnvelopeSolid, "EnvelopeSolid").$$render(
              $$result,
              {
                class: "w-5 h-5 text-gray-500 dark:text-gray-400"
              },
              {},
              {}
            )}`;
          }
        })} ${validate_component(Input, "Input").$$render(
          $$result,
          {
            id: "email",
            type: "email",
            size: "lg",
            placeholder: "Correo electrónico",
            class: "focus:ring-blue-500 focus:border-blue-500",
            autocomplete: "on",
            value: email
          },
          {
            value: ($$value) => {
              email = $$value;
              $$settled = false;
            }
          },
          {}
        )}`;
      }
    })} ${validate_component(ButtonGroup, "ButtonGroup").$$render($$result, { class: "w-full" }, {}, {
      default: () => {
        return `${validate_component(InputAddon, "InputAddon").$$render($$result, {}, {}, {
          default: () => {
            return `<button>${`${validate_component(EyeSlashOutline, "EyeSlashOutline").$$render(
              $$result,
              {
                class: "w-5 h-5 text-gray-500 dark:text-gray-400"
              },
              {},
              {}
            )}`}</button>`;
          }
        })} ${validate_component(Input, "Input").$$render(
          $$result,
          {
            id: "show-password",
            type: "password",
            size: "lg",
            placeholder: "Contraseña",
            class: "focus:ring-blue-500 focus:border-blue-500",
            autocomplete: "current-password",
            value: password
          },
          {
            value: ($$value) => {
              password = $$value;
              $$settled = false;
            }
          },
          {}
        )}`;
      }
    })}</form> ${validate_component(Button, "Button").$$render(
      $$result,
      {
        class: "mt-6 mb-6",
        color: "blue",
        size: "lg"
      },
      {},
      {
        default: () => {
          return `${`Iniciar sesión`}`;
        }
      }
    )} <p data-svelte-h="svelte-jqzbzv">ó</p> ${validate_component(Button, "Button").$$render(
      $$result,
      {
        class: "mt-6 mb-6 hover:bg-green-300 hover:text-white focus:text-black",
        color: "alternative",
        size: "lg"
      },
      {},
      {
        default: () => {
          return `<img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google G Logo" class="google-icon svelte-1efa6wq">
                Google`;
        }
      }
    )} <a href="www.google.com" class="svelte-1efa6wq" data-svelte-h="svelte-lpss9a">¿Olvidaste tu contraseña?</a></div></div></div> ${validate_component(Alert_1, "Alert").$$render(
      $$result,
      {
        alertType: alert.type,
        alertMessage: alert.message,
        alertVisible: alert.visible
      },
      {},
      {}
    )}`;
  } while (!$$settled);
  $$unsubscribe_authStore();
  return $$rendered;
});
export {
  Page as default
};
