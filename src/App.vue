<template>
  <PageVisitCounter/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PageVisitCounter from './components/PageVisitCounter.vue';

export default defineComponent({
  name: 'App',
  components: {
    PageVisitCounter
  },
});
</script>

