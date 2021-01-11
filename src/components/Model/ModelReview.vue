<template>
	<li class="review" v-if="index < visibleReviews">
		<div class="review-body">
			<div class="review__info">
				<img class="review__user-photo" src="../../assets/images/avatar-default.svg" alt="">
				<p class="review__user-name">{{review.author}}</p>
				<ul class="model-rate__stars">
					<li v-for="(star, id) in 5"><i class="fa" :class="((id + 1) > review.rate) ? 'fa-star-o' : 'fa-star'"></i></li>
				</ul>
				<p class="review__date">{{review.date}}</p>
			</div>
			<div class="review__text">
				<p>{{review.text}}</p>
			</div>
			<div class="review__actions">
				<span @click="writeResponse">Ответить</span>
				<span @click="openResponses">{{review.responses.length}} ответов</span>
			</div>
		</div>
		<div v-if="responseForm.isOpen">
			<form class="review__comment-form" v-if="user.name">
				<textarea rows="4" v-model="responseForm.responseText" :maxlength="responseForm.max"></textarea>
				<div class="review__comment-actions">
					<button class="review__comment-cancel" @click.prevent="cancelResponse">Отменить</button>
					<button class="review__comment-submit" @click.prevent="submitResponse">Оставить отзыв</button>
				</div>
				<span class="review__comment-counter">{{responseForm.responseText.length}} / {{responseForm.max}}</span>
			</form>
			<div class="review__need-sign-in" v-else>
				<p>Чтобы оставлять комментарии, нужно войти или зарегистрироваться.</p>
			</div>
		</div>
		<ul class="review__responses-list" v-if="responses.isOpen">
			<ModelReviewResponse v-for="(response, id) in review.responses" :key="id" :response="response" />
		</ul>
	</li>
</template>

<script>
	import ModelReviewResponse from './ModelReviewResponse';
	
	export default {
		name: 'ModelReview',
		components: {
			ModelReviewResponse
		},
		props: {
			review: Object,
			index: Number,
			visibleReviews: Number,
			model: Object
		},
		data: function() {
			return {
				responseForm: {
					isOpen: false,
					responseText: '',
					max: 200
				},
				responses: {
					isOpen: false
				}
			}
		},
		computed: {
			user() {
				return this.$store.state.user;
			}
		},
		methods: {
			writeResponse() {
				this.responseForm.isOpen = !this.responseForm.isOpen;
			},
			cancelResponse() {
				this.responseForm.isOpen = false;
				this.responseForm.responseText = '';
			},
			openResponses() {
				this.responses.isOpen = !this.responses.isOpen;
			},
			submitResponse() {
				let currentDate = new Date;
				let response = {
					author: this.user.name,
					date: currentDate.getDate() + '.' + (currentDate.getMonth() + 1) + '.' + currentDate.getFullYear(),
					text: this.responseForm.responseText
				};

				this.$store.commit('addResponse', {model: this.model, review: this.review, response});

				this.responseForm.responseText = '';
				this.responseForm.isOpen = false;
				this.openResponses();
			}
		}
	}
</script>

<style>

</style>