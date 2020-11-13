export default function() {
	let comparisonTablesWrapper = document.getElementById('comparison__tables-wrapper');
	let comparisonModelsTable = document.getElementById('comparison__models-table');

	if (!comparisonTablesWrapper || !comparisonModelsTable) return;

	let diff = comparisonTablesWrapper.getBoundingClientRect().right - comparisonModelsTable.getBoundingClientRect().right;

	let shift = 0;

	const mouseDown = e => {
		e.preventDefault();

		if (diff >= 0) return;

		let startX = e.x;
		let currentShift = shift;

		const mouseMove = e => {
			let comparisonTableRight = comparisonModelsTable.getBoundingClientRect().right;

			currentShift = shift - (startX - e.x);
			if (currentShift > 0) {
				currentShift = 0;
			} else if (currentShift < diff) {
				currentShift = diff;
			}
			comparisonModelsTable.style.transform = `translateX(${currentShift}px)`;
		}

		const mouseUp = e => {
			shift = currentShift;
			window.removeEventListener('mousemove', mouseMove);
			window.removeEventListener('mouseup', mouseUp);
		}

		window.addEventListener('mousemove', mouseMove);
		window.addEventListener('mouseup', mouseUp);
	}

	comparisonTablesWrapper.addEventListener('mousedown', mouseDown);

	const touchStart = e => {
		if (diff >= 0) return;
		
		let startX = e.touches[0].pageX;
		let currentShift = shift;

		const touchMove = e => {
			let comparisonModelsTableRight = comparisonModelsTable.getBoundingClientRect().right;

			currentShift = shift - (startX - e.touches[0].pageX);
			if (currentShift > 0) {
				currentShift = 0;
			} else if (currentShift < diff) {
				currentShift = diff;
			}
			comparisonModelsTable.style.transform = `translateX(${currentShift}px)`;
		}

		const touchEnd = e => {
			shift = currentShift;
			window.removeEventListener('touchmove', touchMove);
			window.removeEventListener('touchend', touchEnd);
		}

		window.addEventListener('touchmove', touchMove);
		window.addEventListener('touchend', touchEnd);
	}

	comparisonTablesWrapper.addEventListener('touchstart', touchStart);

	window.addEventListener('resize', () => {
		diff = comparisonTablesWrapper.getBoundingClientRect().right - comparisonModelsTable.getBoundingClientRect().right;
		shift = 0;
		comparisonModelsTable.style.transform = `translateX(${shift}px)`;
	});
}