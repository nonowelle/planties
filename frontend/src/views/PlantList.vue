<template>
  <div>
    <div class="d-flex justify-center">
      <h1 class="text-h3 text-success">All Plants</h1>
    </div>

    <div class="container">
      <v-btn
        v-if="family !== 'My Collection'"
        color="success"
        variant="outlined"
        to="/plants"
      >
        View all plants
      </v-btn>
    </div>

    <div class="container-fluid pb-5 d-flex justify-center">
      <v-row class="bg-light p-2 mx-1 justify-center">
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-card class="p-4 m-3" height="100%">
            <v-card-text
              class="text-center d-flex flex-column align-center justify-center"
            >
              <p class="text-body-1">Add a New Plant</p>
              <v-btn
                to="/plants/new"
                icon="mdi-plus-circle"
                color="success"
                size="large"
              ></v-btn>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col
          v-for="plant in plants"
          :key="plant._id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card class="m-3 p-4" height="100%">
            <v-img
              :src="
                plant.images.length > 0 ? plant.images[0].url : '/addImg.png'
              "
              height="200"
              cover
            ></v-img>

            <v-card-text>
              <h5 class="text-center">
                <router-link
                  :to="'/plants/' + plant._id"
                  class="text-success text-decoration-none"
                >
                  <strong>{{ plant.name }}</strong>
                </router-link>
              </h5>
              <v-divider class="my-2"></v-divider>
              <p class="text-center">{{ plant.family }}</p>
              <p v-if="plant.owner" class="text-center text-caption">
                {{ plant.owner.username }}'s plant
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  plants: {
    type: Array,
    required: true,
  },
  family: {
    type: String,
    default: '',
  },
});
</script>
