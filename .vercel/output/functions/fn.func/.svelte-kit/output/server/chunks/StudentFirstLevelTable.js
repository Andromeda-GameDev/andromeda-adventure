import { c as create_ssr_component, b as compute_rest_props, g as getContext, d as spread, f as escape_object, h as escape_attribute_value, v as validate_component, k as each, e as escape, i as add_attribute } from "./ssr.js";
import { B as Badge } from "./Badge.js";
import { B as Button } from "./Button.js";
import { A as ArrowLeftOutline, a as ArrowRightOutline, S as Select } from "./ArrowRightOutline.js";
import { P as Popover } from "./Popover.js";
import { T as Table, a as TableHead, b as TableHeadCell, c as TableBody, d as TableBodyRow, e as TableBodyCell } from "./TableHeadCell.js";
import { twMerge } from "tailwind-merge";
import { I as InfoCircleSolid } from "./InfoCircleSolid.js";
const AngleDownSolid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { ariaLabel = "angle down solid" } = $$props;
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
      { viewBox: "0 0 14 8" }
    ],
    {}
  )}><path fill="currentColor" d="M6.983 8a1.935 1.935 0 0 1-1.4-.615L.253 1.697a.996.996 0 0 1 .768-1.66 1 1 0 0 1 .692.297l5.27 5.629 5.27-5.629a1 1 0 0 1 1.676 1.032.997.997 0 0 1-.216.331L8.387 7.384A1.93 1.93 0 0 1 6.983 8Z"></path></svg> `;
});
const AngleUpSolid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { ariaLabel = "angle up solid" } = $$props;
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
      { viewBox: "0 0 14 8" }
    ],
    {}
  )}><path fill="currentColor" d="M13 8a.992.992 0 0 1-.73-.317L7 2.042 1.73 7.683A1 1 0 0 1 .27 6.317l5.326-5.7a1.972 1.972 0 0 1 2.808 0l5.326 5.7A1 1 0 0 1 13 8Z"></path></svg> `;
});
const CaretSortSolid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { ariaLabel = "caret sort solid" } = $$props;
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
      { viewBox: "0 0 12 21" }
    ],
    {}
  )}><path fill="currentColor" d="M2.574 10.024h6.852a2.074 2.074 0 0 0 1.847-1.086 1.899 1.899 0 0 0-.11-1.986L7.736 1.9a2.122 2.122 0 0 0-3.472 0L.837 6.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H2.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.122 2.122 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.073 2.073 0 0 0-1.846-1.087Z"></path></svg> `;
});
function parseGameSessionKey(gameSessionKey) {
  let gameSessionKeySplitted = gameSessionKey.split("_");
  let date = gameSessionKeySplitted[1] + "-" + gameSessionKeySplitted[2] + "-" + gameSessionKeySplitted[3];
  let time = gameSessionKeySplitted[4] + ":" + gameSessionKeySplitted[5];
  return { date, time };
}
const StudentFirstLevelTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { student } = $$props;
  let studentProgress = student?.progress.level_1;
  let { isStudent = false } = $$props;
  let currentPage = 1;
  let itemsPerPage = "15";
  let start = (currentPage - 1) * parseInt(itemsPerPage);
  let end = currentPage * parseInt(itemsPerPage);
  let openRows = [];
  let sectionDictionary = {
    "section_1": "Sección 1",
    "section_2": "Sección 2",
    "section_3": "Sección 3",
    "section_4": "Sección 4"
  };
  let sectionDataKeys = {
    "section_1": "acidTime",
    "section_2": "v2",
    "section_3": "v1",
    "section_4": "v0"
  };
  let openSubRows = [];
  if ($$props.student === void 0 && $$bindings.student && student !== void 0)
    $$bindings.student(student);
  if ($$props.isStudent === void 0 && $$bindings.isStudent && isStudent !== void 0)
    $$bindings.isStudent(isStudent);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        start = (currentPage - 1) * parseInt(itemsPerPage);
        end = currentPage * parseInt(itemsPerPage);
      }
    }
    $$rendered = `${validate_component(Table, "Table").$$render(
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
              return `${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                default: () => {
                  return `Num.`;
                }
              })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                default: () => {
                  return `Id. de sesión`;
                }
              })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, { class: "flex" }, {}, {
                default: () => {
                  return `Fecha
            ${validate_component(CaretSortSolid, "CaretSortSolid").$$render(
                    $$result,
                    {
                      class: "w-4 h-4 text-blac ml-3 hover:cursor-pointer"
                    },
                    {},
                    {}
                  )}`;
                }
              })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                default: () => {
                  return `Hora de inicio`;
                }
              })} ${!isStudent ? `${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                default: () => {
                  return `Datos`;
                }
              })}` : ``} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, { class: "justify-center text-center" }, {}, {
                default: () => {
                  return `Secciones`;
                }
              })}`;
            }
          })} ${validate_component(TableBody, "TableBody").$$render($$result, {}, {}, {
            default: () => {
              return `${studentProgress ? `${each(Object.keys(studentProgress).slice(start, end), (gameSessionKey, index) => {
                return `${validate_component(TableBodyRow, "TableBodyRow").$$render($$result, {}, {}, {
                  default: () => {
                    return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                      default: () => {
                        return `${escape((currentPage - 1) * parseInt(itemsPerPage) + index + 1)} `;
                      }
                    })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                      default: () => {
                        return `${escape(gameSessionKey)} `;
                      }
                    })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                      default: () => {
                        return `${escape(parseGameSessionKey(gameSessionKey).date)} `;
                      }
                    })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                      default: () => {
                        return `${escape(parseGameSessionKey(gameSessionKey).time)} `;
                      }
                    })} ${!isStudent ? `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                      default: () => {
                        return `<div class="flex justify-right">${studentProgress[gameSessionKey].data ? `${validate_component(InfoCircleSolid, "InfoCircleSolid").$$render(
                          $$result,
                          {
                            class: "w-5 h-5 text-black",
                            id: gameSessionKey
                          },
                          {},
                          {}
                        )} ${validate_component(Popover, "Popover").$$render(
                          $$result,
                          {
                            title: "Datos del problema",
                            triggeredBy: "#" + gameSessionKey,
                            trigger: "click"
                          },
                          {},
                          {
                            default: () => {
                              return `${validate_component(Table, "Table").$$render($$result, {}, {}, {
                                default: () => {
                                  return `${validate_component(TableBody, "TableBody").$$render($$result, {}, {}, {
                                    default: () => {
                                      return `${validate_component(TableBodyRow, "TableBodyRow").$$render($$result, {}, {}, {
                                        default: () => {
                                          return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                                            default: () => {
                                              return `Acid speed
                                            `;
                                            }
                                          })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                                            default: () => {
                                              return `${escape(studentProgress[gameSessionKey].data.acidSpeed.toFixed(3))} m/s
                                            `;
                                            }
                                          })} `;
                                        }
                                      })} ${validate_component(TableBodyRow, "TableBodyRow").$$render($$result, {}, {}, {
                                        default: () => {
                                          return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                                            default: () => {
                                              return `Acid time
                                            `;
                                            }
                                          })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                                            default: () => {
                                              return `${escape(studentProgress[gameSessionKey].data.acidTime.toFixed(3))} s
                                            `;
                                            }
                                          })} `;
                                        }
                                      })} ${validate_component(TableBodyRow, "TableBodyRow").$$render($$result, {}, {}, {
                                        default: () => {
                                          return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                                            default: () => {
                                              return `G
                                            `;
                                            }
                                          })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                                            default: () => {
                                              return `${escape(studentProgress[gameSessionKey].data.g.toFixed(3))} m/s^2
                                            `;
                                            }
                                          })} `;
                                        }
                                      })} ${validate_component(TableBodyRow, "TableBodyRow").$$render($$result, {}, {}, {
                                        default: () => {
                                          return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                                            default: () => {
                                              return `M1
                                            `;
                                            }
                                          })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                                            default: () => {
                                              return `${escape(studentProgress[gameSessionKey].data.m1.toFixed(3))} kg
                                            `;
                                            }
                                          })} `;
                                        }
                                      })} ${validate_component(TableBodyRow, "TableBodyRow").$$render($$result, {}, {}, {
                                        default: () => {
                                          return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                                            default: () => {
                                              return `M2
                                            `;
                                            }
                                          })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                                            default: () => {
                                              return `${escape(studentProgress[gameSessionKey].data.m2.toFixed(3))} kg
                                            `;
                                            }
                                          })} `;
                                        }
                                      })} ${validate_component(TableBodyRow, "TableBodyRow").$$render($$result, {}, {}, {
                                        default: () => {
                                          return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                                            default: () => {
                                              return `Surface
                                            `;
                                            }
                                          })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                                            default: () => {
                                              return `${escape(studentProgress[gameSessionKey].data.surface.toFixed(3))} m^2
                                            `;
                                            }
                                          })} `;
                                        }
                                      })} ${validate_component(TableBodyRow, "TableBodyRow").$$render($$result, {}, {}, {
                                        default: () => {
                                          return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                                            default: () => {
                                              return `V0
                                            `;
                                            }
                                          })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                                            default: () => {
                                              return `${escape(studentProgress[gameSessionKey].data.v0.toFixed(3))} m/s
                                            `;
                                            }
                                          })} `;
                                        }
                                      })} ${validate_component(TableBodyRow, "TableBodyRow").$$render($$result, {}, {}, {
                                        default: () => {
                                          return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                                            default: () => {
                                              return `V1
                                            `;
                                            }
                                          })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                                            default: () => {
                                              return `${escape(studentProgress[gameSessionKey].data.v1.toFixed(3))} m/s
                                            `;
                                            }
                                          })} `;
                                        }
                                      })} ${validate_component(TableBodyRow, "TableBodyRow").$$render($$result, {}, {}, {
                                        default: () => {
                                          return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                                            default: () => {
                                              return `V2
                                            `;
                                            }
                                          })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                                            default: () => {
                                              return `${escape(studentProgress[gameSessionKey].data.v2.toFixed(3))} m/s
                                            `;
                                            }
                                          })} `;
                                        }
                                      })} `;
                                    }
                                  })} `;
                                }
                              })} `;
                            }
                          }
                        )}` : `<span data-svelte-h="svelte-st4x7h">No data</span>`}</div> `;
                      }
                    })}` : ``} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, { class: "text-right" }, {}, {
                      default: () => {
                        return `<div class="flex justify-center">${studentProgress[gameSessionKey].sections ? `${openRows.includes(gameSessionKey) ? `${validate_component(AngleUpSolid, "AngleUpSolid").$$render(
                          $$result,
                          {
                            class: "w-4 h-4 text-black hover:cursor-pointer"
                          },
                          {},
                          {}
                        )}` : `${validate_component(AngleDownSolid, "AngleDownSolid").$$render(
                          $$result,
                          {
                            class: "w-4 h-4 text-black hover:cursor-pointer"
                          },
                          {},
                          {}
                        )}`}` : `<span data-svelte-h="svelte-st4x7h">No data</span>`}</div> `;
                      }
                    })} `;
                  }
                })} ${openRows.includes(gameSessionKey) ? `${validate_component(TableBodyRow, "TableBodyRow").$$render(
                  $$result,
                  {
                    class: "w-full justify-center items-center"
                  },
                  {},
                  {
                    default: () => {
                      return `${validate_component(TableBodyCell, "TableBodyCell").$$render(
                        $$result,
                        {
                          colspan: !isStudent ? 6 : 5,
                          class: "bg-zinc-200"
                        },
                        {},
                        {
                          default: () => {
                            return `${validate_component(Table, "Table").$$render($$result, { shadow: true }, {}, {
                              default: () => {
                                return `${validate_component(TableHead, "TableHead").$$render($$result, { class: "bg-green-400" }, {}, {
                                  default: () => {
                                    return `${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                                      default: () => {
                                        return `Sección
                                    `;
                                      }
                                    })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                                      default: () => {
                                        return `Puntaje
                                    `;
                                      }
                                    })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                                      default: () => {
                                        return `Intentos
                                    `;
                                      }
                                    })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                                      default: () => {
                                        return `Tiempo
                                    `;
                                      }
                                    })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, { class: "justify-center text-center" }, {}, {
                                      default: () => {
                                        return `Respuestas
                                    `;
                                      }
                                    })} `;
                                  }
                                })} ${validate_component(TableBody, "TableBody").$$render($$result, {}, {}, {
                                  default: () => {
                                    return `${each(Object.keys(studentProgress[gameSessionKey].sections), (sectionKey) => {
                                      return `${validate_component(TableBodyRow, "TableBodyRow").$$render($$result, {}, {}, {
                                        default: () => {
                                          return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                                            default: () => {
                                              return `${escape(sectionDictionary[sectionKey])} `;
                                            }
                                          })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                                            default: () => {
                                              return `${escape(studentProgress[gameSessionKey].sections[sectionKey].score)} `;
                                            }
                                          })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                                            default: () => {
                                              return `${escape(studentProgress[gameSessionKey].sections[sectionKey].attempts)} `;
                                            }
                                          })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                                            default: () => {
                                              return `${escape(studentProgress[gameSessionKey].sections[sectionKey].time.toFixed(2))} s.
                                            `;
                                            }
                                          })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                                            default: () => {
                                              return `<div class="flex justify-center">${openSubRows.includes(`${gameSessionKey}-${sectionKey}`) ? `${validate_component(AngleUpSolid, "AngleUpSolid").$$render(
                                                $$result,
                                                {
                                                  class: "w-4 h-4 text-black hover:cursor-pointer"
                                                },
                                                {},
                                                {}
                                              )}` : `${validate_component(AngleDownSolid, "AngleDownSolid").$$render(
                                                $$result,
                                                {
                                                  class: "w-4 h-4 text-black hover:cursor-pointer"
                                                },
                                                {},
                                                {}
                                              )}`}</div> `;
                                            }
                                          })} `;
                                        }
                                      })} ${openSubRows.includes(`${gameSessionKey}-${sectionKey}`) ? `${validate_component(TableBodyRow, "TableBodyRow").$$render(
                                        $$result,
                                        {
                                          class: "w-full justify-center items-center"
                                        },
                                        {},
                                        {
                                          default: () => {
                                            return `${validate_component(TableBodyCell, "TableBodyCell").$$render(
                                              $$result,
                                              {
                                                colspan: !isStudent ? 6 : 5,
                                                class: "bg-blue-200"
                                              },
                                              {},
                                              {
                                                default: () => {
                                                  return `${validate_component(Table, "Table").$$render($$result, { shadow: true }, {}, {
                                                    default: () => {
                                                      return `${validate_component(TableBody, "TableBody").$$render($$result, {}, {}, {
                                                        default: () => {
                                                          return `${validate_component(TableBodyRow, "TableBodyRow").$$render($$result, {}, {}, {
                                                            default: () => {
                                                              return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, { class: "text-black font-semibold" }, {}, {
                                                                default: () => {
                                                                  return `Respuestas
                                                            `;
                                                                }
                                                              })} ${each(studentProgress[gameSessionKey].sections[sectionKey].listResults, (result) => {
                                                                return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                                                                  default: () => {
                                                                    return `${Math.abs(result - studentProgress[gameSessionKey].data[sectionDataKeys[sectionKey]]) <= 0.2 ? `${validate_component(Badge, "Badge").$$render($$result, { color: "green" }, {}, {
                                                                      default: () => {
                                                                        return `${escape(result.toFixed(3))} `;
                                                                      }
                                                                    })}` : `${validate_component(Badge, "Badge").$$render($$result, { color: "red" }, {}, {
                                                                      default: () => {
                                                                        return `${escape(result.toFixed(3))} `;
                                                                      }
                                                                    })}`} `;
                                                                  }
                                                                })}`;
                                                              })} `;
                                                            }
                                                          })} `;
                                                        }
                                                      })} `;
                                                    }
                                                  })} `;
                                                }
                                              }
                                            )} `;
                                          }
                                        }
                                      )}` : ``}`;
                                    })} `;
                                  }
                                })} `;
                              }
                            })} `;
                          }
                        }
                      )} `;
                    }
                  }
                )}` : ``}`;
              })}` : ``}`;
            }
          })} <tfoot><tr class="font-semibold text-gray-900"><th scope="row" class="text-sm"${add_attribute("colspan", !isStudent ? 6 : 5, 0)}><div class="flex justify-between w-full"><div class="ml-6 mt-6">${studentProgress ? `${escape(start + 1)} - ${escape(end > Object.keys(studentProgress).length ? Object.keys(studentProgress).length : end)} de ${escape(Object.keys(studentProgress).length)}` : `0 - 0 de 0`}</div> <div class="mt-4 mb-2">${validate_component(Button, "Button").$$render(
            $$result,
            {
              variant: "outlined",
              size: "xs",
              class: "bg-blue-500 hover:bg-blue-400",
              disabled: currentPage === 1
            },
            {},
            {
              default: () => {
                return `${validate_component(ArrowLeftOutline, "ArrowLeftOutline").$$render($$result, { class: "w-4 h-4 text-white" }, {}, {})}`;
              }
            }
          )} ${validate_component(Button, "Button").$$render(
            $$result,
            {
              variant: "outlined",
              size: "xs",
              class: "bg-blue-500 hover:bg-blue-400",
              disabled: end >= Object.keys(studentProgress).length
            },
            {},
            {
              default: () => {
                return `${validate_component(ArrowRightOutline, "ArrowRightOutline").$$render($$result, { class: "w-4 h-4 text-white" }, {}, {})}`;
              }
            }
          )}</div> <div class="mr-6 mt-3 mb-3">${validate_component(Select, "Select").$$render(
            $$result,
            {
              class: "w-24",
              id: "pagination-select-level1",
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
          )}</div></div></th></tr></tfoot>`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  StudentFirstLevelTable as S
};
