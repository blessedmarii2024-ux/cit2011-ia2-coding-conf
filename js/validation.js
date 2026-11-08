
// This is to find the form and fields by their ids which match the HTML
const registrationForm = document.getElementById("registration-form");
const fullNameInput = document.getElementById("full-name");
const fullNameError = document.getElementById("full-name-error");
const emailInput = document.getElementById("email");
const emailError = document.getElementById("email-error");
const githubInput = document.getElementById("github");
const githubError = document.getElementById("github-error");
const profilePictureInput = document.getElementById("profile-picture");
const profilePictureError = document.getElementById("profile-picture-error");

//The email and GitHub patterns that must be entered into their individual section.
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const githubPattern = /^@[a-zA-Z0-9-]+$/;
const maxPhotoSize = 500 * 1024;

// When the form is submitted, it runs checks before anything else happens
registrationForm.addEventListener("submit", function (event) {
	event.preventDefault();

	//Reads values and removes spaces from both ends
	const fullName = fullNameInput.value.trim();
	const email = emailInput.value.trim();
	const github = githubInput.value.trim();
	const profilePicture = profilePictureInput.files[0];

	let isValid = true;

	//Shows error message if name box is empty or only spaces
	if (fullName === "") {
		fullNameError.textContent = "Invalid. Enter your full name";
		isValid = false;
	} else {
		fullNameError.textContent = "";
	}


	//Shows error message if email is entered incorrectly
	if (!emailPattern.test(email)) {
		emailError.textContent = "Invalid. Enter your email address";
		isValid = false;
	} else {
		emailError.textContent = "";
	}

	
	//Shows error message if their GitHub username is not entered correctly
	if (!githubPattern.test(github)) {
		githubError.textContent = "Invalid. Enter your GitHub username";
		isValid = false;
	} else {
		githubError.textContent = "";
	}

	//Show error messages if photo is not uploaded properly
	if (!profilePicture) {
		profilePictureError.textContent = "Choose a photo please.";
		isValid = false;
	} else if (profilePicture.type !== "image/jpeg" && profilePicture.type !== "image/png") {
		profilePictureError.textContent = "Photo must be either a JPEG or a PNG.";
		isValid = false;
	} else if (profilePicture.size > maxPhotoSize) {
		profilePictureError.textContent = "Photo must be under 500 KB.";
		isValid = false;
	} else {
		profilePictureError.textContent = "";
	}

	if (!isValid) {
		return;
	}

	const randomNum = Math.floor(Math.random() * 99999) + 1;
	const serialNum = "#" + String(randomNum).padStart(5, "0");

	const reader = new FileReader();
	reader.addEventListener("load", function () {
		const entry = {
			name: fullName,
			handle: github,
			photo: reader.result,
			serial: serialNum
		};

		localStorage.setItem("codingConfTicket", JSON.stringify(entry));

		window.location.href = "ticket.html";
	});
	reader.readAsDataURL(profilePicture);
});

