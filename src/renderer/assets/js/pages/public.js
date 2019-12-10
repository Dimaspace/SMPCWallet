export const computedPub = {
  address () {
    return this.$store.state.address
  },
  token () {
    return this.$store.state.token
  },
  safeMode () {
    return this.$store.state.safeMode
  },
  dayAndNight () {
    return this.$store.state.dayAndNight
  },
  language () {
    return this.$store.state.language
  }
} 