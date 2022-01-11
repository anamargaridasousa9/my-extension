// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

export const addListenersToYoutubePage = () => {
  // Select the node that will be observed for mutations
  const divContainer = document.getElementsByTagName("body")[0];

  // Callback function to execute when mutations are observed
  const callback = function (mutationsList, observer) {
    const playerAdsElement = document.getElementById("player-ads");
    if (playerAdsElement) {
      const firstSearchInput = searchInput[0];
      addListenersToWorkApps(workAppButtons);
      addListenerToSearchInput(firstSearchInput);
      // You can stop observing
      observer.disconnect();
    }
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(divContainer, config);
};
