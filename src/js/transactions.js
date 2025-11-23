const addTableModal = new bootstrap.Modal("#addTable");

let data = {
  transactions: []
} 

let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

const transactionForm = document.getElementById("transactionForm");

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

  window.alert("Foi!");

  addTableModal.hide()
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

  getCashs();
};

function getCashs() {
  const transactions = data.transactions;

  // const cash = transactions.map((transaction) => transaction);

  let cashShow = ``

  transactions.map((transaction) => (
    cashShow += `
      <tr>
        <th scope="row">${transaction.data}</th>
        <td>R$ ${transaction.valor.toFixed(2)}</td>
        <td>${transaction.type === "1" ? "Entrada" : "Saída"}</td>
        <td style="display: -webkit-box; overflow: hidden; line-clamp: 1; -webkit-line-clamp: 1; -webkit-box-orient: vertical; max-width: 375px; line-height: 2rem;">${transaction.desc}</td>
      </tr>
    `
  ));

  document.getElementById("cashList").innerHTML = cashShow
}

checkLogged();