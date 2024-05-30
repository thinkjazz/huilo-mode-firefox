const replacements = {
  'Путина': 'Хуйла',
  'путина': 'хуйла',
  'Путине': 'Хуйле',
  'путине': 'хуйле',
  'Путину': 'Хуйлу',
  'путину': 'хуйлу',
  'Путин': 'Хуйло',
  'путин': 'хуйло',
  'Путиным': 'Хуйлом',
  'путиным': 'хуйлом',
  'Пу́тин': 'Ху́йло',
  'Putin': 'Huilo',
  'putin': 'huilo',
  'Путін': 'Хуйло',
  'путін': 'Хуйло',
  'Путіна': 'Хуйла',
  'путіна': 'хуйла',
  'Путіне': 'Хуйле',
  'путіне': 'хуйле',
  'Путіну': 'Хуйлу',
  'путіну': 'хуйлу',
  'Путіным': 'Хуйлом',
  'путіным': 'хуйлом',
};

const regex = new RegExp(Object.keys(replacements).join("|"), "gi");

function replaceTextContent(textContent) {
  return textContent.replace(regex, (matched) => replacements[matched]);
}

function traverseAndReplace(node) {
  const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
  let textNode;
  while (textNode = walker.nextNode()) {
    textNode.textContent = replaceTextContent(textNode.textContent);
  }
}

function replaceTextInDocument() {
  traverseAndReplace(document.body);
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "replaceText") {
    replaceTextInDocument();
    sendResponse({ status: "done" });
  }
});
