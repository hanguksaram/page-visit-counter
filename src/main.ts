import { createApp } from 'vue'
import App from './App.vue'

declare global {
    interface Window {
        visitCounterLibrary: {
            initTime?: number;
            storageRefreshTime?: number;
            initialize?: (
                pageVisitedEventName: string,
                storageLoadedEventName: string,
                entitiesToTrack: string[] | string,
                storageName: string,
            ) => () => void;
        }

    }
}
if (window.visitCounterLibrary == null) {
    window.visitCounterLibrary = { }
}

const rootElementId: string = "fls-visit-counter"


const block = document.createElement('div')
block.setAttribute("id", rootElementId)
document.body.appendChild(block)


  
  // define an app that uses this mixin
createApp(App).mount(`#${rootElementId}`)
  
