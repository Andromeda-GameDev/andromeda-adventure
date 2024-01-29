import { c as create_ssr_component, v as validate_component, e as escape, m as missing_component, a as subscribe, k as each } from "../../../chunks/ssr.js";
import { S as Students, d as dbStatus, G as GlobalValues } from "../../../chunks/adminData.js";
import { I as Indicator } from "../../../chunks/Indicator.js";
import { B as Badge } from "../../../chunks/Badge.js";
import { B as Button } from "../../../chunks/Button.js";
import { I as Input } from "../../../chunks/Input.js";
import { T as Toggle, M as MultiSelect } from "../../../chunks/Toggle.js";
import { M as Modal } from "../../../chunks/Modal.js";
import { T as Table, a as TableHead, b as TableHeadCell, c as TableBody, d as TableBodyRow, e as TableBodyCell } from "../../../chunks/TableHeadCell.js";
import { E as ExclamationCircleOutline } from "../../../chunks/ExclamationCircleOutline.js";
import { C as Card } from "../../../chunks/Card.js";
import "../../../chunks/client.js";
import { C as ChartLineUpSolid, U as UserSettingsSolid } from "../../../chunks/UserSettingsSolid.js";
import { U as UsersGroupOutline } from "../../../chunks/UsersGroupOutline.js";
import { a as authStore } from "../../../chunks/auth.js";
const css$1 = {
  code: ".card-content.svelte-1mfq2v2{display:flex;flex-direction:column;justify-content:flex-start;align-items:left;overflow:auto;width:200px;height:120px}.class-header.svelte-1mfq2v2{display:flex;justify-content:space-between;align-items:center;width:100%;padding-bottom:1rem}.card-title.svelte-1mfq2v2{font-size:1.2rem;font-weight:800;color:black}.card-body.svelte-1mfq2v2{display:flex;justify-content:flex-start;align-items:top;width:100%;height:100%;flex-wrap:wrap}",
  map: null
};
const DashboardCardAdmin = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "Card title" } = $$props;
  let { label = "Card label" } = $$props;
  let { description = "Card description" } = $$props;
  const icon = {
    "students": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
            <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
            <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
            </svg>`,
    "professors": UsersGroupOutline,
    "groups": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd" d="M1.5 7.125c0-1.036.84-1.875 1.875-1.875h6c1.036 0 1.875.84 1.875 1.875v3.75c0 1.036-.84 1.875-1.875 1.875h-6A1.875 1.875 0 0 1 1.5 10.875v-3.75Zm12 1.5c0-1.036.84-1.875 1.875-1.875h5.25c1.035 0 1.875.84 1.875 1.875v8.25c0 1.035-.84 1.875-1.875 1.875h-5.25a1.875 1.875 0 0 1-1.875-1.875v-8.25ZM3 16.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875v2.25c0 1.035-.84 1.875-1.875 1.875h-5.25A1.875 1.875 0 0 1 3 18.375v-2.25Z" clip-rule="evenodd" />
            </svg>`,
    "stats": ChartLineUpSolid,
    "settings": UserSettingsSolid
  };
  let chosenIcon = icon[label];
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  $$result.css.add(css$1);
  return `${validate_component(Card, "Card").$$render(
    $$result,
    {
      class: "hover:bg-green-200 cursor-pointer"
    },
    {},
    {
      default: () => {
        return `<div class="card-content svelte-1mfq2v2"><div class="class-header svelte-1mfq2v2"><h5 class="card-title svelte-1mfq2v2">${escape(title)}</h5> ${label === "students" || label === "groups" ? `<!-- HTML_TAG_START -->${chosenIcon}<!-- HTML_TAG_END -->` : `${validate_component(chosenIcon || missing_component, "svelte:component").$$render($$result, {}, {}, {})}`}</div> <div class="card-body svelte-1mfq2v2"><p>${escape(description)}</p></div></div>`;
      }
    }
  )}`;
});
const css = {
  code: ".main-content.svelte-1my0kby.svelte-1my0kby{height:100vh;width:100%;background-color:#f5f5f5;flex-direction:column;display:flex}.greeting.svelte-1my0kby.svelte-1my0kby{display:flex;justify-content:left;align-items:center;padding-left:3.5rem;height:10%;padding-bottom:3rem;padding-top:3rem}.greeting.svelte-1my0kby h1.svelte-1my0kby{font-size:1.5rem;font-weight:100;color:black}.greeting.svelte-1my0kby p.svelte-1my0kby{font-size:1.5rem;font-weight:800;color:#1dcd63;padding-left:0.5rem}.card-container.svelte-1my0kby.svelte-1my0kby{display:flex;justify-content:left;align-items:center;flex:0;flex-wrap:wrap;gap:1.2rem;padding-left:3.5rem}.sections-container.svelte-1my0kby.svelte-1my0kby{padding:0;margin:0;height:100%;min-height:100%}.section-title.svelte-1my0kby.svelte-1my0kby{font-size:1.2rem;font-weight:600;color:black;padding-left:2rem;padding-top:1.5rem;padding-bottom:1.5rem}.sections.svelte-1my0kby.svelte-1my0kby{display:flex;flex-direction:column;height:100%}.top-sections.svelte-1my0kby.svelte-1my0kby{display:flex;flex-direction:row;justify-content:space-between;flex-wrap:wrap;gap:1.2rem;padding-left:3.5rem;padding-right:3.5rem;padding-top:1.5rem;height:20%}.top-left-section.svelte-1my0kby.svelte-1my0kby{height:100%;width:calc(50% - 10px);display:flex;flex-direction:column;background-color:white;border-radius:1rem;box-shadow:0 0 10px 0 rgba(0,0,0,0.1)}.db-status.svelte-1my0kby.svelte-1my0kby{display:flex;flex-direction:row;justify-content:space-between;align-items:center;padding-top:0;padding-left:2rem;padding-right:2rem;padding-bottom:1rem}.top-right-section.svelte-1my0kby.svelte-1my0kby{height:100%;width:calc(50% - 10px);background-color:white;border-radius:1rem;box-shadow:0 0 10px 0 rgba(0,0,0,0.1)}.student-count.svelte-1my0kby.svelte-1my0kby{display:flex;flex-direction:row;justify-content:space-between;align-items:center;padding-top:0.3rem;padding-left:2rem;padding-right:2rem;padding-bottom:1rem}.bottom-sections.svelte-1my0kby.svelte-1my0kby{display:flex;flex-direction:row;justify-content:space-between;flex-wrap:wrap;gap:1.2rem;padding-left:3.5rem;padding-right:3.5rem;height:100%}.bottom-left-section.svelte-1my0kby.svelte-1my0kby{height:100%;width:calc(50% - 10px);display:flex;flex-direction:column}.bottom-right-section.svelte-1my0kby.svelte-1my0kby{height:100%;width:calc(50% - 10px);display:flex;flex-direction:column}.demo-users-header.svelte-1my0kby.svelte-1my0kby{display:flex;flex-direction:row;justify-content:space-between;align-items:center}.multi-select-container.svelte-1my0kby.svelte-1my0kby{padding:2rem;min-height:360px;max-height:360px}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $dbStatus, $$unsubscribe_dbStatus;
  let $GlobalValues, $$unsubscribe_GlobalValues;
  let $Students, $$unsubscribe_Students;
  let $authStore, $$unsubscribe_authStore;
  $$unsubscribe_dbStatus = subscribe(dbStatus, (value) => $dbStatus = value);
  $$unsubscribe_GlobalValues = subscribe(GlobalValues, (value) => $GlobalValues = value);
  $$unsubscribe_Students = subscribe(Students, (value) => $Students = value);
  $$unsubscribe_authStore = subscribe(authStore, (value) => $authStore = value);
  let db_enabled = false;
  let students = [];
  let demoStudents = [];
  let multiSelectOptions = [];
  let selected = [];
  let globalValues = {};
  let name = "";
  let modalToggleDB = false;
  let editStates = {};
  let valuesDictionary = { "toleranceValue": "Tolerancia" };
  let modalToggleDemoUser = false;
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    name = $authStore.name ?? $authStore.email ?? "";
    {
      {
        if (Students) {
          students = $Students;
          demoStudents = students.filter((student) => student.demo);
          multiSelectOptions = students.filter((student) => !student.demo).map((student) => {
            return {
              value: student.uuid,
              name: student.name + " " + student.lastName + " - " + student.group_id
            };
          });
        }
        if (GlobalValues) {
          globalValues = $GlobalValues;
        }
        if (dbStatus) {
          db_enabled = $dbStatus;
        }
      }
    }
    $$rendered = `<div class="main-content svelte-1my0kby"><div class="greeting svelte-1my0kby"><h1 class="svelte-1my0kby" data-svelte-h="svelte-1rwjw42">Bienvenid@,</h1> ${name !== "" ? `<p class="svelte-1my0kby">${escape(name)}</p>` : `<p class="svelte-1my0kby" data-svelte-h="svelte-1g54z3k">Usuario</p>`}</div> <div class="card-container svelte-1my0kby">${validate_component(DashboardCardAdmin, "DashboardCardAdmin").$$render(
      $$result,
      {
        title: "Estudiantes",
        label: "students",
        description: "Administra tus estudiantes"
      },
      {},
      {}
    )} ${validate_component(DashboardCardAdmin, "DashboardCardAdmin").$$render(
      $$result,
      {
        title: "Profesores",
        label: "professors",
        description: "Administra tus profesores"
      },
      {},
      {}
    )} ${validate_component(DashboardCardAdmin, "DashboardCardAdmin").$$render(
      $$result,
      {
        title: "Grupos",
        label: "groups",
        description: "Administra tus grupos"
      },
      {},
      {}
    )} ${validate_component(DashboardCardAdmin, "DashboardCardAdmin").$$render(
      $$result,
      {
        title: "Estadisticas",
        label: "stats",
        description: "Analiza las estadisticas"
      },
      {},
      {}
    )} ${validate_component(DashboardCardAdmin, "DashboardCardAdmin").$$render(
      $$result,
      {
        title: "Ajustes",
        label: "settings",
        description: "Configura tu perfil"
      },
      {},
      {}
    )}</div> <div class="sections-container svelte-1my0kby"><div class="section-title svelte-1my0kby" data-svelte-h="svelte-895jkk"><h1 class="ml-5 mt-5">Valores administrativos</h1></div> <div class="sections svelte-1my0kby"><div class="top-sections svelte-1my0kby"><div class="top-left-section svelte-1my0kby"><p class="section-title svelte-1my0kby" data-svelte-h="svelte-1n9ujkj">HOSTING</p> <div class="db-status svelte-1my0kby"><div><p class="mb-3" data-svelte-h="svelte-o6nuff">Base de datos</p> ${validate_component(Toggle, "Toggle").$$render($$result, { checked: db_enabled, color: "green" }, {}, {})}</div> <span></span> <div class="flex flex-row items-center">${db_enabled ? `${validate_component(Badge, "Badge").$$render(
      $$result,
      {
        class: "bg-green-300 text-black font-semibold"
      },
      {},
      {
        default: () => {
          return `${validate_component(Indicator, "Indicator").$$render($$result, { color: "green", class: "mr-3" }, {}, {})} Online`;
        }
      }
    )}` : `${validate_component(Badge, "Badge").$$render(
      $$result,
      {
        class: "bg-red-300 text-black font-semibold"
      },
      {},
      {
        default: () => {
          return `${validate_component(Indicator, "Indicator").$$render($$result, { color: "red", class: "mr-3" }, {}, {})} Offline`;
        }
      }
    )}`}</div></div></div> <div class="top-right-section svelte-1my0kby"><p class="section-title svelte-1my0kby" data-svelte-h="svelte-1cwv36e">ACTIVIDAD</p> <div class="student-count svelte-1my0kby"><div data-svelte-h="svelte-1gc31bg"><p>Número de estudiantes</p></div> <span></span> <div class="flex flex-row items-center"><p class="text-3xl font-bold mr-12">${escape(students.length)}</p></div></div></div></div> <div class="bottom-sections svelte-1my0kby"><div class="bottom-left-section svelte-1my0kby"><p class="section-title svelte-1my0kby" data-svelte-h="svelte-hm3wvm">VALORES GLOBALES</p> <div class="global-values">${validate_component(Table, "Table").$$render($$result, { shadow: true }, {}, {
      default: () => {
        return `${validate_component(TableHead, "TableHead").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
              default: () => {
                return `Nombre`;
              }
            })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
              default: () => {
                return `Valor`;
              }
            })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {})}`;
          }
        })} ${validate_component(TableBody, "TableBody").$$render($$result, {}, {}, {
          default: () => {
            return `${each(Object.keys(globalValues), (key) => {
              return `${validate_component(TableBodyRow, "TableBodyRow").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${valuesDictionary[key] ? `${escape(valuesDictionary[key])}` : `${escape(key)}`} `;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${validate_component(Input, "Input").$$render(
                        $$result,
                        {
                          type: "number",
                          id: key,
                          disabled: !editStates[key],
                          value: globalValues[key]
                        },
                        {
                          value: ($$value) => {
                            globalValues[key] = $$value;
                            $$settled = false;
                          }
                        },
                        {}
                      )} `;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${editStates[key] ? `${validate_component(Button, "Button").$$render($$result, { color: "green", size: "xs" }, {}, {
                        default: () => {
                          return `Actualizar`;
                        }
                      })} ${validate_component(Button, "Button").$$render($$result, { color: "red", size: "xs" }, {}, {
                        default: () => {
                          return `Cancelar`;
                        }
                      })}` : `${validate_component(Button, "Button").$$render($$result, { color: "alternative", size: "xs" }, {}, {
                        default: () => {
                          return `Editar`;
                        }
                      })}`} `;
                    }
                  })} `;
                }
              })}`;
            })}`;
          }
        })}`;
      }
    })}</div></div> <div class="bottom-right-section svelte-1my0kby"><div class="demo-users-header svelte-1my0kby"><p class="section-title svelte-1my0kby" data-svelte-h="svelte-3fiptu">USUARIOS DEMOS</p> ${validate_component(Button, "Button").$$render($$result, { color: "blue", class: "mr-8 mt-4" }, {}, {
      default: () => {
        return `Agregar`;
      }
    })}</div> <div class="w-full">${validate_component(Table, "Table").$$render($$result, { shadow: true }, {}, {
      default: () => {
        return `${validate_component(TableHead, "TableHead").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
              default: () => {
                return `Nombre`;
              }
            })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
              default: () => {
                return `Correo`;
              }
            })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {})}`;
          }
        })} ${validate_component(TableBody, "TableBody").$$render($$result, {}, {}, {
          default: () => {
            return `${each(demoStudents, (student) => {
              return `${validate_component(TableBodyRow, "TableBodyRow").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(student.name + " " + student.lastName)} `;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(student.email)} `;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${validate_component(Button, "Button").$$render($$result, { color: "red", size: "xs" }, {}, {
                        default: () => {
                          return `Eliminar`;
                        }
                      })} `;
                    }
                  })} `;
                }
              })}`;
            })}`;
          }
        })}`;
      }
    })}</div></div></div></div></div></div> ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        autoclose: true,
        outsideclose: true,
        size: "xs",
        open: modalToggleDB
      },
      {
        open: ($$value) => {
          modalToggleDB = $$value;
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
          )} <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400" data-svelte-h="svelte-1c5dryr">Seguro quieres desactivar la base de datos?</h3> ${validate_component(Button, "Button").$$render($$result, { color: "red", class: "me-2" }, {}, {
            default: () => {
              return `Sí, seguro`;
            }
          })} ${validate_component(Button, "Button").$$render($$result, { color: "alternative" }, {}, {
            default: () => {
              return `No, cancelar`;
            }
          })}</div>`;
        }
      }
    )} ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        autoclose: true,
        outsideclose: true,
        size: "md",
        open: modalToggleDemoUser
      },
      {
        open: ($$value) => {
          modalToggleDemoUser = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<div class="multi-select-container svelte-1my0kby">${validate_component(MultiSelect, "MultiSelect").$$render(
            $$result,
            {
              items: multiSelectOptions,
              placeholder: "Selecciona estudiantes",
              label: "Estudiantes",
              class: "mb-4",
              value: selected
            },
            {
              value: ($$value) => {
                selected = $$value;
                $$settled = false;
              }
            },
            {}
          )}</div> ${validate_component(Button, "Button").$$render($$result, { color: "blue", class: "ml-6" }, {}, {
            default: () => {
              return `Agregar`;
            }
          })}`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_dbStatus();
  $$unsubscribe_GlobalValues();
  $$unsubscribe_Students();
  $$unsubscribe_authStore();
  return $$rendered;
});
export {
  Page as default
};
