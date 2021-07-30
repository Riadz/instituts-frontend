<template>
  <header>
    <slot name="header"></slot>
  </header>
  <aside>
    <slot name="sidebar"></slot>
  </aside>
  <main :class="mainClass">
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: ['mainClass'],
});
</script>
