<template>
  <v-navigation-drawer
    permanent
    :expand-on-hover="expandOnHover"
    :mini-variant="miniVariant"
    app
  >
    <v-list dense nav class="py-1">
      
       <v-list-item :class="miniVariant">
        <v-list-item-content>
          <v-list-item-subtitle>{{
            date | date("datetime")
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
  
      <v-list-item link @click="changeDefaultDialog">
        <v-list-item-icon>
          <v-icon>mdi-database-plus</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title >Добавить источник</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link @click="changeFavoriteDialog">
        <v-list-item-action>
          <v-icon>mdi-database-sync</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Избранные источники</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    interval: null,
    date: new Date(),
    miniVariant: true,
    expandOnHover: true,
  }),
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date();
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    changeDefaultDialog() {
      this.$emit('change')
    },
    changeFavoriteDialog() {
      this.$emit('changeFavorite')
    }
  },
};
</script>