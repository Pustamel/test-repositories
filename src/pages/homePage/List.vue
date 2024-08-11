<script
  setup
  lang="ts"
>
import {defineProps, inject, ref, watch, watchEffect} from 'vue'
import Pagination from '@/shared/UI/Pagination.vue'
import {inRange} from "@/pages/homePage/utils/helpers";
import ListItem from "@/pages/homePage/components/ListItem.vue";

const props = defineProps({
  items: Array,
  totalCount: Number
})

let currentPage = ref(1)
const perPage = ref(6)
const localItems = ref({})
const {query} = inject('query')

if (query?.page) {
  currentPage.value = +query.page
}

function onPage (page): void {
  currentPage.value = page
}

watch(
  () => props.totalCount,
  () => {
    currentPage.value = 1
  }
)

watchEffect(() => {
  localItems.value = props.items.filter((item, index) => inRange(index, currentPage.value, perPage.value))
})

</script>

<template>
  <div
    v-if="totalCount && localItems.length > 0"
    class="d-flex flex-row flex-wrap gap-3 justify-center"
  >
    <div
      v-for="(item) in localItems"
      :key="item.id"
    >
      <ListItem :item="item"/>
    </div>
  </div>
  <Pagination
    :per-page="perPage"
    :current-page="currentPage"
    :total-count="totalCount"
    @onPage="onPage"
  />
</template>

<style
  scoped
  lang="scss"
>

</style>