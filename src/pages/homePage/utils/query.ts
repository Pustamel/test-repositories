import {useRouter} from "vue-router";

export function getQuery () {
  const router = useRouter()
  return router.currentRoute.value.query
}