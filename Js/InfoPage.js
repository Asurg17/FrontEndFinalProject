
window.addEventListener("load", changeH1Text);

function changeH1Text(){
	let url = window.location.href;
	let parts = url.split('?');
	let inf = parts[1];

	if(inf == "Terms"){
		changeToTerms();
	}else if(inf == "Privacy"){
		changeToPrivacy();
	}
}

function changeToTerms(){
	document.getElementById("txt").innerHTML = "Terms";
	window.scrollTo(0, 0);
}	

function changeToPrivacy(){
	document.getElementById("txt").innerHTML = "Privacy";
	window.scrollTo(0, 0);
}