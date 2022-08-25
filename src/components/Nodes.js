function Nodes({ $app, initialState, onClick, onBackClick }) {
  this.state = initialState;
  this.onClick = onClick;
  this.onBackClick = onBackClick;

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
          <div class="Node" data-node-id="${node.id}">
            <img src="${iconPath}" />
            <div>${node.name}</div>
          </div>
        `;
      })
      .join("");

    this.$target.innerHTML = `${
      this.state.isRoot
        ? nodesTemplate
        : `
          <div class="Node">
            <img src="../../assets/prev.png" />
          </div>
          ${nodesTemplate}
        `
    }
    `;
  };

  this.$target.addEventListener("click", (e) => {
    const $Node = e.target.closest(".Node");
    if (!$Node) return;

    const { nodeId } = $Node.dataset;
    if (!nodeId) {
      this.onBackClick();
      return;
    }
    const selectedNode = this.state.nodes.find((node) => node.id === nodeId);
    this.onClick(selectedNode);
  });
}

export default Nodes;
