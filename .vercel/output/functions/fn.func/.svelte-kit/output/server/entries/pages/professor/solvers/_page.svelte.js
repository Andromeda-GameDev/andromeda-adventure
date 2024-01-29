import { c as create_ssr_component, a as subscribe, v as validate_component, k as each, e as escape } from "../../../../chunks/ssr.js";
import { B as Button } from "../../../../chunks/Button.js";
import { T as Table, a as TableHead, b as TableHeadCell, c as TableBody, d as TableBodyRow, e as TableBodyCell } from "../../../../chunks/TableHeadCell.js";
import { F as FetchedData } from "../../../../chunks/professorData.js";
const css = {
  code: ".solvers-container.svelte-1jp6f5u{margin:0 auto;margin-top:20px;width:80%}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $FetchedData, $$unsubscribe_FetchedData;
  $$unsubscribe_FetchedData = subscribe(FetchedData, (value) => $FetchedData = value);
  let links = [];
  $$result.css.add(css);
  {
    {
      if ($FetchedData) {
        links = $FetchedData.levelSolvers;
      }
    }
  }
  $$unsubscribe_FetchedData();
  return `<div class="solvers-container svelte-1jp6f5u">${validate_component(Table, "Table").$$render($$result, { hoverable: true, shadow: true }, {}, {
    default: () => {
      return `${validate_component(TableHead, "TableHead").$$render($$result, { class: "bg-sky-300" }, {}, {
        default: () => {
          return `${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
            default: () => {
              return `Id`;
            }
          })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
            default: () => {
              return `Nivel`;
            }
          })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
            default: () => {
              return `URL`;
            }
          })}`;
        }
      })} ${validate_component(TableBody, "TableBody").$$render($$result, {}, {}, {
        default: () => {
          return `${each(links, (link, index) => {
            return `${validate_component(TableBodyRow, "TableBodyRow").$$render($$result, {}, {}, {
              default: () => {
                return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                  default: () => {
                    return `${escape(index + 1)}`;
                  }
                })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                  default: () => {
                    return `${escape(link.level_id)}`;
                  }
                })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                  default: () => {
                    return `${validate_component(Button, "Button").$$render(
                      $$result,
                      {
                        href: link.url,
                        pill: true,
                        color: "blue",
                        target: "_blank"
                      },
                      {},
                      {
                        default: () => {
                          return `Ver`;
                        }
                      }
                    )} `;
                  }
                })} `;
              }
            })}`;
          })}`;
        }
      })}`;
    }
  })} </div>`;
});
export {
  Page as default
};
