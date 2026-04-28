# Інструкції розгортання на GitHub Pages

## Крок 1: Встановлення Git (якщо не встановлено)

### На Windows

1. Завантажте з [https://git-scm.com/download/win](https://git-scm.com/download/win)
2. Встановіть з деніятівними параметрами
3. Перезавантажте комп'ютер
4. Відкрийте PowerShell і перевірте:

```powershell
git --version
# Має вивести: git version 2.xx.x
```

### Налаштування Git

```powershell
git config --global user.name "Ваше ім'я"
git config --global user.email "ваш.email@example.com"
```

## Крок 2: Створення репозиторію на GitHub

1. Перейдіть на [https://github.com/new](https://github.com/new)
2. Заповніть:
   - **Repository name:** `accessible-accordion-aria-wcag`
   - **Description:** "Full-featured accessible accordion with WCAG 2.2 Level AA compliance"
   - **Visibility:** Public
   - **Initialize with:** Залиште пусто (ми самі додамо файли)
3. Натисніть "Create repository"

## Крок 3: Ініціалізація локального репозиторію

```powershell
cd "c:\Users\Andrii\Desktop\oa\Web Acc\Practical 6"

# Ініціалізуйте Git репозиторій
git init

# Додайте всі файли
git add .

# Першим комітом
git commit -m "Initial commit: Accessible Accordion with ARIA, WCAG 2.2 Level AA compliance"

# Перейменуйте гілку на 'main' (якщо потрібно)
git branch -M main
```

## Крок 4: Підключення до GitHub

```powershell
# Замініть YOUR_USERNAME на ваше ім'я користувача GitHub
git remote add origin https://github.com/YOUR_USERNAME/accessible-accordion-aria-wcag.git

# Відправте код на GitHub
git push -u origin main
```

⚠️ **Якщо виникне помилка "fatal: could not read Username":**

- Зберіть Personal Access Token на GitHub:
  - Settings → Developer settings → Personal access tokens → Generate new token
  - Скопіюйте токен
- Вставте замість пароля при запиті

## Крок 5: Активація GitHub Pages

1. Перейдіть на сторінку репозиторію: `https://github.com/YOUR_USERNAME/accessible-accordion-aria-wcag`
2. Натисніть на **Settings** (верхня правах на стрічці меню)
3. В лівому меню знайдіть **Pages**
4. Під "Source" виберіть:
   - **Branch:** `main`
   - **Folder:** `/ (root)`
5. Натисніть **Save**

GitHub буде розгортати вашу сторінку автоматично. Чекайте 1-2 хвилини.

## Крок 6: Доступ до живої версії

Після розгортання ваш акордеон буде доступний за адресою:

```
https://YOUR_USERNAME.github.io/accessible-accordion-aria-wcag/
```

## Оновлення коду

Якщо потім ви змінили файли локально, просто:

```powershell
git add .
git commit -m "Опис змін"
git push origin main
```

GitHub Pages автоматично оновиться за 1-2 хвилини.

## Перевірка статусу розгортання

1. Перейдіть на сторінку репозиторію
2. На правій сторінці знайдіть **Deployments**
3. Клікніть на найновішого деплойменту
4. Переконайтеся, що статус "✓ Active"

## 🎉 Готово!

Ваш доступний акордеон тепер доступний в інтернеті за адресою:

```
https://YOUR_USERNAME.github.io/accessible-accordion-aria-wcag/
```

## Поширені проблеми

### Проблема: "Repository not found"

**Рішення:** Переконайтеся, що URL вказаний правильно:

```
https://github.com/YOUR_USERNAME/accessible-accordion-aria-wcag.git
```

### Проблема: GitHub Pages не оновлюється

**Рішення:**

1. Переконайтеся, що гілка `main` вибрана в Settings → Pages
2. Чекайте 2-3 хвилини
3. Очистіть кеш браузера (Ctrl+Shift+Delete)
4. Відкрийте сторінку в інкогніто режимі

### Проблема: "403 Forbidden" при push

**Рішення:** Переконайтеся, що:

1. Вхідні дані правильні (username/token)
2. Personal Access Token має права `repo` та `workflow`
3. Репозиторій публічний

## Додаткові команди Git

```powershell
# Перевірити статус
git status

# Переглянути історію комітів
git log --oneline

# Видалити файл з Git (но не з диска)
git rm --cached filename

# Переглянути конфіг
git config --global --list
```

---

**Дата:** 28 квітня 2026  
**Версія:** 1.0
