import { c as create_ssr_component, b as compute_rest_props, d as spread, f as escape_object, h as escape_attribute_value, k as each, i as add_attribute, e as escape, v as validate_component, g as getContext } from "./ssr.js";
import { B as Badge } from "./Badge.js";
import { C as CloseButton } from "./CloseButton.js";
import { twMerge } from "tailwind-merge";
import { c as createEventDispatcher } from "./createEventDispatcher.js";
import { C as Checkbox } from "./Checkbox.js";
const multiSelectClass = "relative border border-gray-300 flex items-center rounded-lg gap-2 dark:border-gray-600 focus-within:ring-1 focus-within:border-primary-500 ring-primary-500 dark:focus-within:border-primary-500 dark:ring-primary-500";
const MultiSelect = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["items", "value", "size", "dropdownClass"]);
  createEventDispatcher();
  let { items = [] } = $$props;
  let { value = [] } = $$props;
  let { size = "md" } = $$props;
  let { dropdownClass = "" } = $$props;
  let selectItems = items.filter((x) => value.includes(x.value));
  const sizes = {
    sm: "px-2 py-1 min-h-[2.4rem]",
    md: "px-3 py-1 min-h-[2.7rem]",
    lg: "px-4 py-2 min-h-[3.2rem]"
  };
  const clearThisOption = (select) => {
    if (value.includes(select.value)) {
      value = value.filter((o) => o !== select.value);
    }
  };
  if ($$props.items === void 0 && $$bindings.items && items !== void 0)
    $$bindings.items(items);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.dropdownClass === void 0 && $$bindings.dropdownClass && dropdownClass !== void 0)
    $$bindings.dropdownClass(dropdownClass);
  twMerge("absolute z-50 p-3 flex flex-col gap-1 max-h-64 bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-600 left-0 top-[calc(100%+1rem)] rounded-lg cursor-pointer overflow-y-scroll w-full", dropdownClass);
  return ` <select${spread(
    [
      escape_object($$restProps),
      { value: escape_attribute_value(value) },
      { hidden: true },
      { multiple: true }
    ],
    {}
  )}>${each(items, ({ value: value2, name }) => {
    return `<option${add_attribute("value", value2, 0)}>${escape(name)}</option>`;
  })}</select>  <div tabindex="-1" role="listbox"${add_attribute("class", twMerge(multiSelectClass, sizes[size], $$props.class), 0)}><span class="flex gap-2 flex-wrap">${selectItems.length ? `${each(selectItems, (item) => {
    return `${slots.default ? slots.default({ item, clear: () => clearThisOption(item) }) : ` ${validate_component(Badge, "Badge").$$render(
      $$result,
      {
        color: "dark",
        large: size === "lg",
        dismissable: true,
        params: { duration: 100 }
      },
      {},
      {
        default: () => {
          return `${escape(item.name)} `;
        }
      }
    )} `}`;
  })}` : ``}</span> <div class="flex ml-auto gap-2 items-center">${selectItems.length ? `${validate_component(CloseButton, "CloseButton").$$render(
    $$result,
    {
      size,
      color: "none",
      class: "p-0 focus:ring-gray-400"
    },
    {},
    {}
  )}` : ``} <div class="w-[1px] bg-gray-300 dark:bg-gray-600"></div> <svg class="cursor-pointer h-3 w-3 ml-1 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"${add_attribute("d", "m9 1-4 4-4-4", 0)}></path></svg></div> ${``}</div> `;
});
const common = "mr-3 shrink-0 bg-gray-200 rounded-full peer-focus:ring-4 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:bg-white after:border-gray-300 after:border after:rounded-full after:transition-all";
const Toggle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "group", "value", "checked", "customSize"]);
  let { size = "default" } = $$props;
  let { group = [] } = $$props;
  let { value = "" } = $$props;
  let { checked = void 0 } = $$props;
  let { customSize = "" } = $$props;
  let background = getContext("background");
  const colors = {
    primary: "peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 peer-checked:bg-primary-600",
    secondary: "peer-focus:ring-secondary-300 dark:peer-focus:ring-secondary-800 peer-checked:bg-secondary-600",
    red: "peer-focus:ring-red-300 dark:peer-focus:ring-red-800 peer-checked:bg-red-600",
    green: "peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:bg-green-600",
    purple: "peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:bg-purple-600",
    yellow: "peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 peer-checked:bg-yellow-400",
    teal: "peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:bg-teal-600",
    orange: "peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 peer-checked:bg-orange-500",
    blue: "peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:bg-blue-600"
  };
  const sizes = {
    small: "w-9 h-5 after:top-[2px] after:left-[2px] after:h-4 after:w-4",
    default: "w-11 h-6 after:top-0.5 after:left-[2px] after:h-5 after:w-5",
    large: "w-14 h-7 after:top-0.5 after:left-[4px]  after:h-6 after:w-6",
    custom: customSize
  };
  let divClass;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.group === void 0 && $$bindings.group && group !== void 0)
    $$bindings.group(group);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
    $$bindings.checked(checked);
  if ($$props.customSize === void 0 && $$bindings.customSize && customSize !== void 0)
    $$bindings.customSize(customSize);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    divClass = twMerge(
      common,
      background ? "dark:bg-gray-600 dark:border-gray-500" : "dark:bg-gray-700 dark:border-gray-600",
      colors[$$restProps.color ?? "primary"],
      sizes[size],
      "relative",
      $$props.classDiv
    );
    $$rendered = `${validate_component(Checkbox, "Checkbox").$$render(
      $$result,
      Object.assign({}, { custom: true }, $$restProps, { class: $$props.class }, { value }, { checked }, { group }),
      {
        checked: ($$value) => {
          checked = $$value;
          $$settled = false;
        },
        group: ($$value) => {
          group = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<span${add_attribute("class", divClass, 0)}></span> ${slots.default ? slots.default({}) : ``}`;
        }
      }
    )} `;
  } while (!$$settled);
  return $$rendered;
});
export {
  MultiSelect as M,
  Toggle as T
};
