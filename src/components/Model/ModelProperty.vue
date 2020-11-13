<template>
	<tr>
		<td>{{param.propRu}}</td>
		<td>{{formatValue(param.value)}}</td>
	</tr>
</template>

<script>
	export default {
		name: 'ModelProperty',
		props: {
			param: Object
		},
		methods: {
			formatValue(value) {
				if (typeof value == 'boolean') {
					return value ? 'Есть' : 'Нет';
				} else {
					return value;
				}
			}
		}
	}
</script>

<style>

</style>