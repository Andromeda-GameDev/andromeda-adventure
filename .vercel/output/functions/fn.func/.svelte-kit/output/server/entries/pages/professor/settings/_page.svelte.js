import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import { B as Button } from "../../../../chunks/Button.js";
import { I as Input } from "../../../../chunks/Input.js";
import { P as PasswordStrengthPopover, H as Helper } from "../../../../chunks/PasswordStrengthPopover.js";
import { M as Modal } from "../../../../chunks/Modal.js";
import { A as Alert_1 } from "../../../../chunks/Alert.js";
import { E as ExclamationCircleOutline } from "../../../../chunks/ExclamationCircleOutline.js";
import { E as EyeSlashOutline } from "../../../../chunks/EyeSlashOutline.js";
import "../../../../chunks/firebase.js";
import "firebase/auth";
import "firebase/database";
const css = {
  code: ".settings-container.svelte-1kqsmqm.svelte-1kqsmqm{margin-top:20px;width:100%}.change-password.svelte-1kqsmqm.svelte-1kqsmqm{margin:0 auto;margin-top:2rem;width:80%}.change-password-title.svelte-1kqsmqm.svelte-1kqsmqm{margin-bottom:1.5rem}.change-password-title.svelte-1kqsmqm h1.svelte-1kqsmqm{color:#000;margin-bottom:1rem;font-weight:600}.change-password-input.svelte-1kqsmqm.svelte-1kqsmqm{display:flex;flex-direction:column;justify-content:center;gap:1rem}.change-password-button.svelte-1kqsmqm.svelte-1kqsmqm{margin-top:1.5rem}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let alert = {
    visible: false,
    type: "error",
    message: ""
  };
  let deleteAccountModal = false;
  let password = "";
  let confirmPassword = "";
  let isPasswordValid = false;
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="settings-container svelte-1kqsmqm"><div class="change-password svelte-1kqsmqm"><div class="change-password-title svelte-1kqsmqm" data-svelte-h="svelte-k2ezxr"><h1 class="svelte-1kqsmqm">Cambiar contraseña</h1> <hr class="solid"></div> <div class="change-password-input svelte-1kqsmqm"><div class="flex items-center gap-2">${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "password",
        id: "password",
        placeholder: "Nueva contraseña",
        class: "focus:ring-blue-500 focus:border-blue-500",
        color: "base",
        value: password
      },
      {
        value: ($$value) => {
          password = $$value;
          $$settled = false;
        }
      },
      {
        left: () => {
          return `<button slot="left" class="pointer-events-auto">${`${validate_component(EyeSlashOutline, "EyeSlashOutline").$$render(
            $$result,
            {
              class: "w-5 h-5 text-gray-400 dark:text-gray-200"
            },
            {},
            {}
          )}`}</button>`;
        }
      }
    )} <div style="z-index: 1">${validate_component(PasswordStrengthPopover, "PasswordStrengthPopover").$$render(
      $$result,
      { password },
      {
        password: ($$value) => {
          password = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div> <div class="flex items-center gap-2">${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "password",
        placeholder: "Confirmar contraseña",
        class: "focus:ring-blue-500 focus:border-blue-500",
        color: password == confirmPassword && password != "" ? "green" : "base",
        value: confirmPassword
      },
      {
        value: ($$value) => {
          confirmPassword = $$value;
          $$settled = false;
        }
      },
      {
        left: () => {
          return `<button slot="left" class="pointer-events-auto">${`${validate_component(EyeSlashOutline, "EyeSlashOutline").$$render(
            $$result,
            {
              class: "w-5 h-5 text-gray-400 dark:text-gray-200"
            },
            {},
            {}
          )}`}</button>`;
        }
      }
    )}</div> ${password != confirmPassword && password != "" && confirmPassword != "" ? `${validate_component(Helper, "Helper").$$render($$result, { color: "red" }, {}, {
      default: () => {
        return `Las contraseñas no coinciden`;
      }
    })}` : ``}</div> <div class="change-password-button svelte-1kqsmqm">${validate_component(Button, "Button").$$render(
      $$result,
      {
        class: "bg-black hover:bg-gray-700",
        disabled: password != confirmPassword || password == "" || confirmPassword == "" || !isPasswordValid
      },
      {},
      {
        default: () => {
          return `${`Actualizar contraseña`}`;
        }
      }
    )}</div></div> <div class="change-password svelte-1kqsmqm"><div class="change-password-title svelte-1kqsmqm" data-svelte-h="svelte-l7kx0i"><h1 class="svelte-1kqsmqm">Eliminar cuenta</h1> <hr class="solid"></div> <div class="change-password-button svelte-1kqsmqm">${validate_component(Button, "Button").$$render($$result, { color: "red" }, {}, {
      default: () => {
        return `Eliminar cuenta`;
      }
    })}</div></div></div> ${validate_component(Alert_1, "Alert").$$render(
      $$result,
      {
        alertType: alert.type,
        alertMessage: alert.message,
        alertVisible: alert.visible
      },
      {},
      {}
    )} ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        size: "sm",
        outsideclose: true,
        open: deleteAccountModal
      },
      {
        open: ($$value) => {
          deleteAccountModal = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<div class="text-center">${validate_component(ExclamationCircleOutline, "ExclamationCircleOutline").$$render(
            $$result,
            {
              class: "mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
            },
            {},
            {}
          )} <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400" data-svelte-h="svelte-121wy5j">Seguro deseas eliminar esta cuenta? No se puede recuperar</h3> ${validate_component(Button, "Button").$$render($$result, { color: "red", class: "me-2" }, {}, {
            default: () => {
              return `Sí, borrar`;
            }
          })} ${validate_component(Button, "Button").$$render($$result, { color: "alternative" }, {}, {
            default: () => {
              return `No, cancelar`;
            }
          })}</div>`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
