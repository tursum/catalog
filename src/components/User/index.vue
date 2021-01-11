<template>
	<main class="user-page">
		<div class="container">
			<ul class="user-page__menu">
				<li class="user-page__menu-account">
					<img class="user-page__menu-account_icon user-icon" src="../../assets/images/avatar-default.svg">
					<router-link to="/user" class="user-page__menu-account_name">{{user.name}}</router-link>
				</li>
				<li>
					<router-link to="/user/shopping"><i class="fa fa-list"></i>История заказов</router-link>
				</li>
				<li>
					<router-link to="/user/favorite"><i class="fa fa-heart"></i>Список желаний</router-link>
				</li>
				<li>
					<router-link to="/user/edit"><i class="fa fa-cog"></i>Редактировать профиль</router-link>
				</li>
				<li>
					<a href @click.prevent="logOut"><i class="fa fa-sign-out"></i>Выйти</a>
				</li>
			</ul>
			<UserShopping v-if="path == '/shopping'" />
			<UserFavorite v-else-if="path == '/favorite'" />
			<UserEdit v-else-if="path == '/edit'" />
			<UserProfile v-else />
		</div>
	</main>
</template>

<script>
	import UserFavorite from './UserFavorite';
	import UserShopping from './UserShopping';
	import UserEdit from './UserEdit';
	import UserProfile from './UserProfile';

	export default {
		name: 'User',
		components: {
			UserFavorite,
			UserShopping,
			UserEdit,
			UserProfile
		},
		computed: {
			path() {
				return this.$route.params.pathMatch;
			},
			user() {
				return this.$store.state.user;
			}
		},
		methods: {
			logOut() {
				this.$store.commit('logOut');
			}
		}
	}
</script>

<style>

</style>