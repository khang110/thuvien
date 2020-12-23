$(document).ready(function() {
    $("#add-employee").click(function() {
        let firstname = $("#firstname").val();
        let lastname = $("#lastname").val();
        let gender = $("#gender").val();
        let username = $("#username").val();
        let password = $("#password").val();
        let role = $("#role").val();
        let dob = $("#dob").val();
        let email = $("#email").val();
        let phone = $("#phone").val();
        let address = $("#address").val();
        let infoCard = $("#infoCard").val();
        if (firstname == "" || lastname == "" || gender == "" || username == "" || password == "" || role == "" ||
            dob == "" || email == "" || phone == "" || address == "" || infoCard == "") {
            alert("vui long nhap day du thong tin");
        } else {
            axios({
                method: "post",
                url: "http://localhost:3000/employee",
                data: {
                    "firstname": firstname,
                    "lastname": lastname,
                    "gender": gender,
                    "username": username,
                    "password": password,
                    "role": role,
                    "phonenumber": phone,
                    "email": email,
                    "address": address,
                    "born": dob
                }
            }).then((res) => {
                alert("Bạn đã thêm nhân viên thành công thành công !!!")
                $("#firstname").val("");
                $("#lastname").val("");
                $("#gender").val("");
                $("#username").val("");
                $("#password").val("");
                $("#role").val("");
                $("#dob").val("");
                $("#email").val("");
                $("#phone").val("");
                $("#address").val("");
                $("#infoCard").val("");
            })
        }
    });
    $("#cancel-add-employee").click(function() {
        if (firstname != "" || lastname != "" || gender != "" || username != "" || password != "" || role != "" ||
            dob != "" || email != "" || phone != "" || address != "" || infoCard != "") {
            $("#firstname").val("");
            $("#lastname").val("");
            $("#gender").val("");
            $("#username").val("");
            $("#password").val("");
            $("#role").val("");
            $("#dob").val("");
            $("#email").val("");
            $("#phone").val("");
            $("#address").val("");
            $("#infoCard").val("");
        }
    })
})