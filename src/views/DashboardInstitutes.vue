<template>
  <dashboard-layout class="p-4">
    <Toolbar class="mb-4">
      <template #left>
        <Button
          label="Ajouter une institute"
          icon="pi pi-plus"
          class="p-button-success mr-2"
          @click="openAddDialog()"
        />
      </template>
    </Toolbar>
    <DataTable
      :value="institutes"
      :loading="!institutes.length"
      :autoLayout="true"
      responsiveLayout="scroll"
      class="p-datatable-sm mt-5"
      rowHover
      stripedRows
    >
      <template #header>
        <div class="flex p-jc-between p-ai-center">
          <h5 class="m-0">Institutes</h5>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText placeholder="Research" />
          </span>
        </div>
      </template>
      <template #empty>Aucun Institute trouvée</template>
      <template #loading>Chargement en cour</template>
      <Column field="id" header="ID"></Column>
      <Column field="name" header="Nome"></Column>
      <Column field="type" header="Type"></Column>
      <Column header="Wilaya">
        <template #body="item">
          <span>{{ item.data.country_state.name }}</span>
        </template>
      </Column>
      <Column header="Date modification">
        <template #body="item">
          <span>{{ item.data.updated_at.toLocaleString() }}</span>
        </template>
      </Column>
      <Column field="pin_code" header="Code"></Column>
      <Column header="Action">
        <template #body="item">
          <Button
            icon="pi pi-cog"
            class="p-button-success"
            @click="openEditDialog(item.data)"
          ></Button>
        </template>
      </Column>
    </DataTable>

    <Dialog
      v-model:visible="dialogOpen"
      :style="{ width: '700px' }"
      :modal="true"
      class="p-fluid m-2"
      closeOnEscape
    >
      <template #header>
        <span v-if="dialogFlag == 'add'">Ajouter une institute</span>
        <span v-else-if="dialogFlag == 'edit'">Detail de l'institute</span>
      </template>
      <!--  -->
      <div class="p-field">
        <label>Nom</label>
        <InputText v-model="dialogData.name" autofocus />
      </div>
      <div class="p-formgrid p-grid">
        <div class="p-field p-col">
          <label>Code de security</label>
          <InputText v-model="dialogData.pin_code" />
          <!-- <small class="p-error">Le nom est obligatoire </small> -->
        </div>
        <div class="p-field p-col">
          <label>Type</label>
          <div class="p-2">
            <RadioButton
              v-model="dialogData.type"
              value="INSFP"
              class="p-mr-2"
            />
            <label class="p-mr-3">INSFP</label>
            <RadioButton
              v-model="dialogData.type"
              value="CFPA"
              class="p-mr-2"
            />
            <label>CFPA</label>
          </div>
        </div>
      </div>
      <div class="p-field">
        <label>Wilaya</label>
        <Dropdown
          v-model="dialogData.country_state_id"
          :loading="!country_states"
          :options="country_states"
          optionValue="id"
          optionLabel="name"
          placeholder="Selectioner la wilaya"
          filter
        >
          <template #option="state">
            {{ state.option.code }} - {{ state.option.name }}
          </template>
        </Dropdown>
      </div>
      <div class="p-formgrid p-grid">
        <div class="p-field p-col flex p-flex-column">
          <label>Emails</label>
          <Chips v-model="dialogData.emails" class="p-flex-grow" addOnBlur />
        </div>
        <div class="p-field p-col flex p-flex-column">
          <label>Numeros</label>
          <Chips v-model="dialogData.numbers" class="p-flex-grow" addOnBlur />
        </div>
      </div>

      <!--  -->
      <template #footer>
        <div class="flex">
          <Button
            v-if="dialogFlag == 'edit'"
            label="Supprimer"
            icon="pi pi-times"
            class="p-button-danger p-button-text"
            @click="
              (e) =>
                confirm.require({
                  target: e.currentTarget,
                  message: 'Êtes-vous sur de vouloir continuer ?',
                  acceptLabel: 'Oui',
                  rejectLabel: 'Non',
                  acceptClass: 'p-button-danger',
                  icon: 'pi pi-exclamation-triangle',
                  accept: () => deleteInstitute(dialogData.id),
                })
            "
          />
          <Button
            label="Sauvgarder"
            icon="pi pi-check"
            class="p-button-text p-ml-auto"
            @click="
              if (dialogFlag == 'add') {
                createInstitute(dialogData);
              } else if (dialogFlag == 'edit') {
                patchInstitute(dialogData.id, dialogData);
              }
            "
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
import Institute from '@/services/models/Institute';
import CountryState from '@/services/models/CountryState';
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
import Chips from 'primevue/Chips';

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
    Chips,
    ConfirmPopup,
  },
  setup() {
    const confirm = useConfirm();

    //
    let institutes = ref<Institute[]>([]);
    let country_states = ref<CountryState[]>([]);
    onMounted(async () => {
      institutes.value = await Institute.all();
      country_states.value = await CountryState.all();
    });

    // modal data
    let modalData = {
      dialogFlag: ref(''),
      dialogOpen: ref(false),
      dialogData: ref<Institute>(),
      openEditDialog: (data: Institute) => {
        modalData.dialogOpen.value = true;
        modalData.dialogFlag.value = 'edit';
        modalData.dialogData.value = { ...data };
      },
      openAddDialog: () => {
        modalData.dialogOpen.value = true;
        modalData.dialogFlag.value = 'add';
        modalData.dialogData.value = { ...Institute.empty() };
      },
      closeDialog: () => {
        modalData.dialogOpen.value = false;
      },
    };

    async function createInstitute(data) {
      let institute = await Institute.create(data);
      institutes.value.unshift(institute);

      modalData.closeDialog();
    }

    async function patchInstitute(id: number, data) {
      let index = institutes.value.findIndex((institute) => institute.id == id);
      institutes.value[index] = await Institute.patch(id, data);
      modalData.closeDialog();
    }

    async function deleteInstitute(id: number) {
      await Institute.delete(id);
      modalData.closeDialog();

      institutes.value = institutes.value.filter(
        (institute) => institute.id != id,
      );
    }

    return {
      confirm,
      institutes,
      country_states,
      createInstitute,
      patchInstitute,
      deleteInstitute,
      ...modalData,
    };
  },
});
</script>