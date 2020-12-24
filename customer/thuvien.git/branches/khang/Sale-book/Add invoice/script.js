var actionFilter = document.getElementById('filter');
let data = []
let data_ = []
const getData = () => {
    const getData_ = async () => {
        await axios({
            method: "get",
            url: "http://localhost:3000/book"
        }).then((res) => data = res.data)
        data_ = [...data];
    }
    getData_();
    let html_ = '<tr><th>Name</th><th>Author</th><th>Price</th><th>Quantity</th></tr>';
    let listChosed = [];
    let listName = [];
    $(document).ready(function () {
        $("#filter").click(function () {
            let bookShow = [];
            let nameBook = $("#name-book").val();
            let author = $("#author").val();
            let dateAdd = $("#date-add").val();
            let dateRelease = $("#dateRelease").val();
            let topic = $("#topic").val();
            let manufacture = $("#manufacture").val();
            for (let i = 0; i < data.length; i++) {
                if (data[i].name == nameBook || data[i].author == author || data[i].manufacture == manufacture
                    || data[i].dateAdd == dateAdd || data[i].dateRelease == dateRelease || data[i].topic == topic) {
                    let j = 0;
                    for (; j < bookShow.length; j++) {
                        if (bookShow.length === 0)
                            break;
                        else if (bookShow[j].id === data[i].id) {
                            break;
                        }
                        else
                            continue;
                    }
                    if (j === bookShow.length) {
                        bookShow.push(data[i])
                    }
                    else {
                        continue;
                    }
                }
                else
                    continue;
            }
            function renderData(bookShow) {
                let html = '<tr><th>Image</th><th>ID</th><th>Name</th><th>Author</th><th>Date Add</th><th>Date released</th><th>Topic</th><th>Price</th><th>Quantity</th><th>Action</th></tr>';
                for (var i = 0; i < bookShow.length; i++) {
                    html += `<tr id="_${bookShow[i].id}">` +
                        `<td><img src=${bookShow[i].image} class="img-book"</td>` +
                        '<td>' + bookShow[i].id + '</td>' +
                        '<td>' + bookShow[i].name + '</td>' +
                        '<td>' + bookShow[i].author + '</td>' +
                        '<td>' + bookShow[i].dateAdd + '</td>' +
                        '<td>' + bookShow[i].dateRelease + '</td>' +
                        '<td>' + bookShow[i].topic + '</td>' +
                        '<td>' + bookShow[i].price + '</td>' +
                        '<td>' + bookShow[i].quantity + '</td>' +
                        '<td><button class="button-chose"  id="' + bookShow[i].id + '">CHOSE</button></td>' + '</tr>';
                }
                $('#table-book').html(html);
                //Chức năng chọn một cuốn sách và chuyển nó vào list đã chọn
                $(".button-chose").click(function () {
                    let id = $(this).attr('id');
                    listChosed.push(id);
                    for (let i = 0; i < bookShow.length; i++) {
                        if (bookShow[i].id == id) {
                            listName.push({ "name": bookShow[i].name, "price": bookShow[i].price });
                            html_ += `<tr><td>${bookShow[i].name}</td><td>${bookShow[i].author}</td><td>${bookShow[i].price}</td><td><input id="quantity-buyed-${id}" type="number" style="outline: none;width: 50px" value="1"/></td></tr>`;
                        }
                        else
                            continue;
                    }
                    $(".list-book-chosed").html(html_)
                    $(`#_${id}`).hide();
                    let index = 0;
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].id == id) {
                            index = i;
                            break;
                        }
                        else {
                            continue;
                        }
                    }
                    data.splice(index, 1);
                })
                //Chức năng button tạo hoá đơn
                let listChosed_ = [];
                $("#create").click(function () {
                    for (let i = 0; i < listChosed.length; i++) {
                        listChosed_[i] = { "id": listChosed[i], "quantity": $(`#quantity-buyed-${listChosed[i]}`).val() }
                    }
                    let totalCost = 0;
                    for (let i = 0; i < listChosed_.length; i++) {
                        totalCost += Number(listChosed_[i].quantity) * Number(listName[i].price)
                    }
                    let customerName = $("#customer-name").val();
                    let phoneNumberCustomer = $("#phonenumber-customer").val();
                    let dateAdd = $("#dateAdd").val();
                    let nameCreator = $("#name-creator").val();
                    let payed = $("#payed").val();
                    let debt = $("#debt").val();
                    if (customerName == "" || phoneNumberCustomer == "" || dateAdd == "" || nameCreator == "" || payed == "" || debt == "") {
                        alert("vui long nhap day du thong tin!!!")
                    }
                    else {
                        axios({
                            method: "post",
                            url: "http://localhost:3000/Invoice",
                            data: {
                                dateAdd: dateAdd,
                                customerName: customerName,
                                listBook: listChosed_,
                                listname: listName,
                                totalCost: totalCost,
                                paymentMethod: "momo",
                                debt: debt,
                                payed: payed
                            }
                        })
                    }
                });
            }
            renderData(bookShow);
        })
    })
}
getData();
//Đóng form
$("#close-form").click(function () {
    $("#form-edit").hide()
})