<template>
  <v-app>
      <v-navigation-drawer
        v-model="drawer"
        permanent
        color="black"
        @click="drawer = true"
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
          <v-list-item prepend-icon="mdi mdi-view-dashboard" title="Dashboard" to="/"></v-list-item>
          <v-list-item prepend-icon="mdi mdi-qrcode-scan" title="QR Scanner" to="qr-scanner"></v-list-item>
          <v-list-item prepend-icon="mdi mdi-weather-partly-cloudy" title="Weather" to="weather"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar color="black">
    <template v-slot:prepend>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>SCAN ME</v-app-bar-title>
  </v-app-bar>

         <slot />
      <v-main style="height: 250px"></v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: true,
  }),
}
</script>