<template>
	<main>
		<div class="container">
			<form @submit.prevent="logIn" class="login-form">
				<label for="registerphone" class="login-form__phone-label"></label>
				<input v-model="form.phone" type="text" id="registerphone" class="login-form__phone" :class="{hasError: $v.form.phone.$error && this.error}">
				<input v-model="form.password" type="text" placeholder="Пароль" :class="{hasError: $v.form.password.$error && this.error}">
				<input v-model="form.repeatPassword" type="text" placeholder="Повторите пароль" :class="{hasError: $v.form.repeatPassword.$error && this.error}">
				<input v-model="form.name" type="text" placeholder="Имя" :class="{hasError: $v.form.name.$error && this.error}">
				<button class="login-form__button" @click.prevent="register">Зарегистрироваться</button>
			</form>
			<p>{{warn}}</p>
		</div>
	</main>
</template>

<script>
	import {required, minLength, sameAs} from 'vuelidate/lib/validators';
	import {isPhoneCorrect, isPhoneAvailable} from '../assets/js/registerValidates';

	export default {
		name: 'Register',
		data: function() {
			return {
				form: {
					phone: '',
					password: '',
					repeatPassword: '',
					name: ''
				},
				warn: '',
				error: false
			}
		},
		methods: {
			register() {
				this.warn = '';

				this.$v.form.$touch();
				if(this.$v.form.$error) {
					this.error = true;

					let v = this.$v;

					if (!v.form.phone.isPhoneAvailable) this.warn = 'Телефон уже зарегистрирован';
					if (!v.form.password.min) this.warn = 'Пароль слишком короткий (менее 6 символов)';

					return;
				}

				this.$store.commit('register', {
					phone: this.form.phone,
					password: this.form.password,
					name: this.form.name,
					favorite: [],
					cart: [],
					orders: []
				});

				this.form.phone = '';
				this.form.password = '';
				this.form.repeatPassword = '';
				this.form.name = '';
			}
		},
		validations: {
			form: {
				phone: {required, isPhoneCorrect, isPhoneAvailable},
				password: {required, min: minLength(6)},
				repeatPassword: {required, sameAs: sameAs('password')},
				name: {required}
			}
		}
	}
</script>

<style>

</style>