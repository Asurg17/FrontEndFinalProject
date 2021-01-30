
// ---------------------------------------------------------------

window.onload = function(){

	checkWindowSize();

	document.getElementById("log_in").addEventListener("click", redirectToUserPage);
	document.getElementById("sign_up").addEventListener("click", getUserJson);

}


function redirectToUserPage(){

	fetch('../Json/users.json')
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

				window.location.href = "../Html/userPage.html?id=" + encodeURIComponent(id);

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

	fetch('../Json/usr.json')
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

	// const fs = require('fs')

	// let dt = "Learning how to write in a file."

	// fs.writeFile('../Json/zd.txt', dt, (err) => {
	// 	if (err) throw err; 
	// }) 
	
	// alert(data[6]);

	// data[data.length + 1] = {
	// 						    id: '1',
	// 							first_name: 'Mike',
	// 							last_name: 'Jhonsos',
	// 							email: 'mike76i@gmail.com',
	// 							username: 'jmike',
	// 							password: 'mike123',
	// 							location: 'Batumi',
	// 							phone: '598947568',
	// 							raiting: '5.0',
	// 							adverts: '0'
	// 						};

	// alert(data[6]);
	
}


// ---------------------------------------
let maxSize = 6;
let num = 0;

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

// --------------------------------------------------------------------------------------
// var elems = document.body.getElementsByTagName("*");
// for(i=0; i<elems.length; i++){
// 	elems[i].style.display = "none";
// }
// --------------------------------------------------------------------------------------
function search(){
	window.location.href = "../Html/searchPage.html"
}

// Event listeners
window.addEventListener("resize", checkWindowSize);