
// ---------------------------------------------------------------
// Variables

var pageNum;

// 
window.addEventListener("resize", checkWindowSize);

window.onload = function(){

	pageNum = 1;

	//--------------------------------------------------------------------------------

	document.getElementById("filter_button").addEventListener("click", showFilter);

	document.getElementById("search_car").addEventListener("click", searchCar);

 	document.getElementById("manufacturer").addEventListener("click", getCarModels);

 	document.getElementById("ss_search").addEventListener("click", redirectToSearchCarPage);

 	//--------------------------------------------------------------------------------

 	document.getElementById("right_page").addEventListener("click", showNextPage);
 	
 	document.getElementById("left_page").addEventListener("click", showPreviousPage);

 	getCarFilterInfo();

 	checkWindowSize();

	//--------------------------------------------------------------------------------

 	getCars("external");

 	document.querySelectorAll('.car_box').forEach(item => { item.addEventListener('click', event => {
    
 			redirectToCarPage(item.id);

		 })
	})

}

// -------------------------------------------------------------------------------


//needs to get info it filter must be shown or hidden
checker = 1; 
maxHeight = 450;

function showFilter(){

	checker += 1;

	if(checker % 2 == 0){
		document.getElementById("filter_sub").style.height = maxHeight;
		document.getElementById("sub_filter").style = "transition-delay: 0s;";
		document.getElementById("sub_filter").style.visibility = "visible";
	}else{
		document.getElementById("filter_sub").style.height = "0px";
		document.getElementById("sub_filter").style = "transition-delay: 1.4s;";
		document.getElementById("sub_filter").style.visibility = "hidden";
	}
}


function checkWindowSize(){

	if(checker % 2 == 0){
		checker += 1;
		document.getElementById("filter_sub").style.height = "0px";
		document.getElementById("sub_filter").style = "transition-delay: 1.4s;";
		document.getElementById("sub_filter").style.visibility = "hidden";
	}

	var w = window.innerWidth;

	if(w <= 1350){
		maxHeight = 910;
	}else{
		maxHeight = 450;
	}

	if(w <= 850){
		maxHeight = 1070;
	}

}

// -------------------------------------------------------------------

function getCarFilterInfo(){

	fetch('../Json/SearchPage/carCategories.json')
		.then(response => response.json())
		.then((result) => {setData(result, "categories")});

	fetch('../Json/SearchPage/manufacturers.json')
		.then(response => response.json())
		.then((result) => {setData(result, "manufacturer")});

	fetch('../Json/SearchPage/carEngine.json')
		.then(response => response.json())
		.then((result) => {setData(result, "engine_from"), setData(result, "engine_to")});

	fetch('../Json/SearchPage/carTransmissions.json')
		.then(response => response.json())
		.then((result) => {setData(result, "transmission_filtr")});

	fetch('../Json/SearchPage/fuel.json')
		.then(response => response.json())
		.then((result) => {setData(result, "fuel_filtr")});

	fetch('../Json/SearchPage/helm.json')
		.then(response => response.json())
		.then((result) => {setData(result, "helm_filtr")});

	fetch('../Json/SearchPage/seats.json')
		.then(response => response.json())
		.then((result) => {setData(result, "sealts_filtr")});

}

function setData(data, id){

	var categorySelect = document.getElementById(id);

	for(var i=0; i<data.length; i++){

		var curOption = document.createElement('option');

		curOption.appendChild(document.createTextNode(data[i]));

		curOption.value = data[i];

		categorySelect.appendChild(curOption); 

	}

}

// ####################

function getCarModels(){

	fetch('../Json/SearchPage/carModels.json')
		.then(response => response.json())
		.then((result) => {showCarModels(result)});

}


var curManufacturer = "";

