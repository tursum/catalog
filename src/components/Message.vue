<template>
	<div class="info-message">
		{{message}}
	</div>
</template>

<script>

export default {
	name: 'Message',
	computed: {
		message() {
			return this.$store.state.message;
		}
	}
}
</script>

<style>

</style>
