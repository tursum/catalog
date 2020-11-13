<template>
	<li class="review__response">
		<div class="review__info">
			<img class="review__user-photo" src="../../assets/images/avatar-default.svg" alt="">
			<p class="review__user-name">{{response.author}}</p>
			<p class="review__date">{{response.date}}</p>
		</div>
		<div class="review__text">
			<p>{{response.text}}</p>
		</div>
	</li>
</template>

<script>
	export default {
		name: 'ModelReviewResponse',
		props: {
			response: Object
		}
	}
</script>

<style>

</style>