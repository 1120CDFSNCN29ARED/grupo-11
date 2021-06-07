window.addEventListener("load", () => {
	document.getElementById("search-form").addEventListener("submit", (e) => {
		e.preventDefault();
		if (document.getElementById("searchValue").value != "") {
			e.currentTarget.submit();
		}
	})
});