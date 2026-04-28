document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("button[aria-expanded]");

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const isExpanded = button.getAttribute("aria-expanded") === "true";
      const panelId = button.getAttribute("aria-controls");
      const panel = document.getElementById(panelId);

      if (!panel) return;

      button.setAttribute("aria-expanded", !isExpanded);

      if (isExpanded) {
        panel.setAttribute("hidden", "");
        panel.classList.remove("accordion-expanded");
      } else {
        panel.removeAttribute("hidden");
        panel.classList.add("accordion-expanded");
      }
    });

    button.addEventListener("keydown", (event) => {
      const index = Array.from(buttons).indexOf(button);
      let newIndex;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          newIndex = (index + 1) % buttons.length;
          buttons[newIndex].focus();
          break;

        case "ArrowUp":
          event.preventDefault();
          newIndex = (index - 1 + buttons.length) % buttons.length;
          buttons[newIndex].focus();
          break;

        case "Home":
          event.preventDefault();
          buttons[0].focus();
          break;

        case "End":
          event.preventDefault();
          buttons[buttons.length - 1].focus();
          break;
      }
    });
  });
});
