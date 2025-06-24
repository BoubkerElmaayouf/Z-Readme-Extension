function getArticleText() {
    const article = document.getElementById("root");
    if (article) {
        console.log("--------", article);
        return article.innerText;
    }

  
    // fallback
    const paragraphs = Array.from(document.querySelectorAll("p"));
    return paragraphs.map((p) => p.innerText).join("\n");
  }
  
  chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    if (req.type === "GET_ARTICLE_TEXT") {
      const text = getArticleText();
      sendResponse({ text });
    }
  });