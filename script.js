const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const button = document.querySelector(".btn");
const items = JSON.parse(localStorage.getItem("items")) || [];

// create functions logic
function createItems(e) {
  e.preventDefault();

  const textValue = this.querySelector('[name="item"]').value;

  const item = {
    text: textValue,
    done: false,
  };

  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem("items", JSON.stringify(items));
  this.reset();
}

function populateList(items = [], itemsList) {
  itemsList.innerHTML = items
    .map((item, i) => {
      return `
          <li>
            <input type='checkbox' data-index=${i} id="item${i}" ${
        item.done ? "checked" : ""
      } />
            <label for="item${i}" >${item.text}</label>          
          </li>
          `;
    })
    .join("");
}

function toggleDone(e) {
  if (!e.target.matches("input")) return;
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}

function clear() {
  itemsList.innerHTML = "";
  localStorage.removeItem("items", JSON.stringify(items));
}

// add event listeners
addItems.addEventListener("submit", createItems);
itemsList.addEventListener("click", toggleDone);
button.addEventListener("click", () => clear(itemsList));
populateList(items, itemsList);
