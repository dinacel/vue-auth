import { defineStore } from 'pinia';
import idsrvAuth from '@/utils/idsrvAuth';
import UserDataService from '@/services/UserDataService';

export const useUserStore = defineStore({
  id: 'user',

  state: () => ({
    roles: [],
    permissions: [],
    profile: null,
    sites: []
  }),

  getters: {
    getPermissions(state) {
      return state.permissions;
    },
    getProfile(state) {
      return state.profile;
    },
    getRoles(state) {
      return state.roles;
    },
    getSites(state) {
      return state.sites;
    }
  },

  actions: {
    async fetchRoles() {
      console.log('[user] get roles');

      try {
        const user = idsrvAuth.userProfile;
        const response = await UserDataService.get(user.sub);
        this.roles = response.data.roles;

        // consolidate permissions
        let permissions = [];
        this.roles.forEach((role) => {
          permissions = [...new Set([...permissions, ...role.permissions])];
        });

        this.permissions = permissions;

        // sites
        this.sites = response.data.sites;

        // @todo get local user
        this.profile = user;

        return response;
      } catch(err) {
        return err; // @todo
      }
    }
  }
});
