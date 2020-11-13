export default function(self) {
	const escCart = e => {
		if (!self.isCartActive) return;

		if (e.code == 'Escape') {
			self.$store.commit('toggleCart');
		}
	}

	const clickOutsideCart = e => {
		if (!self.isCartActive) return;

		if (e.target.classList.contains('cart-wrapper')) {
			self.$store.commit('toggleCart');
		}
	}

	window.addEventListener('keydown', escCart);
	window.addEventListener('click', clickOutsideCart);
}