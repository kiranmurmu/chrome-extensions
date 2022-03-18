import { useEffect, useState } from "react";

function Popup() {
  const [color, setColor] = useState<string | undefined>(undefined);

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
      setColor(color);
    });
  }, [color]);

  return (
    <button
      id="changeColor"
      style={{
        backgroundColor: color,
      }}
      onClick={handleButtonClick}
    ></button>
  );
}

export default Popup;
