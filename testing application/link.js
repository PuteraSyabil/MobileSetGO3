var app = angular.module("myApp", ["ngRoute"]);
	app.config(function($routeProvider) {
		$routeProvider
		.when("/", {templateUrl : "Home_Login.html"})
		
		.when("/Testing_application_type_not_in_the_library", {templateUrl : "Testing_application_type_not_in_the_library.html"})
		
		.when("/blank_page_no_type", {templateUrl : "blank_page_no_type.html"})
		
		.when("/row_button", {templateUrl : "row_button.html"})
		
		.when("/About", {templateUrl : "About.html"})
		
		.when("/Musics", {templateUrl : "Musics.html"})
		
		.when("/Photos_List", {templateUrl : "Photos_List.html"})
		
		.when("/Contact", {templateUrl : "Contact.html"})
		
		.when("/Info", {templateUrl : "Info.html"})
		
});function w3_open() {document.getElementById("mySidebar").style.display = "block";}function w3_close() {document.getElementById("mySidebar").style.display = "none";}