<template>
	<li class="category-model">
		<div class="category-model__inner">
			<div class="category-model__info">
				<router-link class="category-model__link" :to="`/${model.path}`">
					<img class="category-model__img" :src="getImagePath(model.vendor)" alt="">
					<p class="category-model__name">{{model.name}}</p>
				</router-link>
				<div class="model-rate">
					<ul class="model-rate__stars" v-if="model.rate">
						<li v-for="(star, id) in 5"><i class="fa" :class="{'fa-star-o': (id + 1) > model.rate, 'fa-star': (id + 1) <= model.rate}"></i></li>
					</ul>
					<div class="model-rate__comments">
						<router-link :to="{name: `/${model.path}`, hash: '#reviews-ancor'}" v-if="model.reviews.length > 0">
							<i class="fa fa-comment-o"></i>
							<span>{{model.reviews.length}} отзывов</span>
						</router-link>
						<span v-else>Отзывов нет</span>
					</div>
				</div>
				<div class="model__price">
					<span class="model__price_current">{{model.price - model.discount}} грн</span>
					<span class="model__price_old" v-if="model.discount">
						<span class="model__price_old-line">{{model.price}} грн</span>
					</span>
				</div>
				<div class="category-model__actions">
					<button class="category-model__button-buy" @click.prevent="addCartModel(model)" v-if="model.isInStock">
						<i class="fa fa-shopping-cart"></i>
						<span>Купить</span>
					</button>
					<p v-else>Нет в наличии</p>
					<button class="category-model__button-favorite" :class="{'in-favorite': isInFavorite}" @click="toggleFavorite">
						<i class="fa" :class="isInFavorite ? 'fa-heart' : 'fa-heart-o'"></i>
						<span>В избранное</span>
					</button>
					<button class="category-model__button-comparison" :class="{'in-comparison': isInComparison}" @click="toggleComparison">
						<i class="fa fa-balance-scale"></i>
						<span>{{isInComparison ? 'Не сравнивать' : 'Сравнить'}}</span>
					</button>
				</div>
				<ul class="category-model__properties">
					<CategoryModelImportantProperty v-for="(param, id) in importantParams" :param="param" :key="id" />
				</ul>
			</div>
		</div>
	</li>
</template>

<script>
	import CategoryModelImportantProperty from './CategoryModelImportantProperty';
	import getImagePath from '../../assets/js/getImagePath.js';
	
	export default {
		name: 'CategoryModel',
		components: {
			CategoryModelImportantProperty
		},
		props: {
			model: Object
		},
		data: function() {
			return {
				getImagePath: getImagePath
			}
		},
		computed: {
			importantParams() {
				return this.model.params.filter(param => param.isImportant);
			},
			isInComparison() {
				let comparison = this.$store.state.comparison;
				let category = comparison.find(cat => cat.name == this.model.category);
				return (category && category.models.find(m => m.name == this.model.name));
			},
			isInFavorite() {
				return this.$store.state.user.favorite.find(m => m == this.model);
			}
		},
		methods: {
			toggleComparison() {
				if (this.isInComparison) {
					this.$store.commit('removeComparisonModel', this.model);
				} else {
					this.$store.commit('addComparisonModel', this.model);
				}
			},
			toggleFavorite() {
				if (this.isInFavorite) {
					this.$store.commit('removeFavoriteModel', this.model)
				} else {
					this.$store.commit('addFavoriteModel', this.model);
				}
			},
			addCartModel(model) {
				this.$store.commit('addCartModel', model);
			}
		}
	}
</script>

<style>

</style>
