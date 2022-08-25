function Breadcrumb({ $app, initialState, onClick }) {
  this.init = () => {
    this.$target = document.createElement("nav");
    this.$target.className = "Breadcrumb";
    $app.appendChild(this.$target);

    this.state = initialState;
    this.onClick = onClick;

    this.setEvent();
    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = `<div class="nav-item">root</div>${this.state
      .map(
        (node, index) =>
          `<div class="nav-item" data-index="${index}">${node.name}</div>`
      )
      .join("")}`;
  };

  this.setEvent = () => {
    this.$target.addEventListener("click", (e) => {
      const $navItem = e.target.closest(".nav-item");
      if (!$navItem) return;

      const index = $navItem.dataset.index;
      this.onClick(index ? +index : "root");
    });
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.init();
}

export default Breadcrumb;
