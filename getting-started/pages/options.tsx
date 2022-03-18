import { Fragment, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function Options() {
  const [presetColors, setPresetColors] = useState<string[] | undefined>(
    undefined
  );
  const [currentColor, setCurrentColor] = useState<string | undefined>(
    undefined
  );
  const handleButtonClick = (color: string) => {
    setCurrentColor(color);
  };

  useEffect(() => {
    if (presetColors) {
      chrome.storage.sync.set({ colors: presetColors });
    } else {
      chrome.storage.sync.get("colors", ({ colors }) => {
        setPresetColors(colors);
      });
    }
  }, [presetColors]);

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
        {presetColors?.map((buttonColor) => (
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
