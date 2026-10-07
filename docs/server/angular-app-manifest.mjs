
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 692, hash: '2498ccf55cc1d0a16b0332cf9253d2b559ac7deab410fb356bb01587d1f5ce25', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1000, hash: 'ae0cc718e25caeb625a8e96df1fbc9e2531e73dc2fb12ba2d05d11289f41866a', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 4105, hash: 'fed7385b0ea9e426a76136d98e1c1cfa615233f71e94dd3917061e4024b48d56', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-OU6SEAUE.css': {size: 844, hash: 'xSzc+PVLUwI', text: () => import('./assets-chunks/styles-OU6SEAUE_css.mjs').then(m => m.default)}
  },
};
