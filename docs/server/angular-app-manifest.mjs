
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
    'index.csr.html': {size: 692, hash: '47adb1afef1395a1c8d813fe8e3cddb813e9f5ba1f8b99fa4ca6090274e30ca0', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1000, hash: '2f6bc6e82e4c526fd05d67e79af5d8613ccd1b793a5667b7a4e05981c10c1c13', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 4744, hash: 'a5a05416fc545e7e180054c1f7a1949536751a1e1777e45b4980c6d3c408da97', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-XYMPIEFL.css': {size: 1102, hash: 'RToXTvpW6ok', text: () => import('./assets-chunks/styles-XYMPIEFL_css.mjs').then(m => m.default)}
  },
};
