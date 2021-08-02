<template>
  <dashboard-layout class="p-p-4">
    <h1>hello world</h1>
    <DataTable
      :value="institutes"
      :loading="!institutes"
      class="p-mt-5"
      rowHover
    >
      <template #header>
        <div class="p-d-flex p-jc-between p-ai-center">
          <h5 class="p-m-0">Institutes</h5>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText placeholder="Research" />
          </span>
        </div>
      </template>
      <template #empty>Aucun Institute trouvée</template>
      <template #loading>Chargement en cour</template>
      <Column field="id" header="id"></Column>
      <Column field="name" header="name"></Column>
      <Column field="type" header="type"></Column>
      <Column field="country_state_id" header="country_state_id"></Column>
      <Column field="created_at" header="created_at"></Column>
      <Column field="updated_at" header="updated_at"></Column>
      <Column field="pin_code" header="pin_code"></Column>
    </DataTable>
  </dashboard-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import DashboardLayout from '@/views/layouts/DashboardLayout.vue';
import Institute from '@/services/models/Institute';
//
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import InputText from 'primevue/InputText';

export default defineComponent({
  setup() {
    let institutes = ref<Institute[]>();

    onMounted(async () => {
      institutes.value = await Institute.all();
    });

    return {
      institutes,
    };
  },
  components: {
    DashboardLayout,
    //
    DataTable,
    Column,
    ColumnGroup,
    InputText,
  },
});
</script>

<style lang="scss" scoped>
</style>