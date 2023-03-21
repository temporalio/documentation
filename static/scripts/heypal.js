let palWidget = null;
let palAppId = null;

const BASE_URL = 'https://heypal.chat';
const widgetUrl = BASE_URL + '/widget';

(
      function (window, document){

          const script = document.currentScript;
          palAppId = script.getAttribute('data-pal-app-id');
          console.log({
            palAppId
          })
          
          if(palWidget == null){
                  
                  console.log('loading pal widget')
                  // Widget element
                  const widgetElement = document.createElement('div');
                  
                  
                  const widgetStyle = widgetElement.style;
                  widgetStyle.display = "none";
                  widgetStyle.boxSizing = "border-box";
                  widgetStyle.width = "800px";
                  widgetStyle.height = "90%";
                  widgetStyle.position = "fixed";
                  widgetStyle.right = "calc(50% - 400px)";
                  widgetStyle.top = "40px";
                  widgetStyle.zIndex = "99999";
                  
                  const iframe = document.createElement('iframe');
                  const iframeStyle = iframe.style;
                  iframeStyle.boxSizing = "border-box";                  
                  iframeStyle.width = "100%";
                  iframeStyle.height = "100%";
                  iframeStyle.border = "0";
                  iframeStyle.margin = "0";
                  iframeStyle.padding = "0";
                  iframeStyle.width = "100%";
                  
                  
                  
                  const modal = document.createElement('div');
                  const modalStyle = modal.style;
                  modalStyle.display = "none";
                  modalStyle.boxSizing = "borderBox";
                  modalStyle.position = "fixed";
                  modalStyle.top = "0";
                  modalStyle.left = "0";
                  modalStyle.width = "100%";
                  modalStyle.height = "100%";
                  modalStyle.background = "rgba(0,0,0,0.5)";
                  modalStyle.zIndex = "9999";

                  const openWidget = () => {
                    widgetStyle.display = "block";
                    modalStyle.display = "block";
                  }

                  const closeWidget = () => {
                    widgetStyle.display = "none";
                    modalStyle.display = "none";
                  }

                  modal.addEventListener("click", closeWidget);
                  widgetElement.addEventListener("click", (e)=>{e.stopPropagation()});

                  const widgetToggleButton = document.createElement('button');
                  const widgetToggleButtonStyle = widgetToggleButton.style;
                  widgetToggleButton.display = "flex";                  
                  widgetToggleButtonStyle.boxSizing = "borderBox";
                  widgetToggleButtonStyle.position = "fixed";
                  widgetToggleButtonStyle.bottom = "40px";
                  widgetToggleButtonStyle.right = "40px";
                  widgetToggleButtonStyle.fontFamily = 'Inter, sans-serif';                 
                  widgetToggleButtonStyle.fontSize = '16px';                   
                  widgetToggleButtonStyle.fontWeight = '500';
                  widgetToggleButtonStyle.borderRadius = "32px";
                  widgetToggleButtonStyle.paddingTop='32px';
                  widgetToggleButtonStyle.paddingBottom='32px';
                  widgetToggleButtonStyle.paddingLeft='48px';
                  widgetToggleButtonStyle.paddingRight='48px';
                  widgetToggleButtonStyle.background = "black";
                  widgetToggleButtonStyle.color = "white";
                  widgetToggleButtonStyle.border = "none";
                  widgetToggleButtonStyle.zIndex = "99999";
                  widgetToggleButtonStyle.cursor = "pointer";
                  widgetToggleButtonStyle.outline = "none";
                  

                  widgetToggleButton.addEventListener("click", (e)=>{
                    e.stopPropagation();
                    if(widgetStyle.display === "none"){
                      openWidget();
                    }else{
                      closeWidget();
                    }
                  })

                  widgetToggleButton.innerHTML = `<div style="display:flex; flex-direction:rows; gap:8px; align-items:center;"><img src='${BASE_URL}/icons/ai-bot.png' width='24px' height='24px'/><div>Chat with our A.I. for Help -></div></div>`;

                  // Append widget to body
                  widgetElement.appendChild(iframe);
                  
                  window.addEventListener("palIframeReady", (event) => {
                    

                  })

                  iframe.addEventListener("load", () => {
                    
                    
                    setTimeout(() => {
                      iframe?.contentWindow?.postMessage({
                        messageType:"init",
                        applicationId: palAppId
                      }, "*")
                    },500) 
                    
                  });

                  

                  iframe.src = widgetUrl;

                  
                  document.body.appendChild(modal)
                  modal.appendChild(widgetElement)
                  document.body.appendChild(widgetToggleButton);
                  
                  console.log({
                    iframe,
                    window: iframe.contentWindow
                  })
                  console.log('widget loaded and message sent')     
                  
        }else{
          console.log('widget already loaded')
          
        }
        }

)(window, document);