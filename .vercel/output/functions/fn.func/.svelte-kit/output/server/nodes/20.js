

export const index = 20;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/student/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/20.BIPeTYR8.js","_app/immutable/chunks/scheduler.ropGePTB.js","_app/immutable/chunks/index.omb6osbG.js"];
export const stylesheets = [];
export const fonts = [];
