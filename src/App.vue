<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>Planties</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" text>Home</v-btn>
      <v-btn to="/login" text v-if="!isLoggedIn">Login</v-btn>
      <v-btn to="/register" text v-if="!isLoggedIn">Register</v-btn>
      <v-btn @click="logout" text v-if="isLoggedIn">Logout</v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { useAuthStore } from './stores/auth';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { isLoggedIn } = storeToRefs(authStore);

const logout = () => {
  authStore.logout();
};
</script>
