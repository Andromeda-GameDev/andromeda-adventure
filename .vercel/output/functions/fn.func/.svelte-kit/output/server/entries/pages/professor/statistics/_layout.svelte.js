import { c as create_ssr_component, a as subscribe, v as validate_component, e as escape } from "../../../../chunks/ssr.js";
import { B as Breadcrumb, a as BreadcrumbItem, G as GridPlusSolid } from "../../../../chunks/GridPlusSolid.js";
import { p as page } from "../../../../chunks/stores.js";
import { S as Students } from "../../../../chunks/professorData.js";
const css = {
  code: ".main-container.svelte-t11qlq{display:flex;flex-direction:column;height:100%}.bread-crumb-container.svelte-t11qlq{height:3%}.main-content.svelte-t11qlq{display:flex;flex-direction:column;height:97%}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let activeUrl;
  let $Students, $$unsubscribe_Students;
  let $page, $$unsubscribe_page;
  $$unsubscribe_Students = subscribe(Students, (value) => $Students = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let studentId = $page.params.studentId;
  let student = void 0;
  $$result.css.add(css);
  activeUrl = $page.url.pathname;
  studentId = $page.params.studentId;
  {
    {
      if (studentId !== void 0 || studentId !== null) {
        student = $Students.find((student2) => student2.uuid === studentId);
      }
    }
  }
  $$unsubscribe_Students();
  $$unsubscribe_page();
  return `<div class="main-container svelte-t11qlq"><div class="bread-crumb-container svelte-t11qlq">${validate_component(Breadcrumb, "Breadcrumb").$$render(
    $$result,
    {
      "aria-label": "Solid background breadcrumb example",
      class: "bg-gray-50 py-3 px-5 dark:bg-gray-900"
    },
    {},
    {
      default: () => {
        return `${validate_component(BreadcrumbItem, "BreadcrumbItem").$$render(
          $$result,
          {
            href: "/professor/statistics",
            home: true
          },
          {},
          {
            icon: () => {
              return `${validate_component(GridPlusSolid, "GridPlusSolid").$$render($$result, { class: "w-4 h-4 me-2" }, {}, {})} `;
            },
            default: () => {
              return `Estadísticas`;
            }
          }
        )} ${student && activeUrl !== "/professor/statistics" && activeUrl !== "/professor/statistics/" ? `${validate_component(BreadcrumbItem, "BreadcrumbItem").$$render($$result, {}, {}, {
          default: () => {
            return `${escape(student.name + " " + student.lastName)}`;
          }
        })}` : ``}`;
      }
    }
  )}</div> <div class="main-content svelte-t11qlq">${slots.default ? slots.default({}) : ``}</div> </div>`;
});
export {
  Layout as default
};
