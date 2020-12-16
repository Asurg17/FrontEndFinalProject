
window.addEventListener("load", changeH1Text);

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
	document.getElementById("info_img").src = "C:/Users/student/Desktop/FrontEndFinalProject/Asserts/terms.jpg"
	window.scrollTo(0, 0);
}	

function changeToPrivacy(){
	document.getElementById("txt").innerHTML = "Privacy";
	document.getElementById("info_img").src = "C:/Users/student/Desktop/FrontEndFinalProject/Asserts/privacy.jpg"
	window.scrollTo(0, 0);
}

function changeToVacancies(){
	document.getElementById("txt").innerHTML = "Vacancies";
	document.getElementById("info_img").src = "C:/Users/student/Desktop/FrontEndFinalProject/Asserts/vacancies.jpg"
	document.getElementById("text").innerHTML = "In Our Company we have following vacancies: Web developer; Orecle developer; Website Administrator; Java developer; Car dealer;"
	window.scrollTo(0, 0);
}

function changeToTeam(){
	document.getElementById("txt").innerHTML = "Team";
	document.getElementById("info_img").src = "C:/Users/student/Desktop/FrontEndFinalProject/Asserts/team.jpg"
	window.scrollTo(0, 0);
}


