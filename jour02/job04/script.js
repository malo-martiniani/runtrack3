const keylogger = document.getElementById('keylogger');
if (keylogger) {
	document.addeventListener('keydown', (e) => {
		const key  = e.key;
		if (!/^[a-z]$/i.test(key)) return;

		const isInTextarea = document.activeElement === keylogger;
		if (isInTextarea) {
			e.preventDefault();
		}
		
		const addition = isInTextarea ? key + key : key;
		keylogger.value += addition;
	});
}