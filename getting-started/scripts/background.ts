(function () {
  const colors: string[] = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"];

  chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color: colors[0], colors }, () => {
      console.log(
        "Default background color set to %cgreen",
        `color: ${colors[0]}`
      );
    });
  });
})();
