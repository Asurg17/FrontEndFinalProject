
// ---------------------------------------------------------------\
let maxSize;
let num;

// ---------------------------------------------------------------


window.onload = function(){ 

	maxSize = 6;
	num = 0;
	
	checkWindowSize();

	window.addEventListener("resize", checkWindowSize);

	document.getElementById("left_one").addEventListener("click", slideRight);
	document.getElementById("right_one").addEventListener("click", slideLeft);

	document.getElementById("log_in").addEventListener("click", redirectToUserPage);
	document.getElementById("sign_up").addEventListener("click", getUserJson);
	document.getElementById("search_the_car").addEventListener("click", searchTheCarByCarName);
	document.getElementById("srch_butt").addEventListener("click", searchTheCarByLocationAndDate);

}

// --------------------

function searchTheCarByCarName(){

	var carName = document.getElementById("srch_txt").value;

	window.location.href = "./Html/searchPage.html?carName=" + encodeURIComponent(carName);

}

function searchTheCarByLocationAndDate(){

	var location = document.getElementById("c_location").value;
	var from = document.getElementById("c_from").value;
	var until = document.getElementById("c_until").value;

	window.location.href = "./Html/searchPage.html?location=" + encodeURIComponent(location) +
						   "&from=" + encodeURIComponent(from) + "&until=" + encodeURIComponent(until);

}



// ----------------------------------------------------------------

function redirectToUserPage(){

	fetch('./Json/users.json')
		.then(response => response.json())
		.then((result) => {redirect(result)});

}

function redirect(data){

	var username = document.getElementById("l_username").value;
	var password = document.getElementById("l_password").value;
	
	var errorCode = 0;
	var index = 0;

	while(true){

		if(index == data.length){
			errorCode = -999;
			break;
		}

		if(data[index].username == username){
			

			if(data[index].password == password){

				var id = index;

				window.location.href = "./Html/userPage.html?id=" + encodeURIComponent(id);

				break;

			}else{

				errorCode = -998

				break;

			}
		
		}

		index ++;

	}

	if(errorCode == -999){
		alert("Such Username Was Not Found!");
	}else if(errorCode == -998){
		alert("Password Is Incorrect!")
	}


}


// ------------------------------------------------------

function getUserJson(){

	fetch('./Json/users.json')
		.then(response => response.json())
		.then((result) => {addNewUser(result)});

}

function addNewUser(data){

	var first_name = document.getElementById("s_firstName").value;
	var last_name = document.getElementById("s_lastName").value;
	var email = document.getElementById("s_email").value;
	var username = document.getElementById("s_username").value;
	var phone = document.getElementById("s_phone").value;
	var location = document.getElementById("s_location").value;
	var password = document.getElementById("s_password").value;
	var conf_password = document.getElementById("s_confirm_password").value;

	checkPassword(password, conf_password);
	checkUser(username, data);

	// to be continued ..
		
}

// checks if password are same
function checkPassword(password, conf_password){
	if (password != conf_password) {
		alert("Passwords are not same!");
	}
}

// checks if user with given username already exists
function checkUser(username, data){

	for(var i=0; i<data.length; i++){

		if(username == data[i].username){
			alert("Username already exists!");
			break;
		}

	}

}


// ---------------------------------------

function checkWindowSize(){

	var w = window.innerWidth;

	if(w <= 1550){
		
		maxSize = 5;
		
		document.getElementById("cabriolet").style.display="none";

	}else{

		document.getElementById("cabriolet").style.display="flex";

	}

	w = window.innerWidth;

	if(w <= 1350){
		
		maxSize = 4;

		document.getElementById("coupe").style.display="none";

	}else{

		document.getElementById("coupe").style.display="flex";

	}

	w = window.innerWidth;

	if(w <= 1150){
		
		maxSize = 3;

		document.getElementById("sedan").style.display="none";

	}else{

		document.getElementById("sedan").style.display="flex";

	}

	w = window.innerWidth;

	if(w <= 1000){
		
		maxSize = 2;

		document.getElementById("suv").style.display="none";

	}else{

		document.getElementById("suv").style.display="flex";

	}

	w = window.innerWidth;

	if(w <= 650){
		
		maxSize = 1;

		document.getElementById("minivan").style.display="none";

	}else{

		document.getElementById("minivan").style.display="flex";

	}

	w = window.innerWidth;

	//######################## 

	if(w > 650){
		maxSize = 2;
	}
	if(w > 1000){
		maxSize = 3;
	}
	if(w > 1150){
		maxSize = 4;
	}
	if(w > 1350){
		maxSize = 5;
	}
	if(w > 1550){
		maxSize = 6;
	}

}


// --------------------------------------------------------------------------------------
// Slider


function slideLeft() {

	let arr = document.querySelectorAll(".browse_cars_style");
	let size = arr.length;

	arr[(num)%size].style.display = "none";

	for (i=0; i<maxSize; i++){
		arr[(num + 1 + i)%size].style.order = i+1;
		arr[(num + 1 + i)%size].style.display = "flex";
	}

	num = num + 1;
}

function slideRight() {

	let arr = document.querySelectorAll(".browse_cars_style");
	let size = arr.length;

	index = (num+(maxSize-1))%size;

	arr[index].style.display = "none";

	index = index - maxSize;

	if(index < 0){
		index = size + index;
	}

	for (i=0; i<maxSize; i++){
		arr[(index+i)%size].style.order = i+1;
		arr[(index+i)%size].style.display = "flex";
	}	
	if(num == 0){
		num = size - 1;
	}else{
		num = num - 1;
	}

}

// --------------------------------------------------------------------------------------
function openLogInForm(){
	document.body.classList.add("showLogInForm");
}

function closeLogInForm(){
	document.body.classList.remove("showLogInForm");
}

function openSignUpForm(){
	document.body.classList.add("showSignUpForm");
}

function closeSignUpForm(){
	document.body.classList.remove("showSignUpForm");
}

function closeEveryForm(){
	document.body.classList.remove("showLogInForm");
	document.body.classList.remove("showSignUpForm");
}

