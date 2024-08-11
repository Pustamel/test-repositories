<script
  setup
  lang="ts"
>

import {defineEmits, defineProps} from "vue";

defineProps(['item'])
const emit = defineEmits(['close'])

function handleClose () {
  emit('close')
}

</script>

<template>
  <div class="modal modal-dialog-centered" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">Дополнительная информация</h1>
          <button @click="handleClose" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Язык: {{item.language || '-'}}</p>
          <p>Доступность: {{item.visibility === 'public' ? 'Публичный' : 'Приватный'}}</p>
          <p>Репозиторий: <a target="_blank" :href="item.svn_url">Посмотреть</a></p>
          <p>Пользователь: <a target="_blank" :href="item.owner.html_url">Посмотреть</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .modal {
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>