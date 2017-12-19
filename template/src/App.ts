import Vue from 'vue'
{{#classStyle}}import Component from 'vue-class-component'

{{/classStyle}}
{{#unless router}}import HelloWorld from './components/HelloWorld'

{{/unless}}
{{#classStyle}}@Component{{#unless router}}({
  components: { HelloWorld }
}){{/unless}}
export default class App extends Vue {

}{{else}}export default Vue.extend({
  name: 'app'{{#router}}{{else}},
  components: { HelloWorld }{{/router}}
}){{/classStyle}}
