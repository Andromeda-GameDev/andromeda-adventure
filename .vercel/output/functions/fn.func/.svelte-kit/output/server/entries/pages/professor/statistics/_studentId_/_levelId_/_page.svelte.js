import { c as create_ssr_component, a as subscribe, v as validate_component } from "../../../../../../chunks/ssr.js";
import { p as page } from "../../../../../../chunks/stores.js";
import { S as Students } from "../../../../../../chunks/professorData.js";
import { S as StudentFirstLevelTable } from "../../../../../../chunks/StudentFirstLevelTable.js";
const css = {
  code: ".table-container.svelte-jbnmya{height:100%;padding-top:2rem;padding-left:2rem;padding-right:2rem}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $Students, $$unsubscribe_Students;
  let $page, $$unsubscribe_page;
  $$unsubscribe_Students = subscribe(Students, (value) => $Students = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { studentId, levelId } = $page.params;
  let student = void 0;
  $$result.css.add(css);
  {
    {
      if (studentId !== void 0 || studentId !== null) {
        student = $Students.find((student2) => student2.uuid === studentId);
      }
    }
  }
  $$unsubscribe_Students();
  $$unsubscribe_page();
  return `<div class="table-container svelte-jbnmya">${validate_component(StudentFirstLevelTable, "StudentFirstLevelTable").$$render($$result, { student, isStudent: false }, {}, {})} </div>`;
});
export {
  Page as default
};
