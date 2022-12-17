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

const observer = new MutationObserver((mutations) => {
  const editorNode = document.getElementsByClassName("DraftEditor-root")[0];
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      // Avoid modification within the Tweet editor
      if (!editorNode || !editorNode.contains(node)) replaceElonName(node);
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });
