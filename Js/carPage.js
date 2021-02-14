
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

	document.getElementById("left").addEventListener("click", showPreviousPhoto);
	document.getElementById("right").addEventListener("click", showNextPhoto);

	displayCarInfo(info.carId);

}

// - - - - - - - - - - - -  - - - - - - - - 
var curCarInfo;
var photoIndex = 0;

function searchTheCarByCarName(){

	var carName = document.getElementById("srch_txt").value;

	window.location.href = "../Html/searchPage.html?carName=" + encodeURIComponent(carName);

}

// function loadCarData(info){

// 	fetch('../Json/cars.json')
// 		.then(response => response.json())
// 		.then((result) => {displayCarInfo(result, info.carId)});

// }

function displayCarInfo(carId){

	var data = JSON.parse(localStorage.getItem("cars")); 

	// alert(carId-1);

	console.log(data[carId-1]);

	curCarInfo = data[carId-1];

	if(data[carId-1].pictures.length != 0){
		var firstPicrute = data[carId-1].pictures[0];
		document.getElementById("car_img").src = firstPicrute;
	}

	document.getElementById("car_name").innerHTML = curCarInfo.car_name;
	document.getElementById("car_id").innerHTML = "N " + curCarInfo.id;
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
	document.getElementById("location").innerHTML = "Location: " + curCarInfo.location;

	displayOwnerInfo(curCarInfo.owner_id);

	// fetch('../Json/users.json')
	// 	.then(response => response.json())
	// 	.then((result) => {displayOwnerInfo(result, curCarInfo.owner_id)});

}

function displayOwnerInfo(owner_id){

	var data = JSON.parse(localStorage.getItem("users")); 

	var curOwner = data[owner_id-1];

	console.log(owner_id);

	document.getElementById("owner").innerHTML = "Owner name: " + curOwner.first_name;
	document.getElementById("contact").innerHTML = "Contact: (+995)" + curOwner.phone;
	document.getElementById("raiting").innerHTML = "Raiting: " + curOwner.raiting;

}

function showNextPhoto(){

	if(photoIndex < curCarInfo.pictures.length-1){	
		photoIndex += 1;
		document.getElementById("car_img").src = curCarInfo.pictures[photoIndex];
	}

}

function showPreviousPhoto(){

	if(photoIndex != 0){
		photoIndex -= 1;
		document.getElementById("car_img").src = curCarInfo.pictures[photoIndex];
	}

}