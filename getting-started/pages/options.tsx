import { Fragment, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function Options() {
  const [presetButtonColors] = useState<string[]>([
    "#3aa757",
    "#e8453c",
    "#f9bb2d",
    "#4688f1",
  ]);
  const [currentColor, setCurrentColor] = useState<string>("#3aa757");
  const handleButtonClick = (color: string) => {
    setCurrentColor(color);
  };

  useEffect(() => {
    if (currentColor) {
      chrome.storage.sync.set({ color: currentColor });
    } else {
      chrome.storage.sync.get("color", ({ color }) => {
        setCurrentColor(color);
      });
    }
  }, [currentColor]);

  return (
    <Fragment>
      <div id="buttonDiv">
        {presetButtonColors.map((buttonColor) => (
          <button
            key={uuidv4()}
            data-color={buttonColor}
            style={{
              backgroundColor: buttonColor,
            }}
            className={buttonColor === currentColor ? "current" : ""}
            onClick={() => handleButtonClick(buttonColor)}
          ></button>
        ))}
      </div>
      <div>
        <p>Choose a different background color!</p>
      </div>
    </Fragment>
  );
}

export default Options;
