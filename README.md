# Доступний акордеон з ARIA та клавіатурною навігацією

Повнофункціональна реалізація доступного акордеона, що відповідає стандартам **WCAG 2.2 Level AA** та **WAI-ARIA** найкращим практикам.

## 🎯 Функціональність

- ✅ **Семантична HTML структура** — використано `<h3>`, `<button>`, `role="region"`
- ✅ **ARIA атрибути** — `aria-expanded`, `aria-controls`, `aria-labelledby` для передачі стану допоміжним технологіям
- ✅ **Клавіатурна навігація** — повна підтримка:
  - `Tab` / `Shift+Tab` — табуляція між кнопками
  - `Arrow Down` — переміщення фокусу на наступну кнопку (циклічне)
  - `Arrow Up` — переміщення фокусу на попередню кнопку (циклічне)
  - `Home` — перемикання на першу кнопку
  - `End` — перемикання на останню кнопку
  - `Enter` / `Space` — відкриття/закриття панелі
- ✅ **Видимість фокусу** — 3px solid outline за WCAG 2.2 стандартами
- ✅ **Адаптивний дизайн** — оптимізація для мобільних пристроїв
- ✅ **Доступність в темному режимі** — підтримка `prefers-color-scheme`
- ✅ **Зменшена анімація** — підтримка `prefers-reduced-motion`
- ✅ **Високий контраст** — підтримка `prefers-contrast: more`

## 📁 Структура файлів

```
.
├── index.html              # Основна розмітка з 4 секціями
├── styles.css              # CSS зі стилізацією та ARIA селекторами
├── script.js               # JavaScript для логіки та клавіатурної навігації
├── README.md               # Цей файл
└── ЗВІТ_ПРО_ВИКОНАННЯ.md   # Детальний звіт про виконання практичної роботи
```

## 🚀 Швидкий старт

### Локально

1. Клонуйте репозиторій:

```bash
git clone https://github.com/YOUR_USERNAME/accessible-accordion-aria-wcag.git
cd accessible-accordion-aria-wcag
```

2. Запустіть локальний сервер:

```bash
python -m http.server 8000
# або
npx http-server
```

3. Відкрийте у браузері:

```
http://localhost:8000
```

### На GitHub Pages

Акордеон розгорнутий на GitHub Pages:

```
https://YOUR_USERNAME.github.io/accessible-accordion-aria-wcag/
```

## 📋 Архітектура

### HTML Структура

```html
<div class="accordion-container">
  <h3>
    <button id="acc-btn-1" aria-expanded="false" aria-controls="acc-panel-1">
      Секція 1: ...
    </button>
  </h3>
  <div id="acc-panel-1" role="region" aria-labelledby="acc-btn-1" hidden>
    <p>Вміст панелі...</p>
  </div>
</div>
```

**Ключові атрибути:**

- `aria-expanded` — стан (true = розгорнуто, false = згорнуто)
- `aria-controls` — ID панелі, якою керує кнопка
- `aria-labelledby` — ID кнопки, що названає панель
- `hidden` — приховує елемент від HTML та дерева доступності

### CSS Селектори ARIA

```css
/* Показати панель, коли aria-expanded="true" */
[aria-expanded="true"] + [role="region"] {
  display: block;
}

/* Приховати панель, коли aria-expanded="false" */
[aria-expanded="false"] + [role="region"] {
  display: none;
}
```

### JavaScript Логіка

1. **Клік на кнопку** → Змінити `aria-expanded` → Керувати `hidden` атрибутом
2. **Клавіатурна навігація** → Переміщувати фокус між кнопками за допомогою обробки подій `keydown`

## ♿ Тестування доступності

### У браузері

1. Відкрийте Chrome/Edge DevTools: **F12**
2. Перейдіть на вкладку **Elements** → **Accessibility**
3. Перевірте:
   - ✓ Дерево доступності показує правильну структуру
   - ✓ Кнопки мають роль `button` з `aria-expanded` атрибутом
   - ✓ Панелі мають роль `region` з `aria-labelledby` атрибутом
   - ✓ Закриті панелі не з'являються в дереві (через `hidden`)

### Тестування клавіатури

1. Натиснути **Tab** — фокусування на першу кнопку
2. Натиснути **Arrow Down** — фокус на наступну кнопку
3. Натиснути **Home** — фокус на першу кнопку
4. Натиснути **End** — фокус на останню кнопку
5. Натиснути **Space** — відкриття/закриття панелі

