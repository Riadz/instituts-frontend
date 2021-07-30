<template>
  <base-layout>
    <div class="wrapper">Dashboard here :D</div>
    <span>{{ userStore.accessToken }}</span>
  </base-layout>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import BaseLayout from '@/views/layouts/BaseLayout.vue';

//
import Password from 'primevue/Password';
import InputText from 'primevue/InputText';
import Button from 'primevue/Button';
import Message from 'primevue/Message';
import { useUserStore } from '@/stores/user';

export default defineComponent({
  setup() {
    const userStore = useUserStore();

    return {
      userStore,
    };
  },
  components: {
    BaseLayout,
    Password,
    InputText,
    Button,
    Message,
  },
});
</script>

<style lang="scss" scoped>
</style>

<style>
</style>