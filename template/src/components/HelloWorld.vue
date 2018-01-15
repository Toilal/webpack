<template>
  <div class="hello">
    <h1>\{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://toilal.github.io/vue-webpack-template/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
  </div>
</template>

{{#if_eq compiler "typescript"}}<script lang="ts">
import Vue from 'vue'
{{#classStyle}}import Component from 'vue-class-component'
{{/classStyle}}{{#classStyle}}
@Component
export default class HelloWorld extends Vue {
  msg = 'Welcome to Your Vue.js App'{{#if_eq tslintConfig "airbnb"}};{{/if_eq}}
}{{else}}
export default Vue.extend({
  name: 'HelloWorld',
  data{{#if_eq tslintConfig "standard"}} {{/if_eq}}() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}){{/classStyle}}
</script>{{/if_eq}}{{#if_eq compiler "es2015"}}<script>
{{#classStyle}}import Vue from 'vue'
import Component from 'vue-class-component'
{{/classStyle}}{{#classStyle}}
@Component
export default class HelloWorld extends Vue {
  msg = 'Welcome to Your Vue.js App'
}{{else}}
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}{{/classStyle}}
</script>{{/if_eq}}

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
