$(document).ready(function () {
    $("#image").blur((function () {
        $(".icon-img").hide();
        let src = $("#image").val();
        $("#img-show").attr("src", src)
    }));
    $("#addBook").click(function () {
        let employeeId = $("#employeeId").val();
        let phoneNumberCustomer = $("#phoneNumberCustomer").val();
        let bookTitlte = $("#bookTitlte").val();
        let bookName = $("#bookName").val();
        let author = $("#author").val();
        let image = $("#image").val();
        let dateAdd = $("#dateAdd").val();
        let dateReleased = $("#dateReleased").val();
        let manufacture = $("#manufacture").val();
        let price = $("#price").val();
        let topic = $("#topic").val();
        let quantity = $("#quantity").val();
        if (employeeId == "" || phoneNumberCustomer == "" || bookTitlte == "" || bookName == "" || author == "" || image == "" ||
            dateAdd == "" || dateReleased == "" || manufacture == "" || price == "" || topic == "" || quantity == "") {
            alert("vui long nhap day du thong tin")
        }
        else {
            axios({
                method: "post",
                url: "http://localhost:3000/book",
                data: {
                    "name": bookName,
                    "author": author,
                    "quantity": quantity,
                    "image": image,
                    "price": price,
                    "manfacture": manufacture,
                    "topic": topic,
                    "description": "",
                    "dateAdd": dateAdd,
                    "dateRelease": dateReleased
                }
            }).then((res) => {
                alert("Bạn đã thêm sách thành công !!!")
                $("#employeeId").val("");
                $("#phoneNumberCustomer").val("");
                $("#bookTitlte").val("");
                $("#bookName").val("");
                $("#author").val("");
                $("#image").val("");
                $("#dateAdd").val("");
                $("#dateReleased").val("");
                $("#manufacture").val("");
                $("#price").val("");
                $("#topic").val("");
                $("#quantity").val("");
                $(".icon-img").show();
                $("#img-show").attr("src", "")
            })
        }

    })
})