<template>
  <base-layout mainClass="index">
    <router-link :to="{ name: 'login' }">
      <Button label="Se connecter" class="p-button-primary" />
    </router-link>
    <router-link :to="{ name: 'entry' }" class="p-ml-3">
      <Button label="Crée un entrée" class="p-button-secondary" />
    </router-link>
  </base-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseLayout from '@/views/layouts/BaseLayout.vue';
//
import Button from 'primevue/Button';

export default defineComponent({
  components: { BaseLayout, Button },
  setup() {},
});
</script>

<style lang="scss">
main.index {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>