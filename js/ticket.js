const savedText = localStorage.getItem("codingConfTicket");

if (savedText === null) {
	window.location.href = "index.html";
}else {
	const ccTicket = JSON.parse(savedText);

	document.getElementById("user-name-heading").textContent = ccTicket.name;
	document.getElementById("ticket-name").textContent = ccTicket.name;
	document.getElementById("ticket-avatar").src = ccTicket.photo;
	document.getElementById("ticket-serial").textContent = ccTicket.serial;

	const usernameLink = document.getElementById("ticket-github");
	usernameLink.textContent = ccTicket.handle;
	usernameLink.href = "https://github.com/" + ccTicket.handle.slice(1);
}