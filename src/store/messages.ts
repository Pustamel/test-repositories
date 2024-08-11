import {defineStore} from 'pinia'

type Message = {
  id: string,
  title: string,
  text?: string,
  typeMessage: 'error' | 'success' | 'info',
}

export const useMessageStore = defineStore('messages', {
  state: () => ({
    messages: []
  }),
  actions: {
    addMessage (message: Message) {
      this.messages.push(message)
    },
    hideMessage (id: string) {
      const itemIndex = this.messages.findIndex((item) => item.id === id)
      this.messages.splice(itemIndex, 1)
    }
  },
  getters: {
    getMessages: state => state.messages
  }
})
