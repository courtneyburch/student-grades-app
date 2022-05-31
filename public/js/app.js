var app = angular.module('studentApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider 
      .when('/', {
          templateUrl : 'partials/all_students.html',    // route for the home page
          controller : 'allCtrl'
      })
	  .when('/all_students', {
          templateUrl : 'partials/all_students.html',    // route for the home page
          controller : 'allCtrl'
      })
      .when('/add_student', {
          templateUrl : 'partials/add_student.html',    // edit a student record
          controller : 'addCtrl'
      })

      .when('/edit_student', {
        templateUrl : 'partials/edit_student.html',    // edit a student record
        controller : 'editCtrl'
    })
      .otherwise({
          redirectTo: 'partials/all_students.html'        // any other URL goes to home
      });
});

app.controller('allCtrl', function($scope, $http){

    $http.get('/showAll')          // get all the students
     .then(function (response) {
	    $scope.students = response.data;  
     }); 
});

app.controller('editCtrl', function($scope, $http){

$scope.findStudent = function(){
    url = "/getOne?sid=" + $scope.student.sid
    $http.get(url)                      
   	.then(function (response) {
        $scope.student = response.data;
        $scope.first_name= student.first_name;
        $scope.last_name= student.last_name;
        $scope.major = student.major;
        $scope.midterm = student.midterm;
        $scope.final = student.final;
                                
		});
    
}

$scope.updateRecord = function(){
    
    url = "/editStudent?sid=" + $scope.student.sid
    var info = {
        major : $scope.student.major,
        midterm : $scope.student.midterm,
        final : $scope.student.final
    }

    $http.post(url, info)
    .then(function(response){
        $scope.status = response.data;
        
    })
}
});


app.controller('addCtrl', function($scope, $http) {
                  
        
    $scope.addRecord = function() {      // add a student
        var info = {
            sid : $scope.sid,       // set up data object
            first_name : $scope.first_name,
            last_name : $scope.last_name,
            major: $scope.major,
           }

        url = "/addStudent";

        $http.post(url, info)         // post the object data
            .then(function (response) {
                 $scope.status = response.data;   //print status of request

         
           
        });

        
    };
});