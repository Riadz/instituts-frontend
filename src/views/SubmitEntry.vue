<template>
  <base-layout mainClass="login">
    <div class="wrapper">
      <Form
        @submit="handleSubmit"
        :validation-schema="schema"
        class="container p-fluid p-my-6 p-mx-2"
        style="width: 100%; max-width: 500px"
      >
        <h2>Crée une entrie</h2>

        <div class="p-field p-mt-3">
          <label>Code de security</label>
          <Field name="pin_code" v-slot="{ field, errorMessage }">
            <InputText v-bind="field" placeholder="VXWCS9ZR..." />
            <small class="p-error">
              {{ errorMessage }}
            </small>
          </Field>
        </div>

        <label class="p-d-block p-mb-2">
          <span class="p-mr-2">Entries</span>
          <Button
            @click="addEntry()"
            icon="pi pi-plus"
            class="add-entry-btn p-button-rounded p-button-primary"
          />
        </label>
        <div class="p-field carousel-container">
          <Carousel :value="fields.entries">
            <template #item="entry">
              <div class="p-px-25 p-pb-2" style="position: relative">
                <Button
                  v-if="fields.entries.length > 1"
                  @click="deleteEntry(entry.index)"
                  icon="pi pi-times"
                  class="delete-entry-btn p-button-rounded p-button-danger"
                />
                <div class="p-formgrid p-grid">
                  <div class="p-field p-col-6">
                    <label>Code de branche</label>
                    <Field
                      :name="`entries[${entry.index}].branch_code`"
                      v-slot="{ field, errorMessage }"
                    >
                      <Dropdown
                        v-bind="field"
                        :modelValue="field.value"
                        :options="branches"
                        @input="field.onInput.forEach((fn) => fn($event.value))"
                        @change="
                          field.onChange.forEach((fn) => fn($event.value))
                        "
                        placeholder="Selectioner"
                      />
                      <small class="p-error">
                        {{ errorMessage }}
                      </small>
                    </Field>
                  </div>
                  <div class="p-field p-col-6">
                    <label>Quantity</label>
                    <Field
                      :name="`entries[${entry.index}].quantity`"
                      v-slot="{ field, errorMessage }"
                    >
                      <InputNumber
                        v-bind="field"
                        :modelValue="field.value"
                        :min="1"
                        @input="field.onInput.forEach((fn) => fn($event.value))"
                        @change="
                          field.onChange.forEach((fn) => fn($event.value))
                        "
                      />
                      <small class="p-error">
                        {{ errorMessage }}
                      </small>
                    </Field>
                  </div>
                </div>
                <div class="p-field">
                  <label>Specialty</label>
                  <Field
                    :name="`entries[${entry.index}].specialty_id`"
                    v-slot="{ field, errorMessage }"
                  >
                    <Dropdown
                      v-bind="field"
                      :modelValue="field.value"
                      :options="specialties"
                      optionValue="id"
                      optionLabel="name"
                      placeholder="Selectioner"
                      @input="field.onInput.forEach((fn) => fn($event.value))"
                      @change="field.onChange.forEach((fn) => fn($event.value))"
                      filter
                    />
                    <small class="p-error">
                      {{ errorMessage }}
                    </small>
                  </Field>
                </div>
                <div class="p-field p-m-0">
                  <label>Formation</label>
                  <Field
                    :name="`entries[${entry.index}].formation_id`"
                    v-slot="{ field, errorMessage }"
                  >
                    <Dropdown
                      v-bind="field"
                      :modelValue="field.value"
                      :options="formations"
                      optionValue="id"
                      optionLabel="name"
                      placeholder="Selectioner"
                      @input="field.onInput.forEach((fn) => fn($event.value))"
                      @change="field.onChange.forEach((fn) => fn($event.value))"
                    />
                    <small class="p-error">
                      {{ errorMessage }}
                    </small>
                  </Field>
                </div>
              </div>
            </template>
          </Carousel>
        </div>

        <div class="p-field">
          <label>Commentaire</label>
          <Field name="comment" v-slot="{ field, errorMessage }">
            <Textarea
              v-bind="field"
              placeholder="..."
              style="min-height: 100px"
              autoResize
            />
            <small class="p-error">
              {{ errorMessage }}
            </small>
          </Field>
        </div>

        <Button
          label="Soumettre"
          type="submit"
          class="p-button-rounded p-mt-3"
          :loading="userStore.loading"
          :disabled="userStore.loading"
        />
      </Form>
    </div>
  </base-layout>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { Form, Field } from 'vee-validate';
import { object, string, array, number } from 'yup';
import EntryData from '@/services/models/EntryData';
import Specialty from '@/services/models/Specialty';
import Formation from '@/services/models/Formation';
import BaseLayout from '@/views/layouts/BaseLayout.vue';
//
import Carousel from 'primevue/Carousel';
import InputText from 'primevue/InputText';
import InputNumber from 'primevue/InputNumber';
import Textarea from 'primevue/Textarea';
import Button from 'primevue/Button';
import Message from 'primevue/Message';
import Dropdown from 'primevue/Dropdown';

export default defineComponent({
  components: {
    Form,
    Field,
    BaseLayout,
    //
    Carousel,
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
    });

    //
    let schema = object().shape({
      pin_code: string().required().label('Code de security'),
      comment: string().label('Commentaire'),
      entries: array().of(
        object().shape({
          branch_code: string().required().label('Code de branch'),
          quantity: number().required().label('Quantity'),
          specialty_id: number().required().label('Specialty'),
          formation_id: number().required().label('Formation'),
        }),
      ),
    });
    let fields = reactive({
      pin_code: '',
      comment: '',
      entries: [
        {
          branch_code: '',
          quantity: 1,
          specialty_id: null,
          formation_id: null,
        },
      ],
    });
    function addEntry(index: number) {
      fields.entries.push({
        branch_code: '',
        quantity: 0,
        specialty_id: null,
        formation_id: null,
      });
    }
    function deleteEntry(index: number) {
      fields.entries = fields.entries.filter((entry, i) => i != index);
    }

    async function handleSubmit(values: Object) {
      console.log(values);
      return;

      errorMsg.value = '';

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
      fields,
      schema,
      errorMsg,
      deleteEntry,
      addEntry,
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
.carousel-container {
  position: relative;
  padding: 0.5rem 0;
  border: 1px solid #ced4da;
  border-radius: 4px;
}
.add-entry-btn,
.delete-entry-btn {
  width: 20px !important;
  height: 20px !important;
  > ::v-deep(.pi) {
    font-size: 0.7rem;
  }
}
.delete-entry-btn {
  position: absolute;
  right: 0;
  top: 0;
  margin: 0 0.75rem;
}

.p-px-25 {
  padding-right: 0.75rem !important;
  padding-left: 0.75rem !important;
}

::v-deep(.p-carousel-content) {
  flex-direction: column-reverse;

  .p-carousel-indicators {
    padding: 5px;
    counter-reset: indicators;
  }
  .p-carousel-indicator > button {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #b0b8c1;
    &::before {
      counter-increment: indicators;
      content: counter(indicators);
      color: #fff;
      font-size: 15px;
      font-weight: 700;
    }
  }

  .p-carousel-prev,
  .p-carousel-next {
    display: none;
  }
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