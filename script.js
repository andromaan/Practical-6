/**
 * ДОСТУПНИЙ АКОРДЕОН - JavaScript логіка
 *
 * Реалізує:
 * 1. Клік для перемикання aria-expanded та видимості панелі
 * 2. Клавіатурну навігацію (Arrow Up/Down, Home/End, Enter/Space)
 * 3. Управління фокусом та станом доступності
 */

// ============================================
// 1. ІНІЦІАЛІЗАЦІЯ
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("button[aria-expanded]");

  if (buttons.length === 0) {
    console.warn("Акордеон кнопки не знайдені");
    return;
  }

  console.log(`Ініціалізовано ${buttons.length} кнопок акордеона`);

  // ============================================
  // 2. ОБРОБКА КЛІКУ - ПЕРЕМИКАННЯ ПАНЕЛІ
  // ============================================

  buttons.forEach((button) => {
    button.addEventListener("click", handleAccordionClick);
  });

  function handleAccordionClick(event) {
    const button = event.currentTarget;
    const isExpanded = button.getAttribute("aria-expanded") === "true";
    const panelId = button.getAttribute("aria-controls");
    const panel = document.getElementById(panelId);

    if (!panel) {
      console.error(`Панель з ID "${panelId}" не знайдена`);
      return;
    }

    // Зміна стану aria-expanded
    button.setAttribute("aria-expanded", !isExpanded);

    // Керування атрибутом hidden у панелі
    if (isExpanded) {
      // Закривання панелі
      panel.setAttribute("hidden", "");
      panel.classList.remove("accordion-expanded");
    } else {
      // Відкривання панелі
      panel.removeAttribute("hidden");
      panel.classList.add("accordion-expanded");
    }

    console.log(
      `Панель "${panelId}" змінена на: ${!isExpanded ? "ОТКРЫТА" : "ЗАКРЫТА"}`,
    );
  }

  // ============================================
  // 3. КЛАВІАТУРНА НАВІГАЦІЯ
  // ============================================

  buttons.forEach((button) => {
    button.addEventListener("keydown", handleAccordionKeydown);
  });

  function handleAccordionKeydown(event) {
    const currentButton = event.currentTarget;
    const index = Array.from(buttons).indexOf(currentButton);
    let newIndex = null;

    switch (event.key) {
      case "ArrowDown":
        // Переміщення на наступну кнопку (циклічне)
        event.preventDefault();
        newIndex = (index + 1) % buttons.length;
        buttons[newIndex].focus();
        console.log(`Arrow Down: фокус переміщено на кнопку ${newIndex + 1}`);
        break;

      case "ArrowUp":
        // Переміщення на попередню кнопку (циклічне)
        event.preventDefault();
        newIndex = (index - 1 + buttons.length) % buttons.length;
        buttons[newIndex].focus();
        console.log(`Arrow Up: фокус переміщено на кнопку ${newIndex + 1}`);
        break;

      case "Home":
        // Перехід на першу кнопку
        event.preventDefault();
        buttons[0].focus();
        console.log("Home: фокус на першу кнопку");
        break;

      case "End":
        // Перехід на останню кнопку
        event.preventDefault();
        buttons[buttons.length - 1].focus();
        console.log(`End: фокус на останню кнопку (${buttons.length})`);
        break;

      // Enter та Space обробляються браузером автоматично як click,
      // але ми можемо додати додаткову логіку, якщо потрібно
      case "Enter":
      case " ":
        // Кнопка вже має стандартну поведінку click на Enter/Space
        // Цей код запускається після натиску, якщо потрібна додаткова логіка
        break;

      default:
        // Інші клавіші ігноруються
        break;
    }
  }

  // ============================================
  // 4. ІНІЦІАЛІЗАЦІЯ СТАНУ ТА КОНСОЛЬ
  // ============================================

  console.log("✓ Акордеон успішно ініціалізовано");
  console.log(`✓ Кнопок: ${buttons.length}`);
  console.log("✓ Навігація: Arrow Up/Down (циклічна), Home/End, Tab/Shift+Tab");
  console.log("✓ Активація: Enter/Space або Click");
  console.log("✓ Навіть з панеллю, закритою та hidden, вона не приймає фокус");

  // Друк інформації для дебагу
  buttons.forEach((btn, i) => {
    console.log(
      `Кнопка ${i + 1}: ID="${btn.id}", Controls="${btn.getAttribute("aria-controls")}"`,
    );
  });
});

// ============================================
// 5. ГЛОБАЛЬНА ПОМІЧНИК (опціонально)
// ============================================

window.toggleAccordionPanel = function (buttonId) {
  const button = document.getElementById(buttonId);
  if (button) {
    button.click();
  }
};

console.log(
  "✓ window.toggleAccordionPanel(buttonId) доступна для глобального використання",
);
