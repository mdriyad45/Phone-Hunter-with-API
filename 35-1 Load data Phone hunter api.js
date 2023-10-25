const loadPhone = async (searchText, dataLimit) => {
	const res = await fetch(
		`https://openapi.programming-hero.com/api/phones?search=${searchText}`
	);
	const data = await res.json();
	displayPhone(data.data, dataLimit);
};
const displayPhone = (phone, dataLimit) => {
	const phoneContainer = document.getElementById("Phone-container");
	const showAll = document.getElementById("show-all");
	const noPhone = document.getElementById("no-found-message");

	//display 10 phones only
	if (dataLimit && phone.length > 10) {
		phone = phone.slice(0, 10);
		showAll.classList.remove("d-none");
	} else {
		showAll.classList.add("d-none");
	}
	//display no phones found
	if (phone.length === 0) {
		noPhone.classList.remove("d-none");
	} else {
		noPhone.classList.add("d-none");
	}
	phoneContainer.textContent = "";
	phone.forEach((element) => {		
		const phoneDiv = document.createElement("div");
		phoneDiv.classList.add("col");
		phoneDiv.innerHTML = `<div class="card p-4">
							<img src="${element.image}" class="card-img-top" alt="..." />
							<div class="card-body">
								<h5 class="card-title">Phone Name: ${element.phone_name}</h5>
								<p class="card-text">
									This is a longer card with supporting text below as a natural
									lead-in to additional content. This content is a little bit
									longer.
								</p>
								<button onclick="loadPhoneDetails('${element.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phone-details-modal">Show Details</button>
							</div>
						</div>`;
		phoneContainer.appendChild(phoneDiv);
	});
	toggleSpinner(false);
};
const processSearch = (dataLimit) => {
	toggleSpinner(true);
	const searchField = document.getElementById("input-search");
	const searchText = searchField.value;
	loadPhone(searchText, dataLimit);
};
//handle search button click
document.getElementById("button-search").addEventListener("click", () => {
	processSearch(10);
});

//Search input field enter key handler
document
	.getElementById("input-search")
	.addEventListener("keypress", (event) => {
		if (event.key === "Enter") {
			processSearch(10);
		}
	});
const toggleSpinner = (isLoading) => {
	const loaderSection = document.getElementById("spinner");
	if (isLoading) {
		loaderSection.classList.remove("d-none");
	} else {
		loaderSection.classList.add("d-none");
	}
};

//not the best way to load show All
document.getElementById("btn-show-all").addEventListener("click", () => {
	processSearch();
});
//loadPhoneDetails

const loadPhoneDetails = async (id) => {
	const url = ` https://openapi.programming-hero.com/api/phone/${id}`;
	const res = await fetch(url);
	const data = await res.json();
	displayPhoneDetails(data.data);
};
const displayPhoneDetails = phone =>{
	const phoneName = document.getElementById('phone-details-name');
	phoneName.innerText = phone.name
	const showDetailContainer = document.getElementById('show-detail-container');

    showDetailContainer.innerHTML = `
        <img class="mb-2" src="${phone.image}" alt="" />
        <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
        <p><span>GPS:</span>${phone.others?.GPS || 'No GPS available'}</p>
        <p><span>GPS:</span>${phone.others?.GPS ? phone.others.GPS : 'No GPS available in this device'}</p>
    `
}
