<template>
  <div class="container">
    <div class="text-center my-10">
      <h1 class="text-h3 text-success mb-4">Register</h1>

      <v-form
        @submit.prevent="handleRegister"
        class="mx-auto"
        style="max-width: 400px"
      >
        <v-text-field
          v-model="form.username"
          label="Username"
          required
          :rules="[(v) => !!v || 'Username is required']"
        ></v-text-field>

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
          Register
        </v-btn>

        <div class="text-center mt-4">
          <router-link to="/login" class="text-success text-decoration-none">
            Already have an account? Login here
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
  username: '',
  email: '',
  password: '',
});

const handleRegister = async () => {
  loading.value = true;
  try {
    await authStore.register(form.value);
    router.push('/mycollection');
  } catch (error) {
    console.error('Registration error:', error);
  } finally {
    loading.value = false;
  }
};
</script>
