function Loading({ $app, initialState }) {
  this.init = () => {
    this.$target = document.createElement("div");
    this.$target.className = "Modal loading";
    this.$target.style.display = "none";
    $app.appendChild(this.$target);

    this.state = initialState;

    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = `
      <div class="content">
         <img src="../../assets/nyan-cat.gif">
      </div>
    `;
    this.$target.style.display = this.state ? "block" : "none";
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.init();
}

export default Loading;
