<template>
  <div>
    <Builder />
    <router-view />
  </div>
</template>

<script>
import Builder from "@/modules/builder/Bulider";

export default {
  name: "Main",
  components: { Builder },
};
</script>
