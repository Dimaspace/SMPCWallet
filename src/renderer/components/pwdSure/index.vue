<template>
  <div v-loading="loading.wait" element-loading-text="Loading……">
    <div class="pwdSure_box">

      <div class="flex-bc selectType_box">

        <div class="selectType_content">
          <!-- <div class="selectType_keystore" id="keystore" data-view="keystore"> -->
            <!-- <hgroup class="selectType_contTitle">
              <h3 class="title">{{$t('PLACEHOLDER').ENTER_PASSWORD}}</h3>
            </hgroup> -->
            <div class="selectType_contentBox">
              <el-form ref="userInfoForm" :model="sureForm" label-width="120px" label-position="top" @submit.native.prevent>
                <el-form-item :label="$t('label').password">
                  <el-input type="password" v-model="sureForm.password"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="inputFileBtn" :disabled="!loading.unlock">{{$t('btn').unlock}}</el-button>
                  <el-button native-type="submit" @click="elDialogView">{{$t('btn').cancel}}</el-button>
                </el-form-item>
              </el-form>
            </div>
          <!-- </div> -->
        </div>
      </div>

    </div>
  </div>
</template>

<style>

</style>

<script>
import {computedPub} from '@/assets/js/pages/public'
import {findAccount} from '@/db/accounts'
export default {
  name: "pwdSure",
  // props: ["sendDataPage"],
  props: {
    sendDataPage: {
      type: Object
    }
  },
  data () {
    return {
      sureForm: {},
      loading: {
        wait: false,
        unlock: true
      }
    }
  },
  computed: {
    ...computedPub
  },
  mounted () {
    // console.log(this.sendDataPage)
  },
  methods: {
    inputFileBtn () {
      if (!this.loading.unlock) return
      this.loading.unlock = false
      setTimeout(() => {
        this.$nextTick(() => {
          this.loading.unlock = true
        })
      }, 3000)
      let username = this.token
      this.loading.wait = true
      // console.log(username)
      if (!username) {
        this.msgError(this.$t('warn').w_13)
        this.quitApp()
        this.sureForm.password = ''
        this.loading.wait = false
      } else {
        findAccount({name: username}).then(res => {
          console.log(res)
          if (res.length > 0) {
            let keystore = res[0].ks
            try {
              if (this.$$.walletRequirePass(keystore)) {
                let walletInfo = this.$$.getWalletFromPrivKeyFile(
                  keystore,
                  this.sureForm.password
                )
                this.toSign(walletInfo.getPrivateKeyString())
              } else {
                this.msgError('Error')
                this.elDialogView()
              }
            } catch (error) {
              console.log(error)
              // this.elDialogView()
              this.loading.wait = false
              this.msgError(error.toString())
            }
          } else {
            this.elDialogView()
            this.msgError(this.$t('warn').w_13)
          }
        })
      }
    },
    toSign (pwd) {
      this.$$.toSign(this.sendDataPage, pwd).then(res => {
        this.loading.wait = false
        this.$emit("sendSignData", res)
      }).catch(err => {
        console.log(err)
        this.loading.wait = false
        this.$emit("sendSignData", {error: err})
        this.msgError(err.toString())
      })
      // this.sureForm.password = ''
    },
    elDialogView () {
      this.sureForm.password = ''
      this.loading.wait = false
      this.$emit("elDialogView")
    },
  }
}
</script>
