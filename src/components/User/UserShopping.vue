<template>
	<div class="user-page__content user-page__shopping">
		<h2 class="user-page__content-title">История заказов</h2>
		<ul v-if="orders.length > 0">
			<li v-for="(order, id) in orders" :key="id">
				<ul class="user-page__shopping-item-name">
					<li v-for="(item, itemID) in order.items" :key="itemID">{{item.name}} ({{item.quantity}})</li>
				</ul>
				<span>{{order.cost}} грн</span>
				<span>{{order.date}}</span>
				<span>{{order.status}}</span>
			</li>
		</ul>
		<p v-else>Вы пока ничего не заказывали.<br>Зайдите в каталог, добавьте товары в корзину и оформите заказ.<br>После этого вы сможете посмотреть здесь информацию о заказе.</p>
	</div>
</template>

<script>
	export default {
		name: 'UserShopping',
		computed: {
			orders() {
				return this.$store.state.user.orders;
			}
		}
	}
</script>

<style>

</style>