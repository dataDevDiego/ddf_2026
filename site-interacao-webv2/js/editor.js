let fields = document.querySelector("#fields");
let generated = document.querySelector("#generated");
let quantity = 0;
function addItem(text) {
  if (quantity >= 8) {
    return;
  }
  quantity = quantity + 1;
  let row = document.createElement("div");
  row.className = "row";
  let field = document.createElement("div");
  let label = document.createElement("label");
  label.setAttribute("for", "item" + quantity);
  label.textContent = "Texto do item " + quantity;
  let input = document.createElement("input");
  input.type = "text";
  input.id = "item" + quantity;
  input.className = "itemText";
  input.value = text;
  input.maxLength = 30;
  field.appendChild(label);
  field.appendChild(input);
  let button = document.createElement("button");
  button.type = "button";
  button.className = "button danger remove";
  button.textContent = "Excluir";
  row.appendChild(field);
  row.appendChild(button);
  fields.appendChild(row);
  input.addEventListener("input", update);
  button.addEventListener("click", removeItem);
  updateButtons();
  update();
}
function removeItem(event) {
  if (quantity <= 1) {
    return;
  }
  event.currentTarget.parentNode.remove();
  quantity = quantity - 1;
  updateButtons();
  update();
}
function updateButtons() {
  document.querySelector("#add").disabled = quantity >= 8;
  let buttons = document.querySelectorAll(".remove");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = quantity <= 1;
  }
}
function value(id) {
  return document.querySelector(id).value;
}
function update() {
  generated.innerHTML = "";
  let inputs = document.querySelectorAll(".itemText");
  for (let i = 0; i < inputs.length; i++) {
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.href = "#";
    a.textContent = inputs[i].value === "" ? "Item sem texto" : inputs[i].value;
    a.addEventListener("click", function (e) {
      e.preventDefault();
    });
    li.appendChild(a);
    generated.appendChild(li);
  }
  let menu = document.querySelector("#menuPreview");
  let links = generated.querySelectorAll("a");
  menu.style.backgroundColor = value("#menuBg");
  menu.style.padding = value("#menuPadding") + "px";
  menu.style.width = value("#menuWidth") + "%";
  menu.style.borderRadius = value("#radius") + "px";
  generated.style.flexDirection = value("#direction");
  generated.style.gap = value("#gap") + "px";
  for (let i = 0; i < links.length; i++) {
    links[i].style.backgroundColor = value("#itemBg");
    links[i].style.color = value("#textColor");
    links[i].style.fontFamily = value("#font");
    links[i].style.fontSize = value("#size") + "px";
    links[i].style.fontWeight = value("#weight");
    links[i].style.border =
      value("#border") + "px solid " + value("#borderColor");
    links[i].style.borderRadius = value("#radius") + "px";
    links[i].style.padding = value("#padding") + "px";
  }
  document.querySelector("#menuImage").style.display = document.querySelector(
    "#showImage",
  ).checked
    ? "block"
    : "none";
  document.querySelector("#wrapper").className =
    "wrapper " + value("#position");
}
function loadImage() {
  let input = document.querySelector("#imageFile");
  let message = document.querySelector("#imageMessage");
  let file = input.files[0];
  message.textContent = "";
  if (file === undefined) {
    return;
  }
  if (file.type.substring(0, 6) !== "image/") {
    message.textContent = "Escolha um arquivo de imagem.";
    input.value = "";
    return;
  }
  if (file.size > 2097152) {
    message.textContent = "A imagem deve ter no máximo 2 MB.";
    input.value = "";
    return;
  }
  let reader = new FileReader();
  reader.addEventListener("load", function () {
    document.querySelector("#menuImage").src = reader.result;
    document.querySelector("#showImage").checked = true;
    message.textContent = "Imagem inserida.";
    update();
  });
  reader.readAsDataURL(file);
}
document.querySelector("#add").addEventListener("click", function () {
  addItem("Novo item");
});
document.querySelector("#imageFile").addEventListener("change", loadImage);
let controls = document.querySelectorAll("#editor input, #editor select");
for (let i = 0; i < controls.length; i++) {
  controls[i].addEventListener("input", update);
  controls[i].addEventListener("change", update);
}
addItem("Início");
addItem("Sobre");
addItem("Contato");
