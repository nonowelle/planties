<template>
  <div class="container">
    <div class="text-center my-10">
      <h1 class="text-h3 text-success mb-4">
        {{ isMyCollection ? 'My Collection' : 'All Plants' }}
      </h1>

      <div class="d-flex justify-center mb-6">
        <v-btn
          v-if="isMyCollection"
          color="success"
          to="/plants/new"
          class="mr-4"
        >
          Add New Plant
        </v-btn>

        <v-select
          v-model="selectedFamily"
          :items="families"
          label="Filter by Family"
          style="max-width: 200px"
          clearable
        ></v-select>
      </div>

      <PlantList :plants="filteredPlants" :family="selectedFamily" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { usePlantStore } from '@/stores/plant';
import { useFamilyStore } from '@/stores/family';
import PlantList from '@/components/PlantList.vue';

const route = useRoute();
const plantStore = usePlantStore();
const familyStore = useFamilyStore();

const selectedFamily = ref('');
const families = ref([]);

const isMyCollection = computed(() => route.path === '/mycollection');

const filteredPlants = computed(() => {
  if (!selectedFamily.value) return plantStore.plants;
  return plantStore.plants.filter(
    (plant) => plant.family === selectedFamily.value
  );
});

onMounted(async () => {
  await familyStore.fetchFamilies();
  families.value = familyStore.families.map((f) => f.name);

  if (isMyCollection.value) {
    await plantStore.fetchMyPlants();
  } else {
    await plantStore.fetchPlants();
  }
});
</script>
