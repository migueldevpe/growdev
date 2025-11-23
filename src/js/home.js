const addTableModal = new bootstrap.Modal("#addTable");

let data = {
  transactions: []
} 

let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

const transactionForm = document.getElementById("transactionForm");

document.getElementById("goToTransactions").addEventListener("click", (e) => {
  e.preventDefault();

  window.location.href = "/transactions.html"
})

function saveData(data) {
  localStorage.setItem(data.login, JSON.stringify(data))
}

transactionForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const tranInputValue = document.getElementById("TransactionInputValue");
  const tranInputDesc = document.getElementById("TransactionInputDesc");
  const tranInputDate = document.getElementById("TransactionInputDate");
  // const tranRadioEnter = document.getElementById("flexRadioEnter");
  // const tranRadioLeave = document.getElementById("flexRadioLeave");
  const type = document.querySelector('input[name="flexRadioDefault"]:checked');

  data.transactions.unshift({
    valor: Number(tranInputValue.value),
    desc: tranInputDesc.value,
    data: tranInputDate.value,
    type: type.value
  })

  saveData(data);
  
  e.target.reset();

  window.alert("Adicionado!");

  addTableModal.hide();

  getTotal()
})

function checkLogged() {
  if (session) {
    sessionStorage.setItem("logged", session);

    logged = session;
  };

  if (!logged) {
    window.location.href = "index.html";
    return;
  };

  const dataUser = localStorage.getItem(logged);

  if (dataUser) {
    data = JSON.parse(dataUser);
  }

  if (!data.transactions) {
    data.transactions = []
  }

  getCashIn();
  getCashOut();
  getTotal();
};

function getCashIn() {
  const transactions = data.transactions;

  const cashIn = transactions.filter((transaction) => transaction.type === "1");

  if (cashIn.length <= 5) {
    cashInShow = ``

    cashIn.map((transaction) => (
      cashInShow += `
        <div class="row mb-3">
          <div class="col-12">
            <h1 class="fs-2 mb-1">R$ ${transaction.valor.toFixed(2)}</h1>
          </div>
          <div class="d-flex align-items-center justify-content-between col-12">
            <span style="display: -webkit-box; line-clamp: 1; -webkit-line-clamp: 1; overflow: hidden; -webkit-box-orient: vertical;">${transaction.desc}</span>
            <span>${transaction.data}</span>
          </div>
        </div>
      ` 
    ))

    document.getElementById("cashInList").innerHTML = cashInShow
  }

}

function getCashOut() {
  const transactions = data.transactions;

  const cashOut = transactions.filter((transaction) => transaction.type === "2");

  if (cashOut.length <= 5) {
    cashOutShow = ``

    cashOut.map((transaction) => (
      cashOutShow += `
        <div class="row mb-3">
          <div class="col-12">
            <h1 class="fs-2 mb-1">R$ ${transaction.valor.toFixed(2)}</h1>
          </div>
          <div class="d-flex align-items-center justify-content-between col-12">
            <span style="display: -webkit-box; line-clamp: 1; -webkit-line-clamp: 1; overflow: hidden; -webkit-box-orient: vertical;">${transaction.desc}</span>
            <span>${transaction.data}</span>
          </div>
        </div>    
      `
    ))

    document.getElementById("cashOutList").innerHTML = cashOutShow
  }
    
}

function getTotal() {
  const transactions = data.transactions;
  let total = Number(0);

  transactions.forEach((transaction) => {
    if (transaction.type === "1") {
      total += Number(transaction.valor)
    } else if (transaction.type === "2") {
      total -= Number(transaction.valor)
    }
  })

  document.getElementById("showMoney").innerHTML = `<i class="bi bi-cash-coin align-middle" style="color: #4E0070;"></i> R$ ${total.toFixed(2)}`

}

checkLogged();