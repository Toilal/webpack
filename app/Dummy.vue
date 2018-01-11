<template>
  <div>
    <span>{{test}}</span>
  </div>
</template>
<style scope>
</style>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'

let a = 1
a = "string"

@Component()
export default class App extends Vue {
  test: "abc"
}
</script>
