AFRAME.registerComponent("tour", {
  schema: {
    state: {
      type: "string",
      default: "places-list",
    },
    selectedCard: {
      type: "string",
      default: "#card1",
    },
  },
  init: function () {
    this.placesContainer = this.el;
    this.createCards();
  },
  hideEl: function (ellist) {
    ellist.map((el) => {
      el.setAttribute("visible", false);
    });
  },
  showView: function () {
    let el = document.querySelector("#main-container");
    let { selectedCard } = this.data;
    el.setAttribute("material", {
      src: `./assets/360_images/${selectedCard}/place-0.jpg`,
      color: "#fff",
    });
  },
  tick: function () {
    const { state } = this.el.getAttribute("tour");
    if (state == "view") {
      this.hideEl([this.placesContainer]);
      this.showView();
    }
  },
  createBorder: function (position, id) {
    const element = document.createElement("a-entity");
    element.setAttribute("id", id);
    element.setAttribute("position", position);
    element.setAttribute("visible", true);
    element.setAttribute("geometry", {
      primitive: "ring",
      radiusInner: 9,
      radiusOuter: 10,
    });
    element.setAttribute("material", { color: "dodgerblue", opacity: 1 });
    element.setAttribute("cursor-listener", {});
    return element;
  },
  createThumbnail: function (item) {
    const element = document.createElement("a-entity");
    element.setAttribute("visible", true);
    element.setAttribute("geometry", { primitive: "circle", radius: 9 });
    element.setAttribute("material", { src: item.url });
    return element;
  },
  createTitle: function (item, position) {
    const element = document.createElement("a-entity");
    element.setAttribute("text", {
      value: item.title,
      font: "exo2bold",
      width: 70,
      align: "center",
      color: "black",
    });
    element.setAttribute("visible", true);
    let elpos = position;
    elpos.y = -20;
    element.setAttribute("position", elpos);
    return element;
  },
  createCards: function () {
    const thumbNailsRef = [
      {
        id: "taj-mahal",
        title: "Taj Mahal",
        url: "./assets/thumbnails/taj_mahal.png",
      },
      {
        id: "budapest",
        title: "Budapest",
        url: "./assets/thumbnails/budapest.jpg",
      },

      {
        id: "eiffel-tower",
        title: "Eiffel Tower",
        url: "./assets/thumbnails/eiffel_tower.jpg",
      },
      {
        id: "new-york-city",
        title: "New York City",
        url: "./assets/thumbnails/new_york_city.png",
      },
    ];
    let prevoiusXPosition = -60;

    for (var item of thumbNailsRef) {
      const posX = prevoiusXPosition + 25;
      const posY = 10;
      const posZ = -40;
      const position = { x: posX, y: posY, z: posZ };
      prevoiusXPosition = posX;

      // Border Element
      const borderEl = this.createBorder(position, item.id);

      // Thumbnail Element
      const thumbnailEl = this.createThumbnail(item);
      borderEl.appendChild(thumbnailEl);

      // Title Text Element
      const titleEl = this.createTitle(item, position);
      borderEl.appendChild(titleEl);

      this.placesContainer.appendChild(borderEl);
    }
  },
});
