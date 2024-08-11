import {defineStore} from 'pinia'
import axios from "@/store/axios";

export const useRepoStore = defineStore('repository', {
  state: () => ({
    searched: null
  }),
  actions: {
    async searchProjects (subject: string) {
      const uri = '/search/repositories?q=' + subject
      let response = {
        items: [],
        total_count: 0
      }
      try {
        response = (await axios.get(uri))?.data
      } catch (error) {
        throw new Error(error)
      }
      return response
    }
  }
})
