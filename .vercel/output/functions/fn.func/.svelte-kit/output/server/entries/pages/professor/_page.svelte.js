import { c as create_ssr_component, b as compute_rest_props, d as spread, f as escape_object, h as escape_attribute_value, g as getContext, i as add_attribute, v as validate_component, e as escape, m as missing_component, a as subscribe } from "../../../chunks/ssr.js";
import { C as Card } from "../../../chunks/Card.js";
import "../../../chunks/client.js";
import { C as ChartLineUpSolid, U as UserSettingsSolid } from "../../../chunks/UserSettingsSolid.js";
import { G as GridSolid } from "../../../chunks/GridSolid.js";
import { U as UsersGroupOutline } from "../../../chunks/UsersGroupOutline.js";
import { W as WandMagicSparklesOutline } from "../../../chunks/WandMagicSparklesOutline.js";
import { B as Button } from "../../../chunks/Button.js";
import { twMerge } from "tailwind-merge";
import { F as FetchedData } from "../../../chunks/professorData.js";
import { a as authStore } from "../../../chunks/auth.js";
import { S as Spinner } from "../../../chunks/Spinner.js";
const A = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["href", "color", "aClass"]);
  let { href = "#" } = $$props;
  let { color = "text-primary-600 dark:text-primary-500" } = $$props;
  let { aClass = "inline-flex items-center hover:underline" } = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.aClass === void 0 && $$bindings.aClass && aClass !== void 0)
    $$bindings.aClass(aClass);
  return `<a${spread(
    [
      escape_object($$restProps),
      { href: escape_attribute_value(href) },
      {
        class: escape_attribute_value(twMerge(aClass, color, $$props.class))
      }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</a> `;
});
const AppleSolid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { ariaLabel = "apple solid" } = $$props;
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
      { viewBox: "0 0 18 21" }
    ],
    {}
  )}><path fill="currentColor" d="M14.537 10.625a4.421 4.421 0 0 0 2.684 4.047 10.96 10.96 0 0 1-1.384 2.845c-.834 1.218-1.7 2.432-3.062 2.457-1.339.025-1.769-.794-3.3-.794s-2.009.769-3.275.82c-1.316.049-2.317-1.318-3.158-2.532C1.323 14.984.01 10.451 1.772 7.391a4.9 4.9 0 0 1 4.139-2.507c1.292-.025 2.511.869 3.3.869.789 0 2.271-1.075 3.828-.917A4.67 4.67 0 0 1 16.7 6.82a4.524 4.524 0 0 0-2.161 3.805M12.02 3.193A4.4 4.4 0 0 0 13.06 0a4.482 4.482 0 0 0-2.946 1.516 4.185 4.185 0 0 0-1.061 3.093 3.708 3.708 0 0 0 2.967-1.416Z"></path></svg> `;
});
const ArrowDownSolid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { ariaLabel = "arrow down solid" } = $$props;
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
      { viewBox: "0 0 11 14" }
    ],
    {}
  )}><path fill="currentColor" d="M10.707 8.293a1 1 0 0 0-1.414 0L7 10.586V1a1 1 0 1 0-2 0v9.586L2.707 8.293a1 1 0 1 0-1.414 1.414l4 4a.99.99 0 0 0 .326.217.986.986 0 0 0 .764 0 .99.99 0 0 0 .326-.217l4-4a1 1 0 0 0-.002-1.414Z"></path></svg> `;
});
const ArrowDownToBracketOutline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { ariaLabel = "arrow down to bracket outline" } = $$props;
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
      { viewBox: "0 0 16 18" }
    ],
    {}
  )}><path stroke="currentColor"${add_attribute("stroke-linecap", strokeLinecap, 0)}${add_attribute("stroke-linejoin", strokeLinejoin, 0)}${add_attribute("stroke-width", strokeWidth, 0)} d="M8 1.059v10.425m0 0 4-3.791m-4 3.79-4-3.79m11 3.79v2.844c0 .502-.21.985-.586 1.34a2.058 2.058 0 0 1-1.414.555H3c-.53 0-1.04-.2-1.414-.555A1.847 1.847 0 0 1 1 14.327v-2.843"></path></svg> `;
});
const css$2 = {
  code: ".card-content.svelte-1mfq2v2{display:flex;flex-direction:column;justify-content:flex-start;align-items:left;overflow:auto;width:200px;height:120px}.class-header.svelte-1mfq2v2{display:flex;justify-content:space-between;align-items:center;width:100%;padding-bottom:1rem}.card-title.svelte-1mfq2v2{font-size:1.2rem;font-weight:800;color:black}.card-body.svelte-1mfq2v2{display:flex;justify-content:flex-start;align-items:top;width:100%;height:100%;flex-wrap:wrap}",
  map: null
};
const DashboardCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "Card title" } = $$props;
  let { label = "Card label" } = $$props;
  let { description = "Card description" } = $$props;
  const icon = {
    "grid": GridSolid,
    "users": UsersGroupOutline,
    "chart": ChartLineUpSolid,
    "wand": WandMagicSparklesOutline,
    "settings": UserSettingsSolid
  };
  let chosenIcon = icon[label];
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  $$result.css.add(css$2);
  return `${validate_component(Card, "Card").$$render(
    $$result,
    {
      class: "hover:bg-purple-200 cursor-pointer"
    },
    {},
    {
      default: () => {
        return `<div class="card-content svelte-1mfq2v2"><div class="class-header svelte-1mfq2v2"><h5 class="card-title svelte-1mfq2v2">${escape(title)}</h5> ${validate_component(chosenIcon || missing_component, "svelte:component").$$render($$result, {}, {}, {})}</div> <div class="card-body svelte-1mfq2v2"><p>${escape(description)}</p></div></div>`;
      }
    }
  )}`;
});
const css$1 = {
  code: ".card-content.svelte-1oknjbw{display:flex;flex-direction:column;justify-content:center;align-items:center;overflow:auto;width:90%;background-color:white;padding:1.5rem;border-radius:0.5rem;box-shadow:0 0 20px rgba(0, 0, 0, 0.12)}.class-header.svelte-1oknjbw{display:flex;justify-content:space-between;align-items:center;width:100%}.card-title.svelte-1oknjbw{font-size:1.2rem;font-weight:800;color:black}.card-body.svelte-1oknjbw{display:flex;justify-content:space-between;align-items:center;width:100%;height:100%;flex-wrap:wrap;padding-bottom:3rem;padding-top:1.5rem}.apple-side.svelte-1oknjbw{display:flex;justify-content:center;flex-direction:column;align-items:center;width:50%;height:100%}.android-side.svelte-1oknjbw{display:flex;flex-direction:column;justify-content:center;align-items:center;width:50%;height:100%}.system-name.svelte-1oknjbw{font-size:1.2rem;font-weight:400;color:black;padding-top:2rem}",
  map: null
};
const DownloadManualsCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $FetchedData, $$unsubscribe_FetchedData;
  $$unsubscribe_FetchedData = subscribe(FetchedData, (value) => $FetchedData = value);
  let media = {
    levelSolvers: [],
    galactic_marker: "",
    global_tolerance: 0,
    downloads: []
  };
  function apkLink() {
    if (media && media.downloads && media.downloads.length > 0 && media.downloads[0].url) {
      return media.downloads[0].url;
    } else {
      return "";
    }
  }
  function guideLinks(platform) {
    if (media) {
      if (media.downloads != null && media.downloads.length > 0) {
        const guide = media.downloads.find((download) => download.platform == platform);
        if (guide) {
          return guide.url;
        }
      }
    }
    return "";
  }
  $$result.css.add(css$1);
  {
    {
      if (FetchedData) {
        media = $FetchedData;
      }
    }
  }
  $$unsubscribe_FetchedData();
  return `<div class="card-content svelte-1oknjbw"><div class="class-header svelte-1oknjbw"><h5 class="card-title svelte-1oknjbw" data-svelte-h="svelte-dpm6cx">Instalación</h5> ${validate_component(Button, "Button").$$render(
    $$result,
    {
      class: "hover:bg-purple-100 text-purple-500 font-bold px-3 bg-opacity-0",
      target: "_blank"
    },
    {},
    {
      default: () => {
        return `Marcador Galáctico
            ${validate_component(ArrowDownSolid || missing_component, "svelte:component").$$render($$result, { class: "ml-5", size: "md" }, {}, {})}`;
      }
    }
  )}</div> <div class="card-body svelte-1oknjbw"><div class="apple-side svelte-1oknjbw">${validate_component(AppleSolid || missing_component, "svelte:component").$$render($$result, { class: "h-12 w-12" }, {}, {})} <p class="system-name svelte-1oknjbw" data-svelte-h="svelte-2y96l4">Apple</p> ${validate_component(A, "A").$$render(
    $$result,
    {
      href: guideLinks("apple"),
      class: "text-purple-600 hover:text-purple-400 mt-6",
      target: "_blank"
    },
    {},
    {
      default: () => {
        return `Guia de instalación`;
      }
    }
  )} ${validate_component(Button, "Button").$$render(
    $$result,
    {
      class: "bg-purple-600 hover:bg-purple-400 text-white font-bold px-3 mt-10",
      disabled: true,
      target: "_blank"
    },
    {},
    {
      default: () => {
        return `Descargar
                ${validate_component(ArrowDownToBracketOutline || missing_component, "svelte:component").$$render($$result, { class: "ml-5", size: "md" }, {}, {})}`;
      }
    }
  )}</div> <div class="android-side svelte-1oknjbw"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48px" height="48px" viewBox="0 0 48 48"><path fill="#30dc80" d="M24,14.088C11.427,14.088,1.108,23.716,0,36h48C46.892,23.716,36.573,14.088,24,14.088z M33.179,27.079c0-1.104,0.895-1.999,1.999-1.999c1.104,0,1.999,0.895,1.999,1.999c0,1.104-0.895,1.999-1.999,1.999	C34.074,29.078,33.179,28.183,33.179,27.079z M12.822,29.078c-1.104,0-1.999-0.895-1.999-1.999c0-1.104,0.895-1.999,1.999-1.999	s1.999,0.895,1.999,1.999C14.821,28.183,13.926,29.078,12.822,29.078z"></path><path fill="#30dc80" d="M34.038,19.313c-0.14,0-0.281-0.035-0.41-0.11c-0.393-0.227-0.527-0.729-0.301-1.122l5.197-9.008	c0.227-0.394,0.729-0.529,1.122-0.301c0.393,0.227,0.527,0.729,0.301,1.122l-5.197,9.008C34.598,19.166,34.322,19.313,34.038,19.313	z"></path><path fill="#30dc80" d="M13.962,19.313c-0.284,0-0.56-0.148-0.712-0.411L8.054,9.894C7.827,9.501,7.962,8.999,8.354,8.772	c0.392-0.228,0.895-0.093,1.122,0.301l5.197,9.008c0.227,0.394,0.092,0.896-0.301,1.122C14.243,19.278,14.102,19.313,13.962,19.313z"></path></svg> <p class="system-name svelte-1oknjbw" data-svelte-h="svelte-eyyqfz">Android</p> ${validate_component(A, "A").$$render(
    $$result,
    {
      href: guideLinks("android"),
      class: "text-purple-600 hover:text-purple-400 mt-6",
      target: "_blank"
    },
    {},
    {
      default: () => {
        return `Guia de instalación`;
      }
    }
  )} ${validate_component(Button, "Button").$$render(
    $$result,
    {
      class: "bg-purple-600 hover:bg-purple-400 text-white font-bold px-3 mt-10",
      target: "_blank",
      href: apkLink()
    },
    {},
    {
      default: () => {
        return `Descargar
                ${validate_component(ArrowDownToBracketOutline || missing_component, "svelte:component").$$render($$result, { class: "ml-5", size: "md" }, {}, {})}`;
      }
    }
  )}</div></div> </div>`;
});
const css = {
  code: ".container.svelte-ncqaoz.svelte-ncqaoz{display:flex;flex-direction:column;height:100%;width:100%}.greeting.svelte-ncqaoz.svelte-ncqaoz{display:flex;justify-content:left;align-items:center;padding-left:3rem;height:10%;padding-bottom:1rem;padding-top:1rem}.greeting.svelte-ncqaoz h1.svelte-ncqaoz{font-size:1.5rem;font-weight:100;color:black}.greeting.svelte-ncqaoz p.svelte-ncqaoz{font-size:1.5rem;font-weight:800;color:#9630df;padding-left:0.5rem}.card-container.svelte-ncqaoz.svelte-ncqaoz{display:flex;justify-content:center;align-items:center;flex:0;flex-wrap:wrap;gap:1.2rem}.download-manuals.svelte-ncqaoz.svelte-ncqaoz{display:flex;justify-content:center;align-items:center;flex:0;flex-wrap:wrap;padding-top:1.5rem;width:100%;padding-bottom:1.5rem}.skeleton-container.svelte-ncqaoz.svelte-ncqaoz{display:flex;justify-content:center;align-items:center;flex:1;height:100%;width:100%;padding-left:3rem;padding-right:3rem;padding-bottom:3rem;padding-top:3rem}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $authStore, $$unsubscribe_authStore;
  $$unsubscribe_authStore = subscribe(authStore, (value) => $authStore = value);
  let name = "";
  $$result.css.add(css);
  name = $authStore.name ?? $authStore.email ?? "";
  $$unsubscribe_authStore();
  return `${$authStore.email || $authStore.name ? `<div class="container svelte-ncqaoz"><div class="greeting svelte-ncqaoz"><h1 class="svelte-ncqaoz" data-svelte-h="svelte-1rwjw42">Bienvenid@,</h1> ${name !== "" ? `<p class="svelte-ncqaoz">${escape(name)}</p>` : `<p class="svelte-ncqaoz" data-svelte-h="svelte-1g54z3k">Usuario</p>`}</div>  <div class="card-container svelte-ncqaoz">${validate_component(DashboardCard, "DashboardCard").$$render(
    $$result,
    {
      title: "Grupos",
      label: "users",
      description: "Administra tus grupos"
    },
    {},
    {}
  )} ${validate_component(DashboardCard, "DashboardCard").$$render(
    $$result,
    {
      title: "Estadisticas",
      label: "chart",
      description: "Conoce los datos de tus grupos"
    },
    {},
    {}
  )} ${validate_component(DashboardCard, "DashboardCard").$$render(
    $$result,
    {
      title: "Solvers",
      label: "wand",
      description: "Encuentra las herramientas para resolver los ejercicios"
    },
    {},
    {}
  )} ${validate_component(DashboardCard, "DashboardCard").$$render(
    $$result,
    {
      title: "Ajustes",
      label: "settings",
      description: "Configura tu perfil"
    },
    {},
    {}
  )}</div> <div class="download-manuals svelte-ncqaoz">${validate_component(DownloadManualsCard, "DownloadManualsCard").$$render($$result, {}, {}, {})}</div></div>` : `<div class="skeleton-container svelte-ncqaoz">${validate_component(Spinner, "Spinner").$$render($$result, { size: "14", color: "purple" }, {}, {})}</div>`}`;
});
export {
  Page as default
};
