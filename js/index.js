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

function getJobs() {
	var parseVals;
	fetch('./data.json')
		.then(function (resp) {
			return resp.json();
		})
		.then(function (data) {
			for (let i = 0; i < data.length; i++) {
				parseVals = new jsonValues(data[i].company);
			}
			//var parseVals = new jsonValues(data.company);
			//console.log(data[0].company);
		});
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
				console.log(data);

				for (let i = 0; i < data.length; i++) {
					// console.log(data);

					parseVals = new jsonValues(
						data[i].company,
						data[i].position,
						data[i].role[i],
						data[i].level,
						data[i].postedAt,
						data[i].contract,
						data[i].location,
						data[i].languages[i],
						data[i].tools
					);
					// console.log(data.role[i]);

					if (searchValue.value === data[i].company) {
						d1.insertAdjacentHTML(
							'beforeend',
							// prettier-ignore
							`<div class="container-fluid new-search">
						        <div class="row">
						            <div class="card card-body">
						                <div class="card-body row">
						                    <div>
						                        <span>
						                            <img src="images/${data[i].company.toLowerCase()}.svg" alt="" />
						                        </span>
						                    </div>
						                    <div class="jobDescription">
						                        <p class="company">
						                            ${data[i].company}
						                        </p>
						                        <p class="company btn1">
						                            <button type="button" class="btn btn-success btn-sm">NEW!</button>
						                        </p>
						                        <p class="company btn2">
						                            <button type="button" class="btn btn-success btn-sm">FEATURED</button>
						                        </p>
						                        <p class="job">
						                            ${data[i].position}
						                        </p>
						                        <p>
						                            ${data[i].postedAt} ${data[i].contract}  ${data[i].location}
						                        </p>
						                    </div>
						                    <div class="filters">
                                                <span class="filterWord">
                                                ${data[i].role}
                                                </span>
                                                <span class="filterWord">
                                                    ${data[i].level}
                                                </span>
                                                <span class="filterWord">
                                                    ${data[i].languages[0]}
                                                </span>
                                                <span class="filterWord">
                                                    ${data[i].languages[1]}
                                                </span>
                                                <span class="filterWord">
                                                    ${data[i].languages[2]}
                                                </span>
                                                <span class="filterWord">
                                                    ${data[i].tools[0]}
                                                </span>
						            
						                    </div>
						            </div>
						        </div>
						    </div>`
						);
					} else if (
						searchValue.value === data[i].position ||
						data[i].position.includes(searchValue.value)
					) {
					}
				}

				//var parseVals = new jsonValues(data.company);
				//console.log(data[0].company);
			});
	}
}

function renderCompanies(d1) {
	d1.insertAdjacentHTML(
		'beforeend',
		// prettier-ignore
		`<div class="container-fluid new-search">
            <div class="row">
                <div class="card card-body">
                    <div class="card-body row">
                        <div>
                            <span>
                                <img src="images/${data[i].company.toLowerCase()}.svg" alt="" />
                            </span>
                        </div>

                        <div class="jobDescription">
                            <p class="company">
                                ${data[i].company}
                            </p>
                            <p class="company btn1">
                                <button type="button" class="btn btn-success btn-sm">NEW!</button>
                            </p>

                            <p class="company btn2">
                                <button type="button" class="btn btn-success btn-sm">FEATURED</button>
                            </p>

                            <p class="job">
                                ${data[i].position}
                            </p>

                            <p>
                                ${data[i].postedAt} ${data[i].contract}  ${data[i].location}
                            </p>
                        </div>

                        <div class="filters">
                            <span class="filterWord">
                                ${data[i].role}
                            </span>
                            <span class="filterWord">
                                ${data[i].level}
                            </span>
                            <span class="filterWord">
                                ${data[i].languages[0]}
                            </span>
                            <span class="filterWord">
                                ${data[i].languages[1]}
                            </span>
                            <span class="filterWord">
                                ${data[i].languages[2]}
                            </span>
                            <span class="filterWord">
                                ${data[i].tools[0]}
                            </span>

                        </div>
                </div>
                
            </div>	

        </div>`
	);
}
