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
        <v-list-item-action>
          <v-icon>mdi-database-arrow-right</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Изменить источник</v-list-item-title>
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
    }
  },
};
</script>