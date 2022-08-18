function Nodes({ $app, initialState }) {
  this.state = initialState;

  this.$target = document.createElement("ul");
  this.$target.className = "Nodes";
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const nodesTemplate = this.state.nodes
      .map((node) => {
        const iconPath =
          node.type === "FILE"
            ? "../../assets/file.png"
            : "../../assets/directory.png";
        return `
          <div class="Node">
            <img src="${iconPath}" />
            <div>${node.name}</div>
          </div>
        `;
      })
      .join("");
    this.$target.innerHTML = `
      <div class="Node">
        <img src="../../assets/prev.png" />
      </div>
      ${nodesTemplate}
    `;
  };
}

export default Nodes;
