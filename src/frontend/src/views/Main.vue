<template>
  <div class="content">
    <Builder />
    <router-view />
  </div>
</template>

<script>
import { Builder } from "@/modules";

export default {
  name: "Main",
  components: { Builder },
};
</script>
