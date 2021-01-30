<template>
  <div>
    <Sidebar 
      v-on:change         ="changeDefaultDialog" 
      v-on:changeFavorite ="changeFavoriteDialog"
      v-on:changeNow      ="changeNowDialog"
    />
    <v-main>
      <ya-maps 
        :defaultDialog     ="defaultDialog" 
        :changeFavorite    ="changeFavorite" 
        :changeNow         ="changeNow" 
        v-on:close         ="closeDefaultDialog"
        v-on:closeFavorite ="closeFavoriteDialog"
        v-on:closeNow      ="closeNowDialog"
      />
    </v-main>
  </div>
</template>

<script>
import Sidebar from '../components/main/Sidebar'
import YaMaps from '../components/YaMaps'
export default {
  data() {
    return {
      defaultDialog:  false,
      changeFavorite: false,
      changeNow: false
    }
  },
  methods: {
    changeDefaultDialog() {
      this.defaultDialog = !this.defaultDialog
    },
    changeFavoriteDialog() {
      this.changeFavorite = !this.changeFavorite
    },
    changeNowDialog() {
      this.changeNow = !this.changeNow
    },
    closeDefaultDialog(close) {
      this.defaultDialog = false
    },
    closeFavoriteDialog(closeFavorite) {
      this.changeFavorite = false
    },
    closeNowDialog(closeNow) {
      this.changeNow = false
    },
  },
  components: {
    Sidebar,
    YaMaps
  }
}
</script>