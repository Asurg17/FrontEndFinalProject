
// ----------------------------------------------------------------------------------------------------
window.onload = function(){

	document.getElementById("search_the_car").addEventListener("click", searchTheCarByCarName);

}

function searchTheCarByCarName(){

	var carName = document.getElementById("srch_txt").value;

	window.location.href = "../Html/searchPage.html?carName=" + encodeURIComponent(carName);

}

// --------------------------------------

function changeH1Text(){

	let url = window.location.href;
	let parts = url.split('?');
	let inf = parts[1];

	if(inf == "Terms"){
		changeToTerms();
	}else if(inf == "Privacy"){
		changeToPrivacy();
	}else if(inf == "Vacancies"){
		changeToVacancies();
	}else if(inf == "Team"){
		changeToTeam();
	}
}

function changeToTerms(){
	document.getElementById("txt").innerHTML = "Terms";
	document.getElementById("info_img").src = "../Asserts/terms.jpg"
	window.scrollTo(0, 0);
}	

function changeToPrivacy(){
	document.getElementById("txt").innerHTML = "Privacy";
	document.getElementById("info_img").src = "../Asserts/privacy.jpg"
	window.scrollTo(0, 0);
}

function changeToVacancies(){
	document.getElementById("txt").innerHTML = "Vacancies";
	document.getElementById("info_img").src = "../Asserts/vacancies.jpg"
	document.getElementById("text").innerHTML = "In Our Company we have following vacancies: Web developer; Orecle developer; Website Administrator; Java developer; Car dealer; Please contact us on our email address crss@gmail.com "
	window.scrollTo(0, 0);
}

function changeToTeam(){
	document.getElementById("txt").innerHTML = "Team";
	document.getElementById("info_img").src = "../Asserts/team.jpg"
	window.scrollTo(0, 0);
}


// -----------------
window.addEventListener("load", changeH1Text);