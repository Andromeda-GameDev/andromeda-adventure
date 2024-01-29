import { c as create_ssr_component, a as subscribe, v as validate_component, k as each, e as escape, i as add_attribute } from "../../../../chunks/ssr.js";
import { a as authStore } from "../../../../chunks/auth.js";
import { a as Groups, S as Students } from "../../../../chunks/adminData.js";
import { B as Badge } from "../../../../chunks/Badge.js";
import { B as Button } from "../../../../chunks/Button.js";
import { S as Select, A as ArrowLeftOutline, a as ArrowRightOutline } from "../../../../chunks/ArrowRightOutline.js";
import { T as Table, a as TableHead, b as TableHeadCell, c as TableBody, d as TableBodyRow, e as TableBodyCell } from "../../../../chunks/TableHeadCell.js";
import { T as TableSearch } from "../../../../chunks/TableSearch.js";
import { F as FileExportSolid, a as FileSearchSolid } from "../../../../chunks/FileSearchSolid.js";
import "../../../../chunks/client.js";
const css = {
  code: ".stats-container.svelte-1uav28d{display:flex;flex-direction:column;width:100%;height:100%;padding-top:1rem}.stats-container-header.svelte-1uav28d{display:flex;flex-direction:row;align-items:center;width:100%;height:10%;padding-left:3rem;padding-right:3rem;margin-top:1rem}.search-container.svelte-1uav28d{display:flex;align-items:center;width:40%;height:100%}.filter-container.svelte-1uav28d{display:flex;flex-direction:row;justify-content:flex-end;align-items:center;width:50%;gap:1rem}.table-container.svelte-1uav28d{width:100%;height:100%;padding-left:3rem;padding-right:3rem}.footer-container.svelte-1uav28d{display:flex;justify-content:space-between;align-items:center;width:100%;padding:1rem 0;flex-wrap:wrap;padding-top:2rem}.pagination-container.svelte-1uav28d{display:flex;justify-content:center;align-items:center;gap:1rem;padding-right:1rem}.pages-select-conatiner.svelte-1uav28d{width:6%}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $Groups, $$unsubscribe_Groups;
  let $Students, $$unsubscribe_Students;
  let $authStore, $$unsubscribe_authStore;
  $$unsubscribe_Groups = subscribe(Groups, (value) => $Groups = value);
  $$unsubscribe_Students = subscribe(Students, (value) => $Students = value);
  $$unsubscribe_authStore = subscribe(authStore, (value) => $authStore = value);
  let currentUserUid = $authStore.uid;
  let searchTerm = "";
  let professorGroups = [];
  let selectedGroup = "General";
  let selectedLevel = "1";
  let currentPage = 1;
  let itemsPerPage = "15";
  let start = (currentPage - 1) * parseInt(itemsPerPage);
  let end = currentPage * parseInt(itemsPerPage);
  let filteredStudents = [];
  let pagedStudents = [];
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        if ($authStore.uid) {
          currentUserUid = $authStore.uid;
        }
        if ($Groups.length > 0 && currentUserUid) {
          professorGroups = $Groups.filter((group) => group.professors_ids.includes(currentUserUid));
        }
      }
    }
    {
      {
        start = (currentPage - 1) * parseInt(itemsPerPage);
        end = currentPage * parseInt(itemsPerPage);
      }
    }
    {
      {
        if (selectedGroup === "General") {
          filteredStudents = $Students.filter((student) => student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.lastName.toLowerCase().includes(searchTerm.toLowerCase()));
        } else {
          filteredStudents = $Students.filter((student) => (student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.lastName.toLowerCase().includes(searchTerm.toLowerCase())) && student.group_id === selectedGroup);
        }
      }
    }
    {
      {
        pagedStudents = filteredStudents.slice(start, end);
      }
    }
    selectedLevel = "1";
    $$rendered = `<div class="stats-container svelte-1uav28d"><div class="stats-container-header svelte-1uav28d"><div class="search-container svelte-1uav28d">${validate_component(TableSearch, "TableSearch").$$render(
      $$result,
      {
        divClass: "overflow-x-auto sm:rounded-lg",
        placeholder: "Buscar estudiantes",
        inputValue: searchTerm
      },
      {
        inputValue: ($$value) => {
          searchTerm = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex-grow"></div> <div class="filter-container svelte-1uav28d">${validate_component(Select, "Select").$$render(
      $$result,
      {
        id: "groupSelect",
        name: "groupSelect",
        placeholder: "Grupos",
        value: selectedGroup
      },
      {
        value: ($$value) => {
          selectedGroup = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<option selected value="General" data-svelte-h="svelte-1tpno3l">General</option> ${each(professorGroups, (group) => {
            return `<option${add_attribute("value", group.group_id, 0)}>${escape(group.group_name)} </option>`;
          })}`;
        }
      }
    )} ${validate_component(Select, "Select").$$render(
      $$result,
      {
        id: "levelSelect",
        name: "levelSelect",
        placeholder: "Niveles",
        value: selectedLevel
      },
      {
        value: ($$value) => {
          selectedLevel = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<option selected value="1" data-svelte-h="svelte-m4n0uj">Nivel 1</option> <option value="2" data-svelte-h="svelte-18vksl4">Nivel 2</option>`;
        }
      }
    )} ${validate_component(Button, "Button").$$render(
      $$result,
      {
        color: "green",
        variant: "outline",
        size: "sm"
      },
      {},
      {
        default: () => {
          return `Exportar
                ${validate_component(FileExportSolid, "FileExportSolid").$$render($$result, { class: "ml-3", size: "sm" }, {}, {})}`;
        }
      }
    )}</div></div> <div class="table-container svelte-1uav28d">${validate_component(Table, "Table").$$render(
      $$result,
      {
        hoverable: true,
        striped: true,
        shadow: true
      },
      {},
      {
        default: () => {
          return `${validate_component(TableHead, "TableHead").$$render($$result, { class: "bg-sky-400" }, {}, {
            default: () => {
              return `${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, { class: "cursor-pointer" }, {}, {
                default: () => {
                  return `Id`;
                }
              })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, { class: "cursor-pointer" }, {}, {
                default: () => {
                  return `Nombre`;
                }
              })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                default: () => {
                  return `Grupo`;
                }
              })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                default: () => {
                  return `Correo`;
                }
              })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, { class: "cursor-pointer" }, {}, {
                default: () => {
                  return `Data`;
                }
              })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {})}`;
            }
          })} ${validate_component(TableBody, "TableBody").$$render($$result, {}, {}, {
            default: () => {
              return `${each(pagedStudents, (student) => {
                return `${validate_component(TableBodyRow, "TableBodyRow").$$render($$result, {}, {}, {
                  default: () => {
                    return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                      default: () => {
                        return `${escape($Students.indexOf(student) + 1)}`;
                      }
                    })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                      default: () => {
                        return `${escape(student.name + " " + student.lastName)}`;
                      }
                    })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                      default: () => {
                        return `${escape(student.group_id)}`;
                      }
                    })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                      default: () => {
                        return `${escape(student.email)}`;
                      }
                    })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                      default: () => {
                        return `${selectedLevel === "1" ? `${student.progress.level_1 === void 0 ? `${validate_component(Badge, "Badge").$$render(
                          $$result,
                          {
                            color: "red",
                            class: "items-center justify-center w-auto"
                          },
                          {},
                          {
                            default: () => {
                              return `<p class="text-red-700 font-semibold" data-svelte-h="svelte-1xfduni">Sin datos</p> `;
                            }
                          }
                        )}` : `${validate_component(Badge, "Badge").$$render(
                          $$result,
                          {
                            color: "green",
                            class: "items-center justify-center w-auto"
                          },
                          {},
                          {
                            default: () => {
                              return `<p class="text-green-700 font-semibold" data-svelte-h="svelte-8omphs">Disponible</p> `;
                            }
                          }
                        )}`}` : `${selectedLevel === "2" ? `${student.progress.level_2 === void 0 ? `${validate_component(Badge, "Badge").$$render(
                          $$result,
                          {
                            color: "red",
                            class: "items-center justify-center w-auto"
                          },
                          {},
                          {
                            default: () => {
                              return `<p class="text-red-700 font-semibold" data-svelte-h="svelte-1xfduni">Sin datos</p> `;
                            }
                          }
                        )}` : `${validate_component(Badge, "Badge").$$render(
                          $$result,
                          {
                            color: "green",
                            class: "items-center justify-center w-auto"
                          },
                          {},
                          {
                            default: () => {
                              return `<p class="text-green-700 font-semibold" data-svelte-h="svelte-8omphs">Disponible</p> `;
                            }
                          }
                        )}`}` : ``}`} `;
                      }
                    })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                      default: () => {
                        return `${selectedLevel === "1" ? `${student.progress.level_1 === void 0 ? `${validate_component(FileSearchSolid, "FileSearchSolid").$$render($$result, { class: "w-5 h-5 text-gray-400" }, {}, {})}` : `${validate_component(FileSearchSolid, "FileSearchSolid").$$render(
                          $$result,
                          {
                            class: "w-5 h-5 text-sky-600 hover:cursor-pointer"
                          },
                          {},
                          {}
                        )}`}` : `${selectedLevel === "2" ? `${student.progress.level_2 === void 0 ? `${validate_component(FileSearchSolid, "FileSearchSolid").$$render($$result, { class: "w-5 h-5 text-gray-400" }, {}, {})}` : `${validate_component(FileSearchSolid, "FileSearchSolid").$$render(
                          $$result,
                          {
                            class: "w-5 h-5 text-sky-600 hover:cursor-pointer"
                          },
                          {},
                          {}
                        )}`}` : ``}`} `;
                      }
                    })} `;
                  }
                })}`;
              })}`;
            }
          })}`;
        }
      }
    )} <div class="footer-container svelte-1uav28d"><caption class="text-md font-semibold text-black">Estudiantes: ${escape(filteredStudents.length)}</caption> <div class="pagination-container svelte-1uav28d"><button>${validate_component(ArrowLeftOutline, "ArrowLeftOutline").$$render($$result, {}, {}, {})}</button> <div>Página ${escape(currentPage)} / ${escape(Math.ceil(filteredStudents.length / parseInt(itemsPerPage)))}</div> <button>${validate_component(ArrowRightOutline, "ArrowRightOutline").$$render($$result, {}, {}, {})}</button></div> <div class="pages-select-conatiner svelte-1uav28d">${validate_component(Select, "Select").$$render(
      $$result,
      {
        placeholder: "Num. elementos",
        size: "sm",
        id: "pagination-select",
        value: itemsPerPage
      },
      {
        value: ($$value) => {
          itemsPerPage = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<option value="15" data-svelte-h="svelte-3tddze">15</option> <option value="30" data-svelte-h="svelte-1lm6m6i">30</option> <option value="50" data-svelte-h="svelte-dy0itu">50</option>`;
        }
      }
    )}</div></div></div> </div>`;
  } while (!$$settled);
  $$unsubscribe_Groups();
  $$unsubscribe_Students();
  $$unsubscribe_authStore();
  return $$rendered;
});
export {
  Page as default
};
