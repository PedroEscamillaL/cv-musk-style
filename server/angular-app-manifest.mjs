
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
    'index.csr.html': {size: 692, hash: '54f82547cd4c0268c5977a589a30f9eecc8115e5ad363def9e99ef8c1f28b035', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1000, hash: '6aa410007e8831eb292876ace52f381e83ea07be8fa6f674b59b68af451de87f', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 4521, hash: 'b2e6d8deea74fef2d88266e358181e948842b4c2f390f74ff891eb298baf9954', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-XYMPIEFL.css': {size: 1102, hash: 'RToXTvpW6ok', text: () => import('./assets-chunks/styles-XYMPIEFL_css.mjs').then(m => m.default)}
  },
};
