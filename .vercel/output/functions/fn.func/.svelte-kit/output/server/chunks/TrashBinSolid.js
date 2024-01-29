import { c as create_ssr_component, b as compute_rest_props, s as setContext, v as validate_component, i as add_attribute, j as compute_slots, g as getContext, d as spread, h as escape_attribute_value, f as escape_object } from "./ssr.js";
import { twMerge } from "tailwind-merge";
import { P as Popper } from "./Popper.js";
import { w as writable } from "./index.js";
import { i as is_void } from "./Button.js";
import { W as Wrapper } from "./Wrapper.js";
const Dropdown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["activeUrl", "open", "containerClass", "headerClass", "footerClass", "activeClass"]);
  let $$slots = compute_slots(slots);
  const activeUrlStore = writable("");
  let { activeUrl = "" } = $$props;
  let { open = false } = $$props;
  let { containerClass = "divide-y z-50" } = $$props;
  let { headerClass = "py-1 overflow-hidden rounded-t-lg" } = $$props;
  let { footerClass = "py-1 overflow-hidden rounded-b-lg" } = $$props;
  let { activeClass = "text-primary-700 dark:text-primary-700 hover:text-primary-900 dark:hover:text-primary-900" } = $$props;
  let activeCls = twMerge(activeClass, $$props.classActive);
  setContext("DropdownType", { activeClass: activeCls });
  setContext("activeUrl", activeUrlStore);
  let containerCls = twMerge(containerClass, $$props.classContainer);
  let headerCls = twMerge(headerClass, $$props.classHeader);
  let ulCls = twMerge("py-1", $$props.class);
  let footerCls = twMerge(footerClass, $$props.classFooter);
  if ($$props.activeUrl === void 0 && $$bindings.activeUrl && activeUrl !== void 0)
    $$bindings.activeUrl(activeUrl);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.containerClass === void 0 && $$bindings.containerClass && containerClass !== void 0)
    $$bindings.containerClass(containerClass);
  if ($$props.headerClass === void 0 && $$bindings.headerClass && headerClass !== void 0)
    $$bindings.headerClass(headerClass);
  if ($$props.footerClass === void 0 && $$bindings.footerClass && footerClass !== void 0)
    $$bindings.footerClass(footerClass);
  if ($$props.activeClass === void 0 && $$bindings.activeClass && activeClass !== void 0)
    $$bindings.activeClass(activeClass);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      activeUrlStore.set(activeUrl);
    }
    {
      {
        $$restProps.arrow = $$restProps.arrow ?? false;
        $$restProps.trigger = $$restProps.trigger ?? "click";
        $$restProps.placement = $$restProps.placement ?? "bottom";
        $$restProps.color = $$restProps.color ?? "dropdown";
        $$restProps.shadow = $$restProps.shadow ?? true;
        $$restProps.rounded = $$restProps.rounded ?? true;
      }
    }
    $$rendered = `${validate_component(Popper, "Popper").$$render(
      $$result,
      Object.assign({}, { activeContent: true }, $$restProps, { class: containerCls }, { open }),
      {
        open: ($$value) => {
          open = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${$$slots.header ? `<div${add_attribute("class", headerCls, 0)}>${slots.header ? slots.header({}) : ``}</div>` : ``} <ul${add_attribute("class", ulCls, 0)}>${slots.default ? slots.default({}) : ``}</ul> ${$$slots.footer ? `<div${add_attribute("class", footerCls, 0)}>${slots.footer ? slots.footer({}) : ``}</div>` : ``}`;
        }
      }
    )} `;
  } while (!$$settled);
  return $$rendered;
});
const DropdownItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let active;
  let liClass;
  let $$restProps = compute_rest_props($$props, ["defaultClass", "href", "activeClass"]);
  let { defaultClass = "font-medium py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600" } = $$props;
  let { href = void 0 } = $$props;
  let { activeClass = void 0 } = $$props;
  const context = getContext("DropdownType") ?? {};
  const activeUrlStore = getContext("activeUrl");
  let sidebarUrl = "";
  activeUrlStore.subscribe((value) => {
    sidebarUrl = value;
  });
  let wrap = true;
  function init(node) {
    wrap = node.parentElement?.tagName === "UL";
  }
  if ($$props.defaultClass === void 0 && $$bindings.defaultClass && defaultClass !== void 0)
    $$bindings.defaultClass(defaultClass);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.activeClass === void 0 && $$bindings.activeClass && activeClass !== void 0)
    $$bindings.activeClass(activeClass);
  active = sidebarUrl ? href === sidebarUrl : false;
  liClass = twMerge(defaultClass, href ? "block" : "w-full text-left", active && (activeClass ?? context.activeClass), $$props.class);
  return `${validate_component(Wrapper, "Wrapper").$$render($$result, { tag: "li", show: wrap, use: init }, {}, {
    default: () => {
      return `${((tag) => {
        return tag ? `<${href ? "a" : "button"}${spread(
          [
            { href: escape_attribute_value(href) },
            {
              type: escape_attribute_value(href ? void 0 : "button")
            },
            {
              role: escape_attribute_value(href ? "link" : "button")
            },
            escape_object($$restProps),
            { class: escape_attribute_value(liClass) }
          ],
          {}
        )}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
      })(href ? "a" : "button")}`;
    }
  })} `;
});
const TrashBinSolid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { ariaLabel = "trash bin solid" } = $$props;
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
      { viewBox: "0 0 18 20" }
    ],
    {}
  )}><path fill="currentColor" d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z"></path></svg> `;
});
export {
  Dropdown as D,
  TrashBinSolid as T,
  DropdownItem as a
};
