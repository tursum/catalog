// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Vuelidate from 'vuelidate';
import router from './router';

import App from './App';

import style from './assets/css/main.css';
import {models, users} from '../static/js/db';
import initialize from '../static/js/initialize';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Vuelidate);

export const store = new Vuex.Store({
	state: {
		user: {
			name: null,
			favorite: [],
			cart: [],
			orders: [],
			phone: null,
			password: null

		},
		comparison: [],
		message: '',
		messageTimer: null,
		isCartActive: false
	},
	mutations: {
		addComparisonModel(state, model) {
			let category = state.comparison.find(cat => cat.name == model.category);
			if (!category) {
				state.comparison.push({
					name: model.category,
					models: [model]
				});
			} else {
				if (!category.models.find(m => m == model)) {
					category.models.push(model);
				}
			}

			this.commit('printMessage', `Модель ${model.name} добавлена в сравнение`);
		},
		removeComparisonModel(state, model) {
			let category = state.comparison.find(cat => cat.name == model.category);
			if (category.models.length == 1) {
				this.commit('removeComparisonCategory', model.category);
			} else {
				category.models.splice(category.models.findIndex(m => m.name == model.name), 1);
			}
		},
		removeComparisonCategory(state, category) {
			state.comparison.splice(state.comparison.findIndex(cat => cat.name == category), 1);
		},
		addFavoriteModel(state, model) {
			state.user.favorite.push(model);
			this.commit('printMessage', `Модель ${model.name} добавлена в избранное. ${state.user.name ? '' : 'Войдите, чтобы просматривать избранное'}`);
		},
		removeFavoriteModel(state, model) {
			state.user.favorite.splice(state.user.favorite.findIndex(m => m == model), 1);
		},
		logIn(state, user) {
			state.user.favorite.forEach(item => {
				if (!user.favorite.find(i => item == i)) {
					user.favorite.push(item);
				}
			});

			state.user.cart.forEach(item => {
				let currentItem = user.cart.find(i => i.model == item.model);
				if (!currentItem) {
					user.cart.push(item);
				} else {
					currentItem.quantity += 1;
				}
			});

			state.user.orders.forEach(order => {
				user.orders.push(order);
			});

			state.user = user;
			router.push('/user');

			this.commit('printMessage', `Здравствуйте, ${user.name}`);
		},
		logOut(state) {
			state.user = {
				name: null,
				favorite: [],
				cart: [],
				orders: [],
				phone: null,
				password: null
			}

			router.push('/login');

			this.commit('printMessage', `Вы вышли из учетной записи`);
		},
		register(state, user) {
			state.user.favorite.forEach(item => {
				if (!user.favorite.find(i => item == i)) {
					user.favorite.push(item);
				}
			});

			state.user.cart.forEach(item => {
				let currentItem = user.cart.find(i => i.model == item.model);
				if (!currentItem) {
					user.cart.push(item);
				} else {
					currentItem.quantity += 1;
				}
			});

			state.user.orders.forEach(order => {
				user.orders.push(order);
			});

			state.user = user;
			router.push('/user');

			this.commit('printMessage', `Вы успешно зарегистрированы`);
		},
		addCartModel(state, model) {
			let item = state.user.cart.find(m => m.model == model);

			if (item) {
				item.quantity += 1;
			} else {
				state.user.cart.push({
					model: model,
					quantity: 1
				});
			}

			this.commit('printMessage', `Товар ${model.name} добавлен в корзину`);
		},
		removeCartModel(state, model) {
			state.user.cart.splice(state.user.cart.find(item => item.model == model), 1);
		},
		toggleCart(state) {
			state.isCartActive = !state.isCartActive;
			document.documentElement.style.overflow = state.isCartActive ? 'hidden' : 'unset';
		},
		increaseCartItemQuantity(state, item) {
			item.quantity += 1;
		},
		decreaseCartItemQuantity(state, item) {
			if (item.quantity == 1) {
				this.commit('removeCartModel', item);
			} else {
				item.quantity -= 1;
			}
		},
		changeUserName(state, name) {
			state.user.name = name;
		},
		changeUserPhone(state, phone) {
			state.user.phone = phone;
		},
		addOrder(state, order) {
			state.user.orders.push(order);
			state.user.cart = [];

			this.commit('printMessage', `Заказ оформлен. ${state.user.name ? 'Вы можете посмотреть его состояние в личном кабинете' : ''}`);
		},
		setModelRate(state, model) {
			let rate = 0;
			model.reviews.forEach(r => rate += r.rate);
			rate /= model.reviews.length;
			rate = Math.round(rate);

			model.rate = rate;
		},
		printMessage(state, message) {
			state.message = '';
			clearTimeout(state.timerMessage);

			setTimeout(() => {
				state.message = message;
				state.timerMessage = setTimeout(() => {
					state.message = '';
				}, 2000);
			}, 200);	
		},
		addReview(state, params) {
			params.model.reviews.push(params.review);
			this.commit('setModelRate', params.model);
		},
		addResponse(state, params) {
			params.model.reviews.find(review => review == params.review).responses.push(params.response);
		}
	}
});

initialize(store, models);

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
});