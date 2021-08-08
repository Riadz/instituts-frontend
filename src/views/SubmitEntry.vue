<template>
  <base-layout mainClass="login">
    <div class="wrapper">
      <form
        @submit.prevent="handleSubmit(!v$.$invalid)"
        class="container p-fluid p-mt-6 p-mx-2"
        style="width: 100%; max-width: 500px"
      >
        <h2>Crée une entrie</h2>

        <div class="p-formgrid p-grid p-mt-6">
          <div class="p-field p-col-6">
            <label>Code de branche</label>
            <Dropdown
              v-model="v$.branch_code.$model"
              :options="branches"
              placeholder="Selectioner"
            />
            <!-- <small class="p-error">Le nom est obligatoire </small> -->
          </div>
          <div class="p-field p-col-6">
            <label>Quantity</label>
            <InputNumber v-model="v$.quantity.$model" />
          </div>
        </div>
        <div class="p-field">
          <label>Specialty</label>
          <Dropdown
            v-model="v$.specialty_id.$model"
            :options="specialties"
            optionValue="id"
            optionLabel="name"
            placeholder="Selectioner"
            filter
          />
          <!-- <small class="p-error">Le nom est obligatoire </small> -->
        </div>
        <div class="p-field">
          <label>Formation</label>
          <Dropdown
            v-model="v$.branch_code.$model"
            :options="formations"
            optionValue="id"
            optionLabel="name"
            placeholder="Selectioner"
          />
          <!-- <small class="p-error">Le nom est obligatoire </small> -->
        </div>
        <div class="p-field">
          <label>Commentaire</label>
          <Textarea
            v-model="v$.comment.$model"
            placeholder="..."
            style="min-height: 100px"
            autoResize
          />
          <!-- <small class="p-error">Le nom est obligatoire </small> -->
        </div>

        <Message v-if="errorMsg" severity="error" :closable="false">
          {{ errorMsg }}
        </Message>

        <Button
          label="Soumettre"
          type="submit"
          class="p-button-rounded p-mt-5"
          :loading="userStore.loading"
          :disabled="userStore.loading"
        />
      </form>
    </div>
  </base-layout>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, numeric } from '@vuelidate/validators';
import { useUserStore } from '@/stores/user';
import EntryData from '@/services/models/EntryData';
import BaseLayout from '@/views/layouts/BaseLayout.vue';
//
import InputText from 'primevue/InputText';
import InputNumber from 'primevue/InputNumber';
import Textarea from 'primevue/Textarea';
import Button from 'primevue/Button';
import Message from 'primevue/Message';
import Dropdown from 'primevue/Dropdown';
import Specialty from '@/services/models/Specialty';
import Formation from '@/services/models/Formation';

export default defineComponent({
  components: {
    BaseLayout,
    //
    InputText,
    InputNumber,
    Textarea,
    Button,
    Message,
    Dropdown,
  },
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    let errorMsg = ref('');

    //
    let data = {
      branches: EntryData.branch_codes,
      specialties: ref<Specialty[]>(),
      formations: ref<Formation[]>(),
    };

    onMounted(async () => {
      data.specialties.value = await Specialty.all();
      data.formations.value = await Formation.all();

      console.log(data);
    });

    //
    let fields = reactive({
      branch_code: '',
      quantity: 0,
      comment: '',
      specialty_id: null,
      formation_id: null,
    });
    const v$ = useVuelidate(
      reactive({
        branch_code: { required },
        quantity: { required, numeric },
        comment: { required },
        specialty_id: { required },
        formation_id: { required },
      }),
      fields,
    );

    async function handleSubmit(valid: boolean) {
      console.log(valid, v$);

      errorMsg.value = '';

      if (!valid) {
        v$.value.$validate();
        return;
      }

      // let res = await userStore.login(creds.email, creds.password);

      // if (!res.success) {
      //   console.log(res.data);
      //   errorMsg.value = res.data.message;
      //   return;
      // }

      // router.push({ name: 'dashboard' });
    }

    return {
      userStore,
      ...data,
      v$,
      errorMsg,
      handleSubmit,
    };
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
.container {
  padding: 2.3rem 2.8rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(#000, 0.2);
  background-color: #fff;
}

::v-deep(.p-message-wrapper) {
  padding: 0.5rem !important;
}
</style>

<style>
main.login {
  background: linear-gradient(var(--blue-300), var(--cyan-700));
}
</style>