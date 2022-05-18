var app = angular.module("myApp", ["ngRoute"]);
	app.config(function($routeProvider) {
		$routeProvider
		.when("/", {templateUrl : "Home_Login.html"})
		
		.when("/About", {templateUrl : "About.html"})
		
		.when("/Photos", {templateUrl : "Photos.html"})
		
		.when("/Contact", {templateUrl : "Contact.html"})
		
		.when("/Info", {templateUrl : "Info.html"})
		
});function w3_open() {document.getElementById("mySidebar").style.display = "block";}function w3_close() {document.getElementById("mySidebar").style.display = "none";}