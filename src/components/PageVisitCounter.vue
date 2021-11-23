<template></template>

<script lang="ts">
import { defineComponent } from "vue";
import { initializesessionStorage } from "../composables/applicationLogic";
import { getRemoteStorage } from "../composables/remoteStorageApi";
import { configureStorageListener } from "../composables/storageEventsListener";
import initializeCountingLogic from "../composables/visitCountingLogic";
import { Timestamp } from "firebase/firestore";

export default defineComponent({
  name: "PageVisitCounter",
  props: ["eventName", "entityToTrack", "storageName"],
  async setup() {
    
    window.visitCounterLibrary.initialize =
      (
        pageVisitedEventName: string,
        storageLoadedEventName: string,
        entitiesToTrack: string[],
        storageName: string
      ) =>
      async () => {
        if (window.visitCounterLibrary.initTime == null) {
          const storage = await getRemoteStorage(storageName);
          initializesessionStorage(storageName, storage);
          window.visitCounterLibrary.initTime = Timestamp.now().toMillis();
          window.visitCounterLibrary.storageRefreshTime =
            Timestamp.now().toMillis();
          window.dispatchEvent(
            new CustomEvent(pageVisitedEventName, {
              detail: storageName,
            })
          );
        }

        configureStorageListener(storageName, storageLoadedEventName);

        await initializeCountingLogic(storageName)(entitiesToTrack);
      };
  },
});
</script>

