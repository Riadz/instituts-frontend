<template>
  <dashboard-layout>
    <h1>hello world</h1>
  </dashboard-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DashboardLayout from '@/views/layouts/DashboardLayout.vue';
//

export default defineComponent({
  setup() {
    return {};
  },
  components: {
    DashboardLayout,
    //
  },
});
</script>

<style lang="scss" scoped>
</style>