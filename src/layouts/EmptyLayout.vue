<template>
  <div>
    <Sidebar v-on:change="changeDefaultDialog" />
    <v-main>
      <ya-maps :defaultDialog="defaultDialog" v-on:close="closeDefaultDialog" />
    </v-main>
  </div>
</template>

<script>
import Sidebar from '../components/main/Sidebar'
import YaMaps from '../components/YaMaps'
export default {
  data() {
    return {
      defaultDialog: false
    }
  },
  methods: {
    changeDefaultDialog() {
      this.defaultDialog = !this.defaultDialog
    },
    closeDefaultDialog(close) {
      this.defaultDialog = false
    },
  },
  components: {
    Sidebar,
    YaMaps
  }
}
</script>