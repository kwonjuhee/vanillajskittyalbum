import Breadcrumb from "./components/Breadcrumb.js";
import Nodes from "./components/Nodes.js";
import ImageView from "./components/ImageView.js";
import Loading from "./components/Loading.js";
import request from "./api/request.js";
import { ERROR_MESSAGE } from "./utils/constants.js";

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
    onClick: async (index) => {
      try {
        setState({ ...this.state, isLoading: true });
        const nodes = await request(this.state.depth[index]?.id);
        setState({
          ...this.state,
          isRoot: index === null,
          depth: index ? [] : this.state.depth.slice(0, index + 1),
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
    },
  });

  const nodes = new Nodes({
    $app,
    initialState: this.state,
    onClick: async (node) => {
      if (node.type === "DIRECTORY") {
        try {
          setState({ ...this.state, isLoading: true });
          const nodes = await request(node.id);
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
    onBackClick: async () => {
      try {
        const prevNodeId =
          this.state.depth.length - 1 === 0
            ? null
            : this.state.depth[this.state.depth.length - 2].id;
        setState({ ...this.state, isLoading: true });
        const nodes = await request(prevNodeId);
        setState({
          ...this.state,
          isRoot: this.state.depth.length - 1 === 0,
          depth: this.state.depth.slice(0, this.state.depth.length - 1),
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
      const nodes = await request();
      setState({ ...this.state, isRoot: true, nodes });
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
