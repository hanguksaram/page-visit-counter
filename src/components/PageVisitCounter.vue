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
  async setup() {
    console.log("setupped")
    window.visitCounterLibrary.initialize =
      async (
        pageVisitedEventName: string,
        storageLoadedEventName: string,
        entitiesToTrack: string[],
        storageName: string
      ) => {
        console.log("initialized")
        if (window.visitCounterLibrary.initTime == null) {
          const storage = await getRemoteStorage(storageName);
          initializesessionStorage(storageName, storage);
          window.visitCounterLibrary.initTime = Timestamp.now().toMillis();
          window.visitCounterLibrary.storageRefreshTime =
            Timestamp.now().toMillis();
          window.dispatchEvent(
            new CustomEvent(storageLoadedEventName, {
              detail: storageName,
            })
          );
        }

        configureStorageListener(storageName, pageVisitedEventName);

        await initializeCountingLogic(storageName)(entitiesToTrack);
      };
  },
});
</script>

