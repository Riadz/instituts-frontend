<template>
  <base-layout :mainClass="class">
    <slot />
    <!--  -->
    <template v-slot:sidebar>
      <dashboard-sidebar />
    </template>
  </base-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from '@/stores/user';
import BaseLayout from '@/views/layouts/BaseLayout.vue';
import DashboardSidebar from '@/views/components/DashboardSidebar.vue';
//

export default defineComponent({
  props: ['class'],
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