import { c as create_ssr_component, a as subscribe, v as validate_component, e as escape } from "../../../chunks/ssr.js";
import "../../../chunks/firebase.js";
import "firebase/auth";
import "firebase/database";
import { B as Button } from "../../../chunks/Button.js";
import { S as Sidebar, a as SidebarWrapper, b as SidebarGroup, c as SidebarItem } from "../../../chunks/SidebarWrapper.js";
import { C as ChartLineUpSolid, U as UserSettingsSolid } from "../../../chunks/UserSettingsSolid.js";
import { G as GridSolid } from "../../../chunks/GridSolid.js";
import "../../../chunks/client.js";
import { p as page } from "../../../chunks/stores.js";
const css = {
  code: "body, html{margin:0;padding:0;font-family:'Roboto', sans-serif}.main-container.svelte-1xbr011{display:flex;flex-direction:row;height:100vh;background-color:#f5f5f5}.sidebar.svelte-1xbr011{width:15%;height:100%;background-color:white}.sidebar-content.svelte-1xbr011{display:flex;flex-direction:column;height:100vh;background-color:white}.sidebar-header-content.svelte-1xbr011{height:7%;background-color:white;justify-content:center;align-items:center;display:flex;font-size:1.2rem;padding-left:1rem;padding-right:1rem;color:#1dcd63;font-weight:800;width:100%}.sidebar-container.svelte-1xbr011{flex:1;display:flex;flex-direction:column;width:100%}.content.svelte-1xbr011{flex:1;display:flex;flex-direction:column}.header.svelte-1xbr011{height:7%;background-color:white;justify-content:left;align-items:center;display:flex;font-size:1rem;padding-left:1.5rem;padding-right:1.5rem}.main-content.svelte-1xbr011{flex:1;display:flex;justify-content:center;align-items:center;overflow-y:auto}.page.svelte-1xbr011{width:100%;height:100%}",
  map: null
};
let activeClass = "flex items-center p-2 text-base font-normal bg-green-200 dark:bg-green-700 rounded-lg dark:text-white hover:bg-green-100 dark:hover:bg-gray-700 border-r-4 border-green-500";
let nonActiveClass = "flex items-center p-2 text-base font-normal text-black-900 rounded-lg dark:text-white hover:bg-green-100 dark:hover:bg-green-700";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let activeUrl;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  data.groups;
  data.students;
  data.professors;
  data.globalValues;
  let currentDate;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  {
    {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      let dateStr = /* @__PURE__ */ (/* @__PURE__ */ new Date()).toLocaleDateString("es-ES", options);
      currentDate = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
    }
  }
  activeUrl = $page.url.pathname;
  $$unsubscribe_page();
  return `<div class="main-container svelte-1xbr011"><div class="sidebar svelte-1xbr011"><div class="sidebar-content svelte-1xbr011"><div class="sidebar-header-content svelte-1xbr011" data-svelte-h="svelte-19ze39v"><img src="/planet_andromeda_logo.png" alt="Logo" style="width: 50px; height: auto; margin-right: 1rem;"> <p>Andromeda</p></div> <div class="sidebar-container svelte-1xbr011">${validate_component(Sidebar, "Sidebar").$$render(
    $$result,
    {
      activeUrl,
      activeClass,
      nonActiveClass,
      class: "w-full"
    },
    {},
    {
      default: () => {
        return `${validate_component(SidebarWrapper, "SidebarWrapper").$$render($$result, { class: "bg-white" }, {}, {
          default: () => {
            return `${validate_component(SidebarGroup, "SidebarGroup").$$render($$result, { class: "bg-white space-y-3" }, {}, {
              default: () => {
                return `${validate_component(SidebarItem, "SidebarItem").$$render($$result, { label: "Inicio", href: "/admin" }, {}, {
                  icon: () => {
                    return `${validate_component(GridSolid, "GridSolid").$$render($$result, {}, {}, {})}`;
                  }
                })} ${validate_component(SidebarItem, "SidebarItem").$$render(
                  $$result,
                  {
                    label: "Estudiantes",
                    href: "/admin/students"
                  },
                  {},
                  {
                    icon: () => {
                      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z"></path><path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z"></path><path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z"></path></svg>`;
                    }
                  }
                )} ${validate_component(SidebarItem, "SidebarItem").$$render(
                  $$result,
                  {
                    label: "Profesores",
                    href: "/admin/professors"
                  },
                  {},
                  {
                    icon: () => {
                      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clip-rule="evenodd"></path><path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z"></path></svg>`;
                    }
                  }
                )} ${validate_component(SidebarItem, "SidebarItem").$$render($$result, { label: "Grupos", href: "/admin/groups" }, {}, {
                  icon: () => {
                    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M1.5 7.125c0-1.036.84-1.875 1.875-1.875h6c1.036 0 1.875.84 1.875 1.875v3.75c0 1.036-.84 1.875-1.875 1.875h-6A1.875 1.875 0 0 1 1.5 10.875v-3.75Zm12 1.5c0-1.036.84-1.875 1.875-1.875h5.25c1.035 0 1.875.84 1.875 1.875v8.25c0 1.035-.84 1.875-1.875 1.875h-5.25a1.875 1.875 0 0 1-1.875-1.875v-8.25ZM3 16.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875v2.25c0 1.035-.84 1.875-1.875 1.875h-5.25A1.875 1.875 0 0 1 3 18.375v-2.25Z" clip-rule="evenodd"></path></svg>`;
                  }
                })} ${validate_component(SidebarItem, "SidebarItem").$$render(
                  $$result,
                  {
                    label: "Estadísticas",
                    href: "/admin/statistics"
                  },
                  {},
                  {
                    icon: () => {
                      return `${validate_component(ChartLineUpSolid, "ChartLineUpSolid").$$render($$result, {}, {}, {})}`;
                    }
                  }
                )} ${validate_component(SidebarItem, "SidebarItem").$$render(
                  $$result,
                  {
                    label: "Ajustes",
                    href: "/admin/settings"
                  },
                  {},
                  {
                    icon: () => {
                      return `${validate_component(UserSettingsSolid, "UserSettingsSolid").$$render($$result, {}, {}, {})}`;
                    }
                  }
                )}`;
              }
            })}`;
          }
        })}`;
      }
    }
  )}</div></div></div> <div class="content svelte-1xbr011"><div class="header svelte-1xbr011">${escape(currentDate)} ${validate_component(Button, "Button").$$render(
    $$result,
    {
      color: "primary",
      outline: true,
      style: "margin-left: auto;",
      size: "xs",
      class: "text-sm"
    },
    {},
    {
      default: () => {
        return `Cerrar sesión`;
      }
    }
  )}</div> <div class="main-content svelte-1xbr011"><div class="page svelte-1xbr011">${slots.default ? slots.default({}) : ``}</div></div></div> </div>`;
});
export {
  Layout as default
};
