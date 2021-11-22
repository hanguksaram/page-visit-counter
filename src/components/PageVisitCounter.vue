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
  async setup(props) {
    if (window.visitCounterLibrary.initTime == null) {
      const storage = await getRemoteStorage(props.storageName);
      initializesessionStorage(props.storageName, storage);
      window.visitCounterLibrary.initTime = Timestamp.now().toMillis();
      window.visitCounterLibrary.storageRefreshTime = Timestamp.now().toMillis();
      window.dispatchEvent(
        new CustomEvent("storageInstalled", {
          detail: props.storageName,
        })
      );
    }

    configureStorageListener(props.storageName, props.eventName);

    await initializeCountingLogic(props.storageName)(props.entityToTrack);
  },
});
</script>

