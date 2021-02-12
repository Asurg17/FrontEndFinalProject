
// --------------------------------------------------------------------------------------

window.onload = function(){

	var url = document.location.href, 
	    params = url.split('?')[1].split('&'),
        data = {}, 
        tmp;

    for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1];
    }

	getUserInfo(data.id);

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	document.getElementById("header_logo").addEventListener("click", redirectToMainPage);

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	document.getElementById("add_car").addEventListener("click", openPopupForm);
	document.getElementById("remove_car").addEventListener("click", openClosePopupForm);
	document.getElementById("cange_password").addEventListener("click", openChPswPopupForm);
	document.getElementById("change_pdata").addEventListener("click", openChPopupForm);
	document.getElementById("add_car_busy_time").addEventListener("click", openBusyPopupForm);
	document.getElementById("show_car_ids").addEventListener("click", showAdverIds);

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	document.getElementById("b_add_car").addEventListener("click", addCar);
	document.getElementById("b_remove_car").addEventListener("click", removeCar);
	document.getElementById("b_change_password").addEventListener("click", changePassword);
	document.getElementById("b_change_pdata").addEventListener("click", changePersonalData);
	document.getElementById("b_busy_time").addEventListener("click", addBusyTime);

}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function redirectToMainPage(){

	window.location.replace("../index.html");

}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var curUser;

function getUserInfo(id){

	fetch('../Json/users.json')
		.then(response => response.json())
		.then((result) => {setUserInfo(result,id)});

}


function setUserInfo(data, id){

	curUser = data[id];

	var username = curUser.username;
	var whole_name = curUser.first_name + " " + curUser.last_name;
	var contact = "(+995) " + curUser.phone;
	var location = "Georgia, " + curUser.location;
	var raiting = curUser.raiting;
	var adverts = curUser.adverts;

	document.getElementById("username").innerHTML = username;
	document.getElementById("u_name").innerHTML = whole_name;
	document.getElementById("u_contact").innerHTML = contact;
	document.getElementById("u_location").innerHTML = location;
	document.getElementById("u_raiting").innerHTML = raiting;
	document.getElementById("u_adverts").innerHTML = adverts;

}


// Popups 
function openPopupForm(){
	document.body.classList.add("showAddCarForm");
}

function closePopupForm(){
	document.body.classList.remove("showAddCarForm");
}

function openClosePopupForm(){
	document.body.classList.add("showRemoveCarForm");
}

function closeClosePopupForm(){
	document.body.classList.remove("showRemoveCarForm");
}

function openChPopupForm(){
	document.body.classList.add("showChAddCarForm");
}

function closeChPopupForm(){
	document.body.classList.remove("showChAddCarForm");
}

function openChPswPopupForm(){
	document.body.classList.add("showChPasswordForm");
}

function closeChPswPopupForm(){
	document.body.classList.remove("showChPasswordForm");
}

function openBusyPopupForm(){
	document.body.classList.add("showBusyForm");
}

function closeBusyPopupForm(){
	document.body.classList.remove("showBusyForm");
}

function closeEveryForm(){
	document.body.classList.remove("showAddCarForm");
	document.body.classList.remove("showRemoveCarForm");
	document.body.classList.remove("showChAddCarForm");
	document.body.classList.remove("showBusyForm");
	document.body.classList.remove("showChPasswordForm");
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function addCar(){

	fetch('../Json/cars.json')
		.then(response => response.json())
		.then((result) => {add(result)});

}

function add(data){

	var newCarId = data.length+1;

	var newCarName = document.getElementById("car_name").value;
	var newCarManufacturer = document.getElementById("manufacturer").value;
	var newCarModel = document.getElementById("model").value;
	var newCarModelYear = document.getElementById("model_year").value;
 	var newCarCategory = document.getElementById("category").value;
 	var newCarEngine = document.getElementById("engine").value;
 	var newCarTransmission = document.getElementById("transmission").value;
 	var newCarHelm = document.getElementById("helm").value;
 	var newCarFuel = document.getElementById("fuel").value;
 	var newCarColor = document.getElementById("color").value;
 	var newCarSeats = document.getElementById("seats").value;
 	var newCarPrice = document.getElementById("price").value;
 	var newCarImages = document.getElementById("images").value;
 	var newCarDescription = document.getElementById("description").value;

 	// if some rows are empty
 	if(newCarName == "" || newCarManufacturer == "" || newCarModel == "" || newCarModelYear == "" ||
 	   newCarCategory == "" || newCarEngine == "" || newCarTransmission == "" || newCarHelm == "" || 
 	   newCarFuel == "" || newCarColor == "" || newCarSeats == "" || newCarPrice == ""){

 		alert("All rows were not fille. Please fill all rows correctly and try again!");

 	}else{

 		document.getElementById("f_add_car").reset();

 	}

 	// add car into json


}

// -- - -- - -- - -- - -- - -- - --

function removeCar(){

	var carId = document.getElementById("car_id").value;

	document.getElementById("f_remove_car").reset();

	if(carId != ""){
		fetch('../Json/cars.json')
			.then(response => response.json())
			.then((result) => {remove(result, carId)});
	}else{
		alert("Please enter car id, wich you want to remove");
	}

}

function remove(data, carId){

	if(data[carId-1] == null){
		alert("Enter correct car id!");
	}else{

		var carUserId = data[carId-1].owner_id;;
		
		if(carUserId != curUser.id){

			alert("You can't remove this car. (not owner)!");

		}else{

			// remove car from json

		}

	}

}

// -- - -- - -- - -- - -- - -- - --

function changePassword(){

	var oldPassword = document.getElementById("old_password").value;
	var newPassword = document.getElementById("new_password").value;
	var confNewPassword = document.getElementById("confirm_password").value;

	document.getElementById("f_password").reset();

	if(oldPassword != curUser.password){
		alert("Please enter correct old password");
	}else if(newPassword != confNewPassword){
		alert("Password mismatch");
	}else if(newPassword == oldPassword){
		alert("You can't use old password!")
	}else{

		if(newPassword.length < 5 || confNewPassword < 5){
			alert("Password must be al least five characters long!");
		}


		// change password in json

	}

}


// -- - -- - -- - -- - -- - -- - --

function changePersonalData(){

	var username = document.getElementById("username").value;
	var firstName = document.getElementById("frst_name").value;
	var lastName = document.getElementById("lst_name").value;
	var phone = document.getElementById("contact").value;
	var location = document.getElementById("location").value;

	document.getElementById("f_personal_data").reset();

	// add new personal data into json

}

// -- - -- - -- - -- - -- - -- - --

function addBusyTime(){

	var carId = document.getElementById("id_of_car").value;
	var from = document.getElementById("busy_from").value;
	var to = document.getElementById("busy_to").value;

	if(carId == "" || from == "" || to == ""){
		alert("Please fill all rows!");
	}else if(from > to){
		alert("From date can't be bigger that to date!");
	}else{

		// am manqanis naxva da bysy_from busy_to s update-i

	}

}


// -- -- -- -- -- -- -- -- -- -- -- -- -- --

function showAdverIds(){

	fetch('../Json/cars.json')
			.then(response => response.json())
			.then((result) => {listIds(result)});

}

function listIds(data){

	var cur_owner_id = curUser.id;

	var ids = []

	for(var i=0; i<data.length; i++){
		if(data[i].owner_id == cur_owner_id){

			var newElem = ["[ " + data[i].id + ": " + data[i].car_name + ", " + data[i].color + " ]"]
			
			ids.push(newElem);
		
		}
	}

	alert(ids);

	console.log(ids);


}