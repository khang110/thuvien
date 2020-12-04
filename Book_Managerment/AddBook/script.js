$(document).ready(function () {
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
            console.log("err")
        }
    })
})