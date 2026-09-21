<template>
  <v-app>
   
      
        <v-navigation-drawer
          expand-on-hover
          permanent
          rail
        >
          <v-list>
            <v-list-item
              prepend-avatar="https://www.googleapis.com/oauth2/v3/userinfo"
              subtitle="franznavarro260@gmail.com"
              title="Franz Navarro"
            ></v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-folder" title="Dashboard" value="dashboard" to="/"></v-list-item>
            <v-list-item prepend-icon="mdi mdi-qrcode" title="Qr-Scanner" value="qr-scanner" to="qr-scanner"></v-list-item>
            <v-list-item prepend-icon="mdi-star" title="Weather" value="weather" to="weather"></v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-app-bar>
  <template v-slot:prepend>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
  </template>

  <v-app-bar-title>Application Bar</v-app-bar-title>
  </v-app-bar>
        <slot />
        <v-main style="height: 250px"></v-main>
    
   
  </v-app>
</template>

<script lang="ts" setup>
const drawer = (true)

</script>

<style></style>