function replaceText(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    node.textContent = node.textContent.replace(/\bElon Musk\b/g, "Space Karen");
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    for (const child of node.childNodes) {
      replaceText(child);
    }
  }
}

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (
        node.parentNode &&
        node.parentNode.parentNode &&
        node.parentNode.parentNode.classList.contains("public-DraftStyleDefault-block")
      )
        return;

      replaceText(node);
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });
