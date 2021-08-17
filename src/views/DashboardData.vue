<template>
  <dashboard-layout>
    <TabView :activeIndex="0" class="p-6">
      <TabPanel header="EFF FOR MOD">
        <table class="tableizer-table" v-if="entry_data">
          <thead>
            <tr class="tableizer-firstrow th-1">
              <th rowspan="3">Code wilaya</th>
              <th rowspan="3">Wilaya</th>
              <th rowspan="3">Code établissement</th>
              <th rowspan="3">Intitulé de l'établissement</th>
              <th rowspan="3">
                Types d'établissement
                <br />(CFPA/INSFP)
              </th>
              <th rowspan="3">Code branche Professionnelle</th>
              <th rowspan="3">Code spécialité</th>
              <th rowspan="3">Spécialité</th>
              <th rowspan="2" colspan="2">Formation présentielle initiale</th>
              <th rowspan="2" colspan="2">Formation par apprentissage</th>
              <th colspan="3">Formation à distance</th>
            </tr>
            <tr class="tableizer-firstrow">
              <th colspan="2">Formation diplômante</th>
              <th>Formation qualifiante</th>
            </tr>
            <tr class="tableizer-firstrow">
              <th>Effectif nouveau</th>
              <th>Effectif reconduit</th>
              <th>Effectif nouveau</th>
              <th>Effectif reconduit</th>
              <th>Effectif nouveau</th>
              <th>Effectif reconduit</th>
              <th>Effectif nouveau</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="entry_item in entry_data">
              <td>{{ entry_item.entry?.institute.country_state.code }}</td>
              <td>{{ entry_item.entry?.institute.country_state.name }}</td>
              <td>{{ entry_item.entry?.institute.id }}</td>
              <td>{{ entry_item.entry?.institute.name }}</td>
              <td>{{ entry_item.entry?.institute.type }}</td>
              <td>{{ entry_item.branch_code }}</td>
              <td>{{ entry_item.specialty.code }}</td>
              <td>{{ entry_item.specialty.name }}</td>
              <td>{{ entry_item.getQuantity(1) }}</td>
              <td></td>
              <td>{{ entry_item.getQuantity(2) }}</td>
              <td></td>
              <td>{{ entry_item.getQuantity(3) }}</td>
              <td></td>
              <td>{{ entry_item.getQuantity(4) }}</td>
            </tr>
          </tbody>
        </table>
      </TabPanel>
    </TabView>
  </dashboard-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import DashboardLayout from '@/views/layouts/DashboardLayout.vue';
import EntryData from '@/services/models/EntryData';
import TabView from 'primevue/TabView';
import TabPanel from 'primevue/TabPanel';

export default defineComponent({
  components: {
    DashboardLayout,
    // 
    TabView,
    TabPanel,
  },
  setup() {
    //
    let entry_data = ref<EntryData[] | null>(null);
    onMounted(async () => {
      entry_data.value = await EntryData.table();
    });

    //

    return {
      entry_data,
    };
  },
});
</script>

<style lang="scss" scoped>
.tableizer-table {
  font-size: 12px;
  border: 1px solid #ccc;
  td {
    padding: 4px;
    margin: 3px;
    border: 1px solid #ccc;
  }
  th {
    padding: 4px;
    background-color: #104e8b;
    color: #fff;
    font-weight: bold;
  }
}

.th-1 {
  & > th:nth-child(-n + 8) {
    writing-mode: vertical-lr;
  }
}
</style>