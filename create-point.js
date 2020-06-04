function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]");

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => {
      return res.json();
    })
    .then((states) => {
      for (let state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
      }
    });
}

populateUFs();

function getCities(event) {
  const citySelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("input[name=state");

  const ufValue = event.target.value;

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  citySelect.innerHTML = "<option value>Selecione a cidade</option>";
  citySelect.disabled = true;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/33/municipios`;
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((cities) => {
      for (let city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
      }

      citySelect.disabled = false;
    });
}

document.querySelector("select[name=uf]").addEventListener("change", getCities);

// Itens de coleta

const itemsToColect = document.querySelectorAll(".items-grid li");

for (const item of itemsToColect) {
  item.addEventListener("click", handleSelectedItem);
}

const collectedItems = document.querySelector("input[name=items]");

let selectedItems = [];

function handleSelectedItem(event) {
  const itemLi = event.target;
  // adicionar ou remover uma classe com javascript
  itemLi.classList.toggle("selected");
  const itemId = itemLi.dataset.id;

  const alredySelected = selectedItems.findIndex((item) => {
    const itemFound = item == itemId;
    return itemFound;
  });

  // se já estiver selecionado
  if (alredySelected >= 0) {
    // remover da seleção
    const filteredItems = selectedItems.filter((item) => {
      const itemIsDifferent = item != itemId;
      return itemIsDifferent;
    });

    selectedItems = filteredItems;
  } else {
    // se já estiver selecionado
    // adicionar seleção
    selectedItems.push(itemId);
  }

  // atualizar campo escondido com os itens selecionados
  collectedItems.value = selectedItems;

  console.log();
}
