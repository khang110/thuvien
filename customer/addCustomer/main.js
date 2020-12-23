$(document).ready(function() {
    $('#add-customer').click(function() {
        let firstname = $("#firstname").val();
        let lastname = $("#lastname").val();
        let gender = $("#gender").val();
        let password = $("#password").val();
        let customerClass = $("#role").val();
        let email = $("#email").val();
        let phone = $("#phone").val();
        let address = $("#address").val();
        if(firstname == ""|| lastname == ""|| gender == "" || password == ""|| customerClass == ""|| email == ""|| phone == ""|| address == "")
            alert("Please fill out all information!")
        else {
            axios({
                method: "post",
                url: "http://localhost:3000/customer",
                data:{
                    "firstname":firstname,
                    "lastname": lastname,
                    "gender": gender,
                    "password": password,
                    "customerClass": customerClass,
                    "email": email,
                    "phone": phone,
                    "address": address
                }
            }).then((res) =>{
                alert("Added a new customer successfully!");
                $("firstname").val("");
                $("lastname").val("");
                $("gender").val("");
                $("password").val("");
                $("role").val("");
                $("email").val("");
                $("phone").val("");
                $("address").val("");
            })
        }
    });
    $('#cacel-add-customer').click(function() {
        if(firstname != ""|| lastname != ""|| gender != "" || password != ""|| customerClass != ""|| email != ""|| phone != ""|| address != "") {
            $("firstname").val("");
            $("lastname").val("");
            $("gender").val("");
            $("password").val("");
            $("role").val("");
            $("email").val("");
            $("phone").val("");
            $("address").val("");
        }
    })

})