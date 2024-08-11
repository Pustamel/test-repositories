<script
  setup
  lang="ts"
>
import {defineAsyncComponent, defineProps, ref} from "vue";
const Detail = defineAsyncComponent(() => import("@/pages/homePage/components/Detail.vue"))

const props = defineProps(['item'])

let isModal = ref(false)

function handleModal () {
  isModal.value = !isModal.value
}

</script>

<template>
  <div @click="handleModal" class="card">
    <div class="card-header">
      {{ item.name }}
    </div>
    <div class="card-body">
      <div class="d-flex align-items-center">
        <img
          :src="item.owner.avatar_url"
          alt=""
          class="card-body__avatar"
        >
        <div class="card-text ms-2">{{ item.owner?.login }}</div>
      </div>
      <div class="mt-1 ms-2">
        <i class="bi bi-star-fill"></i> {{ item.stargazers_count }}
        <i class="bi bi-eye-fill ms-4"></i> {{ item.watchers_count }}
      </div>

      <div class="d-flex flex-row mt-2">
        <input
          class="form-control me-3"
          id="exampleFormControlInput1"
          placeholder="Комментарий к проекту"
        >
        <button
          type="button"
          class="btn btn-primary"
        ><i class="bi bi-pencil"></i></button>
      </div>
    </div>
  </div>
  <Detail
    v-model="isModal"
    v-if="isModal"
    :item="item"
    @close="isModal = false"
  />
</template>

<style
  scoped
  lang="scss"
>
  .card {
    width: 500px;
    height: 230px;
    @media (max-width: 550px) {
      width: 300px
    }
    @media (max-width: 300px) {
      width: 250px
    }
    :hover {
      cursor: pointer;
    }
  }

  .card-body__avatar {
    height: 80px;
    width: 80px;
    border-radius: 50%;
  }
</style>