const keylogger = document.getElementById('keylogger');
if (keylogger) {
	document.addEventListener('keydown', (event) => {
		const { key } = event;
		if (!/^[a-z]$/i.test(key)) return;

		const isInTextarea = document.activeElement === keylogger;
		if (isInTextarea) {
			event.preventDefault();
		}

		const addition = isInTextarea ? key + key : key;
		keylogger.value += addition;
	});
}
