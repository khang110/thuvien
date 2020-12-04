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
                        '<td>' + bookShow[i].quantity + '</td>' +
                        '<td><button class="button-edit"  id="' + bookShow[i].id + '">Edit</button><button class="button-del" id="' + bookShow[i].id + '">Del</button></td>' + '</tr>';
                }
                $('#table-book').html(html);
                //Chuc nang xoa sach
                $(".button-del").click(function () {
                    axios({
                        method: "delete",
                        url: `http://localhost:3000/book/${$(this).attr('id')}/`
                    });
                    $(`#_${$(this).attr('id')}`).hide(1000, function () { alert("This book is deleted !!!") });
                    let index;
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].id == $(this).attr('id')) {
                            index = i;
                            break;
                        }
                        else
                            continue;
                    }
                    data.splice(index, 1);
                });
                // Chuc nang chinh sua thong tin sach
                $(".button-edit").click(function () {
                    $("#form-edit").show()
                    let id_Book = $(this).attr('id');
                    let book;
                    for (let i = 0; i < bookShow.length; i++) {
                        if (bookShow[i].id == id_Book) {
                            book = { ...bookShow[i] };
                        }
                        else
                            continue;
                    }
                    $("#submit-change").click(function () {
                        let newName = $("#newName").val();
                        let newImg = $("#newImg").val();
                        let newAuthor = $("#newAuthor").val();
                        let newDateAdd = $("#newDateAdd").val();
                        let newDateReleased = $("#newDateReleased").val();
                        let newTopic = $("#newTopic").val()
                        let newQuantity = $("#newQuantity").val()
                        if (newName != "")
                            book.name = newName;
                        if (newAuthor != "")
                            book.author = newAuthor;
                        if (newImg != "")
                            book.image = newImg;
                        if (newDateAdd != "")
                            book.dateAdd = newDateAdd;
                        if (newDateReleased != "")
                            book.dateRelease = newDateReleased;
                        if (newTopic != "")
                            book.topic = newTopic;
                        if (newQuantity != "")
                            book.quantity = newQuantity;
                        axios({
                            method: "PUT",
                            url: `http://localhost:3000/book/${id_Book}`,
                            data: book
                        }).then((res) => { alert("Thay doi thanh cong"); $("#form-edit").hide() })
                    })
                })
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