<script
  setup
  lang="ts"
>
import List from '@/pages/homePage/List.vue'
import {provide, Ref, ref, UnwrapRef, watch} from "vue";
import {useRepoStore} from "@/store";
import {useMessageStore} from "@/store/messages";
import {useRouter} from "vue-router";

const repoStore = useRepoStore()
const messageStore = useMessageStore()
const router = useRouter()

let searchParam: Ref<UnwrapRef<string>> = ref('')
let listItems = ref([])
let totalCount = ref(0)
let loading = ref(false)
let query = ref(router.currentRoute.value.query)

watch(() => router.currentRoute.value.query, (newVal, oldVal) => {
  query.value = newVal
})

provide('query', query)

if (query.value?.search) {
  searchParam.value = query.value.search
  search()
}

async function search () {
  loading.value = true
  try {
    const result = await repoStore.searchProjects(searchParam.value)
    listItems.value = result.items
    totalCount.value = result.items.length
    await router.push({name: 'home', query: {...query.value, search: searchParam.value}})
  } catch (e) {
    messageStore.addMessage({
      id: new Date(),
      title: 'Ошибка поиска!',
      text: 'Попробуйте ввести другой запрос или обновить страницу.',
      typeMessage: 'error',
    })
  }
  loading.value = false
}

async function handleSearch () {
  await search()
  await router.push({name: 'home', query: {search: searchParam.value}})
}

function onChangeInput (event) {
  searchParam.value = event.target.value
}

</script>

<template>
  <div class="mb-3 d-flex flex-row">
    <input
      id="search"
      @change="onChangeInput"
      class="form-control me-3"
      placeholder="Начните вводить текст для поиска (не менее трех символов)"
    >
    <button
      @click="handleSearch"
      type="button"
      class="btn btn-primary"
    ><i class="bi bi-search"></i></button>
  </div>
  <List
    v-if="totalCount !== 0"
    :items="listItems"
    :totalCount="totalCount"
  />
  <div
    v-if="loading"
    class="spinner-border text-info"
    role="status"
  >
    <span class="visually-hidden"></span>
  </div>
  <div
    v-if="totalCount === 0"
    class="alert alert-primary"
    role="alert"
  >
    Ничего не найдено!
  </div>
</template>