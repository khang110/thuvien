var actionFilter = document.getElementById('filter');
let data = []
const getData = () => {
    const getData_ = async () => {
        await axios({
            method: "get",
            url: "http://localhost:3000/Invoice"
        }).then((res) => data = res.data)
        let totalPayed = 0;
        let totalDebt = 0;
        for (let i = 0; i < data.length; i++) {
            totalPayed += Number(data[i].payed);
            totalDebt += Number(data[i].debt);
        }
        console.log(data)
        $("#total-debt").html(`<div>Total payed: ${totalPayed}</div><div>Total debt: ${totalDebt}</div>`)
    }
    getData_();
    $(document).ready(function () {
        $("#filter").click(function () {
            let invoiceShow = [];
            let id = $("#id").val();
            let dateAdd = $("#dateAdd").val();
            let customerID = $("#customerID").val();
            let method = $("#method").val();
            for (let i = 0; i < data.length; i++) {
                if (data[i].id == id || data[i].dateAdd == dateAdd || data[i].customerId == customerID || data[i].paymentMethod == method) {
                    let j = 0;
                    for (; j < invoiceShow.length; j++) {
                        if (invoiceShow.length === 0)
                            break;
                        else if (invoiceShow[j].id === data[i].id) {
                            break;
                        }
                        else
                            continue;
                    }
                    if (j === invoiceShow.length) {
                        invoiceShow.push(data[i])
                    }
                    else {
                        continue;
                    }
                }
                else
                    continue;
            }
            print(invoiceShow)
            function renderData(invoiceShow) {
                var html = '<tr><th>ID</th><th>Date add</th><th>Customer name</th><th>Book</th><th>Total cost</th><th>Payed</th><th>Debt</th><th>Method</th></tr>';
                for (var i = 0; i < invoiceShow.length; i++) {
                    console.log(invoiceShow[i].listname)
                    html += `<tr id="_${invoiceShow[i].id}">` +
                        '<td>' + invoiceShow[i].id + '</td>' +
                        '<td>' + invoiceShow[i].dateAdd + '</td>' +
                        '<td>' + invoiceShow[i].customerName + '</td>' +
                        '<td>' + invoiceShow[i].listname.map((book) => { `<div>${book.name}</div>` }) + '</td>' +
                        '<td>' + invoiceShow[i].totalCost + '</td>' +
                        '<td>' + invoiceShow[i].payed + '</td>' +
                        '<td>' + invoiceShow[i].debt + '</td>' +
                        '<td>' + invoiceShow[i].paymentMethod + '</td></tr>';
                }
                $('#table-book').html(html);
            }
            renderData(invoiceShow);
        })
        //view all
        $("#view-all").click(function () {
            function renderData(data) {
                var html = '<tr><th>ID</th><th>Date add</th><th>Customer name</th><th>Book</th><th>Total cost</th><th>Payed</th><th>Debt</th><th>Method</th></tr>';
                for (var i = 0; i < data.length; i++) {
                    let listBook = ""
                    for (let j = 0; j < data[i].listname.length; j++) {
                        listBook = listBook + `<div>- ${data[i].listname[j].name}</div>`;
                    }
                    html += `<tr id="_${data[i].id}">` +
                        '<td>' + data[i].id + '</td>' +
                        '<td>' + data[i].dateAdd + '</td>' +
                        '<td>' + data[i].customerName + '</td>' +
                        '<td>' + listBook + '</td>' +
                        '<td>' + data[i].totalCost + '</td>' +
                        '<td>' + data[i].payed + '</td>' +
                        '<td>' + data[i].debt + '</td>' +
                        '<td>' + data[i].paymentMethod + '</td></tr>';
                }
                $('#table-book').html(html);
            }
            renderData(data);
        })
    })
}
getData();