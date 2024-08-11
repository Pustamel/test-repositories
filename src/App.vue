<script
  setup
  lang="ts"
>
import SystemMessages from "@/entities/components/SystemMessages.vue";
</script>

<template>
  <div class="p-3">
    <RouterView/>
    <SystemMessages />
  </div>
</template>
