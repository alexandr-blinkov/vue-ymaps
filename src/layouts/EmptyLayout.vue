<template>
  <div>
    <Sidebar 
      v-on:change         ="changeDefaultDialog" 
      v-on:changeFavorite ="changeFavoriteDialog"
    />
    <v-main>
      <ya-maps 
        :defaultDialog     ="defaultDialog" 
        :changeFavorite    ="changeFavorite" 
        v-on:close         ="closeDefaultDialog"
        v-on:closeFavorite ="closeFavoriteDialog"
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
      changeFavorite: false
    }
  },
  methods: {
    changeDefaultDialog() {
      this.defaultDialog = !this.defaultDialog
    },
    changeFavoriteDialog() {
      this.changeFavorite = !this.changeFavorite
    },
    closeDefaultDialog(close) {
      this.defaultDialog = false
    },
    closeFavoriteDialog(closeFavorite) {
      this.changeFavorite = false
    },
  },
  components: {
    Sidebar,
    YaMaps
  }
}
</script>