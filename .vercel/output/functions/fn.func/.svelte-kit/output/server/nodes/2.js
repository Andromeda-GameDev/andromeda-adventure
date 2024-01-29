import * as server from '../entries/pages/admin/_layout.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/+layout.server.ts";
export const imports = ["_app/immutable/nodes/2.J7kiodfQ.js","_app/immutable/chunks/scheduler.ropGePTB.js","_app/immutable/chunks/index.omb6osbG.js","_app/immutable/chunks/auth.7G7zOpdj.js","_app/immutable/chunks/index.QmKxWKhO.js","_app/immutable/chunks/index.esm2017.LP7aJz_O.js","_app/immutable/chunks/Button.1eDDyTcg.js","_app/immutable/chunks/bundle-mjs.HrccxFFc.js","_app/immutable/chunks/SidebarWrapper.PVenJ-OS.js","_app/immutable/chunks/UserSettingsSolid.6cPHp-gT.js","_app/immutable/chunks/GridSolid.VjDfnhHQ.js","_app/immutable/chunks/entry.SMo_K0_w.js","_app/immutable/chunks/stores.tFlSqnqf.js","_app/immutable/chunks/adminData.7s4vVv87.js"];
export const stylesheets = ["_app/immutable/assets/2.td7uQfen.css"];
export const fonts = [];
