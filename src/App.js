import Breadcrumb from "./components/Breadcrumb.js";
import Nodes from "./components/Nodes.js";
import request from "./api/request.js";

function App($app) {
  this.state = {
    isRoot: false,
    depth: [],
    nodes: [],
  };

  const breadcrumb = new Breadcrumb({
    $app,
    initialState: this.state.depth,
    onClick: async (index) => {
      const nodes = await request(this.state.depth[index]?.id);
      setState({
        isRoot: index === null,
        depth: index ? [] : this.state.depth.slice(0, index + 1),
        nodes,
      });
    },
  });

  const nodes = new Nodes({
    $app,
    initialState: this.state,
    onClick: async (node) => {
      if (node.type === "DIRECTORY") {
        const nodes = await request(node.id);
        setState({
          isRoot: false,
          depth: [...this.state.depth, node],
          nodes,
        });
      } else if (node.type === "FILE") {
      }
    },
    onBackClick: async () => {
      const prevNodeId =
        this.state.depth.length - 1 === 0
          ? null
          : this.state.depth[this.state.depth.length - 2].id;
      const nodes = await request(prevNodeId);
      setState({
        isRoot: this.state.depth.length - 1 === 0,
        depth: this.state.depth.slice(0, this.state.depth.length - 1),
        nodes,
      });
    },
  });

  const setState = (nextState) => {
    this.state = nextState;
    breadcrumb.setState(this.state.depth);
    nodes.setState(this.state);
  };

  const init = async () => {
    try {
      const nodes = await request();
      setState({ ...this.state, isRoot: true, nodes });
    } catch (e) {
      console.error(e);
    }
  };

  init();
}

export default App;
