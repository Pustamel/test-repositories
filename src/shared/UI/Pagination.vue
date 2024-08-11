<script
  setup
  lang="ts"
>
import {computed, ComputedRef, defineProps, watch} from "vue";
import {getQuery} from "@/pages/homePage/utils/query";
import {useRouter} from "vue-router";
import {definePagination} from "@/pages/homePage/utils/helpers";

const props = defineProps({
  totalCount: Number,
  perPage: Number,
  currentPage: Number
})
const emit = defineEmits(['onPage'])
const query = getQuery()
const router = useRouter()

const totalPages:ComputedRef<number> = computed(() => {
  return Math.ceil(props.totalCount / 6)
})

async function handlePage (page) {
  emit('onPage', page)
  await router.push({name: 'home', query: {...query, page}})
}

watch(
  () => props.currentPage,
  () => {
    definePagination(props.currentPage, props.perPage, totalPages.value)
  }
)

const pagination = computed(() => {
  return definePagination(props.currentPage, props.perPage, totalPages.value)
})
</script>

<template>
  <nav
    v-if="pagination"
    aria-label="..."
  >
    <ul class="pagination pt-3 d-flex justify-content-center">
      <li
        @click="handlePage(item)"
        class="page-item"
        :class="item === pagination.currentPage ? 'active' : ''"
        v-for="item in pagination.pages"
      ><a
        class="page-link"
        href="#"
      >{{ item }}</a></li>
    </ul>
  </nav>
</template>