<template>
  <base-layout mainClass="login">
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

        <Message v-if="errorMsg" severity="error" :closable="false">
          {{ errorMsg }}
        </Message>

        <Button
          label="Se connecter"
          type="submit"
          class="p-button-rounded p-mt-6"
          :loading="userStore.loading"
          :disabled="userStore.loading"
        />
      </form>
    </div>
  </base-layout>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';
import { useUserStore } from '@/stores/user';
import BaseLayout from '@/views/layouts/BaseLayout.vue';
//
import Password from 'primevue/Password';
import InputText from 'primevue/InputText';
import Button from 'primevue/Button';
import Message from 'primevue/Message';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    let errorMsg = ref('');

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
      errorMsg.value = '';

      if (!valid) {
        v$.value.$validate();
        return;
      }

      let res = await userStore.login(creds.email, creds.password);

      if (!res.success) {
        console.log(res.data);
        errorMsg.value = res.data.message;
        return;
      }

      router.push({ name: 'dashboard' });
    }

    return {
      userStore,
      v$,
      errorMsg,
      handleSubmit,
    };
  },
  components: {
    BaseLayout,
    Password,
    InputText,
    Button,
    Message,
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