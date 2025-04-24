<template>
  <div class="container" v-if="plant">
    <div class="text-center my-10">
      <h1 class="text-h3 text-success mb-4">{{ plant.name }}</h1>

      <v-row>
        <v-col cols="12" md="6">
          <v-img
            :src="plant.images.length > 0 ? plant.images[0].url : '/addImg.png'"
            height="400"
            cover
            class="rounded-lg"
          ></v-img>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="pa-4">
            <v-card-title class="text-h5 text-success"
              >Plant Details</v-card-title
            >
            <v-card-text>
              <p><strong>Family:</strong> {{ plant.family }}</p>
              <p>
                <strong>Purchase Date:</strong>
                {{ new Date(plant.purchaseDate).toLocaleDateString() }}
              </p>
              <p>
                <strong>Watering Instructions:</strong>
                {{ plant.wateringInstructions }}
              </p>
              <p v-if="plant.notes">
                <strong>Notes:</strong> {{ plant.notes }}
              </p>
              <p v-if="plant.owner">
                <strong>Owner:</strong> {{ plant.owner.username }}
              </p>
            </v-card-text>

            <v-card-actions v-if="isOwner">
              <v-btn
                color="success"
                variant="outlined"
                :to="'/plants/' + plant._id + '/edit'"
              >
                Edit Plant
              </v-btn>
              <v-btn
                color="error"
                variant="outlined"
                @click="handleDelete"
                :loading="loading"
              >
                Delete Plant
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePlantStore } from '@/stores/plant';
import { useAuthStore } from '@/stores/auth';

const route = useRoute();
const router = useRouter();
const plantStore = usePlantStore();
const authStore = useAuthStore();
const loading = ref(false);

const plant = ref(null);

const isOwner = computed(() => {
  return plant.value?.owner?._id === authStore.user?._id;
});

onMounted(async () => {
  try {
    plant.value = await plantStore.fetchPlant(route.params.id);
  } catch (error) {
    console.error('Error fetching plant:', error);
    router.push('/404');
  }
});

const handleDelete = async () => {
  if (!confirm('Are you sure you want to delete this plant?')) return;

  loading.value = true;
  try {
    await plantStore.deletePlant(route.params.id);
    router.push('/mycollection');
  } catch (error) {
    console.error('Error deleting plant:', error);
  } finally {
    loading.value = false;
  }
};
</script>
