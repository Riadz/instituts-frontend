<template>
  <dashboard-layout class="p-4">
    <Toolbar class="mb-4">
      <template #left>
        <Button
          label="Ajouter une institute"
          icon="pi pi-plus"
          class="p-button-success mr-2"
          @click=""
        />
      </template>
    </Toolbar>
    <DataTable
      :value="entries"
      :loading="!entries.length"
      :autoLayout="true"
      responsiveLayout="scroll"
      class="p-datatable-sm mt-5"
      rowHover
      stripedRows
    >
      <template #empty>Aucun entrie trouvée</template>
      <template #loading>Chargement en cour</template>
      <Column field="id" header="ID"></Column>
      <Column header="Institute">
        <template #body="item">
          <span>
            {{ item.data.institute.name }}
            |
            {{ item.data.institute.country_state.name }}
          </span>
        </template>
      </Column>
      <Column field="comment" header="Commontaire"></Column>
      <Column header="Date modification">
        <template #body="item">
          <span>{{ item.data.updated_at.toLocaleString() }}</span>
        </template>
      </Column>
      <Column header="État">
        <template #body="item">
          <span :class="`entry-state ${item.data.state}`">
            {{ item.data.state }}
          </span>
        </template>
      </Column>
      <Column header="Action">
        <template #body="item">
          <Button
            icon="pi pi-search"
            class="p-button-primary"
            @click="openModal(item.data)"
          ></Button>
        </template>
      </Column>
    </DataTable>

    <Dialog
      v-model:visible="modalOpen"
      :style="{ width: '700px' }"
      :modal="true"
      class="p-fluid m-2"
      closeOnEscape
    >
      <template #header>
        <span>Details</span>
      </template>

      <!--  -->
      <div class="grid mt-1">
        <div class="col-3 flex flex-column align-items-center">
          <Avatar
            :label="modalData?.institute.name.charAt(0)"
            size="large"
            shape="circle"
          />
          <h2>{{ modalData?.institute.name }}</h2>
        </div>
        <div class="col-9 grid">
          <div class="col-6">
            <span class="font-medium">Type: </span>
            <span>{{ modalData?.institute.type }}</span>
          </div>
          <div class="col-6">
            <span class="font-medium">Crée le: </span>
            <span>
              {{ modalData?.institute.created_at.toLocaleDateString() }}
            </span>
          </div>
          <div class="col-6" v-if="modalData?.institute.emails">
            <div class="font-medium mb-2">Emails:</div>
            <div v-for="email in modalData?.institute.emails">
              <Chip :label="email" icon="pi pi-envelope" />
            </div>
          </div>
          <div class="col-6" v-if="modalData?.institute.numbers">
            <div class="font-medium mb-2">Numero:</div>
            <div v-for="number in modalData?.institute.numbers">
              <Chip :label="number" icon="pi pi-phone" />
            </div>
          </div>
        </div>
        <div class="col-12 py-0 opacity-20">
          <hr />
        </div>
        <div class="col-12" v-if="modalData?.comment">
          <div class="font-medium">Commontaire</div>
          <div>{{ modalData?.comment }}</div>
        </div>
        <div class="col-12">
          <DataTable :value="modalData?.data" class="p-datatable-sm" autoLayout>
            <Column field="id" header="ID"></Column>
            <Column field="branch_code" header="Branch"></Column>
            <Column field="specialty.name" header="Specialty"></Column>
            <Column field="formation.name" header="Formation"></Column>
            <Column field="quantity" header="Quantity"></Column>
          </DataTable>
        </div>
      </div>

      <!--  -->
      <template #footer>
        <div class="flex justify-content-end">
          <Button
            label="Rejeter"
            icon="pi pi-times"
            class="p-button-text p-button-danger"
            @click=""
          />
          <Button
            label="Accepter"
            icon="pi pi-check"
            class="p-button-text p-button-success"
            @click=""
          />
        </div>
      </template>
    </Dialog>

    <!--  -->
    <ConfirmPopup></ConfirmPopup>
  </dashboard-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import DashboardLayout from '@/views/layouts/DashboardLayout.vue';
import Entry from '@/services/models/Entry';
//
import { useConfirm } from 'primevue/useconfirm';
import Button from 'primevue/Button';
import Toolbar from 'primevue/Toolbar';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ConfirmPopup from 'primevue/confirmpopup';
import Dialog from 'primevue/Dialog';
import InputText from 'primevue/InputText';
import InputNumber from 'primevue/InputNumber';
import RadioButton from 'primevue/RadioButton';
import Textarea from 'primevue/Textarea';
import Dropdown from 'primevue/Dropdown';
import Chip from 'primevue/Chip';
import Avatar from 'primevue/avatar';

export default defineComponent({
  components: {
    DashboardLayout,
    //
    Button,
    Toolbar,
    DataTable,
    Column,
    InputText,
    InputNumber,
    RadioButton,
    Textarea,
    Dialog,
    Dropdown,
    Chip,
    Avatar,
    ConfirmPopup,
  },
  setup() {
    const confirm = useConfirm();

    //
    let entries = ref<Entry[]>([]);
    onMounted(async () => {
      entries.value = await Entry.all();
    });

    //
    let modal = {
      modalOpen: ref(false),
      modalData: ref<Entry>(),
      openModal: (entry: Entry) => {
        modal.modalOpen.value = true;
        modal.modalData.value = entry;
      },
      closeModal: () => {
        modal.modalOpen.value = false;
      },
    };

    return {
      confirm,
      entries,
      //
      ...modal,
    };
  },
});
</script>

<style lang="scss" scoped>
.entry-state {
  display: inline-block;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 0.8rem;
  padding: 0.25em 0.5rem;
  border-radius: 4px;

  &.pending {
    background: #feedaf;
    color: #8a5340;
  }
  &.accepted {
    background: #c8e6c9;
    color: #256029;
  }
  &.rejected {
    background: #ffcdd2;
    color: #c63737;
  }
}
</style>