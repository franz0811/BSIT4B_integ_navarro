<template>
  <v-container>
    <v-card v-if="user" class="pa-6">
      <div class="d-flex align-center ga-4">
        <v-avatar size="64">
          <v-img :src="user.picture" />
        </v-avatar>
        <div>
          <h2>{{ user.name }}</h2>
          <p>{{ user.email }}</p>
        </div>
      </div>
      <v-btn color="error" class="mt-4" @click="logout">
        Logout
      </v-btn>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
//@ts-nocheck
definePageMeta({
  layout: 'default'
})

const user = ref<any>(null)

const logout = () => {
  localStorage.removeItem('google_user')
  localStorage.removeItem('google_token')
  navigateTo('/login')
}

onMounted(() => {
  const savedUser = localStorage.getItem('google_user')
  if (savedUser) {
    user.value = JSON.parse(savedUser)
  }
})
</script>