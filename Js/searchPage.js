
// ---------------------------------------------------------------

//needs to get info it filter must be shown or hidden
checker = 1; 

function showFilter(){

	checker += 1;

	if(checker % 2 == 0){
		document.getElementById("filter_sub").style.height = "450px";
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

}

function searchCar(){

	alert("va va! ras edzeb dzma? :)");

}