function showCarModels(data){

	var modelsSelect = document.getElementById("models");
	var manufacturer = document.getElementById("manufacturer").value;

	if(manufacturer == "none"){
		
		curManufacturer = manufacturer;
		clearAllData(modelsSelect);

	}else if(curManufacturer != manufacturer){

		curManufacturer = manufacturer; 

		var carModels;
		var index = 0;

		while(true){

			if(data[index].manufacturer == manufacturer){
				carModels = data[index].models;
				break;
			}

			index ++;

		}

		clearAllData(modelsSelect);

		for(var i=0; i<carModels.length; i++){

			var curOption = document.createElement('option');

			curOption.appendChild(document.createTextNode(carModels[i]));

			curOption.value = carModels[i];

			modelsSelect.appendChild(curOption); 

		}

	}

}

function clearAllData(select){

	for(i=select.length-1; i>0; i--){
		select.removeChild(select.options[i]);
	}

}

//------------------------------------------------------------------

function redirectToSearchCarPage(){

	var carName = document.getElementById("ss_srch_text").value;

	window.location.href = "../Html/searchPage.html?carName=" + encodeURIComponent(carName);

} 


function redirectToCarPage(id){

	var carId = document.getElementById(id+"_car_id").innerHTML;

	window.location.href = "../Html/carPage.html?carId=" + encodeURIComponent(carId);

} 



///////////////////////////////////////////////////////////////////////////////////////////////////////

function searchCar(){

	alert("va va! ras edzeb dzma? :)");

	getCars("internal");

}

function getCars(flag){

	hideAllCars();

	// parse url
	var url = document.location.href, 
	    params = url.split('?')[1].split('&'),
        info = {}, 
        tmp;

    for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        info[tmp[0]] = tmp[1];
    }

	fetch('../Json/cars.json')
		.then(response => response.json())
		.then((result) => {displayCars(result, info, flag)});

}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // 

var page = 0;
var lastPage = 0;
var wholeData;

