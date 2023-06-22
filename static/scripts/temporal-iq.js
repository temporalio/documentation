function isDesktop() {
  const userAgent = navigator.userAgent;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  return !isMobile && windowWidth >= 992;
}

(function (window, document) {
  const script = document.currentScript;

  if (isDesktop()) {
    console.log("loading temporal widget");
    // Widget element
    const widgetElement = document.createElement("div");

    const widgetStyle = widgetElement.style;
    widgetStyle.display = "none";
    widgetStyle.boxSizing = "border-box";
    widgetStyle.width = "100%";
    widgetStyle.maxWidth = "600px";
    widgetStyle.height = "calc(80% - 108px)";
    widgetStyle.position = "fixed";
    widgetStyle.top = "40%";
    widgetStyle.left = "50%";
    widgetStyle.transform = "translate(-50%, -50%)";
    widgetStyle.background = "#F4F4F4";
    widgetStyle.borderRadius = "16px";
    widgetStyle.zIndex = "99999";
    widgetStyle.boxShadow = "inset 1px 1px 0 0 hsla(0,0%,100%,.5),0 3px 8px 0 #555a64";


    const iframe = document.createElement("iframe");
    const iframeStyle = iframe.style;
    iframeStyle.boxSizing = "border-box";
    iframeStyle.width = "100%";
    iframeStyle.height = "100%";
    iframeStyle.border = "0";
    iframeStyle.margin = "0";
    iframeStyle.padding = "0";
    iframeStyle.width = "100%";

    const modal = document.createElement("div");
    const modalStyle = modal.style;
    modalStyle.display = "none";
    modalStyle.boxSizing = "borderBox";
    modalStyle.position = "fixed";
    modalStyle.top = "0";
    modalStyle.left = "0";
    modalStyle.width = "100%";
    modalStyle.height = "100%";
    modalStyle.background = "rgba(0,0,0,0.3)";
    modalStyle.zIndex = "9999";

    const openWidget = () => {
      widgetStyle.display = "block";
      modalStyle.display = "block";

      document.getElementById("temporal-ball").style.display = "block";
      document.getElementById("search").style.display = "none";
    };

    const closeWidget = () => {
      widgetStyle.display = "none";
      modalStyle.display = "none";

      document.getElementById("temporal-ball").style.display = "none";
      document.getElementById("search").style.display = "block";

      document.getElementById("widget-text").style.display = "flex";
    };

    modal.addEventListener("click", closeWidget);
    widgetElement.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    const widgetToggleButton = document.createElement("div");
    const widgetToggleButtonStyle = widgetToggleButton.style;
    widgetToggleButton.display = "flex";

    widgetToggleButtonStyle.position = "fixed";
    widgetToggleButtonStyle.top = "14px";
    widgetToggleButtonStyle.right = "60px";
    widgetToggleButtonStyle.width = "400px";
    widgetToggleButtonStyle.fontFamily = "Inter, sans-serif";
    widgetToggleButtonStyle.fontSize = "16px";
    widgetToggleButtonStyle.fontWeight = "400";
    widgetToggleButtonStyle.borderRadius = "100px";
    widgetToggleButtonStyle.color = "#7B7B7B";
    widgetToggleButtonStyle.background = '#ebedf0';
    widgetToggleButtonStyle.border = "2px solid #ffffff";
    widgetToggleButtonStyle.zIndex = "99999";
    widgetToggleButtonStyle.cursor = "pointer";
    widgetToggleButtonStyle.outline = "none";

    widgetToggleButton.style.overflow = "hidden";

    const keyframes = document.createElement("style");
    keyframes.innerHTML = `
  @keyframes fadeInText {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  
  @keyframes showBallContainer {
    0% { width: 0; }
    100% { width: 32px; }
  }
  @keyframes addPadding {
    0% { padding: 0; }
    100% { padding: 16px 16px; }
  }
  @keyframes fadeInBall {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  @keyframes popBall {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
  @keyframes spinBall {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  `;
    document.head.appendChild(keyframes);

    widgetToggleButton.addEventListener("click", (e) => {
      e.stopPropagation();
      if (widgetStyle.display === "none") {
        openWidget();
      } else {
        closeWidget();
      }
    });
    widgetToggleButton.innerHTML = `
                    <div style="display:flex; flex-direction:row; gap:16px; align-items:center; padding-right:16px; border-radius: 3px;">
                      <div id='widget-text' style='position: relative; display: flex; gap: 8px; align-items:center; flex-grow:1; flex-direction:row; padding-left:16px;'>
                        <img id="temporal-ball" style="position: absolute; left: 0px; display: none; animation: popBall .5s 5s;" src='/img/Temporal_Logo_Animation.gif' width='40px' height='40px'/>
                        <img id='search' style='position: absolute; left: 8px; top: 1px; flex-shrink:0;' src='/img/search.svg' width='20px' height='20px'/>
                        <div style='margin-left: 20px;'>Ask</div>
                      </div>
                      <div id="ai-container" style="position:relative; display: inline-flex; text-align:right;">
                        <div id="ai-gradient" style="position: absolute; top: 0; left: 50%; width: 100%; height: 100%; background:#141414;"></div>
                        <span id="ai-text" style="padding:2px 8px; font-weight:500; background:#141414; color: #FFFFFF; display:inline-flex; position: relative; z-index: 1;">Temporal IQ</span>
                      </div>

                      </div>
                    </div>`;

    widgetToggleButton.addEventListener("mouseover", () => {
      widgetToggleButtonStyle.border = "2px solid #7B7B7B";
    });


    widgetToggleButton.addEventListener("mouseout", () => {
      widgetToggleButtonStyle.border = "2px solid #ffffff";
    });

    // Append widget to body
    widgetElement.appendChild(iframe);

    window.addEventListener("temporalIframeReady", (event) => { });

    iframe.addEventListener("load", () => {
      setTimeout(() => {
        iframe?.contentWindow?.postMessage(
          {
            messageType: "init",
          },
          "*"
        );
      }, 500);
    });

    iframe.src = "https://iq.temporal.io";

    document.body.appendChild(modal);
    modal.appendChild(widgetElement);
    document.body.appendChild(widgetToggleButton);

    document.getElementById("widget-text").style.animation = "fadeInText .1s forwards .1s";

    console.log({
      iframe,
      window: iframe.contentWindow,
    });
    console.log("widget loaded and message sent");
  } else {
    console.log("widget already loaded");
  }
})(window, document);
