const IMAGE_PATH_PREFIX =
  "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public";

function ImageView({ $app, initialState, onClose }) {
  this.init = () => {
    this.$target = document.createElement("div");
    this.$target.className = "Modal ImageViewer";
    this.$target.style.display = "none";
    $app.appendChild(this.$target);

    this.state = initialState;
    this.onClose = onClose;

    this.setEvent();
    this.render();
  };

  this.render = () => {
    this.$target.style.display = this.state ? "block" : "none";
    this.$target.innerHTML = `
        <div class="content">
        ${this.state ? `<img src="${IMAGE_PATH_PREFIX + this.state}" />` : ""}
        </div>
    `;
  };

  this.setEvent = () => {
    this.$target.addEventListener("click", (e) => {
      if (e.target.classList.contains("ImageViewer")) {
        this.onClose();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      this.onClose();
    });
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.init();
}

export default ImageView;