### Тестування з екранним дикуром

- **NVDA** (Windows, безкоштовно): [https://www.nvaccess.org/](https://www.nvaccess.org/)
- **JAWS** (Windows, платна): [https://www.freedomscientific.com/products/software/jaws/](https://www.freedomscientific.com/products/software/jaws/)
- **VoiceOver** (macOS/iOS, вбудована)

### Lighthouse Audit

```bash
lighthouse https://YOUR_USERNAME.github.io/accessible-accordion-aria-wcag/ --only-categories=accessibility
```

**Очікуваний результат:** 95+ балів

## 📖 Документація

Детальна документація знаходиться в файлі [ЗВІТ*ПРО*ВИКОНАННЯ.md](./ЗВІТ_ПРО_ВИКОНАННЯ.md), який включає:

- Архітектура рішення
- Повний вихідний код
- Результати тестування
- Скріншоти дерева доступності
- Результати аудиту Lighthouse/Axe
- Висновки та рекомендації

## 🔧 Налаштування

### Кількість секцій

Щоб додати нову секцію, додайте HTML блок у `.accordion-container`:

```html
<h3>
  <button id="acc-btn-5" aria-expanded="false" aria-controls="acc-panel-5">
    Секція 5: Нова тема
  </button>
</h3>
<div id="acc-panel-5" role="region" aria-labelledby="acc-btn-5" hidden>
  <p>Вміст нової панелі...</p>
</div>
```

### Кольори

Відредагуйте змінні в `styles.css`:

```css
button[aria-expanded] {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  /* Змініть на ваші кольори */
}

button[aria-expanded]:focus-visible {
  outline: 3px solid #ff6b6b; /* Змініть на бажаний колір фокусу */
}
```

## 🐛 Дебагу

Відкрийте **Console** в DevTools (F12 → Console) для перегляду логів:

```javascript
// Логи інтерактивних дій:
// ✓ Arrow Down: фокус переміщено на кнопку 2
// ✓ Панель "acc-panel-1" змінена на: ОТКРЫТА
// ✓ Home: фокус на першу кнопку
```

## 📱 Мобільна версія

Акордеон повністю адаптивний:

- На мобільних пристроях кнопки розміром 100% ширини
- Шрифти масштабуються для читабельності
- Табуляція все ще працює на сенсорних клавіатурах (з нею на режимі доступності)

## 🔐 Безпека

- Не використовуються вбудовані скрипти (XSS-безпечно)
- Не потрібна залежність від зовнішніх бібліотек
- Мінімальний JavaScript без потенційних вразливостей

## 📊 Відповідність стандартам

| Стандарт                    | Статус                 |
| --------------------------- | ---------------------- |
| **WCAG 2.2 Level A**        | ✅ Повна відповідність |
| **WCAG 2.2 Level AA**       | ✅ Повна відповідність |
| **WAI-ARIA Best Practices** | ✅ Дотримано           |
| **Section 508 (США)**       | ✅ Сумісна             |
| **EN 301 549 (Європа)**     | ✅ Сумісна             |

## 💡 Приклади використання

### Приклад 1: Відкриття панелі програматично

```javascript
// Відкрити панель 1
const button = document.getElementById("acc-btn-1");
button.click();
```

### Приклад 2: Слухання змін стану

```javascript
document.addEventListener("click", (e) => {
  if (e.target.hasAttribute("aria-expanded")) {
    console.log(
      `Button ${e.target.id} state: ${e.target.getAttribute("aria-expanded")}`,
    );
  }
});
```

## 🤝 Внесення змін

1. Форкніть репозиторій
2. Створіть гілку для нової функції (`git checkout -b feature/my-feature`)
3. Закомітьте зміни (`git commit -am 'Add my feature'`)
4. Задавте гілку (`git push origin feature/my-feature`)
5. Відкрийте Pull Request

## 📄 Ліцензія

MIT License — див. [LICENSE](./LICENSE) для деталей

## 👨‍💻 Автор

Виконано як практична робота з дисципліни "Веб-доступність"  
**Дата:** 28 квітня 2026

## 🔗 Корисні посилання

- [WAI-ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/)
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [MDN: ARIA - Accessible Rich Internet Applications](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)
- [MDN: aria-expanded](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-expanded)
- [Accordion Pattern Example](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)

---

**Версія:** 1.0  
**Останнє оновлення:** 28 квітня 2026
