let data = [];
$(document).ready(function (){
    const getData = async() =>{
        await axios({
            method: "get",
            url: "http://localhost:3000/customer"
        }).then(res =>{
            data = res.data;

            function renderData(data){
                var html = '<tr><td><span>ID</span></td><td><span>Fullname</span></td><td><span>Gender</span></td><td><span>Customer Class</span></td><td><span>Email</span></td><td><span>Address</span></td><td><span>Phone Number</span></td><td><span>Activity</span></td></tr>';
                for(var i = 0; i < data.length; i++) {
                    html += '<tr id="' + data[i].id + '">' +
                        '<td>' + data[i].id + '</td>' +
                        '<td>' + data[i].lastname + ' ' + data[i].firstname + '</td>' +
                        '<td>' + data[i].gender + '</td>' +
                        '<td>' + data[i].customerClass + '</td>' +
                        '<td>' + data[i].email + '</td>' +
                        '<td>' + data[i].address + '</td>' +
                        '<td>' + data[i].phonenumber + '</td>' +
                        '<td class = "no-border">' +
                        '<button id="' + data[i].id + '" class="edit-customer ">Edit</button>' +
                        '<button id="' + data[i].id + '" class="delete-customer">Delete</button></td></tr>';
                }
                $('.table-customer').html(html);
            }
            renderData(data);

            $('.edit-customer').click(function() {
                $('.edit-customer-form').show();
                let id_customer = $(this).attr('id');
                let customer;
                for(var i=0; i<data.length; i++){
                    if(data[i].id == id_customer)
                        customer = {...data[i]};
                    else 
                        continue;
                }

                $('#edit-customer').click(function(){
                    let newfirstname = $("#firstname").val();
                    let newlastname = $("#lastname").val();
                    let gender = $("#gender").val();
                    let newpassword = $("#password").val();
                    let newclass = $("#role").val();
                    let newemail = $("#email").val();
                    let newphone = $("#phone").val();
                    let newaddress = $("#address").val();
                    if (newfirstname != "")
                        customer.firstname = newfirstname;
                    if(gender != "")
                        customer.gender = gender;
                    if (newlastname != "")
                        customer.lastname = newlastname;
                    if (newpassword != "")
                        customer.password = newpassword;
                    if(newclass !="") 
                        customer.customerClass = newclass;
                    if (newemail != "")
                        customer.email = newemail;
                    if (newphone != "")
                        customer.phonenumber = newphone;
                    if (newaddress != "")
                        customer.address = newaddress;

                    axios({
                        method:"PUT",
                        url:`http://localhost:3000/customer/${id_customer}`,
                        data: customer
                    }).then((res) =>{
                        alert("Update successfully!");
                        $(".edit-customer-form").hide();
                    })
                })

                $('#cancel-edit-customer').click(function() {
                    $('.show-customer').show();
                    $('.edit-customer-form').hide();
                })
            })

            $('.delete-customer').click(function() {
                if (confirm("Do you want to delete this customer?")) {
                    axios({
                        method: "delete",
                        url: `http://localhost:3000/customer/${$(this).attr('id')}/`
                    });
                    $(`#_${$(this).attr('id')}`).hide(1000, function() { alert("This customer is deleted !!!") });
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
    getData();
})