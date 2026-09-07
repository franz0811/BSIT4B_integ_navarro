<template>
  <v-layout class="rounded rounded-md" style="min-height: 100vh;">
    <v-navigation-drawer
      expand-on-hover
      permanent
      rail
    >
      <v-list v-if="user">
        <v-list-item
          :prepend-avatar="user.picture"
          :subtitle="user.email"
          :title="user.name"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>
        <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
        <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
      </v-list>

      <!-- Inilagay ang Logout button sa ilalim ng sidebar -->
      <template v-slot:append>
        <div class="pa-2">
          <v-list-item
            prepend-icon="mdi-logout"
            title="Logout"
            value="logout"
            color="error"
            @click="logout"
          ></v-list-item>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- Inalisan ng card sa gitna -->
    <v-main class="d-flex align-center justify-center">
      <v-container class="fill-height d-flex align-center justify-center">
        <!-- Main content area -->
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
//@ts-nocheck
const user = ref<any>(null)

onMounted(() => {
  const savedUser = localStorage.getItem('google_user')

  if (savedUser) {
    user.value = JSON.parse(savedUser)
  }
})

const logout = () => {
  localStorage.removeItem('google_user')
  localStorage.removeItem('google_token')
  navigateTo('/login')
}
</script>