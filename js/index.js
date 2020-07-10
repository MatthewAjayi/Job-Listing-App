const { elements } = require('../../JavaScript/To-Do-Wep-App/js/models/toDoModel');

var searchValue = document.querySelector('.searchVal');

class jsonValues {
	constructor(
		company,
		position,
		role,
		level,
		postedAt,
		contract,
		location,
		languages,
		tools,
		new1,
		featured,
		id
	) {
		this.company = company;
		this.position = position;
		this.role = role;
		this.level = level;
		this.postedAt = postedAt;
		this.contract = contract;
		this.location = location;
		this.languages = languages;
		this.tools = tools;
		this.new1 = new1;
		this.featured = featured;
		this.id = id;
	}

	createFilters() {
		var btn1 = '';
		var btn2 = '';
		if (this.new1) {
			btn1 = '<button type="button" class="btn btn-success btn-sm bb1" >NEW!</button>';
		} else {
			btn1;
		}
		if (this.featured) {
			btn2 = '<button type="button" class="btn btn-success btn-sm bb2" >FEATURED</button>';
		} else {
			btn2;
		}

		var d1 = document.querySelector('.bigContainer');
		d1.insertAdjacentHTML(
			'beforeend',
			`<div class="container-fluid new-search">
                    <div class="row">
                        <div class="card card-body">
                            <div class="card-body row">
                                <div>
                                    <span>
                                        <img src="images/${this.company.toLowerCase()}.svg" alt="" />
                                    </span>
                                </div>
                                <div class="jobDescription">
                                    <p class="company">
                                        ${this.company}
                                    </p>
                                    <p class="company btn1">
                                       ${btn1}
                                    </p>
                                    <p class="company btn2">
                                        ${btn2}
                                    </p>
                                    <p class="job">
                                        ${this.position}
                                    </p>
                                    <p>
                                        ${this.postedAt} ${this.contract}  ${this.location}
                                    </p>
                                </div>
                                <div class="filters">
                                    <span class="filterWord"> ${this.role} </span>
                                    <span class="filterWord"> ${this.level} </span>
                                   ${this.languages.map((el) => createTags(el)).join('')} 
                                   ${this.tools.map((el) => createTags(el)).join('')} 
                                </span>
                                </div> 
                    </div>
                </div>`
		);
	}
}

const createTags = (element) => `
<span class="filterWord">${element}</span>
`;

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
					parseVals = new jsonValues(
						data[i].company,
						data[i].position,
						data[i].role,
						data[i].level,
						data[i].postedAt,
						data[i].contract,
						data[i].location,
						data[i].languages,
						data[i].tools,
						data[i].new,
						data[i].featured,
						data[i].id
					);

					if (
						// prettier-ignore
						searchValue.value.toLowerCase() === parseVals.role.toLowerCase() ||
					    parseVals.role.toLowerCase().includes(searchValue.value.toLowerCase())
					) {
						parseVals.createFilters();
					}
				}
				// if (
				// 	searchValue.value.toLowerCase() === data[i].position.toLowerCase() ||
				// 	data[i].position.includes(searchValue.value)
				// ) {
				// 	renderCompanies(d1, data[i]);
				// }

				// if (
				// 	searchValue.value.toLowerCase() === data[i].role.toLowerCase() ||
				// 	data[i].role.includes(searchValue.value)
				// ) {
				// 	renderCompanies(d1, data[i]);
				// }

				// if (
				// 	searchValue.value.toLowerCase() === data[i].level.toLowerCase() ||
				// 	data[i].level.includes(searchValue.value)
				// ) {
				// 	renderCompanies(d1, data[i]);
				// }

				// if (
				// 	searchValue.value.toLowerCase() === data[i].location.toLowerCase() ||
				// 	data[i].location.includes(searchValue.value)
				// ) {
				// 	renderCompanies(d1, data[i]);
				// }
			});
	}
}
