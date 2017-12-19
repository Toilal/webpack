{{#if_eq build 'standalone'}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
{{#classStyle}}
import './hooks' // This must be imported before any component

{{/classStyle}}
import App from './App'
{{#router}}
import router from './router'
{{/router}}

Vue.config.productionTip = false

// tslint:disable-next-line:no-unused-expression
new Vue({
  {{#router}}
  router,
  {{/router}}
  el: '#app',
  {{#if_eq build 'runtime'}}
  render: (h) => h(App)
  {{/if_eq}}
  {{#if_eq build 'standalone'}}
  template: '<App/>',
  components: { App }
  {{/if_eq}}
})
