const api_url = "http://127.0.0.1:5000/customers";
const bill_url="http://127.0.0.1:5000/bills";

function loadData(records = []) {
  var table_data = "";
  console.log("RECORDS ",records);
   for (let i = 0; i < records.length; i++) {
    table_data += `<tr style="color: #F1F6F9;">`;
    table_data += `<td>${records[i][0]}</td>`;
    table_data += `<td>${records[i][1]}</td>`;
    table_data += `<td>${records[i][2]}</td>`;
    table_data += `<td>${records[i][3]}</td>`;
    table_data += `<td>${records[i][4]}</td>`;
    table_data += `<td>${records[i][5]}</td>`;
    table_data += `<td>${records[i][6]}</td>`;
    table_data += `<td>${records[i][7]}</td>`;
    table_data += `<td>`;
    table_data += `<a href="edit.html?id=${records[i][0]}"><button class="btn btn-primary">Edit</button></a>`;
    table_data += '&nbsp;&nbsp;';
    table_data += `<button class= "btn btn-danger" onclick=deleteData('${records[i][0]}')>Delete</button>`;
    table_data += '&nbsp;&nbsp;';
    table_data += `<a href="bills.html?id=${records[i][0]}"><button class="btn btn-primary">bills</button></a>`;
    table_data += `</td>`;
    table_data += `</tr>`;
  } 
  console.log(table_data);
  document.getElementById("tbody").innerHTML = table_data;
}
function sortdata(records = []) {
  var table_data = "";
  console.log("RECORDS ",records);
   for (let i = 0; i < records.length; i++) {
    table_data += `<tr style="color: #F1F6F9;">`;
    table_data += `<td>${records[i][0]}</td>`;
    table_data += `<td>${records[i][1]}</td>`;
    table_data += `<td>${records[i][2]}</td>`;
    table_data += `<td>${records[i][3]}</td>`;
    table_data += `<td>${records[i][4]}</td>`;
    table_data += `<td>${records[i][5]}</td>`;
    table_data += `<td>${records[i][6]}</td>`;
    table_data += `<td>${records[i][7]}</td>`;
    table_data += `<td>`;
    table_data += `<a href="edit.html?id=${records[i][0]}"><button class="btn btn-primary">Edit</button></a>`;
    table_data += '&nbsp;&nbsp;';
    table_data += `<button class= "btn btn-danger" onclick=deleteData('${records[i][0]}')>Delete</button>`;
    table_data += '&nbsp;&nbsp;';
    table_data += `<a href="bills.html?id=${records[i][0]}"><button class="btn btn-primary">bills</button></a>`;
    table_data += `</td>`;
    table_data += `</tr>`;
  } 
  console.log(table_data);
  document.getElementById("tbody").innerHTML = table_data;
}

function sortbycity() {
  var city = document.getElementById("city").value;
  fetch(api_url+"/"+city)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      sortdata(data);
    });
}

function getData() {
  fetch(api_url)
    .then((response) => response.json())
    .then((data) => {
      loadData(data);
    });
}

function getDataByID(id) {
  fetch(api_url+"/"+id)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.getElementById("id").value = data[0];
      document.getElementById("name").value = data[1];
      document.getElementById("email").value = data[2];
      document.getElementById("phone").value = data[3];
      document.getElementById("address").value = data[4];
      document.getElementById("city").value = data[5];
      document.getElementById("state").value = data[6];
      document.getElementById("zip").value = data[7];
    });
}

function getbillsByID(customer_id) {
  fetch(bill_url+"/"+customer_id)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      loadbills(data);
    });
}

function loadbills(records = []) {
  var table_data = "";
  console.log("RxCORDS ",records);
   for (let i = 0; i < records.length; i++) {
    table_data += `<tr style="color: #F1F6F9;">`;
    table_data += `<td>${records[i][0]}</td>`;
    table_data += `<td>${records[i][1]}</td>`;
    table_data += `<td>${records[i][2]}</td>`;
    table_data += `<td>${records[i][3]}</td>`;
    table_data += `<td>`;
    table_data += `<a href="editbills.html?id=${records[i][0]}"><button class="btn btn-primary">Edit</button></a>`;
    table_data += '&nbsp;&nbsp;';
    table_data += `<button class= "btn btn-danger" onclick=deletebills('${records[i][0]}')>Delete</button>`;
    table_data += `</td>`;
    table_data += `</tr>`;
  } 
  console.log(table_data);
  document.getElementById("tbills").innerHTML = table_data;
}
function billsByID(id) {
  fetch(bill_url+"/e/"+id)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.getElementById("id").value = data[0][0];
      document.getElementById("customer_id").value = data[0][1];
      document.getElementById("amount").value = data[0][2];
      document.getElementById("due_date").value = data[0][3];
    });
}
function billsData() {
  var id = document.getElementById("id").value;
  var customer_id = document.getElementById("customer_id").value;
  var amount = document.getElementById("amount").value;
  var due_date = document.getElementById("due_date").value;
      data = {id:id,customer_id: customer_id,amount:amount, due_date: due_date};
      console.log(data)
      fetch(bill_url+"/"+id, {
              method: "PUT",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
      })
      .then((response) => response.json())
      .then((data) => {
              console.table(data);
              window.location.href = "index.html";
      })
}

function postBills() {
        var customer_id = document.getElementById("customer_id").value;
        var amount = document.getElementById("amount").value;
        var due_date = document.getElementById("due_date").value;


        data = {customer_id: customer_id, amount: amount, due_date: due_date};

        fetch(bill_url, {
                method: "POST",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
                console.log("DATA",data);
                // window.location.href = "index.html";
        });
}
function deletebills(id) {
  console.log(id);
  user_input = confirm("Are you sure you want to delete this record?");

  if(user_input) {
          fetch(bill_url+"/"+id, {
                  method: "DELETE",
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  //body: JSON.stringify({"id": id})
          })
          .then((response) => response.json())
          .then((data) => {
                  console.log(data);
                  window.location.reload();
          })
  }
}
function postData() {
        var id = document.getElementById("id").value;
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
        var address = document.getElementById("address").value;
        var city = document.getElementById("city").value;
        var state = document.getElementById("state").value;
        var zip = document.getElementById("zip").value;


        data = {id:id,name: name, email: email, phone: phone,address: address,city : city,state:state,zip:zip};

        fetch(api_url, {
                method: "POST",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
                console.log("DATA",data);
                // window.location.href = "index.html";
        });
}


function putData() {
    var id = document.getElementById("id").value;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var address = document.getElementById("address").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    var zip = document.getElementById("zip").value;
        data = {id:id,name: name,email:email, phone: phone,address: address,city : city,state:state,zip:zip};
        console.log(data)
        fetch(api_url+"/"+id, {
                method: "PUT",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
                console.table(data);
                window.location.href = "index.html";
        })
}

function deleteData(id) {
        console.log(id);
        user_input = confirm("Are you sure you want to delete this record?");

        if(user_input) {
                fetch(api_url+"/"+id, {
                        method: "DELETE",
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        //body: JSON.stringify({"id": id})
                })
                .then((response) => response.json())
                .then((data) => {
                        console.log(data);
                        window.location.reload();
                })
        }
}
