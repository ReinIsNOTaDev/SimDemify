function matchCase(text, pattern) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        result += /[A-Z]/.test(pattern[i]) ? text[i].toUpperCase() : text[i].toLowerCase();
    }
    return result;
}
function replaceTextContent(node, map) {
    let replaced = false;
    let text = node.textContent;
    for (const [pattern, replacement] of Object.entries(map)) {
        const regex = new RegExp(pattern, 'gi');
        text = text.replace(regex, match => matchCase(replacement, match));
        replaced = true;
    }
    if (replaced) {
        node.textContent = text;
    }
}
function walkAndReplace(map) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while ((node = walker.nextNode())) {
        if (node.parentNode && !['SCRIPT', 'STYLE', 'NOSCRIPT', 'IFRAME', 'TEXTAREA'].includes(node.parentNode.nodeName)) {
            replaceTextContent(node, map);
        }
    }
}
walkAndReplace(substitutions);