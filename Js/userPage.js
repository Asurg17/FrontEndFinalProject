
// --------------------------------------------------------------------------------------


window.onload = function(){

	document.getElementById("header_logo").addEventListener("click", redirectToMainPage);

	// ---

	var url = document.location.href, 
	    params = url.split('?')[1].split('&'),
        data = {}, 
        tmp;

    for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1];
    }

	getUserInfo(data.id);

}

function redirectToMainPage(){

	window.location.replace("../Html/index.html");

}


function getUserInfo(id){

	fetch('../Json/users.json')
		.then(response => response.json())
		.then((result) => {setUserInfo(result,id)});

}


function setUserInfo(data, id){

	var curUser = data[id];

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

function closeEveryForm(){
	document.body.classList.remove("showAddCarForm");
	document.body.classList.remove("showChAddCarForm");
	document.body.classList.remove("showChPasswordForm");
}
