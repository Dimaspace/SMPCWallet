export const computedPub = {
  eNode () {
    return this.$store.state.eNode
  },
  eNodeTx () {
    return this.$store.state.eNodeTx
  },
  address () {
    return this.$store.state.address
  },
  token () {
    return this.$store.state.token
  },
  accountType () {
    return this.$store.state.accountType
  },
  dayAndNight () {
    return this.$store.state.dayAndNight
  },
  language () {
    return this.$store.state.language
  },
  serverRPC () {
    return this.$store.state.serverRPC
  }
} 