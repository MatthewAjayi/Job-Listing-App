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
                                    <strong>${this.position}</strong>
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
						// For comapanies with space use DOM to add a '-' and then join strings
						// together but first use if statement to check
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
						searchValue.value.toLowerCase() === parseVals.company.toLowerCase() ||
					    parseVals.company.toLowerCase().includes(searchValue.value.toLowerCase())
					) {
						parseVals.createFilters();
					} else if (
						searchValue.value.toLowerCase() === parseVals.position.toLowerCase() ||
						parseVals.position.includes(searchValue.value)
					) {
						parseVals.createFilters();
					} else if (
						searchValue.value.toLowerCase() === parseVals.role.toLowerCase() ||
						parseVals.role.includes(searchValue.value)
					) {
						parseVals.createFilters();
					} else if (
						searchValue.value.toLowerCase() === parseVals.level.toLowerCase() ||
						parseVals.level.includes(searchValue.value)
					) {
						parseVals.createFilters();
					} else if (
						searchValue.value.toLowerCase() === parseVals.location.toLowerCase() ||
						parseVals.location.includes(searchValue.value)
					) {
						parseVals.createFilters();
					} else if (
						searchValue.value.toLowerCase() === parseVals.languages.toString().toLowerCase() ||
						parseVals.languages.toString().includes(searchValue.value)
					) {
						parseVals.createFilters();
					} else if (
						searchValue.value.toLowerCase() === parseVals.tools.toString().toLowerCase() ||
						parseVals.tools.toString().includes(searchValue.value)
					) {
						parseVals.createFilters();
					}
				}
			});
	}
}
