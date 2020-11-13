<template>
	<li><span>{{param.propRu}}: </span>{{param.value}} {{param.measure}}</li>
</template>

<script>
	export default {
		name: 'ModelImportantProperty',
		props: {
			param: Object
		}
	}
</script>

<style>

</style>