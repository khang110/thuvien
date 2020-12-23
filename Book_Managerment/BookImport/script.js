var actionFilter = document.getElementById('filter');
let data = []
const getData = () => {
    const getData_ = async () => {
        await axios({
            method: "get",
            url: "http://localhost:3000/book"
        }).then((res) => data = res.data)
    }
    getData_();
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
                var html = '<tr><th>Image</th><th>ID</th><th>Name</th><th>Author</th><th>Date Add</th><th>Date released</th><th>Topic</th><th>Price</th><th>Quantity</th><th>Action</th></tr>';

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
                        `<td id="td-${bookShow[i].id}"><input id="input-${bookShow[i].id}" class="input-quantity" type="number"/></td>` +
                        '<td><button class="button-import"  id="' + bookShow[i].id + '">Import</button></tr>';
                }
                $('#table-book').html(html);
                //Chuc nang nhap sach
                $(".button-import").click(function () {
                    let id_Book = $(this).attr('id');
                    let book;
                    for (let i = 0; i < bookShow.length; i++) {
                        if (bookShow[i].id == id_Book) {
                            book = { ...bookShow[i] };
                            break;
                        }
                        else
                            continue;
                    }
                    let numberImport = $(`#input-${id_Book}`).val();
                    if (numberImport == "") {
                        alert("Vui long nhap so luong so sach nhap vao !!!")
                    }
                    else {
                        newQuantity = book.quantity + Number(numberImport);
                        _book = { ...book, "quantity": newQuantity };
                        axios({
                            method: "PUT",
                            url: `http://localhost:3000/book/${id_Book}`,
                            data: _book
                        }).then((res) => {
                            $(`#input-${id_Book}`).hide();
                            $(`#td-${id_Book}`).append("<i class='fas fa-check-circle icon-done'></i>")
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