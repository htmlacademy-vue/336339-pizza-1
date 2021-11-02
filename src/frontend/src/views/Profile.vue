<template>
  <ProfileModule />
</template>

<script>
import { Profile as ProfileModule } from "@/modules";
import { auth, isAuthenticated } from "@/middlewares";
import { TRANSITION_ENTER_ACTIVE_CLASS } from "@/common/constants";

export default {
  name: "Profile",
  layout: "AppLayoutWithSidebar",
  middlewares: [auth, isAuthenticated],
  enterActiveClass: TRANSITION_ENTER_ACTIVE_CLASS,
  components: { ProfileModule },
};
</script>
