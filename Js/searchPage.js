
// ---------------------------------------------------------------

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

// ########

window.onload = function(){

	var carSearchBut = document.getElementById("search_car");
 	
 	carSearchBut.addEventListener("click", searchCar);

 	checkWindowSize();

}

window.addEventListener("resize", checkWindowSize);


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

function searchCar(){

	alert("va va! ras edzeb dzma? :)");

}
