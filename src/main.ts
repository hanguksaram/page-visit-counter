import { createApp } from 'vue'
import App from './App.vue'

declare global {
    interface Window {
        visitCounterLibrary: {
            initTime: number;
            storageRefreshTime: number
        }

    }
}
if (window.visitCounterLibrary == null) {
    window.visitCounterLibrary = { initTime: null, storageRefreshTime: null}
}

const rootElementId: string = "fls-visit-counter"
const eventName: string = "pageVisited"
const entityToTrack: string = "event-page"
const storageName: string = "visitStorage"

const block = document.createElement('div')
block.setAttribute("id", rootElementId)
document.body.appendChild(block)

window.addEventListener(eventName, (event: CustomEvent) =>
console.log(event.detail)
);

  
  // inject a handler for `myOption` custom option
  
  // define a mixin object
const mixin = {
    data() {
        return {
            eventName, entityToTrack, storageName
        }
      }
  }
  
  // define an app that uses this mixin
createApp(App).mixin(mixin).mount(`#${rootElementId}`)
  