function displayCars(data, info, flag){

	//--------------------------------------------------------------------- 



	if(flag == "external"){

		subData = []


		// filter by car name
		if(info.carName != null){
			
			for(var i=0; i<data.length; i++){

				// console.log(data[i].car_name.toLowerCase().replace(' '), info.carName.toLowerCase().replace('%20'));

				if(data[i].car_name.toLowerCase().replaceAll(" ", "") == info.carName.toLowerCase().replaceAll("%20", "")){

					subData.push(data[i]);

				}

			}

			data = subData;
			subData = [];

		}

		// filter by location
		if(info.location != null){ //we got location & from and until dates

			for(var i=0; i<data.length; i++){

				if(data[i].location.toLowerCase().replaceAll(" ", "") == info.location.toLowerCase().replaceAll("%20", "") || info.location.replaceAll("%20", "") === ""){

					// console.log((info.until) < (data[i].busy_from));
					// console.log((info.until), (data[i].busy_from));

					if((data[i].busy_from === "" && data[i].busy_till === "") ||
					   (info.until < data[i].busy_from) ||
					   (info.from > data[i].busy_till)){

						subData.push(data[i]);

					}

				}

			}
			
			data = subData;
			subData = [];
			
		}

		// filter by category
		if(info.category != null && info.category != "none"){

			for(var i=0; i<data.length; i++){

				if(data[i].category.toLowerCase() == info.category.toLowerCase()){

					subData.push(data[i]);					

				}

			}

			data = subData;
			subData = [];
	
		}

		// filter by manufacturer
		if(info.manufacturer != null && info.manufacturer != "none"){
			
			for(var i=0; i<data.length; i++){

				if(data[i].manufacturer.toLowerCase() == info.manufacturer.toLowerCase()){

					subData.push(data[i]);

				}

			}

			data = subData;
			subData = [];
	
		}

		// filter by model
		if(info.model != null && info.model != "none"){

			for(var i=0; i<data.length; i++){

				if(data[i].model.toLowerCase().replaceAll(" ", "") == info.model.toLowerCase().replaceAll("%20", "")){

					subData.push(data[i]);
				
				}

			}

			data = subData;
			subData = [];

		}

		// filter by price
		if(info.price_from != null || info.price_to != null){
			if(info.price_from != "" || info.price_to != ""){
				
				var p_from = parseInt(info.price_from);
				var p_to = parseInt(info.price_to);

				if(info.price_from == "") p_from = 0;
				if(info.price_to == "") p_to = 10000000;
				
				for(var i=0; i<data.length; i++){

					var car_price = parseInt(data[i].price);

					if(car_price <= p_to && p_from <= car_price){

						subData.push(data[i]);
					
					}

				}

				data = subData;
				subData = [];

			}
		}

		// filter by year
		if(info.year_from != null || info.year_to != null){
			if(info.year_from != "" || info.year_to != ""){

				var p_from = parseInt(info.year_from);
				var p_to = parseInt(info.year_to);

				if(info.year_from == "") p_from = 0;
				if(info.year_to == "") p_to = 3000;

				for(var i=0; i<data.length; i++){

					var model_year = parseInt(data[i].model_year);

					if(model_year <= p_to && p_from <= model_year){

						subData.push(data[i]);
					
					}

				}

				data = subData;
				subData = [];

			}
		}
			
		// filter by engine
		if(info.engine_from != null || info.engine_to != null){
			if(info.engine_from != "none" || info.engine_to != "none"){

				var p_from = info.engine_from;
				var p_to = info.engine_to;

				if(info.engine_from == "") p_from = "0.0";
				if(info.engine_to == "") p_to = "20.0";

				for(var i=0; i<data.length; i++){

					var engine = data[i].engine;

					if(engine <= p_to && p_from <= engine){

						subData.push(data[i]);
					
					}

				}

				data = subData;
				subData = [];

			}
		}

		// filter by transmission
		if(info.transmission != null && info.transmission != "none"){

			for(var i=0; i<data.length; i++){

				if(data[i].transmission.toLowerCase() == info.transmission.toLowerCase()){

					subData.push(data[i]);
				
				}

			}

			data = subData;
			subData = [];

		}

		// filter by fuel
		if(info.fuel != null && info.fuel != "none"){

			for(var i=0; i<data.length; i++){

				fl = info.fuel.toLowerCase().replaceAll("%20", "");

				if(data[i].fuel.toLowerCase().replaceAll(" ", "") == fl.replaceAll("%26", "&")){

					subData.push(data[i]);
				
				}

			}

			data = subData;
			subData = [];

		}

		// filter by helm
		if(info.helm != null && info.helm != "none"){

			for(var i=0; i<data.length; i++){

				if(data[i].helm.toLowerCase() == info.helm.toLowerCase()){

					subData.push(data[i]);
				
				}

			}

			data = subData;
			subData = [];

		}

		// filter by seats
		if(info.seats != null && info.seats != "none"){

			for(var i=0; i<data.length; i++){

				if(data[i].seats.toLowerCase() == info.seats.toLowerCase()){

					subData.push(data[i]);
				
				}

			}

			data = subData;
			subData = [];

		}

		// filter by color
		if(info.color != null && info.color != ""){

			for(var i=0; i<data.length; i++){

				if(data[i].color.toLowerCase() == info.color.toLowerCase()){

					subData.push(data[i]);
				
				}

			}

			data = subData;
			subData = [];

		}

		// filter by city
		if(info.city != null){
			
			for(var i=0; i<data.length; i++){

				if(data[i].location.toLowerCase() == info.city.toLowerCase()){

					subData.push(data[i]);
				
				}

			}

			data = subData;
			subData = [];
	
		}

	}else{ //if internal

		var location = document.getElementById("f_location").value;
		var from = document.getElementById("f_from").value;
		var until = document.getElementById("f_to").value;

		var category = document.getElementById("categories").value;
		var manufacturer = document.getElementById("manufacturer").value;
		var model = document.getElementById("models").value;
		
		var priceFrom = document.getElementById("p_from").value;
		var priceTo = document.getElementById("p_to").value;
		var yearFrom = document.getElementById("y_from").value;
		var yearTo = document.getElementById("y_to").value;
		var engineFrom = document.getElementById("engine_from").value;
		var engineTo = document.getElementById("engine_to").value;

		var transmission = document.getElementById("transmission_filtr").value;
		var fuel = document.getElementById("fuel_filtr").value;
		var helm = document.getElementById("helm_filtr").value;
		var seats = document.getElementById("sealts_filtr").value;
		var color =  document.getElementById("color_filtr").value;

		window.location.href = "../Html/searchPage.html?category=" + encodeURIComponent(category) +
							   "&manufacturer=" + encodeURIComponent(manufacturer) +
							   "&model=" + encodeURIComponent(model) +
							   "&price_from=" + encodeURIComponent(priceFrom) +
							   "&price_to=" + encodeURIComponent(priceTo) +
							   "&year_from=" + encodeURIComponent(yearFrom) + 
							   "&year_to=" + encodeURIComponent(yearTo) + 
							   "&engine_from=" + encodeURIComponent(engineFrom) +
							   "&engine_to=" + encodeURIComponent(engineTo) + 
							   "&transmission=" + encodeURIComponent(transmission) +
							   "&fuel=" + encodeURIComponent(fuel) + 
							   "&helm=" + encodeURIComponent(helm) +
							   "&seats=" + encodeURIComponent(seats) + 
							   "&color=" + encodeURIComponent(color) +
							   "&location=" + encodeURIComponent(location) + 
							   "&from=" + encodeURIComponent(from) + 
							   "&until=" + encodeURIComponent(until);  

	}

	console.log(data);

	// // // // // // // // // // // 

	page = 0;
	lastPage = 0;

	if(data.length != 0){
		if(data.length % 8 == 0){
			lastPage = data.length / 8 - 1;
		}else{
			lastPage = Math.trunc(data.length / 8);
		}
	}

	wholeData = data;

	// // // // // // // // // // // 

	showCurentCarPage(1, 9);

}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 


