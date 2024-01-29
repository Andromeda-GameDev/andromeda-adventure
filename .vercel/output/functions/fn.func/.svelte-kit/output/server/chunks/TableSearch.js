import { c as create_ssr_component, b as compute_rest_props, s as setContext, i as add_attribute, d as spread, f as escape_object, h as escape_attribute_value } from "./ssr.js";
import { twMerge } from "tailwind-merge";
const TableSearch = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "divClass",
    "inputValue",
    "striped",
    "hoverable",
    "placeholder",
    "customColor",
    "color",
    "innerDivClass",
    "searchClass",
    "svgDivClass",
    "svgClass",
    "inputClass"
  ]);
  let { divClass = "relative overflow-x-auto shadow-md sm:rounded-lg" } = $$props;
  let { inputValue = "" } = $$props;
  let { striped = false } = $$props;
  let { hoverable = false } = $$props;
  let { placeholder = "Search" } = $$props;
  let { customColor = "" } = $$props;
  let { color = "default" } = $$props;
  let { innerDivClass = "p-4" } = $$props;
  let { searchClass = "relative mt-1" } = $$props;
  let { svgDivClass = "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none" } = $$props;
  let { svgClass = "w-5 h-5 text-gray-500 dark:text-gray-400" } = $$props;
  let { inputClass = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 pl-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" } = $$props;
  let inputCls = twMerge(inputClass, $$props.classInput);
  let svgDivCls = twMerge(svgDivClass, $$props.classSvgDiv);
  const colors = {
    default: "text-gray-500 dark:text-gray-400",
    blue: "text-blue-100 dark:text-blue-100",
    green: "text-green-100 dark:text-green-100",
    red: "text-red-100 dark:text-red-100",
    yellow: "text-yellow-100 dark:text-yellow-100",
    purple: "text-purple-100 dark:text-purple-100",
    custom: customColor
  };
  if ($$props.divClass === void 0 && $$bindings.divClass && divClass !== void 0)
    $$bindings.divClass(divClass);
  if ($$props.inputValue === void 0 && $$bindings.inputValue && inputValue !== void 0)
    $$bindings.inputValue(inputValue);
  if ($$props.striped === void 0 && $$bindings.striped && striped !== void 0)
    $$bindings.striped(striped);
  if ($$props.hoverable === void 0 && $$bindings.hoverable && hoverable !== void 0)
    $$bindings.hoverable(hoverable);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.customColor === void 0 && $$bindings.customColor && customColor !== void 0)
    $$bindings.customColor(customColor);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.innerDivClass === void 0 && $$bindings.innerDivClass && innerDivClass !== void 0)
    $$bindings.innerDivClass(innerDivClass);
  if ($$props.searchClass === void 0 && $$bindings.searchClass && searchClass !== void 0)
    $$bindings.searchClass(searchClass);
  if ($$props.svgDivClass === void 0 && $$bindings.svgDivClass && svgDivClass !== void 0)
    $$bindings.svgDivClass(svgDivClass);
  if ($$props.svgClass === void 0 && $$bindings.svgClass && svgClass !== void 0)
    $$bindings.svgClass(svgClass);
  if ($$props.inputClass === void 0 && $$bindings.inputClass && inputClass !== void 0)
    $$bindings.inputClass(inputClass);
  {
    setContext("striped", striped);
  }
  {
    setContext("hoverable", hoverable);
  }
  {
    setContext("color", color);
  }
  return `<div${add_attribute("class", divClass, 0)}><div${add_attribute("class", innerDivClass, 0)}><label for="table-search" class="sr-only" data-svelte-h="svelte-1m8vpa4">Search</label> <div${add_attribute("class", searchClass, 0)}><div${add_attribute("class", svgDivCls, 0)}>${slots.svgSearch ? slots.svgSearch({}) : ` <svg${add_attribute("class", svgClass, 0)} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg> `}</div> <input type="text" id="table-search"${add_attribute("class", inputCls, 0)}${add_attribute("placeholder", placeholder, 0)}${add_attribute("value", inputValue, 0)}></div> ${slots.header ? slots.header({}) : ``}</div> <table${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge("w-full text-left text-sm", colors[color], $$props.class))
      }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</table> ${slots.footer ? slots.footer({}) : ``}</div> `;
});
export {
  TableSearch as T
};
