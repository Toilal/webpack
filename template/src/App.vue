<template src="./App.html">
</template>
<style scoped src="./App.css">
</style>
<script{{#if_eq compiler "typescript"}} lang="ts"{{/if_eq}} src="./App.{{#if_eq compiler "typescript"}}ts{{else}}js{{/if_eq}}">
</script>
