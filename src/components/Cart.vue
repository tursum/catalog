<template>
	<div class="cart-wrapper">
		<div class="cart">
			<p class="cart-title">Корзина</p>
			<ul>
				<li v-for="(item, id) in cartList" :key="id" class="cart-item">
					<button class="cart-item__button-close" @click.prevent="removeCartItem(item)"><i class="fa fa-close"></i></button>
					<div class="cart-item__info">
						<img class="cart-item__img" :src="getImagePath(item.model.vendor)" alt="">
						<div class="cart-item__info-inner">
							<router-link :to="`/${item.model.path}`" class="cart-item__name">{{item.model.name}}</router-link>
							<div class="model__price">
								<span class="model__price_current">{{item.model.price - item.model.discount}} грн</span>
								<span class="model__price_old" v-if="item.model.discount">
									<span class="model__price_old-line">{{item.model.price}} грн</span>
								</span>
							</div>
						</div>
					</div>
					<div class="cart-item__actions">
						<form class="cart-item__form-quantity">
							<button @click.prevent="decreaseCartItemQuantity(item)">-</button>
							<input type="text" :value="item.quantity">
							<button @click.prevent="increaseCartItemQuantity(item)">+</button>
						</form>
						<span class="cart-item__price">{{(item.model.price - item.model.discount) * item.quantity}} грн</span>
					</div>
				</li>
			</ul>
			<div class="cart-order" v-if="cartList.length > 0">
				<div class="cart-order__price">
					<span class="cart-order__price_total">Всего:</span>
					<span class="cart-order__price_number">{{fullCost}} грн</span>
				</div>
				<button class="cart-order__button-order" @click.prevent="addOrder">Оформить заказ</button>
			</div>
			<div v-else>
				<p>Корзина пуста. Скорее добавьте сюда что-нибудь.</p>
			</div>
		</div>
	</div>
</template>

<script>
	import handleCart from '../assets/js/handleCart.js';
	import getImagePath from '../assets/js/getImagePath.js';

	export default {
		name: 'Cart',
		data: function() {
			return {
				getImagePath: getImagePath
			}
		},
		computed: {
			isCartActive() {
				return this.$store.state.isCartActive;
			},
			cartList() {
				return this.$store.state.user.cart;
			},
			fullCost() {
				let sum = 0;

				this.cartList.forEach(item => {
					sum += (item.model.price - item.model.discount) * item.quantity;
				});

				return sum;
			}
		},
		mounted() {
			handleCart(this);
		},
		methods: {
			increaseCartItemQuantity(item) {
				this.$store.commit('increaseCartItemQuantity', item);
			},
			decreaseCartItemQuantity(item) {
				this.$store.commit('decreaseCartItemQuantity', item);
			},
			removeCartItem(item) {
				this.$store.commit('removeCartModel', item);
			},
			addOrder() {
				console.log('Do smth with database and pay and so on');
				let cart = this.$store.state.user.cart;
				
				let order = [];
				order.items = cart.map(i => {
					return {
						name: i.model.name,
						quantity: i.quantity
					};
				});

				let cost = 0;
				cart.forEach(i => cost += ((i.model.price - i.model.discount) * i.quantity));
				order.cost = cost;

				let currentDate = new Date;
				order.date = currentDate.getDate() + '.' + (currentDate.getMonth() + 1) + '.' + currentDate.getFullYear();
				order.status = 'Принят';
				this.$store.commit('addOrder', order);
			}
		}
	}
</script>

<style>

</style>
