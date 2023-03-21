<template>
  <v-container>
    <h3>Authentification</h3>

    <template v-if="isAuthenticated">
      <p>Vous êtes déjà connecté...</p>
    </template>
    <template v-else>
      <p>Connection requise. Vous allez être redirigé vers <span class="font-italic">"connect.terreatlantique.com"</span> pour vous authentifier.</p>

      <v-btn block color="primary" @click="login">
        Se connecter
        <v-icon>{{mdiLoginVariant}}</v-icon>
      </v-btn>
    </template>
  </v-container>
</template>

<script>
export default {
  name: 'auth-required',

  computed: {
    isAuthenticated: function() {
      return this.$oidc.isAuthenticated;
    }
  },

  mounted: function() {

  },

  methods: {
    login: function() {
      // authenticate through OIDC flow,
      // then return to target page after authentication
      // @see https://github.com/soukoku/vue-oidc-client/blob/dbfb124b1e4016c7d44a877b7a3bcde2c26a8ebf/vue2/src/vue-oidc-client.ts#L303
      this.$oidc.signIn({
        state: {
          to: this.$route.query.target
        }
      });
    }
  }
};
</script>
