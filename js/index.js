var searchValue = document.querySelector('.searchVal');

class jsonValues {
	constructor(company, position, role, level, postedAt, contract, location, languages, tools) {
		this.company = company;
		this.position = position;
		this.role = role;
		this.level = level;
		this.postedAt = postedAt;
		this.contract = contract;
		this.location = location;
		this.languages = languages;
		this.tools = tools;
	}

	getCompany() {
		return this.company;
	}
}

document.addEventListener('keypress', (event) => {
	if (event.keyCode === 13 || event.which === 13) {
		displaySearch();
	}
});

function displaySearch() {
	if (searchValue.value !== '') {
		event.preventDefault();
		var parseVals;
		var d1 = document.querySelector('.bigContainer');
		d1.innerHTML = '';
		fetch('./data.json')
			.then(function (resp) {
				return resp.json();
			})
			.then(function (data) {
				for (let i = 0; i < data.length; i++) {
					if (
						// prettier-ignore
						searchValue.value.toLowerCase() === data[i].company.toLowerCase() ||
                        data[i].company.toLowerCase().includes(searchValue.value.toLowerCase())
					) {
						renderCompanies(d1, data[i]);
					}

					if (
						searchValue.value.toLowerCase() === data[i].position.toLowerCase() ||
						data[i].position.includes(searchValue.value)
					) {
						renderCompanies(d1, data[i]);
					}

					if (
						searchValue.value.toLowerCase() === data[i].role.toLowerCase() ||
						data[i].role.includes(searchValue.value)
					) {
						renderCompanies(d1, data[i]);
					}

					if (
						searchValue.value.toLowerCase() === data[i].level.toLowerCase() ||
						data[i].level.includes(searchValue.value)
					) {
						renderCompanies(d1, data[i]);
					}

					if (
						searchValue.value.toLowerCase() === data[i].location.toLowerCase() ||
						data[i].location.includes(searchValue.value)
					) {
						renderCompanies(d1, data[i]);
					}
				}
			});
	}
}

function renderCompanies(d1, data) {
	d1.insertAdjacentHTML(
		'beforeend',
		// prettier-ignore
		`<div class="container-fluid new-search">
            <div class="row">
                <div class="card card-body">
                    <div class="card-body row">
                        <div>
                            <span>
                                <img src="images/${data.company.toLowerCase()}.svg" alt="" />
                            </span>
                        </div>

                        <div class="jobDescription">
                            <p class="company">
                                ${data.company}
                            </p>
                            <p class="company btn1">
                                <button type="button" class="btn btn-success btn-sm">NEW!</button>
                            </p>

                            <p class="company btn2">
                                <button type="button" class="btn btn-success btn-sm">FEATURED</button>
                            </p>

                            <p class="job">
                                ${data.position}
                            </p>

                            <p>
                                ${data.postedAt} ${data.contract}  ${data.location}
                            </p>
                        </div>

                        <div class="filters">
           
                        </div>
                </div>
                
            </div>	

        </div>`
	);

	var d2 = document.querySelector('.filters');

	d2.insertAdjacentHTML(
		'beforeend',
		`<span class="filterWord"> ${data.role} </span>
	    <span class="filterWord"> ${data.level} </span>`
	);

	// for (let j = 0; j < data.languages.length; j++) {
	// 	if (typeof data.languages[j] !== 'undefined') {
	// 		d2.insertAdjacentHTML('beforeend', `<span class="filterWord"> ${data.languages[j]} </span>`);
	// 	}
	// }

	// for (let k = 0; k < data.tools.length; k++) {
	// 	console.log(data.tools[k]);
	// 	if (typeof data.tools[k] !== 'undefined') {
	// 		d2.insertAdjacentHTML('beforeend', `<span class="filterWord"> ${data.tools[k]} </span>`);
	// 	}
	// }

	// console.log(d2.innerHTML);
}
