import { c as create_ssr_component, a as subscribe, v as validate_component, k as each, e as escape } from "../../../../chunks/ssr.js";
import { S as Students, a as Groups } from "../../../../chunks/adminData.js";
import { I as Indicator } from "../../../../chunks/Indicator.js";
import { B as Badge } from "../../../../chunks/Badge.js";
import { B as Button } from "../../../../chunks/Button.js";
import { D as Dropdown, a as DropdownItem, T as TrashBinSolid } from "../../../../chunks/TrashBinSolid.js";
import { D as DropdownDivider } from "../../../../chunks/DropdownDivider.js";
import { S as Select, A as ArrowLeftOutline, a as ArrowRightOutline } from "../../../../chunks/ArrowRightOutline.js";
import { M as Modal } from "../../../../chunks/Modal.js";
import { T as Table, a as TableHead, b as TableHeadCell, c as TableBody, d as TableBodyRow, e as TableBodyCell } from "../../../../chunks/TableHeadCell.js";
import { T as TableSearch } from "../../../../chunks/TableSearch.js";
import { T as Tabs, a as TabItem, E as ExclamationCircleSolid } from "../../../../chunks/ExclamationCircleSolid.js";
import { D as DotsVerticalOutline } from "../../../../chunks/DotsVerticalOutline.js";
import { A as Alert_1 } from "../../../../chunks/Alert.js";
import { getDatabase } from "firebase/database";
getDatabase();
const css = {
  code: ".main-container.svelte-yezbj7{height:100vh;width:100%}.tabs-container.svelte-yezbj7{margin-top:1.5rem;margin-left:1.5rem;margin-right:1.5rem}.drop-down-item.svelte-yezbj7{display:flex;flex-direction:row;justify-content:space-between;align-items:center}.footer-container.svelte-yezbj7{display:flex;justify-content:space-between;align-items:center;width:100%;padding:1rem 0;flex-wrap:wrap;padding-top:2rem}.pagination-container.svelte-yezbj7{display:flex;justify-content:center;align-items:center;gap:1rem;padding-right:1rem}.pages-select-conatiner.svelte-yezbj7{width:6%}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $Students, $$unsubscribe_Students;
  let $Groups, $$unsubscribe_Groups;
  $$unsubscribe_Students = subscribe(Students, (value) => $Students = value);
  $$unsubscribe_Groups = subscribe(Groups, (value) => $Groups = value);
  let alert = {
    visible: false,
    type: "error",
    message: "",
    position: "top-center"
  };
  let modalDeleteStudent = false;
  let groups = [];
  let selectableGroups = [];
  let activeStudents = [];
  let blockedStudents = [];
  let currentPage = 1;
  let itemsPerPage = "10";
  let start = (currentPage - 1) * parseInt(itemsPerPage);
  let end = currentPage * parseInt(itemsPerPage);
  let filteredStudents = [];
  let searchTerm = "";
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
        if ($Groups) {
          groups = $Groups;
          selectableGroups = groups.map((group) => ({
            value: group.group_id,
            name: group.group_name
          }));
        }
        if ($Students) {
          activeStudents = $Students.filter((student) => student.status === "active");
          blockedStudents = $Students.filter((student) => student.status === "blocked");
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
        filteredStudents = activeStudents.filter((student) => student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) || student.email.toLowerCase().includes(searchTerm.toLowerCase()));
      }
    }
    {
      {
        pagedStudents = filteredStudents.slice(start, end);
      }
    }
    $$rendered = `<div class="main-container svelte-yezbj7"><div class="tabs-container svelte-yezbj7">${validate_component(Tabs, "Tabs").$$render($$result, { style: "pill", contentClass: "mt-1" }, {}, {
      default: () => {
        return `${validate_component(TabItem, "TabItem").$$render(
          $$result,
          {
            open: true,
            title: "Activos",
            activeClasses: "p-4 text-black font-bold bg-green-300 rounded-t-lg",
            inactiveClasses: "p-4 text-gray-500 rounded-t-lg hover:text-gray-600 hover:bg-gray-50"
          },
          {},
          {
            default: () => {
              return `<div class="table-container">${validate_component(TableSearch, "TableSearch").$$render(
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
              )} ${validate_component(Table, "Table").$$render($$result, { shadow: true }, {}, {
                default: () => {
                  return `${validate_component(TableHead, "TableHead").$$render($$result, { class: "bg-sky-300" }, {}, {
                    default: () => {
                      return `${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                        default: () => {
                          return `Nombre`;
                        }
                      })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                        default: () => {
                          return `Apellidos`;
                        }
                      })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                        default: () => {
                          return `Correo`;
                        }
                      })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                        default: () => {
                          return `Grupo`;
                        }
                      })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                        default: () => {
                          return `Estado`;
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
                                return `${escape(student.name)} `;
                              }
                            })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                              default: () => {
                                return `${escape(student.lastName)} `;
                              }
                            })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                              default: () => {
                                return `${escape(student.email)} `;
                              }
                            })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, { class: "min-w-12" }, {}, {
                              default: () => {
                                return `${validate_component(Select, "Select").$$render(
                                  $$result,
                                  {
                                    class: "mt-2",
                                    items: selectableGroups,
                                    value: student.group_id,
                                    defaultClass: "text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                  },
                                  {},
                                  {}
                                )} `;
                              }
                            })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                              default: () => {
                                return `${student.status === "active" ? `${validate_component(Badge, "Badge").$$render($$result, { color: "green" }, {}, {
                                  default: () => {
                                    return `${validate_component(Indicator, "Indicator").$$render(
                                      $$result,
                                      {
                                        color: "green",
                                        size: "sm",
                                        class: "mr-2"
                                      },
                                      {},
                                      {}
                                    )} Activo
                                            `;
                                  }
                                })}` : `${student.status === "inactive" ? `${validate_component(Badge, "Badge").$$render($$result, { color: "red" }, {}, {
                                  default: () => {
                                    return `${validate_component(Indicator, "Indicator").$$render($$result, { color: "red", size: "sm", class: "mr-2" }, {}, {})} Inactivo
                                            `;
                                  }
                                })}` : ``}`} `;
                              }
                            })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                              default: () => {
                                return `${validate_component(DotsVerticalOutline, "DotsVerticalOutline").$$render($$result, { class: "hover:cursor-pointer" }, {}, {})} ${validate_component(Dropdown, "Dropdown").$$render($$result, {}, {}, {
                                  default: () => {
                                    return `${validate_component(DropdownDivider, "DropdownDivider").$$render($$result, {}, {}, {})} ${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
                                      default: () => {
                                        return `<div class="drop-down-item svelte-yezbj7"><div class="text-container" data-svelte-h="svelte-9x5b3u"><h1 class="text-sm font-medium">Bloquear</h1></div> <div class="icon-container">${validate_component(ExclamationCircleSolid, "ExclamationCircleSolid").$$render($$result, { class: "w-4 ml-5", size: "lg" }, {}, {})} </div></div> `;
                                      }
                                    })} ${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
                                      default: () => {
                                        return `<div class="drop-down-item svelte-yezbj7"><div class="text-container" data-svelte-h="svelte-1fiff7u"><h1 class="text-sm font-medium">Eliminar</h1></div> <div class="icon-container">${validate_component(TrashBinSolid, "TrashBinSolid").$$render($$result, { class: "w-4 ml-5", size: "lg" }, {}, {})} </div></div> `;
                                      }
                                    })} `;
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
              })} <div class="footer-container svelte-yezbj7"><caption class="text-md font-semibold text-black">Estudiantes: ${escape(filteredStudents.length)}</caption> <div class="pagination-container svelte-yezbj7"><button>${validate_component(ArrowLeftOutline, "ArrowLeftOutline").$$render($$result, {}, {}, {})}</button> <div>Página ${escape(currentPage)} / ${escape(Math.ceil(filteredStudents.length / parseInt(itemsPerPage)))}</div> <button>${validate_component(ArrowRightOutline, "ArrowRightOutline").$$render($$result, {}, {}, {})}</button></div> <div class="pages-select-conatiner svelte-yezbj7">${validate_component(Select, "Select").$$render(
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
                    return `<option value="10" data-svelte-h="svelte-y0h8wa">10</option> <option value="30" data-svelte-h="svelte-1lm6m6i">30</option> <option value="50" data-svelte-h="svelte-dy0itu">50</option>`;
                  }
                }
              )}</div></div></div>`;
            }
          }
        )} ${validate_component(TabItem, "TabItem").$$render(
          $$result,
          {
            title: "Bloqueados",
            activeClasses: "p-4 text-black font-bold bg-green-300 rounded-t-lg",
            inactiveClasses: "p-4 text-gray-500 rounded-t-lg hover:text-gray-600 hover:bg-gray-50"
          },
          {},
          {
            default: () => {
              return `<div class="table-container">${validate_component(Table, "Table").$$render($$result, { shadow: true, class: "mt-10" }, {}, {
                default: () => {
                  return `${validate_component(TableHead, "TableHead").$$render($$result, { class: "bg-sky-300" }, {}, {
                    default: () => {
                      return `${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                        default: () => {
                          return `Nombre`;
                        }
                      })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                        default: () => {
                          return `Apellidos`;
                        }
                      })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                        default: () => {
                          return `Correo`;
                        }
                      })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                        default: () => {
                          return `Grupo`;
                        }
                      })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                        default: () => {
                          return `Estado`;
                        }
                      })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {})}`;
                    }
                  })} ${validate_component(TableBody, "TableBody").$$render($$result, {}, {}, {
                    default: () => {
                      return `${each(blockedStudents, (student) => {
                        return `${validate_component(TableBodyRow, "TableBodyRow").$$render($$result, {}, {}, {
                          default: () => {
                            return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                              default: () => {
                                return `${escape(student.name)} `;
                              }
                            })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                              default: () => {
                                return `${escape(student.lastName)} `;
                              }
                            })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                              default: () => {
                                return `${escape(student.email)} `;
                              }
                            })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                              default: () => {
                                return `${validate_component(Select, "Select").$$render(
                                  $$result,
                                  {
                                    class: "mt-2",
                                    items: selectableGroups,
                                    value: student.group_id,
                                    defaultClass: "text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500",
                                    disabled: true
                                  },
                                  {},
                                  {}
                                )} `;
                              }
                            })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                              default: () => {
                                return `${validate_component(Badge, "Badge").$$render($$result, { class: "bg-gray-500" }, {}, {
                                  default: () => {
                                    return `${validate_component(Indicator, "Indicator").$$render($$result, { size: "sm", class: "mr-2 bg-gray-700" }, {}, {})} <p class="text-white" data-svelte-h="svelte-uykhqo">Bloqueado</p> `;
                                  }
                                })} `;
                              }
                            })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                              default: () => {
                                return `${validate_component(DotsVerticalOutline, "DotsVerticalOutline").$$render($$result, { class: "hover:cursor-pointer" }, {}, {})} ${validate_component(Dropdown, "Dropdown").$$render($$result, {}, {}, {
                                  default: () => {
                                    return `${validate_component(DropdownDivider, "DropdownDivider").$$render($$result, {}, {}, {})} ${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
                                      default: () => {
                                        return `<div class="drop-down-item svelte-yezbj7"><div class="text-container" data-svelte-h="svelte-1kvme9q"><h1 class="text-sm font-medium">Desbloquear</h1></div> <div class="icon-container">${validate_component(ExclamationCircleSolid, "ExclamationCircleSolid").$$render($$result, { class: "w-4 ml-5", size: "lg" }, {}, {})} </div></div> `;
                                      }
                                    })} ${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
                                      default: () => {
                                        return `<div class="drop-down-item svelte-yezbj7"><div class="text-container" data-svelte-h="svelte-1fiff7u"><h1 class="text-sm font-medium">Eliminar</h1></div> <div class="icon-container">${validate_component(TrashBinSolid, "TrashBinSolid").$$render($$result, { class: "w-4 ml-5", size: "lg" }, {}, {})} </div></div> `;
                                      }
                                    })} `;
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
              })}</div>`;
            }
          }
        )}`;
      }
    })}</div></div> ${validate_component(Alert_1, "Alert").$$render(
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
      { size: "sm", open: modalDeleteStudent },
      {
        open: ($$value) => {
          modalDeleteStudent = $$value;
          $$settled = false;
        }
      },
      {
        header: () => {
          return `<div slot="header" data-svelte-h="svelte-129afd2"><h1 class="font-bold text-xl">Eliminar estudiante</h1></div>`;
        },
        default: () => {
          return `<div data-svelte-h="svelte-6hckuh"><p class="text-sm">¿Estás seguro que deseas eliminar este estudiante?</p></div> <div class="modal-buttons">${validate_component(Button, "Button").$$render(
            $$result,
            {
              variant: "outlined",
              size: "xs",
              class: "bg-blue-500 hover:bg-blue-400"
            },
            {},
            {
              default: () => {
                return `Eliminar`;
              }
            }
          )} ${validate_component(Button, "Button").$$render(
            $$result,
            {
              variant: "outlined",
              size: "xs",
              class: "bg-red-500 hover:bg-red-400"
            },
            {},
            {
              default: () => {
                return `Cancelar`;
              }
            }
          )}</div>`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_Students();
  $$unsubscribe_Groups();
  return $$rendered;
});
export {
  Page as default
};
