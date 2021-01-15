
// --------------------------------------------------------------------------------------
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
