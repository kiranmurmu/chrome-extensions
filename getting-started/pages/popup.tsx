import { useEffect, useState } from "react";

function Popup() {
  const [backgroundColor, setBackgroundColor] = useState<string>("#3aa757");

  const handleButtonClick = async () => {
    let [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    chrome.scripting.executeScript({
      target: { tabId: tab.id ?? chrome.tabs.TAB_ID_NONE },
      files: ["content.js"],
    });
  };

  useEffect(() => {
    chrome.storage.sync.get("color", ({ color }) => {
      setBackgroundColor(color);
    });
  }, [backgroundColor]);

  return (
    <button
      id="changeColor"
      style={{
        backgroundColor: backgroundColor,
      }}
      onClick={handleButtonClick}
    ></button>
  );
}

export default Popup;
