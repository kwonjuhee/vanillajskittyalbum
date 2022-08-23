import Breadcrumb from "./components/Breadcrumb.js";
import Nodes from "./components/Nodes.js";
import request from "./api/request.js";

function App($app) {
  this.state = {
    isRoot: false,
    depth: [],
    nodes: [],
  };

  const breadcrumb = new Breadcrumb({ $app, initialState: this.state.depth });

  const nodes = new Nodes({
    $app,
    initialState: this.state,
    onClick: async (node) => {
      if (node.type === "DIRECTORY") {
        const nodes = await request(node.id);
        setState({
          ...this.state,
          depth: [...this.state.depth, node.name],
          nodes,
        });
      } else if (node.type === "FILE") {
      }
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
