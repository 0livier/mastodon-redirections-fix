const re = /\bElon Musk\b/gi;
function replaceElonName(node) {
  if (node.nodeType === Node.TEXT_NODE && node.textContent.match(re)) {
    node.textContent = node.textContent.replace(re, "Space Karen");
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    for (const child of node.childNodes) {
      replaceElonName(child);
    }
  }
}

// Avoid modification within the Tweet editor
function isTweetEditor(node) {
  return (
    node.parentNode &&
    node.parentNode.parentNode &&
    node.parentNode.parentNode.classList.contains("public-DraftStyleDefault-block")
  );
}

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (!isTweetEditor(node)) replaceElonName(node);
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });
