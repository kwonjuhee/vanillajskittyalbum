import Breadcrumb from "./components/Breadcrumb.js";
import Nodes from "./components/Nodes.js";

function App($app) {
  this.state = {
    depth: [],
    nodes: [],
  };

  const breadcrumb = new Breadcrumb({ $app, initialState: this.state.depth });

  const nodes = new Nodes({
    $app,
    initialState: { nodes: this.state.nodes },
  });

  const setState = (nextState) => {
    this.state = nextState;
    breadcrumb.setState(this.state.depth);
    nodes.setState({
      nodes: this.state.nodes,
    });
  };

  setState({
    depth: ["노란고양이"],
    nodes: [
      {
        name: "2021/04",
        type: "DIRECTORY",
      },
      {
        name: "하품하는 사진",
        type: "FILE",
      },
    ],
  });
}

export default App;
