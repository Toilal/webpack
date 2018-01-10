<template>
  <div id="app">
    <img src="./assets/logo.png">
    {{#router}}
    <router-view></router-view>
    {{else}}
    <HelloWorld></HelloWorld>
    {{/router}}
  </div>
</template>
<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
{{#if_eq compiler "typescript"}}<script lang="ts">
import Vue from 'vue'
{{#classStyle}}import Component from 'vue-class-component'

{{/classStyle}}
{{#unless router}}import HelloWorld from './components/HelloWorld.vue'

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
import HelloWorld from './components/HelloWorld.vue'

{{/unless}}
{{#classStyle}}@Component{{#unless router}}({
  components: { HelloWorld }
}){{/unless}}
export default class App extends Vue {

}{{else}}export default {
  name: 'app'{{#router}}{{else}},
  components: { HelloWorld }{{/router}}
}{{/classStyle}}
</script>{{/if_eq}}
