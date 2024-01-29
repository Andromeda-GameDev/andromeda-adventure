import { c as create_ssr_component, b as compute_rest_props, g as getContext, d as spread, f as escape_object, h as escape_attribute_value, i as add_attribute, a as subscribe, v as validate_component, k as each, e as escape } from "../../../../chunks/ssr.js";
import { a as Groups, P as Professors, S as Students } from "../../../../chunks/adminData.js";
import { B as Badge } from "../../../../chunks/Badge.js";
import { B as Button } from "../../../../chunks/Button.js";
import { D as Dropdown, a as DropdownItem, T as TrashBinSolid } from "../../../../chunks/TrashBinSolid.js";
import { D as DropdownDivider } from "../../../../chunks/DropdownDivider.js";
import { C as Checkbox } from "../../../../chunks/Checkbox.js";
import { I as Input } from "../../../../chunks/Input.js";
import { A as ArrowLeftOutline, a as ArrowRightOutline, S as Select } from "../../../../chunks/ArrowRightOutline.js";
import { M as Modal } from "../../../../chunks/Modal.js";
import { T as Table, a as TableHead, b as TableHeadCell, c as TableBody, d as TableBodyRow, e as TableBodyCell } from "../../../../chunks/TableHeadCell.js";
import { T as TableSearch } from "../../../../chunks/TableSearch.js";
import { twMerge } from "tailwind-merge";
import { S as SearchSolid, P as PlusSolid } from "../../../../chunks/SearchSolid.js";
import { A as Alert_1 } from "../../../../chunks/Alert.js";
import { getDatabase } from "firebase/database";
const DotsHorizontalOutline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "role", "strokeLinecap", "ariaLabel"]);
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
  let { strokeLinecap = ctx.strokeLinecap || "round" } = $$props;
  let { ariaLabel = "dots horizontal outline" } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.role === void 0 && $$bindings.role && role !== void 0)
    $$bindings.role(role);
  if ($$props.strokeLinecap === void 0 && $$bindings.strokeLinecap && strokeLinecap !== void 0)
    $$bindings.strokeLinecap(strokeLinecap);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: "none" },
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge("shrink-0", sizes[size], $$props.class))
      },
      { role: escape_attribute_value(role) },
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      { viewBox: "0 0 17 4" }
    ],
    {}
  )}><path stroke="currentColor"${add_attribute("stroke-linecap", strokeLinecap, 0)} stroke-width="3" d="M2.49 2h.01m6 0h.01m5.99 0h.01"></path></svg> `;
});
getDatabase();
const css = {
  code: ".main-container.svelte-1ok446e{height:100vh;width:100%}.header.svelte-1ok446e{display:flex;justify-content:space-between;padding-top:2rem;padding-right:2rem}.table-container.svelte-1ok446e{padding-left:2rem;padding-right:2rem}.footer-container.svelte-1ok446e{display:flex;justify-content:space-between;align-items:center;width:100%;padding:1rem 0;flex-wrap:wrap;padding-top:2rem}.pagination-container.svelte-1ok446e{display:flex;justify-content:center;align-items:center;gap:1rem;padding-right:1rem}.pages-select-conatiner.svelte-1ok446e{width:6%}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $Groups, $$unsubscribe_Groups;
  let $Professors, $$unsubscribe_Professors;
  let $Students, $$unsubscribe_Students;
  $$unsubscribe_Groups = subscribe(Groups, (value) => $Groups = value);
  $$unsubscribe_Professors = subscribe(Professors, (value) => $Professors = value);
  $$unsubscribe_Students = subscribe(Students, (value) => $Students = value);
  let alert = {
    visible: false,
    type: "error",
    message: "",
    position: "top-center"
  };
  let deleteGroupModal = false;
  let moreGroupModal = false;
  let addGroupModal = false;
  let newGroupName = "";
  let groups = [];
  let students = [];
  let professors = [];
  let currentPage = 1;
  let itemsPerPage = "10";
  let start = (currentPage - 1) * parseInt(itemsPerPage);
  let end = currentPage * parseInt(itemsPerPage);
  let filteredGroups = [];
  let searchTerm = "";
  let pagedGroups = [];
  function getNumberOfStudents(group_id) {
    let studentsInGroup = students.filter((student) => student.group_id == group_id);
    return studentsInGroup.length;
  }
  function getNameFromID(group_id) {
    let group = groups.find((group2) => group2.group_id == group_id);
    return group.group_name;
  }
  let currentGroupID = "";
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
        }
        if ($Students) {
          students = $Students;
        }
        if ($Professors) {
          professors = $Professors;
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
        filteredGroups = groups.filter((group) => group.group_name.toLowerCase().includes(searchTerm.toLowerCase()) || group.group_id.toString().toLowerCase().includes(searchTerm.toLowerCase()));
      }
    }
    {
      {
        pagedGroups = filteredGroups.slice(start, end);
      }
    }
    {
      {
        currentGroupID = "";
      }
    }
    $$rendered = `<div class="main-container svelte-1ok446e"><div class="header svelte-1ok446e"><p class="text-2xl font-bold ml-10" data-svelte-h="svelte-10qu2dh">Grupos</p> ${validate_component(Button, "Button").$$render($$result, { color: "blue", size: "sm" }, {}, {
      default: () => {
        return `Agregar grupo`;
      }
    })}</div> <div class="table-container svelte-1ok446e">${validate_component(TableSearch, "TableSearch").$$render(
      $$result,
      {
        placeholder: "Busca un grupo por nombre o id",
        divClass: "overflow-x-auto sm:rounded-lg",
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
                return `Num.`;
              }
            })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
              default: () => {
                return `Nombre del grupo`;
              }
            })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
              default: () => {
                return `Id.`;
              }
            })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, { class: "text-center" }, {}, {
              default: () => {
                return `Num. alumnos`;
              }
            })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {})}`;
          }
        })} ${validate_component(TableBody, "TableBody").$$render($$result, {}, {}, {
          default: () => {
            return `${each(pagedGroups, (group, i) => {
              return `${validate_component(TableBodyRow, "TableBodyRow").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(i + 1)}`;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${escape(group.group_name)}`;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${validate_component(Badge, "Badge").$$render($$result, { class: "text-black bg-blue-300" }, {}, {
                        default: () => {
                          return `${escape(group.group_id)}`;
                        }
                      })} `;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, { class: "text-center" }, {}, {
                    default: () => {
                      return `${escape(getNumberOfStudents(group.group_id))}`;
                    }
                  })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `${validate_component(DotsHorizontalOutline, "DotsHorizontalOutline").$$render(
                        $$result,
                        {
                          size: "sm",
                          class: "hover:cursor-pointer"
                        },
                        {},
                        {}
                      )} ${validate_component(Dropdown, "Dropdown").$$render($$result, {}, {}, {
                        default: () => {
                          return `${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
                            default: () => {
                              return `<div class="flex items-center">${validate_component(SearchSolid, "SearchSolid").$$render($$result, { size: "sm", class: "mr-2" }, {}, {})} <span data-svelte-h="svelte-1m5sv7o">Ver más</span></div> `;
                            }
                          })} ${validate_component(DropdownDivider, "DropdownDivider").$$render($$result, {}, {}, {})} ${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
                            default: () => {
                              return `<div class="flex items-center">${validate_component(TrashBinSolid, "TrashBinSolid").$$render($$result, { size: "sm", class: "mr-2", color: "red" }, {}, {})} <span data-svelte-h="svelte-ayytlt">Eliminar</span></div> `;
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
    })} <div class="footer-container svelte-1ok446e"><caption class="text-md font-semibold text-black">Grupos: ${escape(filteredGroups.length)}</caption> <div class="pagination-container svelte-1ok446e"><button>${validate_component(ArrowLeftOutline, "ArrowLeftOutline").$$render($$result, {}, {}, {})}</button> <div>Página ${escape(currentPage)} / ${escape(Math.ceil(filteredGroups.length / parseInt(itemsPerPage)))}</div> <button>${validate_component(ArrowRightOutline, "ArrowRightOutline").$$render($$result, {}, {}, {})}</button></div> <div class="pages-select-conatiner svelte-1ok446e">${validate_component(Select, "Select").$$render(
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
    )}</div></div></div></div> ${validate_component(Modal, "Modal").$$render(
      $$result,
      { size: "lg", open: moreGroupModal },
      {
        open: ($$value) => {
          moreGroupModal = $$value;
          $$settled = false;
        }
      },
      {
        header: () => {
          return `<div slot="header"><h1 class="font-bold text-xl">${escape(getNameFromID(currentGroupID))}</h1></div>`;
        },
        default: () => {
          return `<div class="modal-professors"><caption class="p-2 text-md font-semibold text-left text-gray-900 bg-white flex justify-between items-center">Profesores
            ${validate_component(PlusSolid, "PlusSolid").$$render(
            $$result,
            {
              size: "sm",
              class: "ml-2 hover:cursor-pointer"
            },
            {},
            {}
          )} ${validate_component(Dropdown, "Dropdown").$$render($$result, { class: "flex flex-col h-44" }, {}, {
            footer: () => {
              return `<div slot="footer" class="flex justify-center bg-gray-200">${validate_component(Button, "Button").$$render(
                $$result,
                {
                  variant: "outlined",
                  size: "xs",
                  class: "bg-blue-500 hover:bg-blue-400 w-9/12 self-center mt-3 mb-3"
                },
                {},
                {
                  default: () => {
                    return `Agregar`;
                  }
                }
              )}</div>`;
            },
            header: () => {
              return `<div slot="header" class="p-3 bg-gray-200" data-svelte-h="svelte-1bi40q5">Profesores</div>`;
            },
            default: () => {
              return `<div class="overflow-y-auto pb-3 text-sm flex-grow">${each(professors, (professor) => {
                return `${each(groups, (group) => {
                  return `${group.group_id == currentGroupID ? `${!group.professors_ids.includes(professor.uuid || "") ? `<li class="rounded p-2 px-12 hover:bg-gray-100 w-full whitespace-nowrap">${validate_component(Checkbox, "Checkbox").$$render(
                    $$result,
                    {
                      let: true,
                      isChecked: "selectedProfessors.has(professor.uuid);",
                      value: professor.uuid
                    },
                    {},
                    {
                      default: () => {
                        return `${escape(professor.name + " " + professor.lastName)}`;
                      }
                    }
                  )} </li>` : ``}` : ``}`;
                })}`;
              })}</div>`;
            }
          })}</caption> ${validate_component(Table, "Table").$$render($$result, { shadow: true }, {}, {
            default: () => {
              return `${validate_component(TableHead, "TableHead").$$render($$result, { class: "bg-sky-300" }, {}, {
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
                  return `${each(groups, (group) => {
                    return `${group.group_id == currentGroupID ? `${each(group.professors_ids, (professor) => {
                      return `${validate_component(TableBodyRow, "TableBodyRow").$$render($$result, {}, {}, {
                        default: () => {
                          return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                            default: () => {
                              return `${escape(professors.find((prof) => prof.uuid == professor)?.name + " " + professors.find((prof) => prof.uuid == professor)?.lastName)}`;
                            }
                          })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                            default: () => {
                              return `${escape(professors.find((prof) => prof.uuid == professor)?.email)}`;
                            }
                          })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                            default: () => {
                              return `${validate_component(Button, "Button").$$render(
                                $$result,
                                {
                                  variant: "outlined",
                                  size: "xs",
                                  class: "bg-red-500 hover:bg-red-400"
                                },
                                {},
                                {
                                  default: () => {
                                    return `Eliminar`;
                                  }
                                }
                              )} `;
                            }
                          })} `;
                        }
                      })}`;
                    })}` : ``}`;
                  })}`;
                }
              })}`;
            }
          })}</div> <hr class="solid"> <div class="modal-students"><caption class="p-2 text-md font-semibold text-left text-gray-900 bg-white flex justify-between items-center" data-svelte-h="svelte-3ifkd8">Alumnos</caption> ${validate_component(Table, "Table").$$render($$result, { shadow: true }, {}, {
            default: () => {
              return `${validate_component(TableHead, "TableHead").$$render($$result, { class: "bg-green-300" }, {}, {
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
                  return `${each(students, (student) => {
                    return `${student.group_id == currentGroupID ? `${validate_component(TableBodyRow, "TableBodyRow").$$render($$result, {}, {}, {
                      default: () => {
                        return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                          default: () => {
                            return `${escape(student.name + " " + student.lastName)}`;
                          }
                        })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                          default: () => {
                            return `${escape(student.email)}`;
                          }
                        })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                          default: () => {
                            return `${validate_component(Button, "Button").$$render(
                              $$result,
                              {
                                variant: "outlined",
                                size: "xs",
                                class: "bg-red-500 hover:bg-red-400"
                              },
                              {},
                              {
                                default: () => {
                                  return `Eliminar`;
                                }
                              }
                            )} `;
                          }
                        })} `;
                      }
                    })}` : ``}`;
                  })}`;
                }
              })}`;
            }
          })}</div>`;
        }
      }
    )} ${validate_component(Modal, "Modal").$$render(
      $$result,
      { open: addGroupModal },
      {
        open: ($$value) => {
          addGroupModal = $$value;
          $$settled = false;
        }
      },
      {
        header: () => {
          return `<div slot="header" data-svelte-h="svelte-117i3qp"><h1 class="font-bold text-xl">Agregar grupo</h1></div>`;
        },
        default: () => {
          return `<div>${validate_component(Input, "Input").$$render(
            $$result,
            {
              label: "Nombre del grupo",
              class: "focus:ring-blue-500 focus:border-blue-500",
              value: newGroupName
            },
            {
              value: ($$value) => {
                newGroupName = $$value;
                $$settled = false;
              }
            },
            {}
          )}</div> <div class="modal-buttons">${validate_component(Button, "Button").$$render(
            $$result,
            {
              variant: "outlined",
              size: "xs",
              class: "bg-blue-500 hover:bg-blue-400"
            },
            {},
            {
              default: () => {
                return `Agregar`;
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
    )} ${validate_component(Modal, "Modal").$$render(
      $$result,
      { open: deleteGroupModal },
      {
        open: ($$value) => {
          deleteGroupModal = $$value;
          $$settled = false;
        }
      },
      {
        header: () => {
          return `<div slot="header" data-svelte-h="svelte-1oc9lid"><h1 class="font-bold text-xl">Eliminar grupo</h1></div>`;
        },
        default: () => {
          return `<div data-svelte-h="svelte-1h4u0e4"><p class="text-sm">¿Estás seguro que deseas eliminar este grupo?</p></div> <div class="modal-buttons">${validate_component(Button, "Button").$$render(
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
    )} ${validate_component(Alert_1, "Alert").$$render(
      $$result,
      {
        alertType: alert.type,
        alertMessage: alert.message,
        alertVisible: alert.visible
      },
      {},
      {}
    )}`;
  } while (!$$settled);
  $$unsubscribe_Groups();
  $$unsubscribe_Professors();
  $$unsubscribe_Students();
  return $$rendered;
});
export {
  Page as default
};
