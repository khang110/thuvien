'use strict';
var fs = require('fs');
var readlineSync = require('readline-sync');

var employeeInfo = [];

function save() {
    var dl = JSON.stringify(employeeInfo);
    fs.writeFileSync('data.json', dl, { encoding: 'utf-8' });
}

function saveInfo() {
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var gender = document.getElementById("gender").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var role = document.getElementById("role").value;
    var dob = document.getElementById("dob").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var address = document.getElementById("address").value;
    var id = document.getElementById("infoCard").value;
    var employee = {
        id: id,
        firstname: firstname,
        lastname: lastname,
        gender: gender,
        username: username,
        password: password,
        role: role,
        phonenumber: phone,
        email: email,
        address: address,
        born: dob
    };

    employeeInfo.push(employee);

}