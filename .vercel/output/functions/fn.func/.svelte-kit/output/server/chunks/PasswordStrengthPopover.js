import { c as create_ssr_component, b as compute_rest_props, d as spread, f as escape_object, h as escape_attribute_value, g as getContext, i as add_attribute, l as createEventDispatcher, v as validate_component } from "./ssr.js";
import { twMerge } from "tailwind-merge";
import { P as Popover } from "./Popover.js";
const Helper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["helperClass", "color"]);
  let { helperClass = "text-xs font-normal text-gray-500 dark:text-gray-300" } = $$props;
  let { color = "gray" } = $$props;
  const colorClasses = {
    gray: "text-gray-900 dark:text-gray-300",
    green: "text-green-700 dark:text-green-500",
    red: "text-red-700 dark:text-red-500",
    disabled: "text-gray-400 dark:text-gray-500"
  };
  if ($$props.helperClass === void 0 && $$bindings.helperClass && helperClass !== void 0)
    $$bindings.helperClass(helperClass);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  return `<p${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge(helperClass, colorClasses[color], $$props.class))
      }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</p> `;
});
const CheckOutline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { ariaLabel = "check outline" } = $$props;
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
      { viewBox: "0 0 16 12" }
    ],
    {}
  )}><path stroke="currentColor"${add_attribute("stroke-linecap", strokeLinecap, 0)}${add_attribute("stroke-linejoin", strokeLinejoin, 0)}${add_attribute("stroke-width", strokeWidth, 0)} d="M1 5.917 5.724 10.5 15 1.5"></path></svg> `;
});
const CloseOutline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { ariaLabel = "close outline" } = $$props;
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
      { viewBox: "0 0 14 14" }
    ],
    {}
  )}><path stroke="currentColor"${add_attribute("stroke-linecap", strokeLinecap, 0)}${add_attribute("stroke-linejoin", strokeLinejoin, 0)}${add_attribute("stroke-width", strokeWidth, 0)} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"></path></svg> `;
});
const PasswordStrengthPopover = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let lengthRequirement;
  let upperLowerRequirement;
  let symbolRequirement;
  let numberRequirement;
  let passwordIsValid;
  let progress;
  let { password = "" } = $$props;
  const dispatch = createEventDispatcher();
  if ($$props.password === void 0 && $$bindings.password && password !== void 0)
    $$bindings.password(password);
  lengthRequirement = password.length >= 8;
  upperLowerRequirement = /[a-z]/.test(password) && /[A-Z]/.test(password);
  symbolRequirement = /[#$&!-.?]/.test(password);
  numberRequirement = /[0-9]/.test(password);
  passwordIsValid = lengthRequirement && upperLowerRequirement && symbolRequirement && numberRequirement;
  progress = (Number(lengthRequirement) + Number(upperLowerRequirement) + Number(symbolRequirement) + Number(numberRequirement)) / 4 * 100;
  {
    dispatch("passwordValid", passwordIsValid);
  }
  return `${validate_component(Popover, "Popover").$$render(
    $$result,
    {
      class: "text-sm",
      triggeredBy: "#password",
      placement: "bottom"
    },
    {},
    {
      default: () => {
        return `<h3 class="font-semibold text-gray-900 dark:text-white" data-svelte-h="svelte-vxfl8p">Debe de tener al menos 8 caracteres</h3> <div class="grid grid-cols-4 gap-2"><div${add_attribute(
          "class",
          progress >= 25 ? "h-1 bg-orange-300 dark:bg-orange-400" : "h-1 bg-gray-200 dark:bg-gray-600",
          0
        )}></div> <div${add_attribute(
          "class",
          progress >= 50 ? "h-1 bg-orange-300 dark:bg-orange-400" : "h-1 bg-gray-200 dark:bg-gray-600",
          0
        )}></div> <div${add_attribute(
          "class",
          progress >= 75 ? "h-1 bg-orange-300 dark:bg-orange-400" : "h-1 bg-gray-200 dark:bg-gray-600",
          0
        )}></div> <div${add_attribute(
          "class",
          progress == 100 ? "h-1 bg-orange-300 dark:bg-orange-400" : "h-1 bg-gray-200 dark:bg-gray-600",
          0
        )}></div></div> <p class="py-2" data-svelte-h="svelte-1uagdce">Asegurate de agregar:</p> <ul><li class="flex items-center mb-1">${upperLowerRequirement ? `${validate_component(CheckOutline, "CheckOutline").$$render(
          $$result,
          {
            class: "me-2 w-4 h-4 text-green-400 dark:text-green-500"
          },
          {},
          {}
        )}` : `${validate_component(CloseOutline, "CloseOutline").$$render(
          $$result,
          {
            class: "me-2 w-4 h-4 text-gray-300 dark:text-gray-400"
          },
          {},
          {}
        )}`}
                Mayúsculas &amp; minúsculas</li> <li class="flex items-center mb-1">${symbolRequirement ? `${validate_component(CheckOutline, "CheckOutline").$$render(
          $$result,
          {
            class: "me-2 w-4 h-4 text-green-400 dark:text-green-500"
          },
          {},
          {}
        )}` : `${validate_component(CloseOutline, "CloseOutline").$$render(
          $$result,
          {
            class: "me-2 w-4 h-4 text-gray-300 dark:text-gray-400"
          },
          {},
          {}
        )}`}
                Un caracter especial (#$&amp;!-.?)</li> <li class="flex items-center">${numberRequirement ? `${validate_component(CheckOutline, "CheckOutline").$$render(
          $$result,
          {
            class: "me-2 w-4 h-4 text-green-400 dark:text-green-500"
          },
          {},
          {}
        )}` : `${validate_component(CloseOutline, "CloseOutline").$$render(
          $$result,
          {
            class: "me-2 w-4 h-4 text-gray-300 dark:text-gray-400"
          },
          {},
          {}
        )}`}
                Un número</li></ul>`;
      }
    }
  )}`;
});
export {
  Helper as H,
  PasswordStrengthPopover as P
};
