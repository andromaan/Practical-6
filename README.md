# **Програмування акордеонів. Використання aria-expanded, aria-controls та обробка подій клавіш Arrow Up/Down**

Процес створення інклюзивного цифрового середовища вимагає від розробника глибокого розуміння того, як допоміжні технології взаємодіють із об’єктною моделлю документа. Одним із найбільш розповсюджених, але водночас складних для правильної реалізації елементів інтерфейсу є акордеон — набір вертикально розташованих інтерактивних заголовків, кожен з яких керує видимістю пов’язаної з ним панелі вмісту.1 Дана практична робота присвячена вивченню архітектури доступного акордеона, впровадженню критичних ARIA-атрибутів, таких як aria-expanded та aria-controls, а також реалізації складних сценаріїв керування фокусом за допомогою клавіш стрілок.3

## **Мета практичної роботи**

Основною метою виконання даної роботи є набуття практичних навичок проєктування та програмування інтерактивних веб\-компонентів, що повністю відповідають стандартам доступності WCAG та специфікаціям WAI-ARIA.5 У процесі виконання студент повинен:

1. Опанувати принципи семантичної верстки компонентів з використанням ролей heading, button та region.7  
2. Навчитися динамічно керувати станом доступності елементів через атрибути aria-expanded та aria-hidden.9  
3. Реалізувати програмну логіку для встановлення явних зв’язків між керуючими елементами та контентними панелями за допомогою aria-controls та aria-labelledby.10  
4. Розробити алгоритми обробки подій клавіатури, що включають не лише стандартну активацію, а й циклічну навігацію стрілками вгору та вниз.2  
5. Ознайомитися з методами верифікації доступності через інструменти розробника, зокрема дерево доступності (Accessibility Tree).13

## **Архітектура доступності та стандарти взаємодії**

Доступність акордеона не обмежується лише можливістю його відкриття за допомогою клавіатури. Вона охоплює передачу семантичної структури, стану та функціональних зв’язків допоміжним технологіям, таким як екранні диктори (screen readers).15

### **Ролі та структурна розмітка**

Акордеон за своєю суттю є списком розкривних секцій. Для забезпечення навігації користувачам, які покладаються на заголовки, кожен заголовок акордеона повинен бути обгорнутий у відповідний HTML-тег заголовка (\<h2\>-\<h6\>), що відповідає ієрархії сторінки.4 Всередині заголовка має міститися елемент \<button\>, який і є інтерактивним тригером.17 Використання саме тегу \<button\> є критичним, оскільки він за замовчуванням підтримує фокусування та активацію клавішами Enter та Space.19

Панель вмісту, що розгортається, повинна бути логічно пов’язана із заголовком. Рекомендується використовувати роль region для кожної панелі, що дозволяє користувачам екранних дикторів швидко переходити до вмісту через орієнтири (landmarks), проте цей підхід слід застосовувати обережно, щоб не перевантажувати інтерфейс великою кількістю дрібних регіонів.4

### **Атрибути стану та зв’язків**

Ключовим елементом інтерактивності є атрибут aria-expanded. Він повідомляє допоміжним технологіям, чи є контрольований елемент наразі видимим.9 Коли стан змінюється з false на true, екранний диктор оголошує "розгорнуто" (expanded), надаючи користувачеві негайний зворотний зв’язок.10

| Атрибут | Роль у системі | Значення та застосування |
| :---- | :---- | :---- |
| aria-expanded | Стан (State) | true — вміст видимий; false — вміст прихований.9 |
| aria-controls | Властивість (Property) | Містить ID елемента (або списку елементів), якими керує дана кнопка.9 |
| aria-labelledby | Властивість (Property) | Вказує на ID заголовка/кнопки, що надає назву панелі вмісту.5 |
| aria-disabled | Стан (State) | Використовується, якщо панель не може бути згорнута (наприклад, одна секція завжди має бути відкритою).2 |

Атрибут aria-controls створює програмний зв’язок, який дозволяє деяким екранним дикторам пропонувати користувачеві прямий перехід від кнопки до вмісту, що вона контролює.10

### **Дерево доступності (Accessibility Tree)**

