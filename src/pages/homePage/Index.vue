<script
  setup
  lang="ts"
>
import List from '@/pages/homePage/List.vue'
import {Ref, ref, UnwrapRef} from "vue";
import {useRepoStore} from "@/store";
import {useMessageStore} from "@/store/messages";
import {useRouter} from "vue-router";
import {getQuery} from "@/pages/homePage/utils/query";

const repoStore = useRepoStore()
const messageStore = useMessageStore()
const router = useRouter()

let searchParam: Ref<UnwrapRef<string>> = ref('')
let listItems = ref([])
let totalCount = ref(0)

const query: object = getQuery()

if (query?.search) {
  searchParam.value = query.search
  search()
}

async function search () {
  try {
    const result = await repoStore.searchProjects(searchParam.value)
    listItems.value = result.items
    totalCount.value = result.items.length
    await router.push({name: 'home', query: {...query, search: searchParam.value}})
  } catch (e) {
    messageStore.addMessage({
      id: new Date(),
      title: 'Ошибка поиска!',
      text: 'Попробуйте ввести другой запрос',
      typeMessage: 'error',
    })
  }
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
      @click="search"
      type="button"
      class="btn btn-primary"
    ><i class="bi bi-search"></i></button>
  </div>
  <List
    :items="listItems"
    :totalCount="totalCount"
  />
</template>