function showNextPage(){

	console.log("Right", lastPage);

	if(page != lastPage){ //not last page

		page+=1;

		var from = page*8+1;

		var to = page*8+9;

		showCurentCarPage(from, to);

	}

}

function showPreviousPage(){

	console.log("Left", lastPage);

	if(page != 0){ //not first page

		page-=1;

		var to = page*8+9;

		var from = page*8+1;

		showCurentCarPage(from, to);

	}

}


function showCurentCarPage(from, to){

	window.scrollTo(0,0);

	document.getElementById("page_num").innerHTML = (page + 1) + "/" + (lastPage+1);

	hideAllCars();	

	index = 1;

	for(var i=from; i<to; i++){

		if(i == wholeData.length) break;

		document.getElementById(index + "").style.display = "flex";
		document.getElementById(index + "_car_id").innerHTML = wholeData[i-1].id;
		document.getElementById(index + "_car_name").innerHTML = wholeData[i-1].car_name;
		document.getElementById(index + "_model_year").innerHTML = "Model year: " + wholeData[i-1].model_year;
		document.getElementById(index + "_engine").innerHTML = "Engine: " + wholeData[i-1].engine;
		document.getElementById(index + "_transmission").innerHTML = "Transmission: " + wholeData[i-1].transmission;
		document.getElementById(index + "_helm").innerHTML = "Helm: " + wholeData[i-1].helm;
		document.getElementById(index + "_price").innerHTML = "Price: " + wholeData[i-1].price + "$/day";
		document.getElementById(index + "_raiting").innerHTML = wholeData[i-1].owner_raiting;

		index+=1;

	}

}

// ----------------

function hideAllCars(){

	for(var i=1; i<=8; i++){
		document.getElementById(i).style.display = "none";
	} 

}