<template>
  <AppLayout :total="0"> <Builder /> </AppLayout>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";
import Builder from "@/modules/builder/Bulider";

export default {
  name: "Index",
  components: { AppLayout, Builder },
};
</script>
