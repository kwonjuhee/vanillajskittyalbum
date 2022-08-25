function Loading({ $app, initialState }) {
  this.state = initialState;

  this.$target = document.createElement("div");
  this.$target.className = "Modal loading";
  this.$target.style.display = "none";
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
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
}

export default Loading;
