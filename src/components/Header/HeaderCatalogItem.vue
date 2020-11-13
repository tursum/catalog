<template>
	<li>
		<router-link :to="`/${cat.path}`">
			<div class="header-catalog__category-img" :class="cat.path"></div>
			<span class="header-catalog__category-name">{{cat.name}}</span>
		</router-link>
	</li>
</template>

<script>
	export default {
		name: 'CatalogItem',
		props: {
			cat: Object
		}
	}
</script>

<style>

</style>
