import { defineStore } from 'pinia';
import axios from 'axios';

export const usePlantStore = defineStore('plant', {
  state: () => ({
    plants: [],
    currentPlant: null,
    families: [],
    loading: false,
    error: null,
  }),

  getters: {
    getPlants: (state) => state.plants,
    getCurrentPlant: (state) => state.currentPlant,
    getFamilies: (state) => state.families,
    isLoading: (state) => state.loading,
    getError: (state) => state.error,
  },

  actions: {
    async fetchPlants(family = '') {
      this.loading = true;
      this.error = null;
      try {
        const url = family ? `/api/plants?family=${family}` : '/api/plants';
        const response = await axios.get(url);
        this.plants = response.data;
      } catch (error) {
        this.error = error.message;
        console.error('Error fetching plants:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchPlantById(id) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`/api/plants/${id}`);
        this.currentPlant = response.data;
      } catch (error) {
        this.error = error.message;
        console.error('Error fetching plant:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchFamilies() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get('/api/plants/families');
        this.families = response.data;
      } catch (error) {
        this.error = error.message;
        console.error('Error fetching families:', error);
      } finally {
        this.loading = false;
      }
    },

    async createPlant(plantData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post('/api/plants', plantData);
        this.plants.push(response.data);
        return response.data;
      } catch (error) {
        this.error = error.message;
        console.error('Error creating plant:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updatePlant(id, plantData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.put(`/api/plants/${id}`, plantData);
        const index = this.plants.findIndex((p) => p._id === id);
        if (index !== -1) {
          this.plants[index] = response.data;
        }
        if (this.currentPlant && this.currentPlant._id === id) {
          this.currentPlant = response.data;
        }
        return response.data;
      } catch (error) {
        this.error = error.message;
        console.error('Error updating plant:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deletePlant(id) {
      this.loading = true;
      this.error = null;
      try {
        await axios.delete(`/api/plants/${id}`);
        this.plants = this.plants.filter((p) => p._id !== id);
        if (this.currentPlant && this.currentPlant._id === id) {
          this.currentPlant = null;
        }
      } catch (error) {
        this.error = error.message;
        console.error('Error deleting plant:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async addJournalEntry(plantId, entry) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post(
          `/api/plants/${plantId}/journals`,
          entry
        );
        if (this.currentPlant && this.currentPlant._id === plantId) {
          this.currentPlant.journals.push(response.data);
        }
        return response.data;
      } catch (error) {
        this.error = error.message;
        console.error('Error adding journal entry:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteJournalEntry(plantId, journalId) {
      this.loading = true;
      this.error = null;
      try {
        await axios.delete(`/api/plants/${plantId}/journals/${journalId}`);
        if (this.currentPlant && this.currentPlant._id === plantId) {
          this.currentPlant.journals = this.currentPlant.journals.filter(
            (j) => j._id !== journalId
          );
        }
      } catch (error) {
        this.error = error.message;
        console.error('Error deleting journal entry:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async addComment(plantId, comment) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post(
          `/api/plants/${plantId}/comments`,
          comment
        );
        if (this.currentPlant && this.currentPlant._id === plantId) {
          this.currentPlant.comments.push(response.data);
        }
        return response.data;
      } catch (error) {
        this.error = error.message;
        console.error('Error adding comment:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteComment(plantId, commentId) {
      this.loading = true;
      this.error = null;
      try {
        await axios.delete(`/api/plants/${plantId}/comments/${commentId}`);
        if (this.currentPlant && this.currentPlant._id === plantId) {
          this.currentPlant.comments = this.currentPlant.comments.filter(
            (c) => c._id !== commentId
          );
        }
      } catch (error) {
        this.error = error.message;
        console.error('Error deleting comment:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
