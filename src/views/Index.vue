<template>
  <base-layout>
    <h1>Hello world</h1>
  </base-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseLayout from '@/views/layouts/BaseLayout.vue';

export default defineComponent({
  setup() {},
  components: { BaseLayout },
});
</script>
