function onCaptionClick(event) {
  // prevent caption link clicks from closing modal and preventing link follows
  event.stopPropagation();

  return true;
}

let lightBoxesReadyToRender = false;
let lightBoxBuffer = [];

function registerLightBox(selector) {
  lightBoxBuffer.push(selector);

  createLightBoxes();
}

function createLightBox(selector) {
  new LuminousGallery(
    document.querySelectorAll(selector + " .card > a"),
    {},
    {
      sourceAttribute: "data-full-img",
      caption: function(trigger) {
        return `<a onclick="onCaptionClick(event)" href="${
          trigger.href
        }" target="_blank" rel="noopener noreferrer">${trigger
          .querySelector("img")
          .getAttribute(
            "alt"
          )}</a> <span class="external-link-arrow">${"\u2197"}</span>`;
      }
    }
  );
}

function createLightBoxes() {
  if (lightBoxesReadyToRender) {
    lightBoxBuffer.forEach(registeredSelector =>
      createLightBox(registeredSelector)
    );

    // remove rendered lightboxes
    lightBoxBuffer = [];
  }
}

function luminousLoaded() {
  lightBoxesReadyToRender = true;

  createLightBoxes();
}

function isFutureDate(date) {
  return false;
}