Браузери не передають весь DOM допоміжним технологіям безпосередньо. Замість цього вони створюють спрощену модель — дерево доступності.13 Це дерево містить лише семантично значущі об’єкти. Коли розробник використовує display: none або атрибут hidden для приховування панелі акордеона, ця панель повністю видаляється з дерева доступності.10 Це надзвичайно важливо, оскільки запобігає випадковому фокусуванню на посиланнях або кнопках всередині закритої секції.4

### **Патерни клавіатурної навігації**

Відповідно до Authoring Practices Guide (APG), акордеони повинні підтримувати певну логіку взаємодії 2:

* **Tab / Shift \+ Tab**: Переміщення між усіма фокусованими елементами на сторінці. Кожна кнопка акордеона має бути в послідовності табуляції.2  
* **Enter або Space**: Перемикання стану розгортання/згортання поточної панелі.2  
* **Arrow Down**: Переміщення фокусу на наступну кнопку заголовка. Якщо фокус на останній кнопці, він може переходити на першу (циклічність).8  
* **Arrow Up**: Переміщення фокусу на попередню кнопку заголовка.2  
* **Home / End**: Перехід до першої або останньої кнопки акордеона відповідно.2

Використання стрілок для навігації між заголовками акордеона значно покращує користувацький досвід для людей, які використовують лише клавіатуру, оскільки це дозволяє швидко пропускати вміст довгих панелей.23

## **Завдання на практичну роботу**

Студент має реалізувати повнофункціональний компонент акордеона, виконавши наступні кроки:

1. **Створення розмітки**: Побудувати структуру з трьох або більше секцій, використовуючи семантичні елементи заголовків та кнопок.4  
2. **Впровадження ARIA**: Додати атрибути aria-expanded, aria-controls та aria-labelledby, забезпечивши унікальність всіх ідентифікаторів.4  
3. **Стилізація стану**: За допомогою CSS забезпечити візуальне приховування закритих панелей та чітку індикацію фокусу для активних кнопок.17  
4. **Програмування перемикання**: Написати JavaScript-сценарій, який змінює значення aria-expanded та керує видимістю панелей при натисканні на кнопки.3  
5. **Обробка клавіш стрілок**: Додати логіку перехоплення подій keydown для реалізації навігації між заголовками за допомогою стрілок вгору та вниз.12  
6. **Тестування в DevTools**: Перевірити правильність відображення компонентів у дереві доступності Chrome/Edge DevTools.13

## **Детальний план виконання роботи**

### **Крок 1: Проєктування семантичної структури (HTML)**

Рекомендується використовувати структуру, де кожен заголовок та панель є сусідніми елементами. Це спрощує навігацію в DOM за допомогою JavaScript.

\<div class\="accordion-container"\>  
  \<h3\>  
    \<button id\="acc-btn-1" aria-expanded\="false" aria-controls\="acc-panel-1"\>  
      Секція 1: Загальна інформація  
    \</button\>  
  \</h3\>  
  \<div id\="acc-panel-1" role\="region" aria-labelledby\="acc-btn-1" hidden\>  
    \<p\>Тут розміщується контент першої секції...\</p\>  
  \</div\>  
\</div\>

Важливо переконатися, що значення aria-controls на кнопці збігається з id відповідної панелі, а aria-labelledby на панелі вказує на id кнопки.8

### **Крок 2: Візуальне керування станом (CSS)**

Використання атрибута hidden у HTML автоматично приховує елемент (display: none). Однак для анімації можна використовувати CSS-класи, поєднані з ARIA-атрибутами як селекторами.

\[aria-expanded="false"\] \+ \[role="region"\] {  
  display: none;  
}  
\[aria-expanded="true"\] \+ \[role="region"\] {  
  display: block;  
}  
button:focus\-visible {  
  outline: 3px solid blue; /\* Забезпечення видимості фокусу згідно з WCAG 2.2 \[24, 25\] \*/  
}

### **Крок 3: Логіка перемикання та доступність (JS)**

JavaScript повинен не лише змінювати зовнішній вигляд, а й оновлювати стан доступності.

const buttons \= document.querySelectorAll('button\[aria-expanded\]');

