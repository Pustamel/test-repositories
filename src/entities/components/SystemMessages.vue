<script
  setup
  lang="ts"
>
import {ref} from "vue";
import {useMessageStore} from "@/store/messages";

const store = useMessageStore()
let messages = ref([])

function getMessages () {
  messages.value = store.getMessages
}

function closeMessage (id) {
  setTimeout(() => {
    store.hideMessage(id)
  }, 0)
}

getMessages()
</script>

<template>
  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div
      v-for="message in messages"
      :key="message.id"
      v-if="messages.length"
    >
      <div
        class="toast show"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="toast-header">
          <strong
            :class="message.typeMessage === 'error' ? 'text-danger' : message.typeMessage === 'success' ? 'text-success' : 'text-info'"
            class="me-auto"
          >{{ message.title }}</strong>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
            @click="closeMessage(message.id)"
          ></button>
        </div>
        <div
          v-if="message.text"
          class="toast-body"
        >
          {{ message.text }}
        </div>
      </div>
    </div>
  </div>
</template>