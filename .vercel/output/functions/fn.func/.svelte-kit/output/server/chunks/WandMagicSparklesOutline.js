import { c as create_ssr_component, b as compute_rest_props, g as getContext, d as spread, f as escape_object, h as escape_attribute_value, i as add_attribute } from "./ssr.js";
import { twMerge } from "tailwind-merge";
const WandMagicSparklesOutline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "role", "strokeLinecap", "strokeLinejoin", "strokeWidth", "ariaLabel"]);
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
  let { strokeLinecap = ctx.strokeLinecap || "round" } = $$props;
  let { strokeLinejoin = ctx.strokeLinejoin || "round" } = $$props;
  let { strokeWidth = ctx.strokeWidth || "2" } = $$props;
  let { ariaLabel = "wand magic sparkles outline" } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.role === void 0 && $$bindings.role && role !== void 0)
    $$bindings.role(role);
  if ($$props.strokeLinecap === void 0 && $$bindings.strokeLinecap && strokeLinecap !== void 0)
    $$bindings.strokeLinecap(strokeLinecap);
  if ($$props.strokeLinejoin === void 0 && $$bindings.strokeLinejoin && strokeLinejoin !== void 0)
    $$bindings.strokeLinejoin(strokeLinejoin);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: "none" },
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge("shrink-0", sizes[size], $$props.class))
      },
      { role: escape_attribute_value(role) },
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      { viewBox: "0 0 20 21" }
    ],
    {}
  )}><path d="M12.555 5.11696L15.383 7.94496M14 16V20M12 18H16M3 5.99996V9.99996M1 7.99996H5M16.01 1.66113L18.8384 4.48956L3.98915 19.3388L1.16072 16.5104L16.01 1.66113Z" stroke="currentColor"${add_attribute("stroke-width", strokeWidth, 0)}${add_attribute("stroke-linecap", strokeLinecap, 0)}${add_attribute("stroke-linejoin", strokeLinejoin, 0)}></path><path d="M17 12H15V14H17V12Z" fill="currentColor"></path><path d="M11 1H9V3H11V1Z" fill="currentColor"></path><path d="M8 3H6V5H8V3Z" fill="currentColor"></path><path d="M5 1H3V3H5V1Z" fill="currentColor"></path><path d="M20 9H18V11H20V9Z" fill="currentColor"></path><path d="M20 14H18V16H20V14Z" fill="currentColor"></path></svg> `;
});
export {
  WandMagicSparklesOutline as W
};
