<template>
	<main class="model-page">
		<div class="container">
			<h2 class="model-page__title">{{model.name}}</h2>
			<div class="model-rate">
				<ul class="model-rate__stars" v-if="model.rate">
					<li v-for="(star, id) in 5" :key="id"><i class="fa" :class="((id + 1) > model.rate) ? 'fa-star-o' : 'fa-star'"></i></li>
				</ul>
				<div class="model-rate__comments">
					<a href="#reviews-ancor"><i class="fa fa-comment-o"></i><span> {{model.reviews.length}} отзывов</span></a>
				</div>
			</div>
			<div class="model-page__info">
				<div class="model-page__info-block">
					<img class="model-page__photo" :src="getImagePath(model.vendor)" alt="">
					<ul class="model-page__mini-props">
						<ModelImportantProperty v-for="(param, index) in importantParams" :key="index" :param="param" />
					</ul>
				</div>
				<div class="model-page__info-block">
					<div class="model-page__actions">
						<div class="model-page__in-stock" :class="{'is-in-stock': model.isInStock}">{{model.isInStock ? 'В наличии' : 'Нет в наличии'}}</div>
						<div class="model__price">
							<span class="model__price_current">{{model.price - model.discount}}</span>
							<span class="model__price_old" v-if="model.discount">
								<span class="model__price_old-line">{{model.price}}</span>
							</span>
						</div>
						<div class="model-page__actions-buttons">
							<button class="model-page__button-buy" @click.prevent="addCartModel(model)" :disabled="!model.isInStock">Купить</button>
							<button class="model-page__button-buy-quick" @click.prevent="buyOneClick(model)" :disabled="!model.isInStock">Купить в 1 клик</button>
							<button class="model-page__button-compare" @click="toggleComparison">{{isInComparison ? 'Не сравнивать' : 'Сравнить'}}</button>
							<button class="model-page__button-favor" @click="toggleFavorite">{{isInFavorite ? 'Не избранное' : 'В избранное'}}</button>
						</div>
					</div>
					<div class="model-page__terms">
						<p class="model-page__terms-desc">Здесь находятся очень подробно расписанные и хорошо сверстанные условия, а вовсе не:</p>
						<ul>
							<li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
							<li>Doloribus recusandae nesciunt fuga officiis reprehenderit deleniti</li>
							<li>ut eos quaerat error aliquam pariatur, consequatur debitis obcaecati</li>
							<li>possimus ullam nihil sequi. Quibusdam, rerum!</li>
						</ul>
				</div>
				</div>
				<div class="model-page__info-block">
					<h3 class="model-page__info-block-title">Характеристики</h3>
					<table class="model-page__props">
						<tbody>
							<ModelProperty v-for="(param, index) in model.params" :key="index" :param="param" />
						</tbody>
					</table>
				</div>
				<div class="model-page__info-block" id="reviews-ancor">
					<h3 class="model-page__info-block-title">Отзывы</h3>
					<a @click.prevent="toggleReviewForm" class="model-page__write-review">Оставить отзыв</a>
					<div v-if="reviewForm.isOpen">
						<form class="review__comment-form" v-if="user.name">
							<ul class="model-page__stars">
								<li
									v-for="(star, id) in 5"
									@mouseover="hoverStar(id + 1)"
									@mouseout="unhoverStar"
									@click="chooseStar(id + 1)"
								><i class="fa" :class="getClassForReviewStar(id)"></i></li>
							</ul>
							<textarea name="" id="" rows="4" v-model="reviewForm.reviewText" :maxlength="reviewForm.max"></textarea>
							<div class="review__comment-actions">
								<button class="review__comment-cancel" @click.prevent="cancelReview">Отменить</button>
								<button class="review__comment-submit" @click.prevent="submitReview">Оставить отзыв</button>
							</div>
							<span class="review__comment-counter">{{reviewForm.reviewText.length}} / {{reviewForm.max}}</span>
						</form>
						<div class="review__need-sign-in" v-else>
							<p>Чтобы оставлять отзывы, нужно войти или зарегистрироваться.</p>
						</div>
					</div>
					<ul class="model-page__reviews-list">
						<ModelReview v-for="(review, id) in model.reviews" :key="id" :review="review" :index="id" :visibleReviews="visibleReviews" :model="model"/>
					</ul>
					<span class="open-all-list" v-if="(model.reviews.length > 3) && (visibleReviews < model.reviews.length)" @click="showNextReviews">ОТКРЫТЬ ЕЩЕ 3 ОТЗЫВА</span>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
	import ModelImportantProperty from './ModelImportantProperty';
	import ModelProperty from './ModelProperty';
	import ModelReview from './ModelReview';
	import getImagePath from '../../assets/js/getImagePath.js';
	
	export default {
		name: 'Model',
		components: {
			ModelImportantProperty,
			ModelProperty,
			ModelReview
		},
		props: {
			model: Object
		},
		data: function () {
			return {
				reviewForm: {
					isOpen: false,
					reviewText: '',
					max: 200,
					rate: 5,
					hoverStar: null
				},
				visibleReviews: 3,
				getImagePath: getImagePath
			}
		},
		computed: {
			importantParams() {
				return this.model.params.filter(param => param.isImportant);
			},
			comparison() {
				return this.$store.state.comparison;
			},
			isInComparison() {
				let comparison = this.$store.state.comparison;
				let category = comparison.find(cat => cat.name == this.model.category);
				return (category && category.models.find(m => m.name == this.model.name));
			},
			isInFavorite() {
				return this.$store.state.user.favorite.find(m => m == this.model);
			},
			user() {
				return this.$store.state.user;
			}
		},
		mounted() {
			if (this.$route.hash) {
				let elem = document.querySelector(this.$route.hash);
				setTimeout(() => {
					elem.scrollIntoView();
				}, 4);
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
			},
			buyOneClick(model) {
				this.$store.commit('addCartModel', model);
				this.$store.commit('toggleCart');
			},
			submitReview() {
				let currentDate = new Date;

				let review = {
					author: this.user.name,
					date: currentDate.getDate() + '.' + (currentDate.getMonth() + 1) + '.' + currentDate.getFullYear(),
					text: this.reviewForm.reviewText,
					responses: [],
					rate: this.reviewForm.rate
				}

				this.$store.commit('addReview', {model: this.model, review});

				this.reviewForm.reviewText = '';
				this.reviewForm.isOpen = false;
				this.reviewForm.rate = 5;
			},
			cancelReview() {
				this.reviewForm.isOpen = false;
				this.reviewForm.reviewText = '';
			},
			toggleReviewForm() {
				this.reviewForm.isOpen = !this.reviewForm.isOpen;
			},
			hoverStar(index) {
				this.reviewForm.hoverStar = index;
			},
			unhoverStar() {
				this.reviewForm.hoverStar = null;
			},
			chooseStar(index) {
				this.reviewForm.rate = index;
			},
			showNextReviews() {
				if ((this.visibleReviews + 3) <= this.model.reviews.length) {
					this.visibleReviews += 3;
				} else {
					this.visibleReviews = this.model.reviews.length;
				}
			},
			getClassForReviewStar(index) {
				if (this.reviewForm.hoverStar) {
					return (index + 1) <= this.reviewForm.hoverStar ? 'fa-star' : 'fa-star-o';
				} else {
					return (index + 1) <= this.reviewForm.rate ? 'fa-star' : 'fa-star-o';
				}
			}
		}
	}
</script>

<style>

</style>
