import { c as create_ssr_component, b as compute_rest_props, v as validate_component, j as compute_slots, g as getContext, d as spread, f as escape_object, h as escape_attribute_value, e as escape } from "./ssr.js";
import { T as TransitionFrame, C as CloseButton } from "./CloseButton.js";
import { twMerge } from "tailwind-merge";
import { B as Button } from "./Button.js";
import { I as InfoCircleSolid } from "./InfoCircleSolid.js";
const Alert = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["dismissable", "defaultClass"]);
  let $$slots = compute_slots(slots);
  let { dismissable = false } = $$props;
  let { defaultClass = "p-4 gap-3 text-sm" } = $$props;
  let divClass;
  if ($$props.dismissable === void 0 && $$bindings.dismissable && dismissable !== void 0)
    $$bindings.dismissable(dismissable);
  if ($$props.defaultClass === void 0 && $$bindings.defaultClass && defaultClass !== void 0)
    $$bindings.defaultClass(defaultClass);
  divClass = twMerge(defaultClass, ($$slots.icon || dismissable) && "flex items-center", $$props.class);
  return `${validate_component(TransitionFrame, "TransitionFrame").$$render($$result, Object.assign({}, { dismissable }, { color: "primary" }, { role: "alert" }, { rounded: true }, $$restProps, { class: divClass }), {}, {
    default: ({ close }) => {
      return `${$$slots.icon ? `${slots.icon ? slots.icon({}) : ``}` : ``} ${$$slots.icon || dismissable ? `<div>${slots.default ? slots.default({}) : ``}</div>` : `${slots.default ? slots.default({}) : ``}`} ${dismissable ? `${slots["close-button"] ? slots["close-button"]({ close }) : ` ${validate_component(CloseButton, "CloseButton").$$render(
        $$result,
        {
          class: "ml-auto -mr-1.5 -my-1.5 dark:hover:bg-gray-700",
          color: $$restProps.color
        },
        {},
        {}
      )} `}` : ``}`;
    }
  })} `;
});
const CloseSolid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { ariaLabel = "close solid" } = $$props;
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
      { viewBox: "0 0 16 16" }
    ],
    {}
  )}><path fill="currentColor" d="m9.414 8 5.293-5.293a1 1 0 1 0-1.414-1.414L8 6.586 2.707 1.293a1 1 0 0 0-1.414 1.414L6.586 8l-5.293 5.293a1 1 0 1 0 1.414 1.414L8 9.414l5.293 5.293a1 1 0 0 0 1.414-1.414L9.414 8Z"></path></svg> `;
});
const css = {
  code: ".alert-container.svelte-1ychxxi{position:absolute;top:8rem;left:0;right:0;width:100%;display:flex;justify-content:right;align-items:right}",
  map: null
};
const Alert_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { alertVisible = false } = $$props;
  let { alertType = "info" } = $$props;
  let { alertMessage = "This is an alert message" } = $$props;
  let alertColor = "";
  let symbolColor = "";
  const errorCode = {
    "auth/invalid-email": "El correo electrónico ingresado no es válido.",
    "auth/user-disabled": "El usuario ha sido deshabilitado.",
    "auth/user-not-found": "El usuario no existe, favor de verificar.",
    "auth/wrong-password": "La contraseña es incorrecta.",
    "auth/email-already-in-use": "El correo electrónico ya está en uso.",
    "auth/operation-not-allowed": "La operación no está permitida.",
    "auth/weak-password": "La contraseña es muy débil.",
    "auth/popup-closed-by-user": "El inicio de sesión con Google fue cancelado.",
    "auth/network-request-failed": "Error de conexión. Por favor, intente nuevamente.",
    "auth/too-many-requests": "Demasiados intentos de inicio de sesión fallidos. Por favor, intente nuevamente más tarde.",
    "auth/invalid-credential": "Las credenciales son inválidas, favor de revisar.",
    "auth/account-exists-with-different-credential": "El correo electrónico ya está en uso.",
    "auth/auth-domain-config-required": "Error de conexión. Por favor, intente nuevamente.",
    "auth/credential-already-in-use": "El correo electrónico ya está en uso.",
    "auth/operation-not-supported-in-this-environment": "Error de conexión. Por favor, intente nuevamente.",
    "auth/timeout": "Error de conexión. Por favor, intente nuevamente.",
    "auth/missing-android-pkg-name": "Error de conexión. Por favor, intente nuevamente.",
    "auth/missing-continue-uri": "Error de conexión. Por favor, intente nuevamente.",
    "auth/missing-ios-bundle-id": "Error de conexión. Por favor, intente nuevamente.",
    "auth/invalid-continue-uri": "Error de conexión. Por favor, intente nuevamente.",
    "auth/unauthorized-continue-uri": "Error de conexión. Por favor, intente nuevamente.",
    "auth/invalid-dynamic-link-domain": "Error de conexión. Por favor, intente nuevamente.",
    "auth/argument-error": "Error de conexión. Por favor, intente nuevamente.",
    "auth/invalid-persistence-type": "Error de conexión. Por favor, intentelo nuevamente.",
    "auth/requires-recent-login": "La sesión ha expirado, favor de iniciar sesión nuevamente.",
    "auth/popup-blocked": "Las ventanas emergentes están bloqueadas en este navegador. Por favor, habilítelas e intente nuevamente."
  };
  if ($$props.alertVisible === void 0 && $$bindings.alertVisible && alertVisible !== void 0)
    $$bindings.alertVisible(alertVisible);
  if ($$props.alertType === void 0 && $$bindings.alertType && alertType !== void 0)
    $$bindings.alertType(alertType);
  if ($$props.alertMessage === void 0 && $$bindings.alertMessage && alertMessage !== void 0)
    $$bindings.alertMessage(alertMessage);
  $$result.css.add(css);
  {
    if (alertType == "info") {
      alertColor = "bg-blue-100 text-blue-500";
      symbolColor = "text-blue-500";
    } else if (alertType == "success") {
      alertColor = "bg-green-100 text-green-500";
      symbolColor = "text-green-500";
    } else if (alertType == "warning") {
      alertColor = "bg-yellow-100 text-yellow-500";
      symbolColor = "text-yellow-500";
    } else if (alertType == "error") {
      alertColor = "bg-red-100 text-red-500";
      symbolColor = "text-red-500";
    }
  }
  {
    if (alertVisible) {
      setTimeout(
        () => {
          alertVisible = false;
        },
        3e3
      );
    }
  }
  {
    if (alertMessage in errorCode) {
      alertMessage = errorCode[alertMessage];
    }
  }
  return `<div class="alert-container svelte-1ychxxi">${alertVisible ? `<div>${validate_component(Alert, "Alert").$$render($$result, { class: alertColor, dismissable: true }, {}, {
    "close-button": () => {
      return `${validate_component(Button, "Button").$$render(
        $$result,
        {
          slot: "close-button",
          size: "xs",
          class: "ms-auto bg-transparent-100 text-black-900 hover:bg-red-300"
        },
        {},
        {
          default: () => {
            return `${validate_component(CloseSolid, "CloseSolid").$$render($$result, { size: "xs" }, {}, {})}`;
          }
        }
      )}`;
    },
    icon: () => {
      return `<span slot="icon">${validate_component(InfoCircleSolid, "InfoCircleSolid").$$render($$result, { class: "w-5 h-5 " + symbolColor }, {}, {})}</span>`;
    },
    default: () => {
      return `<span><p class="text-sm">${escape(alertMessage)}</p></span>`;
    }
  })}</div>` : ``} </div>`;
});
export {
  Alert_1 as A
};
