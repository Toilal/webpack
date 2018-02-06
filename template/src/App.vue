<template>
  <div id="app">
    <img src="./assets/logo.png">
    {{#router}}
    <router-view/>
    {{else}}
    <HelloWorld/>
    {{/router}}
  </div>
</template>
{{#if_eq compiler "typescript"}}<script lang="ts">
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
</script>{{/if_eq}}{{#if_eq compiler "es2015"}}<script>
{{#classStyle}}import Vue from 'vue'
import Component from 'vue-class-component'

{{/classStyle}}
{{#unless router}}
import HelloWorld from './components/HelloWorld'

{{/unless}}
{{#classStyle}}@Component{{#unless router}}({
  components: { HelloWorld }
}){{/unless}}
export default class App extends Vue {

}{{else}}export default {
  name: 'App'{{#router}}{{else}},
  components: { HelloWorld }{{/router}}
}{{/classStyle}}
</script>{{/if_eq}}

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
