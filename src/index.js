const registerInputEmail = document.getElementById("registerInputEmail");
const registerInputPassword5 = document.getElementById("registerInputPassword");

const registerModal = new bootstrap.Modal("#registerModal");

let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

function saveAccount(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
};

document.getElementById("createForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = registerInputEmail.value;
  const senha = registerInputPassword5.value;

  if (email.length < 3) {
    window.alert("Email inválido: Muito pequeno!");

    return
  } else if (senha.length < 8) {
    window.alert("Senha inválida: Senha muito pequena!");

    return
  };

  saveAccount({
    login: email,
    senha: senha
  });

  registerModal.hide();

  window.alert("Conta criada com sucesso.")
});

function getAccount(key) {
  const account = localStorage.getItem(key)

  if (account) {
    return JSON.parse(account);
  }

  return "";
}

function saveSession(data, saveSession) {
  if (saveSession) {
    localStorage.setItem("session", data)
  };

  sessionStorage.setItem("logged", data);
}

function checkLogged() {
  if (session) {
    sessionStorage.setItem("logged", session);

    logged = session;
  };

  if (logged) {
    saveSession(logged, session);

    window.location.href = "home.html"
  }

}

document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("loginInputEmail1").value;
  const senha = document.getElementById("loginInputPassword5").value;
  const sessão = document.getElementById("loginCheck1").checked

  const account = getAccount(email)

  if (!account) {
    window.alert("Email inválido, corrija.");
    return;
  } 

  if (account) {
    if (account.senha !== senha) {
      window.alert("Senha inválida, corrija.");
      return;
    }

    saveSession(email, sessão);

    window.location.href = "home.html"
  }

  // if (sessão) {

  // }
})

