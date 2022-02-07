<template></template>

<script lang="ts">
import { defineComponent } from "vue";
import { initializeSessionStorage } from "../composables/applicationLogic";
import { getRemoteStorage } from "../composables/remoteStorageApi";
import { configureStorageListener } from "../composables/storageEventsListener";
import initializeCountingLogic from "../composables/visitCountingLogic";
import { Timestamp } from "firebase/firestore";

export default defineComponent({
  name: "PageVisitCounter",
  async setup() {
    window.visitCounterLibrary.initialize =
      async (
        pageVisitedEventName: string,
        storageLoadedEventName: string,
        entitiesToTrack: string[],
        storageName: string
      ) => {
        if (sessionStorage.getItem("pageVisitCounterInitTime") == null) {

          const storage = await getRemoteStorage(storageName);
          initializeSessionStorage(storageName, storage);
          const initTime = Timestamp.now().toMillis();
          sessionStorage.setItem("pageVisitCounterInitTime", initTime.toString());
          sessionStorage.setItem("pageVisitCounterRefreshTime", initTime.toString());
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

