// Clicar no item
// Fazer com que ele fique com borda verde e apareça o logo
// Tirar o selecionado de outro item da mesma categoria
// Deixar 3 items selecionados de categorias diferentes

// Acessar as opções de cada menu e colocá-las dentro de uma array
const lunchOrder = document.querySelectorAll(".lunchMenu .section-option");
const drinkOrder = document.querySelectorAll(".drinkMenu .section-option");
const dessertOrder = document.querySelectorAll(".dessertMenu .section-option");

const closeOrder = document.getElementById("closeOrder");
// Percorrer cada array com cada item(opção) para determinar uma função de click 
// para cada item de cada menu
lunchOrder.forEach(selectItem);
drinkOrder.forEach(selectItem);
dessertOrder.forEach(selectItem);



// função para selecionar o item
function selectItem(item){
    //funcao de clique correspondente para cada item
    item.addEventListener("click", function(){
        //chama a funçao de remover o selecionado e usa como parametro o elemento pai
        // do item clicado
        deselectItem(this.parentNode);
        //adiciona a classe selecionado que contem as propriedades verdinhas
        item.classList.add("selecionado");
        buttonActivator();
    });
   
}
//função pra desselecionar os items
function deselectItem(categoryOrder){
    // no elemento pai da opção selecionada, vai procurar o elemento filho que
    // contem a opção selecionada
    let selectedItem = categoryOrder.querySelector(".selecionado");
    
    if (selectedItem !== null){
        //se houver algum elemento com a classe selecionado, a função irá remover essa
        //classe especificamente deste elemento
        selectedItem.classList.remove("selecionado");
     }
}

function buttonActivator(){
    let selectedItems = document.querySelectorAll(".selecionado");
    if(selectedItems.length === 3){
        closeOrder.classList.add("active");
        closeOrder.innerHTML = "Fechar pedido";
        closeOrder.removeAttribute("disabled");
    }
}

closeOrder.addEventListener("click", function(){
    alert("show");
});