<template>
	<div class="user-page__content">
		<p>Имя: {{user.name}}</p>
		<p class="info-p">Номер телефона: +380{{user.phone}}</p>
		<p>Сколько интересного здесь могло бы быть...</p>
	</div>
</template>

<script>
	export default {
		name: 'UserProfile',
		computed: {
			user() {
				return this.$store.state.user;
			}
		}
	}
</script>

<style>

</style>