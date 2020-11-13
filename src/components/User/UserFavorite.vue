<template>
	<div class="user-page__content user-page__favorite">
		<h2 class="user-page__content-title">Список желаний</h2>
		<ul v-if="favoriteList.length > 0">
			<li v-for="(model, id) in favoriteList" :key="id">
				<img class="user-page__favorite-item_img" :src="getImagePath(model.vendor)" alt="">
				<router-link :to="`/${model.path}`" class="user-page__favorite-item_link" href="javascript:void(0)">{{model.name}}</router-link>
				<span class="user-page__favorite-item_price">{{model.price - model.discount}}</span>
				<button class="user-page__favorite-button_buy" @click.prevent="addCartModel(model)" v-if="model.isInStock">Купить</button>
				<p class="not-in-stock" v-else>Нет в наличии</p>
				<button @click.prevent="removeFavoriteModel(model)" class="user-page__favorite-button_remove"><i class="fa fa-close"></i></button>
			</li>
		</ul>
		<p v-else>Вы можете добавлять товары в избранное, нажимая на иконку в виде сердечка на мини-карточках товара.<br>Ну, а еще можно нажать на кнопку "в избранное" на странице товара.</p>
	</div>
</template>

<script>
	import getImagePath from '../../assets/js/getImagePath.js';

	export default {
		name: 'UserFavorite',
		data: function() {
			return {
				getImagePath: getImagePath
			}
		},
		computed: {
			favoriteList() {
				return this.$store.state.user.favorite;
			}
		},
		methods: {
			removeFavoriteModel(model) {
				this.$store.commit('removeFavoriteModel', model);
			},
			addCartModel(model) {
				this.$store.commit('addCartModel', model);
				this.removeFavoriteModel(model);
			}
		}
	}
</script>

<style>

</style>