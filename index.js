const express = require("express");
const app = express();
const cors = require("cors")

app.use(express.json())
app.use(cors({
    origin: "*"
}))

var students = []

app.post("/usercreate", function (req, res) {
    req.body.id = students.length + 1;
    students.push(req.body);

    res.json({
        message: "Student added successfully"
    })
})

app.get("/userlist", function (req, res) {
    res.json(students)
})

app.post('/useredit/:id', function (req, res) {
    var id = parseInt(req.params.id) - 1;
    students[id] = req.body;
    students[id].id = id + 1;

    res.json({
        message: "Student edited successfully"
    })

});

app.get('/useredit/:id', function (req, res) {
    var id = parseInt(req.params.id) - 1;

    res.json(students[id])

});

app.post('/userdelete/:id', function (req, res) {
    var id = parseInt(req.params.id) - 1;
    if (id !== undefined)
        students.splice(id, 1);
    res.json({
        message: "Student deleted successfully"
    })

});

app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running")
})
