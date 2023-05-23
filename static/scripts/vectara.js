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
    widgetStyle.right = "40px";
    widgetStyle.bottom = "108px";
    widgetStyle.background = "#F4F4F4";
    widgetStyle.borderRadius = "16px";
    widgetStyle.zIndex = "99999";

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

      document.getElementById("temporal-ball").style.display = "none";
      document.getElementById("widget-text").style.display = "none";
      document.getElementById("widget-chevron-down-container").style.display = "flex";
      setTimeout(() => {
        document.getElementById("widget-chevron-down-container").style.transform = "rotate(180deg)";
        document.getElementById("widget-chevron-down-container").style.opacity = "1";
      }, 0);
    };

    const closeWidget = () => {
      widgetStyle.display = "none";
      modalStyle.display = "none";
      document.getElementById("temporal-ball").style.display = "block";
      document.getElementById("widget-text").style.display = "flex";
      document.getElementById("widget-chevron-down-container").style.transform = "rotate(0deg)";

      setTimeout(() => {
        document.getElementById("widget-chevron-down-container").style.opacity = "0";
      }, 600);

      setTimeout(() => {
        document.getElementById("widget-chevron-down-container").style.display = "none";
      }, 1300);
    };

    modal.addEventListener("click", closeWidget);
    widgetElement.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    const widgetToggleButton = document.createElement("div");
    const widgetToggleButtonStyle = widgetToggleButton.style;
    widgetToggleButton.display = "flex";

    widgetToggleButtonStyle.position = "fixed";
    widgetToggleButtonStyle.bottom = "40px";
    widgetToggleButtonStyle.right = "40px";
    widgetToggleButtonStyle.fontFamily = "Inter, sans-serif";
    widgetToggleButtonStyle.fontSize = "16px";
    widgetToggleButtonStyle.fontWeight = "400";
    widgetToggleButtonStyle.borderRadius = "100px";
    widgetToggleButtonStyle.paddingTop = "16px";
    widgetToggleButtonStyle.paddingBottom = "16px";
    widgetToggleButtonStyle.color = "#7B7B7B";
    widgetToggleButtonStyle.border = "none";
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
                    <div style="display:flex; flex-direction:row; gap:16px; align-items:center; padding-right:16px">
                      <div id='widget-text' style='display: flex; gap: 8px; align-items:center; flex-grow:1; flex-direction:row; padding-left:16px; opacity: 0; animation: fadeInText 1s forwards 2s;'>
                        <div style='flex-grow:'>Ask</div>
                        <div id="ai-container" style="position:relative; display: inline-flex;">
                          <div id="ai-gradient" style="position: absolute; top: 0; left: 50%; width: 100%; height: 100%;"></div>
                          <span id="ai-text" style="padding:2px 8px; font-weight:600; border-radius:4px; background:#141414; color: #FFFFFF; display:inline-flex; position: relative; z-index: 1;">Temporal IQ</span>
                        </div>
                      </div>
                      <div id='ball-chevron-container' style='width:40px; height:40px; position:relative;'>
                        <img id="temporal-ball" style="position:absolute; top:0; left:0; flex-shrink:0; opacity: 0; animation: fadeInBall 1s forwards, popBall 1s 1s;" src='/img/Temporal_Logo_Animation.gif' width='40px' height='40px'/>                    
                        <div id='widget-chevron-down-container' style="opacity:1; position:absolute; top:0; left:0; display:none; transform: rotate(0deg); transition: all 1s ease-in-out; align-items: center; justify-content:center; width:40px; height:40px; border-radius:50%; background:#ffffff;">
                          <img id='widget-chevron-down' style='flex-shrink:0;' src='/img/chevron-up-solid.svg' width='18px' height='18px'/>
                        </div>
                      </div>
                    </div>`;

    widgetToggleButton.style.animation =
      "showBallContainer 1s forwards, addPadding 1s forwards 1s, expandButton 1s forwards 2s";

    widgetToggleButton.style.animation = "expandButton 1s forwards 1s";

    widgetToggleButton.addEventListener("mouseover", () => {
      widgetToggleButton.style.transform = "scale(1.1)";
      document.getElementById("temporal-ball").style.animation =
        "fadeInBall 1s forwards 1s, popBall 1s 1s, spinBall 2s linear infinite";
      document.getElementById("ai-gradient").style.animation = "shimmer 0.5s 1 forwards";
    });

    widgetToggleButton.addEventListener("mouseout", () => {
      widgetToggleButton.style.transform = "scale(1)";
      document.getElementById("temporal-ball").style.animation = "fadeInBall 1s forwards 1s, popBall 1s 1s";
      document.getElementById("ai-gradient").style.animation = "none";
    });

    // Append widget to body
    widgetElement.appendChild(iframe);

    window.addEventListener("temporalIframeReady", (event) => {});

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

    iframe.src = "http://137.184.234.221";

    document.body.appendChild(modal);
    modal.appendChild(widgetElement);
    document.body.appendChild(widgetToggleButton);

    document.getElementById("widget-chevron-down-container").style.transition = "all 0.5s ease-in-out";
    document.getElementById("widget-text").style.animation = "fadeInText 1s forwards 1s";

    console.log({
      iframe,
      window: iframe.contentWindow,
    });
    console.log("widget loaded and message sent");
  } else {
    console.log("widget already loaded");
  }
})(window, document);
