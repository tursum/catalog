<template>
	<header>
		<div class="header-top">
			<div class="container">
				<router-link to="/">ГЛАВНАЯ</router-link>
			</div>
		</div>
		<div id="header-main" class="header-main">
			<div class="container">
				<div class="header-catalog" @mouseover="showCatalog" @mouseout="hideCatalog" @click="toggleCatalog">
					<i class="fa fa-bars"></i><span class="header-catalog__button-text">Каталог товаров</span>
					<nav class="header-catalog__nav" :class="{active: isCatalogActive}">
						<ul class="mobile-actions-list">
							<li v-if="user.name"><router-link to="/user"><i class="fa fa-user-circle-o"></i>Профиль</router-link></li>
							<li v-if="user.name"><router-link to="/user/favorite"><i class="fa fa-heart-o"></i>Избранное</router-link></li>
							<li v-if="!user.name"><router-link to="/login">Войти</router-link></li>
							<li v-if="!user.name"><router-link to="/register">Зарегистрироваться</router-link></li>
						</ul>
						<ul>
							<HeaderCatalogItem v-for="(cat, id) in catalogCategories" :key="id" :cat="cat"/>
						</ul>
					</nav>
				</div>
				<div id="header-catalog__dark-block" class="header-catalog__dark-block" :class="{active: isCatalogActive}" @click="toggleCatalog"></div>
				<ul class="header-actions">
					<li class="header-actions__user">
						<router-link to="/user"><i class="fa fa-user-circle-o"></i></router-link>
						<div class="header-actions__modal user-modal" v-if="user.name">
							<p class="user-modal__hello">Здравствуйте, <span class="user-modal__username">{{user.name}}</span></p>
							<ul>
								<li><router-link to="/user">В кабинет</router-link></li>
								<li><router-link to="/user/shopping">История заказов</router-link></li>
								<li><a href="#" @click.prevent="logOut">Выйти</a></li>
							</ul>
						</div>
						<div class="header-actions__modal user-modal" v-else>
							<ul>
								<li><router-link to="/login">Войти</router-link></li>
								<li><router-link to="/register">Зарегистрироваться</router-link></li>
							</ul>
						</div>
					</li>
					<li v-if="user.name" class="header-actions__favorite">
						<router-link to="/user/favorite">
							<i class="fa fa-heart-o"></i>
							<div v-if="allFavoriteCounter" class="header-actions-counter"><span>{{allFavoriteCounter}}</span></div>
						</router-link>
					</li>
					<li>
						<router-link to="/comparison">
							<i class="fa fa-balance-scale"></i>
							<div v-if="allComparisonCounter" class="header-actions-counter"><span>{{allComparisonCounter}}</span></div>
						</router-link>
						<div class="header-actions__modal comparison-modal" v-if="path != '/comparison'">
							<ul>
								<li v-for="(cat, id) in comparison" :key="id">
									<router-link :to="{name: 'comparison', params: {active: cat}}">{{cat.name}} ({{cat.models.length}})</router-link>
									<button class="comparison-modal__button-close" @click="removeComparisonCategory(cat.name)"><i class="fa fa-close"></i></button>
								</li>
							</ul>
						</div>
					</li>
					<li>
						<a href @click.prevent="activeCart">
							<i class="fa fa-shopping-cart"></i>
							<div v-if="allCartCounter" class="header-actions-counter"><span>{{allCartCounter}}</span></div>
						</a>
						<div class="header-actions__modal cart-modal" v-if="cartList.length > 0">
							<ul>
								<li class="cart-item" v-for="(item, id) in cartList" :key="id">
									<img class="cart-item__img" :src="getImagePath(item.model.vendor)" alt="">
									<div class="cart-item__info-inner">
										<router-link :to="`/${item.model.path}`" class="cart-item__name">{{item.model.name}}</router-link>
										<p class="cart-modal__price">{{item.model.price - item.model.discount}}</p>
										<p class="cart-modal__quantity">{{item.quantity}} шт.</p>
									</div>
								</li>
							</ul>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</header>
</template>

<script>
	import {categories} from '../../../static/js/db.js';
	import HeaderCatalogItem from './HeaderCatalogItem';

	import getImagePath from '../../assets/js/getImagePath.js';
	import fixedHeader from '../../assets/js/fixedHeader.js';

	export default {
		name: 'Header',
		components: {
			HeaderCatalogItem
		},
		data: function() {
			return {
				catalogCategories: categories,
				getImagePath: getImagePath,
				isCatalogActive: false
			}
		},
		computed: {
			user() {
				return this.$store.state.user;
			},
			comparison() {
				return this.$store.state.comparison;
			},
			allComparisonCounter() {
				let counter = 0;
				
				this.$store.state.comparison.forEach(cat => {
					counter += cat.models.length;
				});

				return counter;
			},
			allFavoriteCounter() {
				return this.$store.state.user.favorite.length;
			},
			allCartCounter() {
				return this.$store.state.user.cart.length
			},
			path() {
				return this.$route.path;
			},
			cartList() {
				return this.$store.state.user.cart
			}
		},
		mounted() {
			fixedHeader();
		},
		methods: {
			logOut() {
				this.$store.commit('logOut');
			},
			removeComparisonCategory(category) {
				this.$store.commit('removeComparisonCategory', category);
			},
			activeCart() {
				this.$store.commit('toggleCart');
			},
			showCatalog() {
				if (document.documentElement.clientWidth < 768) return;
				this.isCatalogActive = true;
			},
			hideCatalog() {
				if (document.documentElement.clientWidth < 768) return;
				this.isCatalogActive = false;
			},
			toggleCatalog() {
				this.isCatalogActive = !this.isCatalogActive;
			}
		}
	}
</script>

<style>

</style>
