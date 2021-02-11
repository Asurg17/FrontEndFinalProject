
// ------------------------------------------------------------------------------------------------------
window.onload = function(){

	var url = document.location.href, 
	    params = url.split('?')[1].split('&'),
        info = {}, 
        tmp;

    for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        info[tmp[0]] = tmp[1];
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

	document.getElementById("search_the_car").addEventListener("click", searchTheCarByCarName);

	loadCarData(info);

}

// - - - - - - - - - - - -  - - - - - - - - 

function searchTheCarByCarName(){

	var carName = document.getElementById("srch_txt").value;

	window.location.href = "../Html/searchPage.html?carName=" + encodeURIComponent(carName);

}

function loadCarData(info){

	fetch('../Json/cars.json')
		.then(response => response.json())
		.then((result) => {displayCarInfo(result, info.carId)});

}

function displayCarInfo(data, carId){

	var curCarInfo = data[carId-1];

	document.getElementById("car_name").innerHTML = curCarInfo.car_name;
	document.getElementById("manufacturer").innerHTML = "Manufacturer: " + curCarInfo.manufacturer;
	document.getElementById("model").innerHTML = "Model: " + curCarInfo.model;
	document.getElementById("year").innerHTML = "Model Year: " + curCarInfo.model_year;
	document.getElementById("category").innerHTML = "Category: " + curCarInfo.category;
	document.getElementById("engine").innerHTML = "Engine: " + curCarInfo.engine;
	document.getElementById("transmission").innerHTML = "Transmission: " + curCarInfo.transmission;
	document.getElementById("helm").innerHTML = "Helm: " + curCarInfo.helm;
	document.getElementById("fuel").innerHTML = "Fuel: " + curCarInfo.fuel;
	document.getElementById("color").innerHTML = "Color: " + curCarInfo.color;
	document.getElementById("seats").innerHTML = "Seats: " + curCarInfo.seats;
	document.getElementById("price").innerHTML = "Price: " + curCarInfo.price + "$/day";
	document.getElementById("car_description").innerHTML = curCarInfo.car_description;

	fetch('../Json/users.json')
		.then(response => response.json())
		.then((result) => {displayOwnerInfo(result, curCarInfo.owner_id)});

}

function displayOwnerInfo(data, owner_id){

	var curOwner = data[owner_id-1];

	console.log(owner_id);

	document.getElementById("owner").innerHTML = "Owner name: " + curOwner.first_name;
	document.getElementById("contact").innerHTML = "Contact: (+995)" + curOwner.phone;
	document.getElementById("location").innerHTML = "Location: " + curOwner.location;
	document.getElementById("raiting").innerHTML = "Raiting: " + curOwner.raiting;

}