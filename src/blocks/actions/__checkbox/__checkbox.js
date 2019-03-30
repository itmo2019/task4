document.querySelector('.actions__checkbox').addEventListener('change', event => {
	Array.from(document.querySelectorAll('.letter__checkbox')).forEach(checkbox => {
		if (checkbox.checked !== event.target.checked) {
			checkbox.checked = event.target.checked;
			checkbox.dispatchEvent(new Event('change'));
		}
	});
});