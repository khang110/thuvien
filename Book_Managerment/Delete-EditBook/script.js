var actionFilter = document.getElementById('filter');
let data = []
let data_ = []
const getData = () => {
    const getData_ = async() => {
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
    $(document).ready(function() {
        $("#filter").click(function() {
            let bookShow = [];
            let nameBook = $("#name-book").val();
            let author = $("#author").val();
            let dateAdd = $("#date-add").val();
            let dateRelease = $("#dateRelease").val();
            let topic = $("#topic").val();
            let manufacture = $("#manufacture").val();
            for (let i = 0; i < data.length; i++) {
                if (data[i].name == nameBook || data[i].author == author || data[i].manufacture == manufacture ||
                    data[i].dateAdd == dateAdd || data[i].dateRelease == dateRelease || data[i].topic == topic) {
                    let j = 0;
                    for (; j < bookShow.length; j++) {
                        if (bookShow.length === 0)
                            break;
                        else if (bookShow[j].id === data[i].id) {
                            break;
                        } else
                            continue;
                    }
                    if (j === bookShow.length) {
                        bookShow.push(data[i])
                    } else {
                        continue;
                    }
                } else
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
                $(".button-chose").click(function() {
                        let id = $(this).attr('id');
                        listChosed.push(id);
                        for (let i = 0; i < bookShow.length; i++) {
                            if (bookShow[i].id == id) {
                                listName.push({ "name": bookShow[i].name, "price": bookShow[i].price });
                                html_ += `<tr><td>${bookShow[i].name}</td><td>${bookShow[i].author}</td><td><input value = '${bookShow[i].price}' style="outline:none" id="price-import-${id}"/></td><td><input id="quantity-buyed-${id}" type="number" style="outline: none;width: 50px" value="1"/></td></tr>`;
                            } else
                                continue;
                        }
                        $(".list-book-chosed").html(html_)
                        $(`#_${id}`).hide();
                        let index = 0;
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].id == id) {
                                index = i;
                                break;
                            } else {
                                continue;
                            }
                        }
                        data.splice(index, 1);
                    })
                    //Chức năng button tạo hoá đơn nhập sách
                let listChosed_ = [];
                $("#create").click(async function() {
                    for (let i = 0; i < listChosed.length; i++) {
                        listChosed_[i] = { "id": listChosed[i], "quantity": $(`#quantity-buyed-${listChosed[i]}`).val() }
                    }
                    let totalCost = 0;
                    for (let i = 0; i < listChosed_.length; i++) {
                        totalCost += Number(listChosed_[i].quantity) * Number($(`#price-import-${listChosed_[i].id}`).val())
                    }
                    let EmployeeName = $("#customer-name").val();
                    let EmployeePhonenumber = $("#phonenumber-customer").val();
                    let dateAdd = $("#dateAdd").val();
                    let payed = $("#payed").val();
                    let supplier = $("#supplier").val();
                    if (EmployeeName == "" || EmployeePhonenumber == "" || dateAdd == "" || payed == "")
                        alert("vui long nhap day du thong tin!!!");
                    else if (totalCost > 10000000) {
                        alert("Kinh phí không đủ !!!");
                    } else {
                        //code thuc hien
                        let debt = totalCost - payed;
                        let id = 0;
                        axios({
                            method: "get",
                            url: "http://localhost:3000/Library-Supplier"
                        }).then(res => {
                            // tim kiem nha cung cap tuong ung
                            for (let i = 0; i < 3; i++) {
                                if (res.data[i].Supplier == supplier) {
                                    id = i + 1;
                                    break;
                                }
                            }
                            console.log(id);
                            if (debt > 1000000) {
                                alert("Số tiền nợ quá lớn !!!");
                            } else {
                                axios({
                                    method: "put",
                                    url: `http://localhost:3000/Library-Supplier/${id}`,
                                    data: {
                                        "Supplier": supplier,
                                        "Debt": res.data[id - 1].Debt + debt
                                    }
                                });
                                axios({
                                    method: "post",
                                    url: "http://localhost:3000/Importion",
                                    data: {
                                        "EmployeeName": EmployeeName,
                                        "EmployeePhonenumber": EmployeePhonenumber,
                                        "Supplier": supplier,
                                        "SumCost": totalCost,
                                        "Debt": debt,
                                        "ListBook": listChosed_
                                    }
                                }).then((res) => {
                                    alert("Nhập sách thành công <3");
                                    $("#list-book-chosed").hide();
                                });
                                console.log(listChosed);
                                console.log(listChosed_);
                                console.log(data);
                                console.log(data_);
                                for (let j = 0; j < listChosed_.length; j++) {
                                    let dataAdd;
                                    for (let i = 0; i < data_.length; i++) {
                                        if (Number(data_[i].id) === Number(listChosed_[j].id)) {
                                            dataAdd = {...data_[i], quantity: data_[i].quantity + Number(listChosed_[j].quantity) };
                                            axios({
                                                method: "put",
                                                url: `http://localhost:3000/book/${data_[i].id}`,
                                                data: dataAdd
                                            })
                                        }
                                    }
                                }
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
$("#close-form").click(function() {
    $("#form-edit").hide()
})