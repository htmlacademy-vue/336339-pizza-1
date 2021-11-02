<template>
  <div class="content">
    <Builder />
    <router-view />
  </div>
</template>

<script>
import { Builder } from "@/modules";
import { TRANSITION_ENTER_ACTIVE_CLASS } from "@/common/constants";

export default {
  name: "Main",
  layout: "AppLayoutWithHeader",
  enterActiveClass: TRANSITION_ENTER_ACTIVE_CLASS,
  components: { Builder },
};
</script>
