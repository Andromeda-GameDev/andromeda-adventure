import { c as create_ssr_component, b as compute_rest_props, g as getContext, d as spread, f as escape_object, h as escape_attribute_value, a as subscribe, v as validate_component, e as escape } from "../../../chunks/ssr.js";
import "../../../chunks/firebase.js";
import "firebase/auth";
import "firebase/database";
import { B as Button } from "../../../chunks/Button.js";
import { S as Sidebar, a as SidebarWrapper, b as SidebarGroup, c as SidebarItem } from "../../../chunks/SidebarWrapper.js";
import { C as ChartLineUpSolid, U as UserSettingsSolid } from "../../../chunks/UserSettingsSolid.js";
import { G as GridSolid } from "../../../chunks/GridSolid.js";
import { twMerge } from "tailwind-merge";
import { W as WandMagicSparklesOutline } from "../../../chunks/WandMagicSparklesOutline.js";
import "../../../chunks/client.js";
import { p as page } from "../../../chunks/stores.js";
const UsersSolid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { ariaLabel = "users solid" } = $$props;
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
      { viewBox: "0 0 20 18" }
    ],
    {}
  )}><path fill="currentColor" d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"></path></svg> `;
});
const css = {
  code: "body, html{margin:0;padding:0;font-family:'Roboto', sans-serif}.main-container.svelte-19mkai4{display:flex;flex-direction:row;height:100vh;background-color:#f5f5f5}.sidebar.svelte-19mkai4{width:15%;height:100%;background-color:white}.sidebar-content.svelte-19mkai4{display:flex;flex-direction:column;height:100vh;background-color:white}.sidebar-header-content.svelte-19mkai4{height:7%;background-color:white;justify-content:center;align-items:center;display:flex;font-size:1.2rem;padding-left:1rem;padding-right:1rem;color:#9630df;font-weight:800;width:100%}.sidebar-container.svelte-19mkai4{flex:1;display:flex;flex-direction:column;width:100%}.content.svelte-19mkai4{flex:1;display:flex;flex-direction:column}.header.svelte-19mkai4{height:7%;background-color:white;justify-content:left;align-items:center;display:flex;font-size:1rem;padding-left:1.5rem;padding-right:1.5rem}.main-content.svelte-19mkai4{flex:1;display:flex;justify-content:center;align-items:center;overflow-y:auto}.page.svelte-19mkai4{width:100%;height:100%}",
  map: null
};
let activeClass = "flex items-center p-2 text-base font-normal bg-purple-200 dark:bg-purple-700 rounded-lg dark:text-white hover:bg-purple-100 dark:hover:bg-gray-700 border-r-4 border-purple-500";
let nonActiveClass = "flex items-center p-2 text-base font-normal text-black-900 rounded-lg dark:text-white hover:bg-purple-100 dark:hover:bg-green-700";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let activeUrl;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  data.groups;
  data.students;
  data.media;
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
  return `<div class="main-container svelte-19mkai4"><div class="sidebar svelte-19mkai4"><div class="sidebar-content svelte-19mkai4"><div class="sidebar-header-content svelte-19mkai4" data-svelte-h="svelte-19ze39v"><img src="/planet_andromeda_logo.png" alt="Logo" style="width: 50px; height: auto; margin-right: 1rem;"> <p>Andromeda</p></div> <div class="sidebar-container svelte-19mkai4">${validate_component(Sidebar, "Sidebar").$$render(
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
                return `${validate_component(SidebarItem, "SidebarItem").$$render($$result, { label: "Inicio", href: "/professor" }, {}, {
                  icon: () => {
                    return `${validate_component(GridSolid, "GridSolid").$$render($$result, {}, {}, {})}`;
                  }
                })} ${validate_component(SidebarItem, "SidebarItem").$$render(
                  $$result,
                  {
                    label: "Grupos",
                    href: "/professor/groups"
                  },
                  {},
                  {
                    icon: () => {
                      return `${validate_component(UsersSolid, "UsersSolid").$$render($$result, {}, {}, {})}`;
                    }
                  }
                )} ${validate_component(SidebarItem, "SidebarItem").$$render(
                  $$result,
                  {
                    label: "Estadísticas",
                    href: "/professor/statistics"
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
                    label: "Solvers",
                    href: "/professor/solvers"
                  },
                  {},
                  {
                    icon: () => {
                      return `${validate_component(WandMagicSparklesOutline, "WandMagicSparklesOutline").$$render($$result, {}, {}, {})}`;
                    }
                  }
                )} ${validate_component(SidebarItem, "SidebarItem").$$render(
                  $$result,
                  {
                    label: "Ajustes",
                    href: "/professor/settings"
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
  )}</div></div></div> <div class="content svelte-19mkai4"><div class="header svelte-19mkai4">${escape(currentDate)} ${validate_component(Button, "Button").$$render(
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
  )}</div> <div class="main-content svelte-19mkai4"><div class="page svelte-19mkai4">${slots.default ? slots.default({}) : ``}</div></div></div> </div>`;
});
export {
  Layout as default
};
