var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'))  // serve static file

var Student = require('./modules/Student.js');

app.use('/showAll', function(req, res) {   // Retrieve all
                                             
    Student.find( function(err, students) {   
		 if (err) {
		     res.status(500).send(err);
		 }
		 else {
			 res.send(students);  
		 }
    });
})


app.post('/addStudent', function(req, res){
    var newStudent = new Student ({
        sid: req.body.sid,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        major: req.body.major,
        midterm: 0,        // new student has no scores yet
        final: 0
    });

    newStudent.save(function(err) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.send("Student successfully added.");
        }
    });
});

app.get('/getOne', function(req, res) {     // Retrieve student using sid
    const sid = req.query.sid
    
    Student.findOne( {sid: sid}, function(err, student) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.send(student);
        }
    });
});


app.post('/editStudent', function(req, res) {   // Update miles and price
    const sid = req.query.sid
    var update_major = req.body.major;    // get posted properties
    var update_midterm = req.body.midterm;
	var update_final= req.body.final;

    
    Student.findOne( {sid: sid}, function(err, student) {  
		if (err) {
		    res.status(500).send(err);
		}
		else if (!student) {
		    res.send('No student with an id of ' + sid);
		}
		else {
			student.major = update_major;
            student.midterm = update_midterm;
            student.final = update_final;
		
			student.save(function (err) {
                if(err) {
                    res.status(500).send(err);
                } else {
                res.send("Update successful");
                }
            });
	   }
    });        

});


app.listen(3000,  function() {
	console.log('Listening on port 3000, ctrl-c to quit');
    });

