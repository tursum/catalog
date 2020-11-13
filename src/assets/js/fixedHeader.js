export default function() {
	let headerMain = document.getElementById('header-main');
	let darkBlock = document.getElementById('header-catalog__dark-block');

	const correctHeader = e => {
		let currentScroll = document.documentElement.scrollTop;

		if (currentScroll > 39) {
			headerMain.style.position = 'fixed';
			darkBlock.style.top = '71px';
			document.documentElement.style.marginTop = '71px';
		} else {
			headerMain.style.position = 'unset';
			darkBlock.style.top = (110 - currentScroll) + 'px';
			document.documentElement.style.marginTop = '0';
		}
	}

	window.addEventListener('scroll', correctHeader);
}