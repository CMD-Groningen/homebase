fetch("https://api.github.com/users/CMD-Groningen/repos?sort=created&direction=dsc")
	.then((resp) => resp.json())
	.then((resp) => {
		for (let repo of resp) {
			let { name, description, html_url, topics } = repo;

			// Replace dashes with spaces and capitalize each word
			name = name
				.replace(/-/g, " ")
				.split(" ")
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(" ");

			const repositoryList = document.querySelector(".repo--js");
			const myTemplate = `
                <ul class="project" id="${repo.name}">
                    <li><a href="${html_url}" title="This is link to ${name} repository from my GitHub list" target="_new" class="reponaam">${name}</a></li>
                    <li>${description} <br /></li>
                    <span class="course">
                        <li>CMD Coursenaam: <span style="text-transform:uppercase;font-weight:normal">${topics}</span> <br /></li>
                    </span>
                    <li>Link naar Sandbox: <a href="https://githubbox.com/CMD-groningen/${repo.name}" alt="Dit is alle code voor het ${name} project." target="_new">Source code</a></li>
                    <li>Link naar <a href="${html_url}" title="Dit is de link naar de Github pagina voor ${name}" target="_new">Github Repo</a></li>
                </ul>
            `;
			repositoryList.innerHTML += myTemplate;
		}
	})
	.catch((error) => {
		console.log("error");
	});

// Search filter for filtering through the Repository examples by keywords
function zoekfilter() {
	var input, filter, repositories, td, i, txtValue, li;
	input = document.getElementById("myInput");
	filter = input.value.toUpperCase();
	repositories = document.getElementById("repositories");
	li = repositories.querySelectorAll(".project");
	for (i = 0; i < li.length; i++) {
		var rowContent = li[i].textContent;
		rowContent = rowContent.replace(/[\s]+/g, " ");

		if (rowContent) {
			if (rowContent.toUpperCase().includes(filter)) {
				li[i].style.cssText = "display: block;";
			} else {
				li[i].style.cssText = "display: none;";
			}
		}
	}
}

function zoekfilterCourse() {
	var inputCourse, filter, repositories, td, i, txtValue, courses;
	inputCourse = document.getElementById("myInputCourse");
	filter = inputCourse.value.toUpperCase();
	repositories = document.getElementById("repositories");
	courses = repositories.querySelectorAll(".course");

	for (i = 0; i < courses.length; i++) {
		var rowContent = courses[i].textContent;
		rowContent = rowContent.replace(/[\s]+/g, " ");

		if (rowContent) {
			if (rowContent.toUpperCase().includes(filter)) {
				courses[i].closest(".project").style.display = "block";
			} else {
				courses[i].closest(".project").style.display = "none";
			}
		}
	}
}
