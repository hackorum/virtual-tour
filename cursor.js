AFRAME.registerComponent("cursor-listener", {
  schema: {
    selectedItemId: { default: "", type: "string" },
  },
  init: function () {
    this.handleMouseEnterEvents();
    this.handleMouseLeaveEvents();
    this.handleMouseClickEvents();
  },
  handleViewState: function () {
    const id = this.el.getAttribute("id");
    console.log(id);
    const placesContainer = document.querySelector("#places-container");
    const { selectedItemId } = placesContainer.getAttribute("cursor-listener");
    const placesId = ["place-1", "place-2", "place-3", "place-4"];
    if (placesId.includes(id)) {
      placesContainer.setAttribute("tour", { state: "change-view" });
      const skyEl = document.querySelector("#main-container");
      skyEl.setAttribute("material", {
        src: `./assets/360_images/${selectedItem}/${id}.jpg`,
        color: "#fff",
      });
    }
  },
  handlePlacesListState: function () {
    const id = this.el.getAttribute("id");
    const placesId = ["taj-mahal", "budapest", "new-york-city", "eiffel-tower"];
    if (placesId.includes(id)) {
      const placeContainer = document.querySelector("#places-container");
      placeContainer.setAttribute("cursor-listener", {
        selectedItemId: id,
      });
      this.el.setAttribute("material", {
        color: "#D76B30",
        opacity: 1,
      });
    }
  },
  handleMouseEnterEvents: function () {
    // Mouse Enter Events
    this.el.addEventListener("mouseenter", () => {
      this.handlePlacesListState();
    });
  },
  handleMouseLeaveEvents: function () {
    this.el.addEventListener("mouseleave", () => {
      const id = this.el.getAttribute("id");
      const placesId = [
        "taj-mahal",
        "budapest",
        "new-york-city",
        "eiffel-tower",
      ];
      if (placesId.includes(id)) {
        const placeContainer = document.querySelector("#places-container");
        placeContainer.setAttribute("cursor-listener", {
          selectedItemId: id,
        });
        this.el.setAttribute("material", {
          color: "dodgerblue",
          opacity: 1,
        });
      }
    });
  },
  handleMouseClickEvents: function () {
    this.el.addEventListener("click", (_e) => {
      const placesContainer = document.querySelector("#places-container");
      const { state } = placesContainer.getAttribute("tour");
      if (state == "places-list") {
        const id = this.el.getAttribute("id");
        const placesId = [
          "taj-mahal",
          "budapest",
          "new-york-city",
          "eiffel-tower",
        ];
        if (placesId.includes(id)) {
          placesContainer.setAttribute("tour", {
            state: "view",
            selectedCard: id,
          });
        }
      }
      if (state === "view" || state === "change-view") {
        this.handleViewState();
      }
    });
  },
});
