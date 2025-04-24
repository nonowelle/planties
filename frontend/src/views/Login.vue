<template>
  <div class="container">
    <div class="text-center my-10">
      <h1 class="text-h3 text-success mb-4">Login</h1>

      <v-form
        @submit.prevent="handleLogin"
        class="mx-auto"
        style="max-width: 400px"
      >
        <v-text-field
          v-model="form.email"
          label="Email"
          type="email"
          required
          :rules="[(v) => !!v || 'Email is required']"
        ></v-text-field>

        <v-text-field
          v-model="form.password"
          label="Password"
          type="password"
          required
          :rules="[(v) => !!v || 'Password is required']"
        ></v-text-field>

        <v-btn
          type="submit"
          color="success"
          block
          :loading="loading"
          class="mt-4"
        >
          Login
        </v-btn>

        <div class="text-center mt-4">
          <router-link to="/register" class="text-success text-decoration-none">
            Don't have an account? Register here
          </router-link>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const loading = ref(false);

const form = ref({
  email: '',
  password: '',
});

const handleLogin = async () => {
  loading.value = true;
  try {
    await authStore.login(form.value);
    router.push('/mycollection');
  } catch (error) {
    console.error('Login error:', error);
  } finally {
    loading.value = false;
  }
};
</script>
