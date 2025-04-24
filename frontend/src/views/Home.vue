<template>
  <div class="container">
    <div class="text-center my-10">
      <h1 class="text-h2 text-success mb-4">Welcome to Planties</h1>
      <p class="text-h5 mb-6">Your personal plant collection manager</p>

      <v-row class="justify-center">
        <v-col cols="12" sm="6" md="4">
          <v-card class="mx-auto" max-width="400">
            <v-card-title class="text-h5 text-success">All Plants</v-card-title>
            <v-card-text>
              <p>Browse and discover all plants in our community</p>
            </v-card-text>
            <v-card-actions>
              <v-btn color="success" variant="outlined" to="/plants" block>
                View All Plants
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-card class="mx-auto" max-width="400">
            <v-card-title class="text-h5 text-success"
              >My Collection</v-card-title
            >
            <v-card-text>
              <p>Manage your personal plant collection</p>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="success"
                variant="outlined"
                to="/mycollection"
                block
              >
                View My Collection
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>
// No additional setup needed for this simple home page
</script>
