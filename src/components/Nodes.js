function Nodes({ $app, initialState, onClick, onBackClick }) {
  this.init = () => {
    this.$target = document.createElement("ul");
    this.$target.className = "Nodes";
    $app.appendChild(this.$target);

    this.state = initialState;
    this.onClick = onClick;
    this.onBackClick = onBackClick;

    this.setEvent();
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

  this.setEvent = () => {
    this.$target.addEventListener("click", (e) => {
      const $Node = e.target.closest(".Node");
      if (!$Node) return;

      const nodeId = $Node.dataset.nodeId;
      if (!nodeId) this.onBackClick();
      else {
        const selectedNode = this.state.nodes.find(
          (node) => node.id === nodeId
        );
        this.onClick(selectedNode);
      }
    });
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.init();
}

export default Nodes;
