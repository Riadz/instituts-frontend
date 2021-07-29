<template>
  <base-layout>
    <div class="wrapper">
      <form
        @submit.prevent="handleSubmit(!v$.$invalid)"
        class="container p-fluid p-mt-6"
      >
        <h2>Enter le paneux de control</h2>
        <p>{{ v$.$model }}</p>
        <div class="p-inputgroup p-mt-6">
          <span class="p-inputgroup-addon">
            <i class="pi pi-user"></i>
          </span>
          <InputText
            v-model="v$.email.$model"
            :class="{ 'p-invalid': v$.email.$invalid && v$.$dirty }"
            placeholder="Email"
          />
        </div>
        <div class="p-inputgroup p-mt-4">
          <span class="p-inputgroup-addon">
            <i class="pi pi-key"></i>
          </span>
          <InputText
            v-model="v$.password.$model"
            :class="{ 'p-invalid': v$.password.$invalid && v$.$dirty }"
            placeholder="Mote d'passe"
          />
        </div>

        <Button
          type="submit"
          label="Se connecter"
          class="p-button-rounded p-mt-6"
        />
      </form>
    </div>
  </base-layout>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';
import { useUserStore } from '@/stores/user';
import BaseLayout from '@/views/layouts/BaseLayout.vue';
//
//
import Password from 'primevue/Password';
import InputText from 'primevue/InputText';
import Button from 'primevue/Button';
import { login } from '@/services/auth';

export default defineComponent({
  setup() {
    const userStore = useUserStore();

    let creds = reactive({
      email: '',
      password: '',
    });
    const v$ = useVuelidate(
      reactive({
        email: { required, email },
        password: { required },
      }),
      creds,
    );

    async function handleSubmit(valid: boolean) {
      if (!valid) return;

      let res = await login(creds.email, creds.password);
      console.log(res);
    }

    return {
      userStore,
      handleSubmit,
      v$,
    };
  },
  components: { BaseLayout, Password, InputText, Button },
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
</style>

<style lang="scss">
body {
  background: linear-gradient(var(--blue-300), var(--cyan-700));
}
</style>