buttons.forEach(button \=\> {  
  button.addEventListener('click', () \=\> {  
    const isExpanded \= button.getAttribute('aria-expanded') \=== 'true';  
    const panelId \= button.getAttribute('aria-controls');  
    const panel \= document.getElementById(panelId);

    // Зміна стану поточної кнопки  
    button.setAttribute('aria-expanded',\!isExpanded);  
      
    // Керування атрибутом hidden панелі  
    if (isExpanded) {  
      panel.setAttribute('hidden', '');  
    } else {  
      panel.removeAttribute('hidden');  
    }  
  });  
});

### **Крок 4: Реалізація навігації клавішами стрілок**

Це найвідповідальніша частина роботи, що вимагає обробки подій клавіатури на рівні контейнера або кожної кнопки.

button.addEventListener('keydown', (event) \=\> {  
  const index \= Array.from(buttons).indexOf(button);  
  let newIndex;

  switch (event.key) {  
    case 'ArrowDown':  
      event.preventDefault(); // Запобігання прокручуванню сторінки \[20\]  
      newIndex \= (index \+ 1) % buttons.length;  
      buttons\[newIndex\].focus();  
      break;  
    case 'ArrowUp':  
      event.preventDefault();  
      newIndex \= (index \- 1 \+ buttons.length) % buttons.length;  
      buttons\[newIndex\].focus();  
      break;  
    case 'Home':  
      event.preventDefault();  
      buttons.focus();  
      break;  
    case 'End':  
      event.preventDefault();  
      buttons\[buttons.length \- 1\].focus();  
      break;  
  }  
});

### **Крок 5: Верифікація доступності**

Після реалізації коду необхідно провести аудит. Слід відкрити Chrome DevTools, обрати вкладку **Elements**, а потім вкладку **Accessibility**.14

1. Перевірити, чи має кнопка роль "button" та чи змінюється її стан aria-expanded при натисканні.14  
2. Переконатися, що панель зникає та з’являється в дереві доступності.14  
3. Використати інструмент **Source Order Viewer**, щоб підтвердити логічність послідовності фокусування.14

## 

## **Сучасні альтернативи**

Незважаючи на потужність ARIA, сучасні стандарти HTML5 пропонують нативні елементи \<details\> та \<summary\>, які автоматично забезпечують більшість функціоналу акордеона без написання JavaScript.18 З 2024 року браузери почали підтримувати атрибут name для \<details\>, що дозволяє створювати ексклюзивні акордеони (де відкривається лише одна секція одночасно) виключно засобами HTML.29

Також активно обговорюється впровадження атрибута focusgroup, який дозволить декларативно (без JS) описувати поведінку стрілок для груп елементів.31 Розуміння цих тенденцій дозволяє розробнику обирати найбільш стійкі та ефективні рішення для інклюзивного вебу.23

## **Вимоги до звіту**

Звіт про виконання практичної роботи має бути оформлений згідно з академічними стандартами та містити наступні розділи:

1. **Титульна сторінка** із зазначенням теми, дисципліни та виконавця.  
2. **Мета роботи**: Стислий опис того, чого студент навчився.  
3. **Повний вихідний код** HTML, CSS та JS.  
4. **Результати тестування**:  
   * Скріншоти дерева доступності з DevTools для розгорнутого та згорнутого станів кожної секції.  
   * Опис результатів перевірки за допомогою автоматизованих інструментів (наприклад, Axe або Lighthouse).  
5. **Задеплоїти** HTML-сторінку на Github Pages/Vercel для мануальної перевірки роботи акордеона.

6. **Висновки**. Аналіз складнощів, що виникли при впровадженні ARIA, та значення цих атрибутів для кінцевих користувачів.

## **Чому ARIA не замінює семантику**

Важливо пам’ятати перше правило ARIA: "Якщо можна використати нативний HTML-елемент або атрибут із потрібною семантикою та поведінкою, зробіть це".5 Атрибути ARIA лише змінюють те, як браузер описує елемент допоміжній технології, але вони не змінюють поведінку самого елемента.11 Якщо ви даєте елементу \<div\> роль button, ви повинні самостійно додати йому tabindex="0", обробити натискання клавіш та стилізувати стан фокусу. Саме тому в даній роботі наголошується на використанні семантичних кнопок всередині заголовків, що поєднує в собі найкращі практики доступності та стабільності коду.3

