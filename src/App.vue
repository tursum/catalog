<template>
	<div id="app">
		<Header />
		<Cart v-if="isCartActive" />
		<router-view/>
		<Footer />
		<transition name="fade">
			<Message v-if="message" />
		</transition>
	</div>
</template>

<script>
	import Header from './components/Header/';
	import Footer from './components/Footer';
	import Cart from './components/Cart';
	import Message from './components/Message';

	export default {
		name: 'App',
		components: {
			Header,
			Footer,
			Cart,
			Message
		},
		computed: {
			isCartActive() {
				return this.$store.state.isCartActive;
			},
			message() {
				return this.$store.state.message;
			}
		}
	}
</script>

<style>
	.fade-enter-active, .fade-leave-active {
		transition: opacity .2s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
		opacity: 0;
	}
</style>
