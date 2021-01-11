<template>
	<main>
		<div class="container">
			<p class="info-p">Я уже подставил данные существующего пользователя, чтобы вы могли быстро войти.<br>Можете попробовать изменить их и посмотреть, что получится.</p>
			<form @submit.prevent="logIn" class="login-form">
				<label for="loginphone" class="login-form__phone-label"></label>
				<input v-model="phone" type="text" id="loginphone" class="login-form__phone">
				<input v-model="password" type="text" placeholder="Пароль">
				<button class="login-form__button" @click.prevent="logIn">Войти</button>
			</form>
			<p v-if="isIncorrectData">Неверный логин или пароль</p>
		</div>
	</main>
</template>

<script>
	import {users} from '../../static/js/db';
	
	export default {
		name: 'Login',
		data: function() {
			return {
				phone: '635678609',
				password: 'pseudopassword',
				isIncorrectData: false
			}
		},
		computed: {
			logWarning() {
				return this.$store.state.logWarning;
			}
		},
		methods: {
			logIn() {
				let user = users.find(u => (u.phone == this.phone) && (u.password == this.password));

				if (user) {
					this.$store.commit('logIn', user);
				} else {
					this.isIncorrectData = true;
					setTimeout(() => {
						this.isIncorrectData = false;
					}, 3000);
				}

				this.phone = '';
				this.password = '';
			}
		}
	}
</script>

<style>
	
</style>