Реалізація акордеона за наведеним планом дозволяє не лише виконати навчальну програму, а й підготуватися до розробки професійних інтерфейсів, що відповідають найсуворішим вимогам доступності, таким як стандарт Section 508 або європейський EN 301 549\.6 Отримані знання про aria-expanded та керування фокусом є універсальними та можуть бути масштабовані на будь-які інші складні віджети, від модальних вікон до мега-меню.1

#### 

#### 

#### 

#### 

#### 

#### 

## **Джерела**

1. Patterns | APG | WAI \- W3C, [https://www.w3.org/WAI/ARIA/apg/patterns/](https://www.w3.org/WAI/ARIA/apg/patterns/)  
2. Accordion Pattern (Sections With Show/Hide Functionality) | APG | WAI \- W3C, [https://www.w3.org/WAI/ARIA/apg/patterns/accordion/](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)  
3. 6.4: Accordions \- Workforce LibreTexts, [https://workforce.libretexts.org/Bookshelves/Information\_Technology/Computer\_Applications/Web\_Accessibility\_for\_Developers\_-\_Essential\_Skills\_for\_Web\_Developers/06%3A\_Interactive\_WAI-ARIA\_(Intermediate)/6.04%3A\_Accordions](https://workforce.libretexts.org/Bookshelves/Information_Technology/Computer_Applications/Web_Accessibility_for_Developers_-_Essential_Skills_for_Web_Developers/06%3A_Interactive_WAI-ARIA_\(Intermediate\)/6.04%3A_Accordions)  
4. Accessible Accordion \- examples and best practices \- Aditus, [https://www.aditus.io/patterns/accordion/](https://www.aditus.io/patterns/accordion/)  
5. Accordion Example | APG | WAI \- W3C, [https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/)  
6. Website Accessibility Testing \- MN.gov, [https://mn.gov/mnit/about-mnit/accessibility/news/?id=38-621624](https://mn.gov/mnit/about-mnit/accessibility/news/?id=38-621624)  
7. Accordion Example | WAI-ARIA Authoring Practices 1.1, [https://www.w3.org/TR/2016/WD-wai-aria-practices-1.1-20161214/examples/accordion/accordion1.html](https://www.w3.org/TR/2016/WD-wai-aria-practices-1.1-20161214/examples/accordion/accordion1.html)  
8. Accessibility Examples: ARIA Accordion \- GitHub Pages, [https://techservicesillinois.github.io/accessibility/aria-examples/accordion.html](https://techservicesillinois.github.io/accessibility/aria-examples/accordion.html)  
9. ARIA: aria-expanded attribute \- ARIA | MDN, [https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-expanded](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-expanded)  
10. Practical Guide on Implementing 'aria-expanded' in Web Development, [https://www.a11y-collective.com/blog/aria-expanded/](https://www.a11y-collective.com/blog/aria-expanded/)  
11. ARIA: aria-controls attribute \- MDN Web Docs \- Mozilla, [https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-controls](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-controls)  
12. Accordion Example | WAI-ARIA Authoring Practices 1.1, [https://www.w3.org/TR/2017/NOTE-wai-aria-practices-1.1-20171214/examples/accordion/accordion.html](https://www.w3.org/TR/2017/NOTE-wai-aria-practices-1.1-20171214/examples/accordion/accordion.html)  
13. Check the Accessibility Tree for keyboard and screen reader support \- Microsoft Edge Developer documentation, [https://learn.microsoft.com/en-us/microsoft-edge/devtools/accessibility/test-accessibility-tree](https://learn.microsoft.com/en-us/microsoft-edge/devtools/accessibility/test-accessibility-tree)  
14. Accessibility features reference | Chrome DevTools | Chrome for ..., [https://developer.chrome.com/docs/devtools/accessibility/reference](https://developer.chrome.com/docs/devtools/accessibility/reference)  
15. aria-expanded attribute (aria) \- Accessibility Support, [https://a11ysupport.io/tech/aria/aria-expanded\_attribute](https://a11ysupport.io/tech/aria/aria-expanded_attribute)  
16. Marking elements expandable using aria-expanded \- Accessibility Developer Guide, [https://www.accessibility-developer-guide.com/examples/sensible-aria-usage/expanded/](https://www.accessibility-developer-guide.com/examples/sensible-aria-usage/expanded/)  
17. Disclosures and Accordions \- WebAIM, [https://webaim.org/techniques/disclosures/](https://webaim.org/techniques/disclosures/)  
18. Making accessible accordion \- SiteLint, [https://www.sitelint.com/blog/making-accessible-accordion](https://www.sitelint.com/blog/making-accessible-accordion)  
19. Accessible Navigation Menus: Dropdown and Mega Menu Implementation | TestParty, [https://testparty.ai/blog/navigation-menu-accessibility](https://testparty.ai/blog/navigation-menu-accessibility)  
20. Keyboard-navigable JavaScript widgets \- Accessibility \- MDN Web Docs \- Mozilla, [https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Keyboard-navigable\_JavaScript\_widgets](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Keyboard-navigable_JavaScript_widgets)  
21. ARIA: aria-disabled attribute \- MDN Web Docs \- Mozilla, [https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-disabled](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-disabled)  
22. Full accessibility tree in Chrome DevTools | Blog, [https://developer.chrome.com/blog/full-accessibility-tree](https://developer.chrome.com/blog/full-accessibility-tree)  
23. focusgroup (Explainer) | Open UI, [https://open-ui.org/components/focusgroup.explainer/](https://open-ui.org/components/focusgroup.explainer/)  
24. How to use Chrome's accessibility tree \- Pope Tech Resources, [https://blog.pope.tech/2023/11/27/how-to-use-chromes-accessibility-tree/](https://blog.pope.tech/2023/11/27/how-to-use-chromes-accessibility-tree/)  
25. Accessible accordions part 2 \- using and \- Hassell Inclusion, [https://www.hassellinclusion.com/blog/accessible-accordions-part-2-using-details-summary/](https://www.hassellinclusion.com/blog/accessible-accordions-part-2-using-details-summary/)  
26. Desktop Screen Readers Survival Guide \- Basic Keyboard Shortcuts \- Deque University, [https://dequeuniversity.com/screenreaders/survival-guide](https://dequeuniversity.com/screenreaders/survival-guide)  
27. Native Accordions. Let HTML do the heavy lifting \- Mario Hernandez, [https://mariohernandez.io/blog/native-accordions-let-html-do-the-heavy-lifting/](https://mariohernandez.io/blog/native-accordions-let-html-do-the-heavy-lifting/)  
28. Influence the State of HTML 2025 Survey\! \- Lea Verou, [https://lea.verou.me/blog/2025/design-state-of-html/](https://lea.verou.me/blog/2025/design-state-of-html/)  
29. Focusgroup (Explainer) | Open UI, [https://open-ui.org/components/scoped-focusgroup.explainer/](https://open-ui.org/components/scoped-focusgroup.explainer/)  
30. Request for developer feedback: focusgroup | Blog, [https://developer.chrome.com/blog/focusgroup-rfc](https://developer.chrome.com/blog/focusgroup-rfc)  
31. ARIA states and properties (attributes) \- MDN Web Docs, [https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes)  
32. Writing JavaScript with accessibility in mind | by Manuel Matuzovic \- Medium, [https://medium.com/@matuzo/writing-javascript-with-accessibility-in-mind-a1f6a5f467b9](https://medium.com/@matuzo/writing-javascript-with-accessibility-in-mind-a1f6a5f467b9)  
33. Using DevTools Accessibility tab when manual testing HTML and ARIA. \- Section508.gov, [https://assets.section508.gov/assets/files/iaaf/2024/Using%20DevTools%20for%20Manual%20Accessibility%20Inspection%20-%20IAAF%202024.pdf](https://assets.section508.gov/assets/files/iaaf/2024/Using%20DevTools%20for%20Manual%20Accessibility%20Inspection%20-%20IAAF%202024.pdf)