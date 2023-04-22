export const useToastStore = defineStore('toastStore', {
  state: () => ({
    notifications: []
  }),
  getters: {},
  actions: {
    add(notification) {
      try {
        this.notifications.push({
          ...notification,
          id: (Math.random().toString(36) + Date.now().toString(36)).substr(2),
          timeout: 3000
        })
      } catch (error) {
        console.log(error);
      }
    },
    remove(index) {
      try {
        this.notifications.splice(index, 1)
      } catch (error) {
        console.log(error);
      }
    },
    // addNotification (notification) {
    //   this.notifications.push({
    //     ...notification,
    //     id: (Math.random().toString(36) + Date.now().toString(36)).substr(2)
    //   })
    // }
  }
})