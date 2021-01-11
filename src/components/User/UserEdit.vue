<template>
	<div class="user-page__content user-page__edit">
		<h2 class="user-page__content-title">Редактирование профиля</h2>
		<p class="user-page__content-desc">На этой странице можно отредактировать имя пользователя.</p>
		<form class="user-page__edit-form" @submit.prevent>
			<label for="username">Имя пользователя (минимум 1 символ)</label>
			<input v-model="currentName" type="text" name="username" id="username" @input="changeUserName">
			<label for="userphone">Телефон</label>
			<input v-model="currentPhone" type="text" name="userphone" id="userphone" @input="changeUserPhone">
		</form>
		<p v-if="message">{{message}}</p>
	</div>
</template>

<script>
	import {users} from '../../../static/js/db.js';
	
	export default {
		name: 'UserEdit',
		data: function() {
			return {
				currentName: this.$store.state.user.name,
				currentPhone: this.$store.state.user.phone,
				message: ''
			}
		},
		computed: {
			name() {
				return this.$store.state.user.name;
			},
			phone() {
				return this.$store.state.user.phone;
			}
		},
		methods: {
			changeUserName() {
				if (this.currentName.length < 1) return;
				this.$store.commit('changeUserName', this.currentName);
			},
			changeUserPhone() {
				this.message = '';
				if (!Number(this.currentPhone) || this.currentPhone.length != 9) return;

				if (users.find(u => u.phone == this.currentPhone) && this.currentPhone != this.phone) {
					this.message = 'Пользователь с таким номером телефона уже существует.';
					return;
				}
				
				this.$store.commit('changeUserPhone', this.currentPhone);
			}
		}
	}
</script>

<style>
	
</style>