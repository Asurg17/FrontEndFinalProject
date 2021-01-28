
// ---------------------------------------------------------------

window.onload = function(){

	document.getElementById("filter_button").addEventListener("click", showFilter);

	document.getElementById("search_car").addEventListener("click", searchCar);

 	document.getElementById("manufacturer").addEventListener("click", getCarModels);

 	getCarFilterInfo();

 	checkWindowSize();

}

window.addEventListener("resize", checkWindowSize);

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


function searchCar(){

	alert("va va! ras edzeb dzma? :)");

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
	var color =  document.getElementById("color_filtr").value ;

	console.log(category, manufacturer, model, priceFrom, priceTo, yearFrom, yearTo, engineFrom, engineTo, transmission, fuel, helm, seats, color);

}
