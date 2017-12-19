<template src=./HelloWorld.html>
</template>
<style scoped src=./HelloWorld.css>
</style>
<script{{#if_eq compiler "typescript"}} lang="ts"{{/if_eq}} src="./HelloWorld.{{#if_eq compiler "typescript"}}ts{{else}}js{{/if_eq}}">
</script>
