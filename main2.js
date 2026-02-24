// ====================================================
// main.js — только drag-and-drop и кнопка очистки
// Вся логика интерпретатора — задача сокурсников.
// Они подключатся к этим элементам по id:
//   #drop-zone   — сюда добавляются блоки
//   #run-btn     — кнопка запуска
//   #output      — панель вывода
//   #vars-display — панель переменных
// ====================================================

const dropZone = document.getElementById("drop-zone");
const clearBtn = document.getElementById("clear-btn");

// Названия блоков для отображения
const BLOCK_LABELS = {
  declare: "📦 Объявить переменную",
  assign: "✏️ Присвоить значение",
  if: "🔀 Если (if)",
  print: "🖨️ Вывести",
};

// -------------------------------------------------
// Шаг 1: начало перетаскивания из палитры
// -------------------------------------------------
document.querySelectorAll(".palette-block").forEach((block) => {
  block.addEventListener("dragstart", (e) => {
    // Запоминаем тип блока
    e.dataTransfer.setData("blockType", block.dataset.type);
    block.style.opacity = "0.5";
  });
  block.addEventListener("dragend", () => {
    block.style.opacity = "1";
  });
});

// -------------------------------------------------
// Шаг 2: разрешаем сброс на drop-zone
// -------------------------------------------------
dropZone.addEventListener("dragover", (e) => {
  e.preventDefault(); // без этого drop не сработает
  dropZone.classList.add("drag-over");
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("drag-over");
});

// -------------------------------------------------
// Шаг 3: блок брошен — создаём элемент в рабочей области
// -------------------------------------------------
dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.classList.remove("drag-over");

  const type = e.dataTransfer.getData("blockType");
  if (!type) return;

  // Убираем подсказку если она ещё есть
  const hint = dropZone.querySelector(".drop-hint");
  if (hint) hint.remove();

  // Создаём новый блок
  const div = document.createElement("div");
  div.className = "ws-block--dropped";
  div.dataset.type = type;
  div.innerHTML = `
    <span>${BLOCK_LABELS[type]}</span>
    <button class="delete-btn" title="Удалить">✕</button>
  `;

  // Кнопка удаления блока
  div.querySelector(".delete-btn").addEventListener("click", () => {
    div.remove();
    // Если блоков не осталось — возвращаем подсказку
    if (dropZone.children.length === 0) {
      dropZone.innerHTML =
        '<span class="drop-hint">↓ Перетащи блоки сюда ↓</span>';
    }
  });

  dropZone.appendChild(div);
});

// -------------------------------------------------
// Кнопка "Очистить"
// -------------------------------------------------
clearBtn.addEventListener("click", () => {
  dropZone.innerHTML = '<span class="drop-hint">↓ Перетащи блоки сюда ↓</span>';
  document.getElementById("output").innerHTML =
    '<p class="empty-text">Нажми "Запустить"...</p>';
  document.getElementById("vars-display").innerHTML =
    '<p class="empty-text">Переменных нет</p>';
});

// -------------------------------------------------
// Кнопка "Запустить" — пока заглушка
// Сокурсники заменят этот обработчик на свою логику
// -------------------------------------------------
document.getElementById("run-btn").addEventListener("click", () => {
  // TODO: сокурсники подключают интерпретатор здесь
  alert("Интерпретатор ещё не подключён");
});
