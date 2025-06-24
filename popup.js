document.getElementById("summarize").addEventListener("click", async () => {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = '<div class="loading"><div class="loader"></div></div>';
  
    const summaryType = document.getElementById("summary-type").value;
  
    // Get API key from storage
    chrome.storage.sync.get(["geminiApiKey"], async (result) => {
      if (!result.geminiApiKey) {
        resultDiv.innerHTML =
          "API key not found. Please set your API key in the extension options.";
        return;
      }
  
      chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        chrome.tabs.sendMessage(
          tab.id,
          { type: "GET_ARTICLE_TEXT" },
          async (res) => {
            if (!res || !res.text) {
              resultDiv.innerText =
                "Could not extract article text from this page.";
              return;
            }
  
            try {
              const summary = await getGeminiSummary(
                res.text,
                summaryType,
                result.geminiApiKey
              );
              resultDiv.innerText = summary;
            } catch (error) {
              resultDiv.innerText = `Error: ${
                error.message || "Failed to generate summary."
              }`;
            }
          }
        );
      });
    });
  });
  
  document.getElementById("copy-btn").addEventListener("click", () => {
    const summaryText = document.getElementById("result").innerText;
  
    if (summaryText && summaryText.trim() !== "") {
      navigator.clipboard
        .writeText(summaryText)
        .then(() => {
          const copyBtn = document.getElementById("copy-btn");
          const originalText = copyBtn.innerText;
  
          copyBtn.innerText = "Copied!";
          setTimeout(() => {
            copyBtn.innerText = originalText;
          }, 2000);
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    }
  });
  
  async function getGeminiSummary(text, summaryType, apiKey) {
    // Truncate very long texts to avoid API limits (typically around 30K tokens)
    const maxLength = 20000;
    const truncatedText =
      text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  
    let prompt;
    switch (summaryType) {
      case "brief":
        prompt = `Summarize the main points of the following article in 2-3 concise sentences for a README project explanation:\n\n${truncatedText}`;
        break;
      case "detailed":
        prompt = `Transform the following article into a well-structured README file that includes a clear project overview, purpose, detailed summary of key points, and a section for author information. Ensure the README is comprehensive, engaging, and suitable for educational projects:\n\n${truncatedText}`;
        break;
      case "bullets":
        prompt = `Transform the following article into a detailed and comprehensive README file. Emphasize clarity and structure by including a project overview, its purpose, and a section for author details. Break down the article into key insights using a list format, with each point beginning with '- '. Ensure each point is rich in detail, offering focused and in-depth explanations while maintaining an educational tone:\n\n${truncatedText}`;
        break;
      default:
        prompt = `Summarize the following article:\n\n${truncatedText}`;
    }
  
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
            generationConfig: {
              temperature: 0.2,
            },
          }),
        }
      );
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error?.message || "API request failed");
      }
  
      const data = await res.json();
      return (
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No summary available."
      );
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      throw new Error("Failed to generate summary. Please try again later.");
    }
  }