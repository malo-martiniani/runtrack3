const footer = document.getElementById('progress-footer');

if (footer) {
	const updateFooterColor = () => {
		const scrollable = document.documentElement.scrollHeight - window.innerHeight;
		const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
		const percent = Math.min(Math.max(ratio * 100, 0), 100);
		const hue = percent * 1.2; // 0 -> red, 120 -> green
		footer.style.backgroundColor = `hsl(${hue}, 70%, 50%)`;
	};

	window.addEventListener('scroll', updateFooterColor);
	updateFooterColor();
}
