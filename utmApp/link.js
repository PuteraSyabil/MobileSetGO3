var app = angular.module("myApp", ["ngRoute"]);
	app.config(function($routeProvider) {
		$routeProvider
		.when("/", {templateUrl : "Home_Login.html"})
		
		.when("/blank_page_no_type", {templateUrl : "blank_page_no_type.html"})
		
		.when("/row_button", {templateUrl : "row_button.html"})
		
		.when("/About", {templateUrl : "About.html"})
		
		.when("/Musics", {templateUrl : "Musics.html"})
		
		.when("/Photos_List", {templateUrl : "Photos_List.html"})
		
		.when("/Contact", {templateUrl : "Contact.html"})
		
		.when("/Info", {templateUrl : "Info.html"})
		
});