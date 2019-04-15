Array.from(document.querySelectorAll('.letter__checkbox')).forEach(checkbox => {
	checkbox.addEventListener('change', event => {
		const letter = checkbox.parentNode.parentNode.parentNode;

		if (checkbox.checked) {
			letter.classList.add('letter__active');
		} else {
			letter.classList.remove('letter__active');
		}
	})
});