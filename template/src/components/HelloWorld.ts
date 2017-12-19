import Vue from 'vue'
{{#classStyle}}import Component from 'vue-class-component'
{{/classStyle}}{{#classStyle}}
@Component
export default class HelloWorld extends Vue {
  msg = 'Welcome to Your Vue.js App'
}{{else}}export default Vue.extend({
  name: 'HelloWorld',
  data{{#if_eq tslintConfig "standard"}} {{/if_eq}}() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}){{/classStyle}}
