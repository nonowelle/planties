<template>
  <div class="container">
    <h1 class="text-h3 text-success text-center mb-4">
      {{ isEditing ? 'Edit Plant' : 'Add New Plant' }}
    </h1>

    <v-form
      @submit.prevent="handleSubmit"
      class="mx-auto"
      style="max-width: 600px"
    >
      <v-text-field
        v-model="form.name"
        label="Plant Name"
        required
        :rules="[(v) => !!v || 'Name is required']"
      ></v-text-field>

      <v-text-field
        v-model="form.purchaseDate"
        label="Purchase Date"
        type="date"
        required
        :rules="[(v) => !!v || 'Purchase date is required']"
      ></v-text-field>

      <v-select
        v-model="form.family"
        :items="families"
        label="Family"
        required
        :rules="[(v) => !!v || 'Family is required']"
      ></v-select>

      <v-textarea
        v-model="form.wateringInstructions"
        label="Watering Instructions"
        required
        :rules="[(v) => !!v || 'Watering instructions are required']"
      ></v-textarea>

      <v-textarea v-model="form.notes" label="Notes"></v-textarea>

      <v-file-input
        v-model="form.images"
        label="Plant Images"
        multiple
        accept="image/*"
        prepend-icon="mdi-camera"
      ></v-file-input>

      <div class="d-flex justify-center mt-4">
        <v-btn type="submit" color="success" size="large" :loading="loading">
          {{ isEditing ? 'Update Plant' : 'Add Plant' }}
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePlantStore } from '@/stores/plant';
import { useFamilyStore } from '@/stores/family';

const route = useRoute();
const router = useRouter();
const plantStore = usePlantStore();
const familyStore = useFamilyStore();

const loading = ref(false);
const families = ref([]);

const form = ref({
  name: '',
  purchaseDate: '',
  family: '',
  wateringInstructions: '',
  notes: '',
  images: [],
});

const isEditing = computed(() => route.params.id !== undefined);

onMounted(async () => {
  await familyStore.fetchFamilies();
  families.value = familyStore.families.map((f) => f.name);

  if (isEditing.value) {
    const plant = await plantStore.fetchPlant(route.params.id);
    if (plant) {
      form.value = {
        ...plant,
        purchaseDate: new Date(plant.purchaseDate).toISOString().split('T')[0],
      };
    }
  }
});

const handleSubmit = async () => {
  loading.value = true;
  try {
    if (isEditing.value) {
      await plantStore.updatePlant(route.params.id, form.value);
    } else {
      await plantStore.createPlant(form.value);
    }
    router.push('/plants');
  } catch (error) {
    console.error('Error saving plant:', error);
  } finally {
    loading.value = false;
  }
};
</script>
