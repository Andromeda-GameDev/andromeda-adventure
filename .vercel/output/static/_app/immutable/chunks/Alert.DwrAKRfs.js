import{s as Q,r as y,x as A,q as ie,v as D,E as g,a as W,F as X,g as Y,i as E,f as p,l as N,u as S,o as I,p as M,N as ue,e as C,c as P,b as w,y as $,z as ee,m as x,A as te,h as J,B as k,n as K,C as ce,D as fe,t as me,d as de,j as _e}from"./scheduler.ropGePTB.js";import{S as R,i as U,c as L,b as z,m as T,t as _,a as b,d as q,g as B,e as V,h as he}from"./index.omb6osbG.js";import{T as ge,C as be,f as pe}from"./CloseButton.BlksUtTd.js";import{g as ae,a as ve,t as O}from"./bundle-mjs.HrccxFFc.js";import{B as ke}from"./Button.1eDDyTcg.js";import{I as Ee}from"./InfoCircleSolid.gNL43ULD.js";const we=s=>({close:s&131072}),ne=s=>({close:s[17]}),Fe=s=>({}),oe=s=>({});function le(s){let e;const l=s[5].icon,t=N(l,s,s[15],oe);return{c(){t&&t.c()},l(n){t&&t.l(n)},m(n,o){t&&t.m(n,o),e=!0},p(n,o){t&&t.p&&(!e||o&32768)&&S(t,l,n,n[15],e?M(l,n[15],o,Fe):I(n[15]),oe)},i(n){e||(_(t,n),e=!0)},o(n){b(t,n),e=!1},d(n){t&&t.d(n)}}}function ye(s){let e;const l=s[5].default,t=N(l,s,s[15],null);return{c(){t&&t.c()},l(n){t&&t.l(n)},m(n,o){t&&t.m(n,o),e=!0},p(n,o){t&&t.p&&(!e||o&32768)&&S(t,l,n,n[15],e?M(l,n[15],o,null):I(n[15]),null)},i(n){e||(_(t,n),e=!0)},o(n){b(t,n),e=!1},d(n){t&&t.d(n)}}}function Ce(s){let e,l;const t=s[5].default,n=N(t,s,s[15],null);return{c(){e=C("div"),n&&n.c()},l(o){e=P(o,"DIV",{});var r=w(e);n&&n.l(r),r.forEach(p)},m(o,r){E(o,e,r),n&&n.m(e,null),l=!0},p(o,r){n&&n.p&&(!l||r&32768)&&S(n,t,o,o[15],l?M(t,o[15],r,null):I(o[15]),null)},i(o){l||(_(n,o),l=!0)},o(o){b(n,o),l=!1},d(o){o&&p(e),n&&n.d(o)}}}function se(s){let e;const l=s[5]["close-button"],t=N(l,s,s[15],ne),n=t||Pe(s);return{c(){n&&n.c()},l(o){n&&n.l(o)},m(o,r){n&&n.m(o,r),e=!0},p(o,r){t?t.p&&(!e||r&163840)&&S(t,l,o,o[15],e?M(l,o[15],r,we):I(o[15]),ne):n&&n.p&&(!e||r&131080)&&n.p(o,e?r:-1)},i(o){e||(_(n,o),e=!0)},o(o){b(n,o),e=!1},d(o){n&&n.d(o)}}}function Pe(s){let e,l;return e=new be({props:{class:"ml-auto -mr-1.5 -my-1.5 dark:hover:bg-gray-700",color:s[3].color}}),e.$on("click",function(){ue(s[17])&&s[17].apply(this,arguments)}),e.$on("click",s[6]),e.$on("change",s[7]),e.$on("keydown",s[8]),e.$on("keyup",s[9]),e.$on("focus",s[10]),e.$on("blur",s[11]),e.$on("mouseenter",s[12]),e.$on("mouseleave",s[13]),{c(){L(e.$$.fragment)},l(t){z(e.$$.fragment,t)},m(t,n){T(e,t,n),l=!0},p(t,n){s=t;const o={};n&8&&(o.color=s[3].color),e.$set(o)},i(t){l||(_(e.$$.fragment,t),l=!0)},o(t){b(e.$$.fragment,t),l=!1},d(t){q(e,t)}}}function Le(s){let e,l,t,n,o,r,a=s[2].icon&&le(s);const u=[Ce,ye],c=[];function v(i,h){return i[2].icon||i[0]?0:1}l=v(s),t=c[l]=u[l](s);let d=s[0]&&se(s);return{c(){a&&a.c(),e=W(),t.c(),n=W(),d&&d.c(),o=X()},l(i){a&&a.l(i),e=Y(i),t.l(i),n=Y(i),d&&d.l(i),o=X()},m(i,h){a&&a.m(i,h),E(i,e,h),c[l].m(i,h),E(i,n,h),d&&d.m(i,h),E(i,o,h),r=!0},p(i,h){i[2].icon?a?(a.p(i,h),h&4&&_(a,1)):(a=le(i),a.c(),_(a,1),a.m(e.parentNode,e)):a&&(B(),b(a,1,1,()=>{a=null}),V());let F=l;l=v(i),l===F?c[l].p(i,h):(B(),b(c[F],1,1,()=>{c[F]=null}),V(),t=c[l],t?t.p(i,h):(t=c[l]=u[l](i),t.c()),_(t,1),t.m(n.parentNode,n)),i[0]?d?(d.p(i,h),h&1&&_(d,1)):(d=se(i),d.c(),_(d,1),d.m(o.parentNode,o)):d&&(B(),b(d,1,1,()=>{d=null}),V())},i(i){r||(_(a),_(t),_(d),r=!0)},o(i){b(a),b(t),b(d),r=!1},d(i){i&&(p(e),p(n),p(o)),a&&a.d(i),c[l].d(i),d&&d.d(i)}}}function ze(s){let e,l;const t=[{dismissable:s[0]},{color:"primary"},{role:"alert"},{rounded:!0},s[3],{class:s[1]}];let n={$$slots:{default:[Le,({close:o})=>({17:o}),({close:o})=>o?131072:0]},$$scope:{ctx:s}};for(let o=0;o<t.length;o+=1)n=y(n,t[o]);return e=new ge({props:n}),e.$on("close",s[14]),{c(){L(e.$$.fragment)},l(o){z(e.$$.fragment,o)},m(o,r){T(e,o,r),l=!0},p(o,[r]){const a=r&11?ae(t,[r&1&&{dismissable:o[0]},t[1],t[2],t[3],r&8&&ve(o[3]),r&2&&{class:o[1]}]):{};r&163853&&(a.$$scope={dirty:r,ctx:o}),e.$set(a)},i(o){l||(_(e.$$.fragment,o),l=!0)},o(o){b(e.$$.fragment,o),l=!1},d(o){q(e,o)}}}function Te(s,e,l){const t=["dismissable","defaultClass"];let n=A(e,t),{$$slots:o={},$$scope:r}=e;const a=ie(o);let{dismissable:u=!1}=e,{defaultClass:c="p-4 gap-3 text-sm"}=e,v;function d(m){g.call(this,s,m)}function i(m){g.call(this,s,m)}function h(m){g.call(this,s,m)}function F(m){g.call(this,s,m)}function j(m){g.call(this,s,m)}function G(m){g.call(this,s,m)}function Z(m){g.call(this,s,m)}function H(m){g.call(this,s,m)}function f(m){g.call(this,s,m)}return s.$$set=m=>{l(16,e=y(y({},e),D(m))),l(3,n=A(e,t)),"dismissable"in m&&l(0,u=m.dismissable),"defaultClass"in m&&l(4,c=m.defaultClass),"$$scope"in m&&l(15,r=m.$$scope)},s.$$.update=()=>{l(1,v=O(c,(a.icon||u)&&"flex items-center",e.class))},e=D(e),[u,v,a,n,c,o,d,i,h,F,j,G,Z,H,f,r]}class qe extends R{constructor(e){super(),U(this,e,Te,ze,Q,{dismissable:0,defaultClass:4})}}function xe(s){let e,l,t,n,o,r=[{xmlns:"http://www.w3.org/2000/svg"},{fill:"currentColor"},s[4],{class:t=O("shrink-0",s[3][s[0]],s[5].class)},{role:s[1]},{"aria-label":s[2]},{viewBox:"0 0 16 16"}],a={};for(let u=0;u<r.length;u+=1)a=y(a,r[u]);return{c(){e=$("svg"),l=$("path"),this.h()},l(u){e=ee(u,"svg",{xmlns:!0,fill:!0,class:!0,role:!0,"aria-label":!0,viewBox:!0});var c=w(e);l=ee(c,"path",{fill:!0,d:!0}),w(l).forEach(p),c.forEach(p),this.h()},h(){x(l,"fill","currentColor"),x(l,"d","m9.414 8 5.293-5.293a1 1 0 1 0-1.414-1.414L8 6.586 2.707 1.293a1 1 0 0 0-1.414 1.414L6.586 8l-5.293 5.293a1 1 0 1 0 1.414 1.414L8 9.414l5.293 5.293a1 1 0 0 0 1.414-1.414L9.414 8Z"),te(e,a)},m(u,c){E(u,e,c),J(e,l),n||(o=[k(e,"click",s[6]),k(e,"keydown",s[7]),k(e,"keyup",s[8]),k(e,"focus",s[9]),k(e,"blur",s[10]),k(e,"mouseenter",s[11]),k(e,"mouseleave",s[12]),k(e,"mouseover",s[13]),k(e,"mouseout",s[14])],n=!0)},p(u,[c]){te(e,a=ae(r,[{xmlns:"http://www.w3.org/2000/svg"},{fill:"currentColor"},c&16&&u[4],c&33&&t!==(t=O("shrink-0",u[3][u[0]],u[5].class))&&{class:t},c&2&&{role:u[1]},c&4&&{"aria-label":u[2]},{viewBox:"0 0 16 16"}]))},i:K,o:K,d(u){u&&p(e),n=!1,ce(o)}}}function Be(s,e,l){const t=["size","role","ariaLabel"];let n=A(e,t);const o=fe("iconCtx")??{},r={xs:"w-3 h-3",sm:"w-4 h-4",md:"w-5 h-5",lg:"w-6 h-6",xl:"w-8 h-8"};let{size:a=o.size||"md"}=e,{role:u=o.role||"img"}=e,{ariaLabel:c="close solid"}=e;function v(f){g.call(this,s,f)}function d(f){g.call(this,s,f)}function i(f){g.call(this,s,f)}function h(f){g.call(this,s,f)}function F(f){g.call(this,s,f)}function j(f){g.call(this,s,f)}function G(f){g.call(this,s,f)}function Z(f){g.call(this,s,f)}function H(f){g.call(this,s,f)}return s.$$set=f=>{l(5,e=y(y({},e),D(f))),l(4,n=A(e,t)),"size"in f&&l(0,a=f.size),"role"in f&&l(1,u=f.role),"ariaLabel"in f&&l(2,c=f.ariaLabel)},e=D(e),[a,u,c,r,n,e,v,d,i,h,F,j,G,Z,H]}class Ve extends R{constructor(e){super(),U(this,e,Be,xe,Q,{size:0,role:1,ariaLabel:2})}}function re(s){let e,l,t,n;return l=new qe({props:{class:s[2],dismissable:!0,$$slots:{"close-button":[Se],icon:[De],default:[Ae]},$$scope:{ctx:s}}}),{c(){e=C("div"),L(l.$$.fragment)},l(o){e=P(o,"DIV",{});var r=w(e);z(l.$$.fragment,r),r.forEach(p)},m(o,r){E(o,e,r),T(l,e,null),n=!0},p(o,r){const a={};r&4&&(a.class=o[2]),r&138&&(a.$$scope={dirty:r,ctx:o}),l.$set(a)},i(o){n||(_(l.$$.fragment,o),t&&t.end(1),n=!0)},o(o){b(l.$$.fragment,o),o&&(t=he(e,pe,{})),n=!1},d(o){o&&p(e),q(l),o&&t&&t.end()}}}function Ae(s){let e,l,t;return{c(){e=C("span"),l=C("p"),t=me(s[1]),this.h()},l(n){e=P(n,"SPAN",{});var o=w(e);l=P(o,"P",{class:!0});var r=w(l);t=de(r,s[1]),r.forEach(p),o.forEach(p),this.h()},h(){x(l,"class","text-sm")},m(n,o){E(n,e,o),J(e,l),J(l,t)},p(n,o){o&2&&_e(t,n[1])},d(n){n&&p(e)}}}function De(s){let e,l,t;return l=new Ee({props:{class:"w-5 h-5 "+s[3]}}),{c(){e=C("span"),L(l.$$.fragment),this.h()},l(n){e=P(n,"SPAN",{slot:!0});var o=w(e);z(l.$$.fragment,o),o.forEach(p),this.h()},h(){x(e,"slot","icon")},m(n,o){E(n,e,o),T(l,e,null),t=!0},p(n,o){const r={};o&8&&(r.class="w-5 h-5 "+n[3]),l.$set(r)},i(n){t||(_(l.$$.fragment,n),t=!0)},o(n){b(l.$$.fragment,n),t=!1},d(n){n&&p(e),q(l)}}}function Ne(s){let e,l;return e=new Ve({props:{size:"xs"}}),{c(){L(e.$$.fragment)},l(t){z(e.$$.fragment,t)},m(t,n){T(e,t,n),l=!0},p:K,i(t){l||(_(e.$$.fragment,t),l=!0)},o(t){b(e.$$.fragment,t),l=!1},d(t){q(e,t)}}}function Se(s){let e,l;return e=new ke({props:{slot:"close-button",size:"xs",class:"ms-auto bg-transparent-100 text-black-900 hover:bg-red-300",$$slots:{default:[Ne]},$$scope:{ctx:s}}}),e.$on("click",s[4]),{c(){L(e.$$.fragment)},l(t){z(e.$$.fragment,t)},m(t,n){T(e,t,n),l=!0},p(t,n){const o={};n&128&&(o.$$scope={dirty:n,ctx:t}),e.$set(o)},i(t){l||(_(e.$$.fragment,t),l=!0)},o(t){b(e.$$.fragment,t),l=!1},d(t){q(e,t)}}}function Ie(s){let e,l,t=s[0]&&re(s);return{c(){e=C("div"),t&&t.c(),this.h()},l(n){e=P(n,"DIV",{class:!0});var o=w(e);t&&t.l(o),o.forEach(p),this.h()},h(){x(e,"class","alert-container svelte-1ychxxi")},m(n,o){E(n,e,o),t&&t.m(e,null),l=!0},p(n,[o]){n[0]?t?(t.p(n,o),o&1&&_(t,1)):(t=re(n),t.c(),_(t,1),t.m(e,null)):t&&(B(),b(t,1,1,()=>{t=null}),V())},i(n){l||(_(t),l=!0)},o(n){b(t),l=!1},d(n){n&&p(e),t&&t.d()}}}function Me(s,e,l){let{alertVisible:t=!1}=e,{alertType:n="info"}=e,{alertMessage:o="This is an alert message"}=e,r="",a="";function u(){l(0,t=!1)}const c={"auth/invalid-email":"El correo electrónico ingresado no es válido.","auth/user-disabled":"El usuario ha sido deshabilitado.","auth/user-not-found":"El usuario no existe, favor de verificar.","auth/wrong-password":"La contraseña es incorrecta.","auth/email-already-in-use":"El correo electrónico ya está en uso.","auth/operation-not-allowed":"La operación no está permitida.","auth/weak-password":"La contraseña es muy débil.","auth/popup-closed-by-user":"El inicio de sesión con Google fue cancelado.","auth/network-request-failed":"Error de conexión. Por favor, intente nuevamente.","auth/too-many-requests":"Demasiados intentos de inicio de sesión fallidos. Por favor, intente nuevamente más tarde.","auth/invalid-credential":"Las credenciales son inválidas, favor de revisar.","auth/account-exists-with-different-credential":"El correo electrónico ya está en uso.","auth/auth-domain-config-required":"Error de conexión. Por favor, intente nuevamente.","auth/credential-already-in-use":"El correo electrónico ya está en uso.","auth/operation-not-supported-in-this-environment":"Error de conexión. Por favor, intente nuevamente.","auth/timeout":"Error de conexión. Por favor, intente nuevamente.","auth/missing-android-pkg-name":"Error de conexión. Por favor, intente nuevamente.","auth/missing-continue-uri":"Error de conexión. Por favor, intente nuevamente.","auth/missing-ios-bundle-id":"Error de conexión. Por favor, intente nuevamente.","auth/invalid-continue-uri":"Error de conexión. Por favor, intente nuevamente.","auth/unauthorized-continue-uri":"Error de conexión. Por favor, intente nuevamente.","auth/invalid-dynamic-link-domain":"Error de conexión. Por favor, intente nuevamente.","auth/argument-error":"Error de conexión. Por favor, intente nuevamente.","auth/invalid-persistence-type":"Error de conexión. Por favor, intentelo nuevamente.","auth/requires-recent-login":"La sesión ha expirado, favor de iniciar sesión nuevamente.","auth/popup-blocked":"Las ventanas emergentes están bloqueadas en este navegador. Por favor, habilítelas e intente nuevamente."};return s.$$set=v=>{"alertVisible"in v&&l(0,t=v.alertVisible),"alertType"in v&&l(5,n=v.alertType),"alertMessage"in v&&l(1,o=v.alertMessage)},s.$$.update=()=>{s.$$.dirty&32&&(n=="info"?(l(2,r="bg-blue-100 text-blue-500"),l(3,a="text-blue-500")):n=="success"?(l(2,r="bg-green-100 text-green-500"),l(3,a="text-green-500")):n=="warning"?(l(2,r="bg-yellow-100 text-yellow-500"),l(3,a="text-yellow-500")):n=="error"&&(l(2,r="bg-red-100 text-red-500"),l(3,a="text-red-500"))),s.$$.dirty&1&&t&&setTimeout(()=>{l(0,t=!1)},3e3),s.$$.dirty&2&&o in c&&l(1,o=c[o])},[t,o,r,a,u,n]}class Oe extends R{constructor(e){super(),U(this,e,Me,Ie,Q,{alertVisible:0,alertType:5,alertMessage:1})}}export{Oe as A};