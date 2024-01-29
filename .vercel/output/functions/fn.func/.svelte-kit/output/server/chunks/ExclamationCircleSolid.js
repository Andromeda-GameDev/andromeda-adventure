import { c as create_ssr_component, b as compute_rest_props, g as getContext, i as add_attribute, d as spread, f as escape_object, h as escape_attribute_value, e as escape, s as setContext } from "./ssr.js";
import { w as writable } from "./index.js";
import { twMerge } from "tailwind-merge";
const TabItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["open", "title", "activeClasses", "inactiveClasses", "defaultClass"]);
  let { open = false } = $$props;
  let { title = "Tab title" } = $$props;
  let { activeClasses = void 0 } = $$props;
  let { inactiveClasses = void 0 } = $$props;
  let { defaultClass = "inline-block text-sm font-medium text-center disabled:cursor-not-allowed" } = $$props;
  const ctx = getContext("ctx") ?? {};
  ctx.selected ?? writable();
  let buttonClass;
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.activeClasses === void 0 && $$bindings.activeClasses && activeClasses !== void 0)
    $$bindings.activeClasses(activeClasses);
  if ($$props.inactiveClasses === void 0 && $$bindings.inactiveClasses && inactiveClasses !== void 0)
    $$bindings.inactiveClasses(inactiveClasses);
  if ($$props.defaultClass === void 0 && $$bindings.defaultClass && defaultClass !== void 0)
    $$bindings.defaultClass(defaultClass);
  buttonClass = twMerge(
    defaultClass,
    open ? activeClasses ?? ctx.activeClasses : inactiveClasses ?? ctx.inactiveClasses,
    open && "active"
  );
  return `<li${add_attribute("class", twMerge("group", $$props.class), 0)} role="presentation"><button${spread(
    [
      { type: "button" },
      { role: "tab" },
      escape_object($$restProps),
      {
        class: escape_attribute_value(buttonClass)
      }
    ],
    {}
  )}>${slots.title ? slots.title({}) : `${escape(title)}`}</button> ${open ? `<div class="hidden tab_content_placeholder"><div>${slots.default ? slots.default({}) : ``}</div></div>` : ``}</li> `;
});
const Tabs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ulClass;
  let { style = "none" } = $$props;
  let { defaultClass = "flex flex-wrap space-x-2" } = $$props;
  let { contentClass = "p-4 bg-gray-50 rounded-lg dark:bg-gray-800 mt-4" } = $$props;
  let { divider = true } = $$props;
  let { activeClasses = "p-4 text-primary-600 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-primary-500" } = $$props;
  let { inactiveClasses = "p-4 text-gray-500 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300" } = $$props;
  const styledActiveClasses = {
    full: "p-4 w-full group-first:rounded-l-lg group-last:rounded-r-lg text-gray-900 bg-gray-100 focus:ring-4 focus:ring-primary-300 focus:outline-none dark:bg-gray-700 dark:text-white",
    pill: "py-3 px-4 text-white bg-primary-600 rounded-lg",
    underline: "p-4 text-primary-600 border-b-2 border-primary-600 dark:text-primary-500 dark:border-primary-500",
    none: ""
  };
  const styledInactiveClasses = {
    full: "p-4 w-full group-first:rounded-l-lg group-last:rounded-r-lg text-gray-500 dark:text-gray-400 bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-primary-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700",
    pill: "py-3 px-4 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white",
    underline: "p-4 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 text-gray-500 dark:text-gray-400",
    none: ""
  };
  const ctx = {
    activeClasses: styledActiveClasses[style] || activeClasses,
    inactiveClasses: styledInactiveClasses[style] || inactiveClasses,
    selected: writable()
  };
  setContext("ctx", ctx);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  if ($$props.defaultClass === void 0 && $$bindings.defaultClass && defaultClass !== void 0)
    $$bindings.defaultClass(defaultClass);
  if ($$props.contentClass === void 0 && $$bindings.contentClass && contentClass !== void 0)
    $$bindings.contentClass(contentClass);
  if ($$props.divider === void 0 && $$bindings.divider && divider !== void 0)
    $$bindings.divider(divider);
  if ($$props.activeClasses === void 0 && $$bindings.activeClasses && activeClasses !== void 0)
    $$bindings.activeClasses(activeClasses);
  if ($$props.inactiveClasses === void 0 && $$bindings.inactiveClasses && inactiveClasses !== void 0)
    $$bindings.inactiveClasses(inactiveClasses);
  divider = ["full", "pill"].includes(style) ? false : divider;
  ulClass = twMerge(defaultClass, style === "underline" && "-mb-px", $$props.class);
  return `<ul${add_attribute("class", ulClass, 0)}>${slots.default ? slots.default({ style }) : ``}</ul> ${divider ? `${slots.divider ? slots.divider({}) : ` <div class="h-px bg-gray-200 dark:bg-gray-700"></div> `}` : ``} <div${add_attribute("class", contentClass, 0)} role="tabpanel" aria-labelledby="id-tab"></div> `;
});
const ExclamationCircleSolid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { ariaLabel = "exclamation circle solid" } = $$props;
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
      { viewBox: "0 0 20 20" }
    ],
    {}
  )}><path fill="currentColor" d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"></path></svg> `;
});
export {
  ExclamationCircleSolid as E,
  Tabs as T,
  TabItem as a
};
