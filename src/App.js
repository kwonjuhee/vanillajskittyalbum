import Breadcrumb from "./components/Breadcrumb.js";
import Nodes from "./components/Nodes.js";
import ImageView from "./components/ImageView.js";
import Loading from "./components/Loading.js";
import request from "./api/request.js";
import { ERROR_MESSAGE } from "./utils/constants.js";

const cache = {};

function App($app) {
  this.state = {
    isRoot: true,
    depth: [],
    nodes: [],
    selectedFilePath: null,
    isLoading: false,
  };

  const breadcrumb = new Breadcrumb({
    $app,
    initialState: this.state.depth,
    onClick: (index) => {
      const nodeId = index === null ? "root" : this.state.depth[index].id;
      setState({
        ...this.state,
        isRoot: index === null,
        depth: index === null ? [] : this.state.depth.slice(0, index + 1),
        nodes: cache[nodeId],
      });
    },
  });

  const nodes = new Nodes({
    $app,
    initialState: this.state,
    onClick: async (node) => {
      if (node.type === "DIRECTORY") {
        try {
          setState({ ...this.state, isLoading: true });
          let nodes = [];
          if (cache[node.id]) nodes = cache[node.id];
          else {
            nodes = await request(node.id);
            cache[node.id] = nodes;
          }
          setState({
            ...this.state,
            isRoot: false,
            depth: [...this.state.depth, node],
            nodes,
          });
        } catch (e) {
          alert(ERROR_MESSAGE);
        } finally {
          setState({
            ...this.state,
            isLoading: false,
          });
        }
      } else if (node.type === "FILE") {
        setState({
          ...this.state,
          selectedFilePath: node.filePath,
        });
      }
    },
    onBackClick: () => {
      const prevNodeId =
        this.state.depth.length - 1 === 0
          ? "root"
          : this.state.depth[this.state.depth.length - 2].id;
      setState({
        ...this.state,
        isRoot: this.state.depth.length - 1 === 0,
        depth: this.state.depth.slice(0, this.state.depth.length - 1),
        nodes: cache[prevNodeId],
      });
    },
  });

  const imageView = new ImageView({
    $app,
    initialState: this.state.selectedFilePath,
    onClose: () => {
      if (this.state.selectedFilePath) {
        setState({
          ...this.state,
          selectedFilePath: null,
        });
      }
    },
  });

  const loading = new Loading({ $app, initialState: this.state.isLoading });

  const setState = (nextState) => {
    this.state = nextState;
    breadcrumb.setState(this.state.depth);
    nodes.setState(this.state);
    imageView.setState(this.state.selectedFilePath);
    loading.setState(this.state.isLoading);
  };

  const init = async () => {
    try {
      setState({ ...this.state, isLoading: true });
      const rootNodes = await request();
      setState({ ...this.state, isRoot: true, nodes: rootNodes });
      cache.root = rootNodes;
    } catch (e) {
      alert(ERROR_MESSAGE);
    } finally {
      setState({
        ...this.state,
        isLoading: false,
      });
    }
  };

  init();
}

export default App;
