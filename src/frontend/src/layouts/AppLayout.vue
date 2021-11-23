<template>
  <component :is="layout">
    <slot />
    <AppNotifications />
  </component>
</template>
<script>
import { AppNotifications } from "@/common/components";
const DEFAULT_LAYOUT = "AppEmptyLayout";
export default {
  name: "AppLayout",

  components: { AppNotifications },

  computed: {
    layout() {
      const layout = this.$route.meta.layout || DEFAULT_LAYOUT;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>
