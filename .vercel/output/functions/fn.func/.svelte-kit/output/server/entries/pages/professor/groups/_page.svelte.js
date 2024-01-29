import { c as create_ssr_component, b as compute_rest_props, v as validate_component, g as getContext, d as spread, f as escape_object, h as escape_attribute_value, i as add_attribute, l as createEventDispatcher, e as escape, k as each, a as subscribe } from "../../../../chunks/ssr.js";
import { a as authStore } from "../../../../chunks/auth.js";
import { B as Button } from "../../../../chunks/Button.js";
import { C as Card } from "../../../../chunks/Card.js";
import { D as Dropdown, a as DropdownItem, T as TrashBinSolid } from "../../../../chunks/TrashBinSolid.js";
import { T as Toggle, M as MultiSelect } from "../../../../chunks/Toggle.js";
import { M as Modal } from "../../../../chunks/Modal.js";
import { P as Popper } from "../../../../chunks/Popper.js";
import { twMerge } from "tailwind-merge";
import { T as Table, a as TableHead, b as TableHeadCell, c as TableBody, d as TableBodyRow, e as TableBodyCell } from "../../../../chunks/TableHeadCell.js";
import { D as DotsVerticalOutline } from "../../../../chunks/DotsVerticalOutline.js";
import { S as SearchSolid, P as PlusSolid } from "../../../../chunks/SearchSolid.js";
import { A as Alert_1 } from "../../../../chunks/Alert.js";
import { getDatabase } from "firebase/database";
import { I as Input } from "../../../../chunks/Input.js";
import { S as Spinner } from "../../../../chunks/Spinner.js";
import { G as Groups, S as Students } from "../../../../chunks/professorData.js";
const Tooltip = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["type", "defaultClass"]);
  let { type = "dark" } = $$props;
  let { defaultClass = "py-2 px-3 text-sm font-medium" } = $$props;
  const types = {
    dark: "bg-gray-900 text-white dark:bg-gray-700",
    light: "border-gray-200 bg-white text-gray-900",
    auto: " bg-white text-gray-900 dark:bg-gray-700 dark:text-white border-gray-200 dark:border-gray-700",
    custom: ""
  };
  let toolTipClass;
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.defaultClass === void 0 && $$bindings.defaultClass && defaultClass !== void 0)
    $$bindings.defaultClass(defaultClass);
  {
    {
      if ($$restProps.color)
        type = "custom";
      else
        $$restProps.color = "none";
      if (["light", "auto"].includes(type))
        $$restProps.border = true;
      toolTipClass = twMerge("tooltip", defaultClass, types[type], $$props.class);
    }
  }
  return `${validate_component(Popper, "Popper").$$render($$result, Object.assign({}, { rounded: true }, { shadow: true }, $$restProps, { class: toolTipClass }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })} `;
});
const CheckCircleSolid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { ariaLabel = "check circle solid" } = $$props;
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
      { viewBox: "0 0 20 20" }
    ],
    {}
  )}><path fill="currentColor" d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"></path></svg> `;
});
const CirclePlusSolid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { ariaLabel = "circle plus solid" } = $$props;
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
      { viewBox: "0 0 20 20" }
    ],
    {}
  )}><path fill="currentColor" d="M9.546.5a9.5 9.5 0 1 0 9.5 9.5 9.51 9.51 0 0 0-9.5-9.5ZM13.788 11h-3.242v3.242a1 1 0 1 1-2 0V11H5.304a1 1 0 0 1 0-2h3.242V5.758a1 1 0 0 1 2 0V9h3.242a1 1 0 1 1 0 2Z"></path></svg> `;
});
const CloseCircleSolid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { ariaLabel = "close circle solid" } = $$props;
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
      { viewBox: "0 0 20 20" }
    ],
    {}
  )}><path fill="currentColor" d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"></path></svg> `;
});
const EditOutline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "role", "strokeLinecap", "strokeLinejoin", "strokeWidth", "ariaLabel"]);
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
  let { strokeLinejoin = ctx.strokeLinejoin || "round" } = $$props;
  let { strokeWidth = ctx.strokeWidth || "2" } = $$props;
  let { ariaLabel = "edit outline" } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.role === void 0 && $$bindings.role && role !== void 0)
    $$bindings.role(role);
  if ($$props.strokeLinecap === void 0 && $$bindings.strokeLinecap && strokeLinecap !== void 0)
    $$bindings.strokeLinecap(strokeLinecap);
  if ($$props.strokeLinejoin === void 0 && $$bindings.strokeLinejoin && strokeLinejoin !== void 0)
    $$bindings.strokeLinejoin(strokeLinejoin);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
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
      { viewBox: "0 0 20 18" }
    ],
    {}
  )}><path stroke="currentColor"${add_attribute("stroke-linecap", strokeLinecap, 0)}${add_attribute("stroke-linejoin", strokeLinejoin, 0)}${add_attribute("stroke-width", strokeWidth, 0)} d="M15 13v2.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h6.616m5.521-.156 2.852 2.852m1.253-4.105a2.017 2.017 0 0 1 0 2.852l-7.844 7.844L7 13l.713-3.565 7.844-7.844a2.016 2.016 0 0 1 2.852 0Z"></path></svg> `;
});
const FileCopySolid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { ariaLabel = "file copy solid" } = $$props;
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
      { viewBox: "0 0 18 20" }
    ],
    {}
  )}><g fill="currentColor"><path d="M5 9V4.13a2.96 2.96 0 0 0-1.293.749L.879 7.707A2.96 2.96 0 0 0 .13 9H5Zm11.066-9H9.829a2.98 2.98 0 0 0-2.122.879L7 1.584A.987.987 0 0 0 6.766 2h4.3A3.972 3.972 0 0 1 15 6v10h1.066A1.97 1.97 0 0 0 18 14V2a1.97 1.97 0 0 0-1.934-2Z"></path><path d="M11.066 4H7v5a2 2 0 0 1-2 2H0v7a1.969 1.969 0 0 0 1.933 2h9.133A1.97 1.97 0 0 0 13 18V6a1.97 1.97 0 0 0-1.934-2Z"></path></g></svg> `;
});
const LockTimeSolid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { ariaLabel = "lock time solid" } = $$props;
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
      { viewBox: "0 0 19 20" }
    ],
    {}
  )}><path fill="currentColor" d="M8 14.5a6.474 6.474 0 0 1 8-6.318V8a1 1 0 0 0-1-1h-2.5V4.5a4.5 4.5 0 1 0-9 0V7H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9.052A6.494 6.494 0 0 1 8 14.5Zm-2.5-10a2.5 2.5 0 1 1 5 0V7h-5V4.5Z"></path><path fill="currentColor" d="M14.5 10a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm2.06 6.561a1 1 0 0 1-1.414 0l-1.353-1.354a1 1 0 0 1-.293-.707v-1.858a1 1 0 0 1 2 0v1.444l1.06 1.06a1.001 1.001 0 0 1 0 1.415Z"></path></svg> `;
});
getDatabase();
const css$1 = {
  code: ".card-content.svelte-idr4lj.svelte-idr4lj{display:flex;flex-direction:column;align-items:left;justify-content:space-between;width:270px;height:120px}.card-content-header.svelte-idr4lj.svelte-idr4lj{display:flex;flex-direction:row;align-items:center;justify-content:space-between}.card-content-header.svelte-idr4lj h1.svelte-idr4lj{white-space:pre-line;overflow:hidden;text-overflow:ellipsis;font-weight:550;font-size:1.1rem;color:black}.card-content-body.svelte-idr4lj.svelte-idr4lj{display:flex;flex-direction:row;align-items:center;justify-content:space-between}.copy-icon-container.svelte-idr4lj.svelte-idr4lj{display:flex;flex-direction:row;align-items:center;justify-content:space-between}.copy-icon-container.svelte-idr4lj p.svelte-idr4lj{white-space:pre-line;overflow:hidden;text-overflow:ellipsis;font-weight:550;font-size:0.9rem}.drop-down-item.svelte-idr4lj.svelte-idr4lj{display:flex;flex-direction:row;justify-content:space-between;align-items:center}.toggle-levels-container.svelte-idr4lj.svelte-idr4lj{display:flex;flex-direction:column;justify-content:space-between;align-items:left;gap:1rem}.level-toggle.svelte-idr4lj.svelte-idr4lj{display:flex;flex-direction:row;justify-content:space-between;align-items:center;width:100%;gap:1rem}.sure-buttons-container.svelte-idr4lj.svelte-idr4lj{display:flex;flex-direction:column;justify-content:space-between;align-items:center;gap:1rem}.buttons-sure.svelte-idr4lj.svelte-idr4lj{display:flex;flex-direction:row;justify-content:center;align-items:center;width:100%;gap:1rem}",
  map: null
};
const ProfessorGroupCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { title = "Card title" } = $$props;
  let { groupId = "C0000" } = $$props;
  let { levels = { level_1: true, level_2: true } } = $$props;
  let { students = [] } = $$props;
  let filteredStudents = Object.values(students).filter((student) => student.group_id === groupId);
  let alert = {
    visible: false,
    type: "success",
    message: "",
    position: "top-center"
  };
  let iconColor = "black";
  let modalStudent = false;
  let modalLevels = false;
  let modalEliminate = false;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.groupId === void 0 && $$bindings.groupId && groupId !== void 0)
    $$bindings.groupId(groupId);
  if ($$props.levels === void 0 && $$bindings.levels && levels !== void 0)
    $$bindings.levels(levels);
  if ($$props.students === void 0 && $$bindings.students && students !== void 0)
    $$bindings.students(students);
  $$result.css.add(css$1);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    iconColor = "black";
    $$rendered = `${validate_component(Card, "Card").$$render($$result, {}, {}, {
      default: () => {
        return `<div class="card-content svelte-idr4lj"><div class="card-content-header svelte-idr4lj"><h1 class="svelte-idr4lj">${escape(title)}</h1> ${validate_component(DotsVerticalOutline, "DotsVerticalOutline").$$render(
          $$result,
          {
            class: "w-4 hover:cursor-pointer",
            size: "md"
          },
          {},
          {}
        )} ${validate_component(Dropdown, "Dropdown").$$render($$result, { placement: "right" }, {}, {
          default: () => {
            return `${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
              default: () => {
                return `<div class="drop-down-item svelte-idr4lj"><div class="text-container" data-svelte-h="svelte-1ytdvzb"><p>Ver más</p></div> <div class="icon-container">${validate_component(SearchSolid, "SearchSolid").$$render(
                  $$result,
                  {
                    class: "w-4 ml-5 text-blue-600",
                    size: "lg"
                  },
                  {},
                  {}
                )}</div></div>`;
              }
            })} ${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
              default: () => {
                return `<div class="drop-down-item svelte-idr4lj"><div class="text-container" data-svelte-h="svelte-u03a6d"><p>Niveles</p></div> <div class="icon-container">${validate_component(LockTimeSolid, "LockTimeSolid").$$render($$result, { class: "w-4 ml-5", size: "lg" }, {}, {})}</div></div>`;
              }
            })}  ${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
              default: () => {
                return `<div class="drop-down-item svelte-idr4lj"><div class="text-container" data-svelte-h="svelte-9gbasy"><p>Eliminar</p></div> <div class="icon-container">${validate_component(TrashBinSolid, "TrashBinSolid").$$render(
                  $$result,
                  {
                    class: "w-4 ml-5 text-red-500",
                    size: "lg"
                  },
                  {},
                  {}
                )}</div></div>`;
              }
            })}`;
          }
        })}</div> <div class="card-content-body svelte-idr4lj"><h1>Alumnos: ${escape(filteredStudents.length)}</h1> <div class="copy-icon-container svelte-idr4lj"><p class="svelte-idr4lj">${escape(groupId)}</p> ${validate_component(FileCopySolid, "FileCopySolid").$$render(
          $$result,
          {
            id: "copy-icon",
            class: "w-4 ml-3 hover:cursor-pointer",
            size: "md",
            style: "color: " + iconColor
          },
          {},
          {}
        )} ${validate_component(Tooltip, "Tooltip").$$render($$result, { arrow: false, triggeredBy: "#copy-icon" }, {}, {
          default: () => {
            return `Copiar`;
          }
        })}</div></div></div>`;
      }
    })} ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        size: "lg",
        autoclose: true,
        outsideclose: true,
        open: modalStudent
      },
      {
        open: ($$value) => {
          modalStudent = $$value;
          $$settled = false;
        }
      },
      {
        header: () => {
          return `<div slot="header"><h1 class="font-bold text-xl ml-5">${escape(title)}</h1></div>`;
        },
        default: () => {
          return `<div>${filteredStudents.length !== 0 ? `${validate_component(Table, "Table").$$render($$result, { striped: true }, {}, {
            default: () => {
              return `${validate_component(TableHead, "TableHead").$$render($$result, { class: "bg-blue-300" }, {}, {
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
                      return `Nivel 1`;
                    }
                  })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `Nivel 2`;
                    }
                  })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                    default: () => {
                      return `<span class="sr-only" data-svelte-h="svelte-1re0hw6">Eliminar</span>`;
                    }
                  })}`;
                }
              })} ${validate_component(TableBody, "TableBody").$$render($$result, {}, {}, {
                default: () => {
                  return `${each(filteredStudents, (student) => {
                    return `${validate_component(TableBodyRow, "TableBodyRow").$$render($$result, {}, {}, {
                      default: () => {
                        return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                          default: () => {
                            return `${escape(student.name)}`;
                          }
                        })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                          default: () => {
                            return `${escape(student.lastName)}`;
                          }
                        })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                          default: () => {
                            return `${escape(student.email)}`;
                          }
                        })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                          default: () => {
                            return `${student.progress ? `${student.progress.level_1 ? `${validate_component(CheckCircleSolid, "CheckCircleSolid").$$render(
                              $$result,
                              {
                                class: "w-4 ml-5 text-green-500",
                                size: "lg"
                              },
                              {},
                              {}
                            )}` : `${validate_component(CloseCircleSolid, "CloseCircleSolid").$$render(
                              $$result,
                              {
                                class: "w-4 ml-5 text-red-500",
                                size: "lg"
                              },
                              {},
                              {}
                            )}`}` : `${validate_component(CloseCircleSolid, "CloseCircleSolid").$$render(
                              $$result,
                              {
                                class: "w-4 ml-5 text-red-500",
                                size: "lg"
                              },
                              {},
                              {}
                            )}`} `;
                          }
                        })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                          default: () => {
                            return `${student.progress ? `${student.progress.level_2 ? `${validate_component(CheckCircleSolid, "CheckCircleSolid").$$render(
                              $$result,
                              {
                                class: "w-4 ml-5 text-green-500",
                                size: "lg"
                              },
                              {},
                              {}
                            )}` : `${validate_component(CloseCircleSolid, "CloseCircleSolid").$$render(
                              $$result,
                              {
                                class: "w-4 ml-5 text-red-500",
                                size: "lg"
                              },
                              {},
                              {}
                            )}`}` : `${validate_component(CloseCircleSolid, "CloseCircleSolid").$$render(
                              $$result,
                              {
                                class: "w-4 ml-5 text-red-500",
                                size: "lg"
                              },
                              {},
                              {}
                            )}`} `;
                          }
                        })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                          default: () => {
                            return `${validate_component(TrashBinSolid, "TrashBinSolid").$$render(
                              $$result,
                              {
                                class: "w-4 ml-5 text-red-500 hover:cursor-pointer",
                                size: "lg"
                              },
                              {},
                              {}
                            )} `;
                          }
                        })} `;
                      }
                    })}`;
                  })}`;
                }
              })}`;
            }
          })}` : `<h1 class="text-xl font-medium" data-svelte-h="svelte-1a00pyo">Este grupo no cuenta con alumnos</h1>`}</div>`;
        }
      }
    )} ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        size: "xs",
        autoclose: true,
        outsideclose: true,
        open: modalLevels
      },
      {
        open: ($$value) => {
          modalLevels = $$value;
          $$settled = false;
        }
      },
      {
        header: () => {
          return `<div slot="header" data-svelte-h="svelte-p2oqvw"><h1 class="font-bold text-xl ml-5">Control de acceso</h1></div>`;
        },
        default: () => {
          return `<div class="toggle-levels-container svelte-idr4lj">Configura el acceso a los niveles:
        <div class="level-toggle svelte-idr4lj">Nivel 1: ${validate_component(Toggle, "Toggle").$$render(
            $$result,
            { color: "purple", checked: levels.level_1 },
            {
              checked: ($$value) => {
                levels.level_1 = $$value;
                $$settled = false;
              }
            },
            {}
          )}</div> <div class="level-toggle svelte-idr4lj">Nivel 2: ${validate_component(Toggle, "Toggle").$$render(
            $$result,
            { color: "purple", checked: levels.level_2 },
            {
              checked: ($$value) => {
                levels.level_2 = $$value;
                $$settled = false;
              }
            },
            {}
          )}</div></div> <div class="buttons-sure svelte-idr4lj">${validate_component(Button, "Button").$$render(
            $$result,
            {
              size: "xs",
              variant: "outlined",
              class: "bg-purple-500 hover:bg-purple-300"
            },
            {},
            {
              default: () => {
                return `<h1 data-svelte-h="svelte-101848w">Guardar</h1>`;
              }
            }
          )} ${validate_component(Button, "Button").$$render(
            $$result,
            {
              size: "xs",
              variant: "outlined",
              class: "bg-gray-500 hover:bg-gray-400"
            },
            {},
            {
              default: () => {
                return `<h1 data-svelte-h="svelte-1oaipm9">Cancelar</h1>`;
              }
            }
          )}</div>`;
        }
      }
    )} ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        size: "xs",
        autoclose: true,
        outsideclose: true,
        open: modalEliminate
      },
      {
        open: ($$value) => {
          modalEliminate = $$value;
          $$settled = false;
        }
      },
      {
        header: () => {
          return `<div slot="header" data-svelte-h="svelte-detty6"><h1 class="font-bold text-xl ml-5">Eliminar grupo</h1></div>`;
        },
        default: () => {
          return `<div class="sure-buttons-container svelte-idr4lj">¿Estás seguro de que quieres eliminar el grupo?
        <div class="buttons-sure svelte-idr4lj">${validate_component(Button, "Button").$$render(
            $$result,
            {
              size: "xs",
              variant: "outlined",
              class: "bg-red-500 hover:bg-red-400"
            },
            {},
            {
              default: () => {
                return `<h1 data-svelte-h="svelte-4c2uln">Eliminar</h1>`;
              }
            }
          )} ${validate_component(Button, "Button").$$render(
            $$result,
            {
              size: "xs",
              variant: "outlined",
              class: "bg-gray-500 hover:bg-gray-400"
            },
            {},
            {
              default: () => {
                return `<h1 data-svelte-h="svelte-1oaipm9">Cancelar</h1>`;
              }
            }
          )}</div></div>`;
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
  return $$rendered;
});
const css = {
  code: ".groups-container-header.svelte-kt1ex{display:flex;width:100%;height:10%;align-items:center;padding-left:3rem;padding-right:3rem}.groups-container.svelte-kt1ex{display:flex;flex-direction:column;width:100%;height:100%}.drop-down-item.svelte-kt1ex{display:flex;flex-direction:row;justify-content:space-between;align-items:center}.groups-content.svelte-kt1ex{display:flex;width:100%;justify-content:flex-start;align-items:flex-start;flex-wrap:wrap;gap:1.2rem;row-gap:1.2rem;padding-left:3rem;padding-right:3rem;padding-bottom:3rem;overflow:auto}.spinner-container.svelte-kt1ex{display:flex;justify-content:center;align-items:center;width:100%;height:100%}.group-select-container.svelte-kt1ex{min-height:320px;overflow-y:hidden;width:100%}.modal-buttons.svelte-kt1ex{display:flex;flex-direction:row;justify-content:center;align-items:center;width:100%;gap:1rem}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $Groups, $$unsubscribe_Groups;
  let $authStore, $$unsubscribe_authStore;
  let $Students, $$unsubscribe_Students;
  $$unsubscribe_Groups = subscribe(Groups, (value) => $Groups = value);
  $$unsubscribe_authStore = subscribe(authStore, (value) => $authStore = value);
  $$unsubscribe_Students = subscribe(Students, (value) => $Students = value);
  let alert = {
    visible: false,
    type: "error",
    message: "",
    position: "top-center"
  };
  let currentUserUid = $authStore.uid;
  let filteredGroups = [];
  let externalGroups = [];
  let selectableGroups = [];
  let studentsObj = [];
  let modalAddExistingGroup = false;
  let modalAddNewGroup = false;
  let selectedGroups = [];
  let newGroupName = "";
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
          filteredGroups = $Groups.filter((group) => group.professors_ids.includes(currentUserUid));
          externalGroups = $Groups.filter((group) => !group.professors_ids.includes(currentUserUid));
        }
        selectableGroups = externalGroups.map((group) => ({
          value: group.group_id,
          name: group.group_name
        }));
        studentsObj = $Students || [];
      }
    }
    $$rendered = `<div class="groups-container svelte-kt1ex"><div class="groups-container-header svelte-kt1ex"><h1 class="font-bold text-xl" data-svelte-h="svelte-ryypp4">Grupos</h1> <div class="flex-grow"></div> ${validate_component(Button, "Button").$$render(
      $$result,
      {
        size: "xs",
        variant: "outlined",
        class: "bg-blue-500 hover:bg-blue-400"
      },
      {},
      {
        default: () => {
          return `${validate_component(PlusSolid, "PlusSolid").$$render($$result, { class: "w-4", size: "xs" }, {}, {})} <h1 class="ml-2 text-sm font-medium" data-svelte-h="svelte-nsab5m">Agregar grupo</h1>`;
        }
      }
    )} ${validate_component(Dropdown, "Dropdown").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
          default: () => {
            return `<div class="drop-down-item svelte-kt1ex"><div class="text-container" data-svelte-h="svelte-q0cno7"><h1 class="text-sm font-medium">Agregar nuevo</h1></div> <div class="icon-container">${validate_component(EditOutline, "EditOutline").$$render($$result, { class: "w-4 ml-5", size: "lg" }, {}, {})}</div></div>`;
          }
        })} ${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
          default: () => {
            return `<div class="drop-down-item svelte-kt1ex"><div class="text-container" data-svelte-h="svelte-192l249"><h1 class="text-sm font-medium">Agregar existente</h1></div> <div class="icon-container">${validate_component(CirclePlusSolid, "CirclePlusSolid").$$render($$result, { class: "w-4 ml-5", size: "lg" }, {}, {})}</div></div>`;
          }
        })}`;
      }
    })}</div> ${$Groups.length === 0 || currentUserUid === null ? `<div class="spinner-container svelte-kt1ex">${validate_component(Spinner, "Spinner").$$render($$result, { color: "purple", size: "14" }, {}, {})}</div>` : `${filteredGroups.length === 0 ? `<h1 class="text-xl font-medium" data-svelte-h="svelte-11v345m">No tienes grupos asignados.</h1>` : `<div class="groups-content svelte-kt1ex">${each(filteredGroups, (group) => {
      return `${validate_component(ProfessorGroupCard, "ProfessorGroupCard").$$render(
        $$result,
        {
          title: group.group_name,
          groupId: group.group_id,
          students: studentsObj,
          levels: group.levels
        },
        {},
        {}
      )}`;
    })}</div>`}`}</div> ${validate_component(Modal, "Modal").$$render(
      $$result,
      { size: "lg", open: modalAddExistingGroup },
      {
        open: ($$value) => {
          modalAddExistingGroup = $$value;
          $$settled = false;
        }
      },
      {
        header: () => {
          return `<div slot="header" data-svelte-h="svelte-l7le4o"><h1 class="font-bold text-xl">Agregar grupo existente</h1></div>`;
        },
        default: () => {
          return `<div class="group-select-container svelte-kt1ex">${validate_component(MultiSelect, "MultiSelect").$$render(
            $$result,
            {
              items: selectableGroups,
              size: "lg",
              value: selectedGroups
            },
            {
              value: ($$value) => {
                selectedGroups = $$value;
                $$settled = false;
              }
            },
            {}
          )}</div> <div class="modal-buttons svelte-kt1ex">${validate_component(Button, "Button").$$render(
            $$result,
            {
              variant: "outlined",
              size: "xs",
              class: "bg-blue-500 hover:bg-blue-400",
              disabled: selectedGroups.length === 0
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
      { size: "sm", open: modalAddNewGroup },
      {
        open: ($$value) => {
          modalAddNewGroup = $$value;
          $$settled = false;
        }
      },
      {
        header: () => {
          return `<div slot="header" data-svelte-h="svelte-whgpzs"><h1 class="font-bold text-xl">Agregar grupo nuevo</h1></div>`;
        },
        default: () => {
          return `<div>${validate_component(Input, "Input").$$render(
            $$result,
            {
              placeholder: "Nombre del grupo",
              value: newGroupName
            },
            {
              value: ($$value) => {
                newGroupName = $$value;
                $$settled = false;
              }
            },
            {}
          )}</div> <div class="modal-buttons svelte-kt1ex">${validate_component(Button, "Button").$$render(
            $$result,
            {
              variant: "outlined",
              size: "xs",
              class: "bg-blue-500 hover:bg-blue-400",
              disabled: newGroupName.length === 0
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
  $$unsubscribe_authStore();
  $$unsubscribe_Students();
  return $$rendered;
});
export {
  Page as default
};
