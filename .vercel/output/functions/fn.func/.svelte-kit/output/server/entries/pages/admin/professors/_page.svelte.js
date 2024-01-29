import { c as create_ssr_component, a as subscribe, v as validate_component, k as each, e as escape } from "../../../../chunks/ssr.js";
import { P as Professors } from "../../../../chunks/adminData.js";
import { I as Indicator } from "../../../../chunks/Indicator.js";
import { B as Badge } from "../../../../chunks/Badge.js";
import { B as Button } from "../../../../chunks/Button.js";
import { D as Dropdown, a as DropdownItem, T as TrashBinSolid } from "../../../../chunks/TrashBinSolid.js";
import { D as DropdownDivider } from "../../../../chunks/DropdownDivider.js";
import { A as ArrowLeftOutline, a as ArrowRightOutline, S as Select } from "../../../../chunks/ArrowRightOutline.js";
import { M as Modal } from "../../../../chunks/Modal.js";
import { T as Table, a as TableHead, b as TableHeadCell, c as TableBody, d as TableBodyRow, e as TableBodyCell } from "../../../../chunks/TableHeadCell.js";
import { T as TableSearch } from "../../../../chunks/TableSearch.js";
import { T as Tabs, a as TabItem, E as ExclamationCircleSolid } from "../../../../chunks/ExclamationCircleSolid.js";
import { D as DotsVerticalOutline } from "../../../../chunks/DotsVerticalOutline.js";
import { A as Alert_1 } from "../../../../chunks/Alert.js";
import { getDatabase } from "firebase/database";
getDatabase();
const css = {
  code: ".main-container.svelte-1y6tpll{height:100vh;width:100%}.tabs-container.svelte-1y6tpll{margin-top:1.5rem;margin-left:1.5rem;margin-right:1.5rem}.drop-down-item.svelte-1y6tpll{display:flex;flex-direction:row;justify-content:space-between;align-items:center}.footer-container.svelte-1y6tpll{display:flex;justify-content:space-between;align-items:center;width:100%;padding:1rem 0;flex-wrap:wrap;padding-top:2rem}.pagination-container.svelte-1y6tpll{display:flex;justify-content:center;align-items:center;gap:1rem;padding-right:1rem}.pages-select-conatiner.svelte-1y6tpll{width:6%}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $Professors, $$unsubscribe_Professors;
  $$unsubscribe_Professors = subscribe(Professors, (value) => $Professors = value);
  let alert = {
    visible: false,
    type: "error",
    message: "",
    position: "top-center"
  };
  let professors = [];
  let pendingProfessors = [];
  let rejectedProfessors = [];
  let blockedProfessors = [];
  let deleteProfessorModal = false;
  let currentPage = 1;
  let itemsPerPage = "10";
  let start = (currentPage - 1) * parseInt(itemsPerPage);
  let end = currentPage * parseInt(itemsPerPage);
  let filteredProfessors = [];
  let searchTerm = "";
  let pagedProfessors = [];
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        if ($Professors) {
          professors = $Professors.filter((professor) => professor.status === "active");
          pendingProfessors = $Professors.filter((professor) => professor.status === "pending");
          rejectedProfessors = $Professors.filter((professor) => professor.status === "rejected");
          blockedProfessors = $Professors.filter((professor) => professor.status === "blocked");
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
        filteredProfessors = professors.filter((professor) => professor.name.toLowerCase().includes(searchTerm.toLowerCase()) || professor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) || professor.email.toLowerCase().includes(searchTerm.toLowerCase()));
      }
    }
    {
      {
        pagedProfessors = filteredProfessors.slice(start, end);
      }
    }
    $$rendered = `<div class="main-container svelte-1y6tpll"><div class="tabs-container svelte-1y6tpll">${validate_component(Tabs, "Tabs").$$render($$result, { style: "pill", contentClass: "mt-1" }, {}, {
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
                  placeholder: "Buscar profesores",
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
                          return `Apellido`;
                        }
                      })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                        default: () => {
                          return `Correo`;
                        }
                      })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                        default: () => {
                          return `Fecha de registro`;
                        }
                      })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                        default: () => {
                          return `Estado`;
                        }
                      })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {})}`;
                    }
                  })} ${validate_component(TableBody, "TableBody").$$render($$result, {}, {}, {
                    default: () => {
                      return `${each(pagedProfessors, (professor) => {
                        return `${validate_component(TableBodyRow, "TableBodyRow").$$render($$result, {}, {}, {
                          default: () => {
                            return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                              default: () => {
                                return `${escape(professor.name)} `;
                              }
                            })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                              default: () => {
                                return `${escape(professor.lastName)} `;
                              }
                            })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                              default: () => {
                                return `${escape(professor.email)} `;
                              }
                            })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                              default: () => {
                                return `${escape(professor.firstLogTime)} `;
                              }
                            })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                              default: () => {
                                return `${validate_component(Badge, "Badge").$$render($$result, { color: "green" }, {}, {
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
                                })} `;
                              }
                            })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                              default: () => {
                                return `${validate_component(DotsVerticalOutline, "DotsVerticalOutline").$$render($$result, { class: "hover:cursor-pointer" }, {}, {})} ${validate_component(Dropdown, "Dropdown").$$render($$result, {}, {}, {
                                  default: () => {
                                    return `${validate_component(DropdownDivider, "DropdownDivider").$$render($$result, {}, {}, {})} ${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
                                      default: () => {
                                        return `<div class="drop-down-item svelte-1y6tpll"><div class="text-container" data-svelte-h="svelte-9x5b3u"><h1 class="text-sm font-medium">Bloquear</h1></div> <div class="icon-container">${validate_component(ExclamationCircleSolid, "ExclamationCircleSolid").$$render($$result, { class: "w-4 ml-5", size: "lg" }, {}, {})} </div></div> `;
                                      }
                                    })} ${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
                                      default: () => {
                                        return `<div class="drop-down-item svelte-1y6tpll"><div class="text-container" data-svelte-h="svelte-1fiff7u"><h1 class="text-sm font-medium">Eliminar</h1></div> <div class="icon-container">${validate_component(TrashBinSolid, "TrashBinSolid").$$render($$result, { class: "w-4 ml-5", size: "lg" }, {}, {})} </div></div> `;
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
              })} <div class="footer-container svelte-1y6tpll"><caption class="text-md font-semibold text-black">Profesores: ${escape(filteredProfessors.length)}</caption> <div class="pagination-container svelte-1y6tpll"><button>${validate_component(ArrowLeftOutline, "ArrowLeftOutline").$$render($$result, {}, {}, {})}</button> <div>Página ${escape(currentPage)} / ${escape(Math.ceil(filteredProfessors.length / parseInt(itemsPerPage)))}</div> <button>${validate_component(ArrowRightOutline, "ArrowRightOutline").$$render($$result, {}, {}, {})}</button></div> <div class="pages-select-conatiner svelte-1y6tpll">${validate_component(Select, "Select").$$render(
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
            title: "Pendientes",
            activeClasses: "p-4 text-black font-bold bg-green-300 rounded-t-lg",
            inactiveClasses: "p-4 text-gray-500 rounded-t-lg hover:text-gray-600 hover:bg-gray-50"
          },
          {},
          {
            default: () => {
              return `<div class="mt-8">${validate_component(Table, "Table").$$render($$result, { shadow: true }, {}, {
                default: () => {
                  return `${validate_component(TableHead, "TableHead").$$render($$result, { class: "bg-sky-300" }, {}, {
                    default: () => {
                      return `${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                        default: () => {
                          return `Nombre`;
                        }
                      })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                        default: () => {
                          return `Apellido`;
                        }
                      })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                        default: () => {
                          return `Correo`;
                        }
                      })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                        default: () => {
                          return `Fecha de registro`;
                        }
                      })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                        default: () => {
                          return `Estado`;
                        }
                      })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {})}`;
                    }
                  })} ${validate_component(TableBody, "TableBody").$$render($$result, {}, {}, {
                    default: () => {
                      return `${each(pendingProfessors, (professor) => {
                        return `${validate_component(TableBodyRow, "TableBodyRow").$$render($$result, {}, {}, {
                          default: () => {
                            return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                              default: () => {
                                return `${escape(professor.name)} `;
                              }
                            })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                              default: () => {
                                return `${escape(professor.lastName)} `;
                              }
                            })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                              default: () => {
                                return `${escape(professor.email)} `;
                              }
                            })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                              default: () => {
                                return `${escape(professor.firstLogTime)} `;
                              }
                            })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                              default: () => {
                                return `${validate_component(Badge, "Badge").$$render($$result, { color: "yellow" }, {}, {
                                  default: () => {
                                    return `${validate_component(Indicator, "Indicator").$$render(
                                      $$result,
                                      {
                                        color: "yellow",
                                        size: "sm",
                                        class: "mr-2"
                                      },
                                      {},
                                      {}
                                    )} Pendiente
                                        `;
                                  }
                                })} `;
                              }
                            })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                              default: () => {
                                return `<div class="buttons-container">${validate_component(Button, "Button").$$render($$result, { color: "green", pill: true, size: "xs" }, {}, {
                                  default: () => {
                                    return `Aceptar
                                            `;
                                  }
                                })} ${validate_component(Button, "Button").$$render($$result, { color: "red", pill: true, size: "xs" }, {}, {
                                  default: () => {
                                    return `Rechazar
                                            `;
                                  }
                                })} ${validate_component(Button, "Button").$$render(
                                  $$result,
                                  {
                                    color: "alternative",
                                    pill: true,
                                    size: "xs"
                                  },
                                  {},
                                  {
                                    default: () => {
                                      return `Eliminar
                                            `;
                                    }
                                  }
                                )}</div> `;
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
        )} ${validate_component(TabItem, "TabItem").$$render(
          $$result,
          {
            title: "Rechazados",
            activeClasses: "p-4 text-black font-bold bg-green-300 rounded-t-lg",
            inactiveClasses: "p-4 text-gray-500 rounded-t-lg hover:text-gray-600 hover:bg-gray-50"
          },
          {},
          {
            default: () => {
              return `<div class="mt-8">${validate_component(Table, "Table").$$render($$result, { shadow: true }, {}, {
                default: () => {
                  return `${validate_component(TableHead, "TableHead").$$render($$result, { class: "bg-sky-300" }, {}, {
                    default: () => {
                      return `${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                        default: () => {
                          return `Nombre`;
                        }
                      })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                        default: () => {
                          return `Apellido`;
                        }
                      })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                        default: () => {
                          return `Correo`;
                        }
                      })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                        default: () => {
                          return `Fecha de registro`;
                        }
                      })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                        default: () => {
                          return `Estado`;
                        }
                      })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {})}`;
                    }
                  })} ${validate_component(TableBody, "TableBody").$$render($$result, {}, {}, {
                    default: () => {
                      return `${each(rejectedProfessors, (professor) => {
                        return `${validate_component(TableBodyRow, "TableBodyRow").$$render($$result, {}, {}, {
                          default: () => {
                            return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                              default: () => {
                                return `${escape(professor.name)} `;
                              }
                            })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                              default: () => {
                                return `${escape(professor.lastName)} `;
                              }
                            })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                              default: () => {
                                return `${escape(professor.email)} `;
                              }
                            })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                              default: () => {
                                return `${escape(professor.firstLogTime)} `;
                              }
                            })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                              default: () => {
                                return `${validate_component(Badge, "Badge").$$render($$result, { color: "red" }, {}, {
                                  default: () => {
                                    return `${validate_component(Indicator, "Indicator").$$render($$result, { color: "red", size: "sm", class: "mr-2" }, {}, {})} Rechazado
                                        `;
                                  }
                                })} `;
                              }
                            })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                              default: () => {
                                return `<div class="buttons-container">${validate_component(Button, "Button").$$render($$result, { color: "green", pill: true, size: "xs" }, {}, {
                                  default: () => {
                                    return `Aceptar
                                            `;
                                  }
                                })} ${validate_component(Button, "Button").$$render(
                                  $$result,
                                  {
                                    color: "alternative",
                                    pill: true,
                                    size: "xs"
                                  },
                                  {},
                                  {
                                    default: () => {
                                      return `Eliminar
                                            `;
                                    }
                                  }
                                )}</div> `;
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
              return `<div class="mt-8">${validate_component(Table, "Table").$$render($$result, { shadow: true }, {}, {
                default: () => {
                  return `${validate_component(TableHead, "TableHead").$$render($$result, { class: "bg-sky-300" }, {}, {
                    default: () => {
                      return `${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                        default: () => {
                          return `Nombre`;
                        }
                      })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                        default: () => {
                          return `Apellido`;
                        }
                      })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                        default: () => {
                          return `Correo`;
                        }
                      })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                        default: () => {
                          return `Fecha de registro`;
                        }
                      })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                        default: () => {
                          return `Estado`;
                        }
                      })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {})}`;
                    }
                  })} ${validate_component(TableBody, "TableBody").$$render($$result, {}, {}, {
                    default: () => {
                      return `${each(blockedProfessors, (professor) => {
                        return `${validate_component(TableBodyRow, "TableBodyRow").$$render($$result, {}, {}, {
                          default: () => {
                            return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                              default: () => {
                                return `${escape(professor.name)} `;
                              }
                            })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                              default: () => {
                                return `${escape(professor.lastName)} `;
                              }
                            })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                              default: () => {
                                return `${escape(professor.email)} `;
                              }
                            })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                              default: () => {
                                return `${escape(professor.firstLogTime)} `;
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
                                return `<div class="buttons-container">${validate_component(Button, "Button").$$render($$result, { color: "green", pill: true, size: "xs" }, {}, {
                                  default: () => {
                                    return `Habilitar
                                            `;
                                  }
                                })} ${validate_component(Button, "Button").$$render(
                                  $$result,
                                  {
                                    color: "alternative",
                                    pill: true,
                                    size: "xs"
                                  },
                                  {},
                                  {
                                    default: () => {
                                      return `Eliminar
                                            `;
                                    }
                                  }
                                )}</div> `;
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
      { size: "sm", open: deleteProfessorModal },
      {
        open: ($$value) => {
          deleteProfessorModal = $$value;
          $$settled = false;
        }
      },
      {
        header: () => {
          return `<div slot="header" data-svelte-h="svelte-1cid6cx"><h1 class="font-bold text-xl">Eliminar professor</h1></div>`;
        },
        default: () => {
          return `<div data-svelte-h="svelte-1pd7qev"><p class="text-sm">¿Estás seguro que deseas eliminar este profesor?</p></div> <div class="modal-buttons">${validate_component(Button, "Button").$$render(
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
  $$unsubscribe_Professors();
  return $$rendered;
});
export {
  Page as default
};
