<template>
  <div class="container">
    <Menu :model="items" class="nav" />
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 1rem 0;
  background: linear-gradient(180deg, #4d505b 0, #3b3e47);
  height: 100%;
  width: 250px;
  max-width: 100%;
}
::v-deep(.nav) {
  padding-top: 4rem;
  width: 100%;
  background-color: transparent;
  border: 0;
  border-radius: 0;

  .p-menuitem-link {
    padding: 1rem 1.25rem;
    > span {
      transition: color 0.25s ease-in-out;
      color: #fff;
    }
    &:hover {
      background: transparent !important;
      > span {
        color: var(--primary) !important;
      }
    }
  }

  .p-menuitem:not(:last-child) {
    border-bottom: 1px solid var(--surface-800);
  }
}
</style>

<script>
import Button from 'primevue/Button';
import Menu from 'primevue/Menu';
import { useRouter } from 'vue-router';
export default {
  components: {
    Button,
    Menu,
  },
  setup() {
    let router = useRouter();
    let pushNamed = (name) => router.push({ name });

    let items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-home',
        command: () => pushNamed('dashboard'),
      },
      {
        label: 'Requests',
        icon: 'pi pi-fw pi-send',
        command: () => pushNamed('dashboard:requests'),
      },
      {
        label: 'Institutes',
        icon: 'pi pi-fw pi-book',
        command: () => pushNamed('dashboard:institutes'),
      },
      {
        label: 'Data',
        icon: 'pi pi-fw pi-table',
        command: () => pushNamed('dashboard:data'),
      },
      {
        label: 'Analytics',
        icon: 'pi pi-fw pi-chart-bar',
        command: () => pushNamed('dashboard:analytics'),
      },
    ];

    return { items };
  },
};
</script>