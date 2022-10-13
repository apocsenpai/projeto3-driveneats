// Clicar no item
// Fazer com que ele fique com borda verde e apareça o logo
// Tirar o selecionado de outro item da mesma categoria
// Deixar 3 items selecionados de categorias diferentes

// Acessar as opções de cada menu e colocá-las dentro de uma array
const lunchOrder = document.querySelectorAll(".lunchMenu .section-option");
const drinkOrder = document.querySelectorAll(".drinkMenu .section-option");
const dessertOrder = document.querySelectorAll(".dessertMenu .section-option");
const closeOrder = document.getElementById("closeOrder");

const confirmationScreen = document.getElementById("confirmationScreen");
const orderCancelation = document.getElementById("btn-orderCancelation");
const orderTotalValue = document.getElementById("totalValue");
const orderConfirmation = document.getElementById("btn-orderConfirmation");

let selectedItems;
let orderValue = 0;
let itemValue = 0;
let itemName = [];
let itemNameConfirmation = confirmationScreen.querySelectorAll(".itemName");
let itemValueConfimation = confirmationScreen.querySelectorAll(".itemValue");
// Percorrer cada array com cada item(opção) para determinar uma função de click
// para cada item de cada menu
lunchOrder.forEach(selectItem);
drinkOrder.forEach(selectItem);
dessertOrder.forEach(selectItem);

// função para selecionar o item
function selectItem(item) {
  //funcao de clique correspondente para cada item
  item.addEventListener("click", function () {
    //chama a funçao de remover o selecionado e usa como parametro o elemento pai
    // do item clicado
    deselectItem(this.parentNode);
    //adiciona a classe selecionado que contem as propriedades verdinhas
    item.classList.add("selecionado");
    buttonActivator();
  });
}
//função pra desselecionar os items
function deselectItem(categoryOrder) {
  // no elemento pai da opção selecionada, vai procurar o elemento filho que
  // contem a opção selecionada
  let selectedItem = categoryOrder.querySelector(".selecionado");

  if (selectedItem !== null) {
    //se houver algum elemento com a classe selecionado, a função irá remover essa
    //classe especificamente deste elemento
    selectedItem.classList.remove("selecionado");
  }
}

function buttonActivator() {
  selectedItems = document.querySelectorAll(".selecionado");
  if (selectedItems.length === 3) {
    closeOrder.classList.add("active");
    closeOrder.innerHTML = "Fechar pedido";
    closeOrder.removeAttribute("disabled");
  }
}

closeOrder.addEventListener("click", function () {
  selectedItems.forEach(orderCalculation);
  orderTotalValue.innerHTML = "R$ " + orderValue.toFixed(2).replace(".", ",");

  confirmationScreen.classList.add("show-screen");
});

orderConfirmation.addEventListener("click", function () {
  let userName = prompt("Digite seu nome: ");
  let userLocation = prompt("Digite seu endereço: ");
  let userPayment = userPaymentValidation();
  let userChange = changeCalculation(userPayment);
  console.log(userChange);

  let orderMessage =
    "Olá, gostaria de fazer o pedido: \n- Prato: " +
    itemName[0] +
    " \n- Bebida: " +
    itemName[1] +
    " \n- Sobremesa: " +
    itemName[2] +
    " \nTotal: R$ " +
    orderValue.toFixed(2).replace(".", ",") +
    " \nForma de pagamento: " +
    userPayment +
    " \nTroco: " +
    userChange +
    "\n\nNome: " +
    userName +
    "\nEndereço: " +
    userLocation;
  orderMessage = window.encodeURIComponent(orderMessage);
  window.open("https://wa.me/5521999999999?text=" + orderMessage);
  orderValue = 0;
  itemName = [];
  confirmationScreen.classList.remove("show-screen");
});

orderCancelation.addEventListener("click", function () {
  confirmationScreen.classList.remove("show-screen");
  orderValue = 0;
  itemName = [];
});

function orderCalculation(item, indice) {
  let itemContentName = item.querySelector(".itemName").innerHTML;
  let itemContentValue = item.querySelector(".itemValue").innerHTML;

  itemNameConfirmation[indice].innerHTML = itemContentName;
  itemValueConfimation[indice].innerHTML = itemContentValue;

  itemName.push(itemContentName);
  itemValue = Number(itemContentValue.replace(",", "."));
  orderValue = orderValue + itemValue;
}

function userPaymentValidation() {
  let paymentOption = prompt(
    "Escolha a forma de pagamento: \n1 - Dinheiro\n2 - Cartão de Crédito\n3 - Cartão de débito"
  );
  if (paymentOption != 1 && paymentOption != 2 && paymentOption != 3) {
    alert("Opção inválida. Tente novamente!");
    return userPaymentValidation();
  }
  return paymentOption;
}

function changeCalculation(paymentOption) {
  if (paymentOption == "1") {
    let userCashValue = Number(prompt("Troco pra quanto?"));

    if (userCashValue < orderValue) {
      alert("Dinheiro insuficiente! Tente novamente");
      return changeCalculation(paymentOption);
    } else if (userCashValue == orderValue) {
      return "Sem troco";
    } else {
      let change = userCashValue - orderValue;
      return "R$ " + change.toFixed(2).replace(".", ",");
    }
  } else {
    return "Sem troco";
  }
}
