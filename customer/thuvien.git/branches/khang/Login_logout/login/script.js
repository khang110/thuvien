$(document).ready(function() {
    const getData_ = async() => {
        await axios({
            method: "get",
            url: "http://localhost:3000/employee"
        }).then((res) => {
            data = res.data;
            $("#btn-log").click(function() {
                let username = $("#username").val();
                let password = $("#password").val();
                for (var i = 0; i < data.length; i++) {
                    if (data[i].username == username && data[i].password == password) {
                        alert("Log in successfully!!!");
                        $("#linked").attr("href", "../../Employee/add-employee/add-employeee.html");
                    } else if (data[i].username != username || data[i].password != password) {
                        alert("Error username or password!!");
                        break;
                    }
                }
            })
        })
    }
    getData_();
})