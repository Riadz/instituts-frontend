<template>
  <base-layout mainClass="dashboard">
    <!--  -->
    <template v-slot:sidebar>
      <dashboard-sidebar />
    </template>
  </base-layout>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useUserStore } from '@/stores/user';
import BaseLayout from '@/views/layouts/BaseLayout.vue';
import DashboardSidebar from '@/views/components/DashboardSidebar.vue';
//

export default defineComponent({
  setup() {
    const userStore = useUserStore();

    return {
      userStore,
    };
  },
  components: {
    BaseLayout,
    DashboardSidebar,
    //
  },
});
</script>

<style lang="scss" scoped>
</style>