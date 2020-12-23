let data = [];
$(document).ready(function() {
    const getData_ = async() => {
        await axios({
            method: "get",
            url: "http://localhost:3000/employee"
        }).then((res) => {
            data = res.data;

            function renderData(data) {
                var html = '<tr><td><span>ID</span></td><td><span>Fullname</span></td><td><span>Gender</span></td><td><span>Role</span></td><td><span>Email</span></td><td><span>Address</span></td><td><span>Phonenumber</span></td><td><span>Activity</span></td></tr>';
                for (var i = 0; i < data.length; i++) {
                    html += '<tr id="' + data[i].id + '">' +
                        '<td>' + data[i].id + '</td>' +
                        '<td>' + data[i].lastname + ' ' + data[i].firstname + '</td>' +
                        '<td>' + data[i].gender + '</td>' +
                        '<td>' + data[i].role + '</td>' +
                        '<td>' + data[i].email + '</td>' +
                        '<td>' + data[i].address + '</td>' +
                        '<td>' + data[i].phonenumber + '</td>' +
                        '<td class = "no-border">' +
                        '<button id="' + data[i].id + '" class="edit-info-employee ">Edit</button>' +
                        '<button id="' + data[i].id + '" class="delete-info-employee">Delete</button></td></tr>';
                }
                $('.show-employ').html(html);

            }
            renderData(data);
            $(".edit-info-employee").click(function() {
                // $(".show-ee").hide();
                $(".form-edit-employee").show();
                let id_employee = $(this).attr('id');
                let employee;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].id == id_employee) {
                        employee = {...data[i] };
                    } else
                        continue;
                }

                $("#update-employee").click(function() {
                    let newfirstname = $("#firstname").val();
                    let newlastname = $("#lastname").val();
                    let gender = $("#gender").val();
                    let newusername = $("#username").val();
                    let newpassword = $("#password").val();
                    let newrole = $("#role").val();
                    let newdob = $("#dob").val();
                    let newemail = $("#email").val();
                    let newphone = $("#phone").val();
                    let newaddress = $("#address").val();
                    let newinfoCard = $("#infoCard").val();
                    if (newfirstname != "")
                        employee.firstname = newfirstname;
                    if (newlastname != "")
                        employee.lastname = newlastname;
                    if (newusername != "")
                        employee.username = newusername;
                    if (newpassword != "")
                        employee.password = newpassword;
                    if (newdob != "")
                        employee.born = newdob;
                    if (newemail != "")
                        employee.email = newemail;
                    if (newphone != "")
                        employee.phonenumber = newphone;
                    if (newaddress != "")
                        employee.address = newaddress;
                    // if (newinfoCard != "")
                    //     employee.id = newinfoCard;
                    axios({
                        method: "PUT",
                        url: `http://localhost:3000/employee/${id_employee}`,
                        data: employee
                    }).then((res) => {
                        alert("Thay doi thanh cong");
                        $(".form-edit-employee").hide();
                    })
                })

                $("#cancel-update-employee").click(function() {
                    $(".show-ee").show();
                    $(".form-edit-employee").hide();
                })
            })

            $(".delete-info-employee").click(function() {
                if (confirm("Do you really want to delete this employee?")) {
                    axios({
                        method: "delete",
                        url: `http://localhost:3000/employee/${$(this).attr('id')}/`
                    });
                    $(`#_${$(this).attr('id')}`).hide(1000, function() { alert("This employee is deleted !!!") });
                    let index;
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].id == $(this).attr('id')) {
                            index = i;
                            break;
                        } else
                            continue;
                    }
                    data.splice(index, 1);
                }
            })

        });
    }
    getData_();


})