<template>
  <div class="boxConntent1" v-loading="loading.account" :element-loading-text="$t('loading').l_1">
    <div class="flex-bc a-header-box" v-if="!Number(accountType)">
      <div></div>
      <div @click="gID ? drawer.member = true : ''"><i class="el-icon-menu cursorP"></i></div>
    </div>

    <div class="a-table-box" v-if="tableData.length > 0">
      <el-table :data="tableData" style="width: 100%" empty-text="Null">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column :label="$t('label').coinType" width="180">
          <template slot-scope="scope">
            <div class="flex-sc">
              <div class="coinImg flex-c" v-if="$$.setDollar($$.cutERC20(scope.row.Cointype).coinType)">
                <img :src="$$.setDollar($$.cutERC20(scope.row.Cointype).coinType).logo">
              </div>
              <div class="coinTxt flex-c" v-else>
                {{$$.titleCase($$.cutERC20(scope.row.Cointype).coinType)}}
              </div>
              <span style="margin-left: 10px">{{ $$.cutERC20(scope.row.Cointype).coinType }}</span>
              <i v-if="$$.cutERC20(scope.row.Cointype).type" class="isErc20">ERC20</i>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('label').address">
          <template slot-scope="scope">
            <div class="WW100 ellipsis cursorP" :title="scope.row.DcrmAddr" @click="copyTxt(scope.row.DcrmAddr)">{{ scope.row.DcrmAddr }}</div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('label').balance" width="120" align="right">
          <template slot-scope="scope">
            {{ isNaN(scope.row.Balance) ? 0 : $$.fromWei(scope.row.Balance, $$.cutERC20(scope.row.Cointype).coinType)}}
          </template>
        </el-table-column>
        <el-table-column :label="$t('label').action" width="200" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="openReceive(scope.$index, scope.row)">{{$t('btn').enter}}</el-button>
            <el-button size="mini" type="primary" @click="openSendDialog(scope.$index, scope.row)" class="btn-primary">{{$t('btn').out}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="flex-c boxConntent1 color_99" v-if="!gID && !Number(accountType)">{{$t('warn').w_1}}</div>

    <!-- 查看组成员 start -->
    <el-drawer :visible.sync="drawer.member" :destroy-on-close="true" :show-close="false">
      <div slot="title">
        <drawer-logo @close-drawer="drawer.member = false"></drawer-logo>
      </div>
      <div class="d-content-view g-member-list-box">
        <h3 class="h3">{{$t('title').gMember}}</h3>
        <ul class="">
          <li class="item">
            <p class="label flex-sc">
              {{$t('label').admins}} - 1 (<span class="color_green flex-sc font14"><i class="el-icon-user mr-5"></i>{{$t('label').self}}</span>)
            </p>
            {{$$.cutOut(eNode, 14, 20)}}
          </li>
          <li class="item" v-for="(item, index) in gMemberInit" :key="index" :title="item.eNode">
            <p class="label flex-sc">
              {{$t('label').admins}} - {{index + 2}}
              (<span class="color_green flex-bc" v-if="item.status === 1"><i class="el-icon-circle-check mr-5"></i>{{$t('state').on}}</span>
              <span class="color_red flex-bc" v-else><i class="el-icon-circle-close mr-5"></i>{{$t('state').off}}</span>)
            </p>
            {{$$.cutOut(item.eNode, 14, 20)}}
          </li>
        </ul>
      </div>
    </el-drawer>
    <!-- 查看组成员 end -->

    <!-- 节点选择 start -->
    <el-drawer :visible.sync="drawer.select" :destroy-on-close="true" :show-close="false">
      <div slot="title">
        <drawer-logo @close-drawer="drawer.select = false"></drawer-logo>
      </div>
      <div class="d-content-view node-select-box" v-loading="loading.nodeSelect" :element-loading-text="$t('loading').l_1">
        <h3 class="h3">{{$t('title').selectNode}}</h3>
        <div v-if="drawer.select">
          <el-checkbox-group v-model="gMemberSelect" :min="gMode.indexOf('/') > 0 && gMode.split('/')[0] ? Number(gMode.split('/')[0]) : 1" class="">
            <el-checkbox :label="eNode">
              <div class="flex-bc">
                {{$$.cutOut(eNode, 12, 16)}}
                <span class="color_green flex-bc ml-10"><i class="el-icon-user mr-5"></i>{{$t('label').self}}</span>
              </div>
            </el-checkbox>
            <el-checkbox v-for="(item, index) in gMemberInit" :label="item.eNode" :key="index">
              <div class="flex-bc">
                {{$$.cutOut(item.eNode, 12, 16)}}
                <span class="color_green flex-bc ml-10" v-if="item.status === 1"><i class="el-icon-circle-check mr-5"></i>{{$t('state').on}}</span>
                <span class="color_red flex-bc ml-10" v-else><i class="el-icon-circle-close mr-5"></i>{{$t('state').off}}</span>
              </div>
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="node-select-btn">
          <el-button type="primary" @click="toSendTxnsUrl" :disabled="gMemberSelect.length < gMode.split('/')[0]" class="btn mt-30 WW100 HH40 font16 btn-primary">{{$t('btn').confirm}}</el-button>
        </div>
      </div>
    </el-drawer>
    <!-- 节点选择 end -->

    <!-- 发送交易 start -->
    <el-drawer :visible.sync="drawer.send" :destroy-on-close="true" :show-close="false">
      <div slot="title">
        <drawer-logo @close-drawer="drawer.send = false"></drawer-logo>
      </div>
      <send-txns :sendDataObj="sendDataObj" :gID="gID" :gMode="gMode" :gMemberInit="gMemberInit" @closeModal="modalClick"></send-txns>
    </el-drawer>
    <!-- 发送交易 end -->
  </div>
</template>

<style lang="scss">
@import './scss/account';
</style>

<script>
import {computedPub} from '@/assets/js/pages/public'
// import {psMethods} from './js/person'
// import {gMethods} from './js/group'

import sendTxns from '@/pages/txns/index'
export default {
  name: '',
  inject: ['reload'],
  data () {
    return {
      eDialog: {
        send: false,
        // pwd: false,
      },
      loading: {
        account: false,
        nodeSelect: true
      },
      gMemberInit: [],
      gMemberSelect: [],
      dataPage: {},
      rawTx: {},
      sendDataObj: {},
      gID: '',
      pubKey: '',
      gMode: '',
      tableData: [],
      drawer: {
        member: false,
        select: false,
        send: false
      },
      getGroup: [],
    }
  },
  computed: {
    ...computedPub,
  },
  components: {sendTxns},
  mounted () {
    setTimeout(() => {
      this.init()
    }, 50)
  },
  methods: {
    init () {
      if (this.$route.query.publicKey) {
        // console.log(1)
        this.getAccountDataInit()
      } else {
        // console.log(2)
        this.gID = ''
        this.gMode = ''
        this.pubKey = ''
        this.gMemberInit = []
        this.tableData = []
        this.getGroup = []
        this.loading.account = false
      }
    },
    modalClick () {
      this.eDialog.send = false
      this.eDialog.pwd = false
      this.drawer.send = false
      this.gMemberSelect = []
    },
    getAccountDataInit () {
      this.loading.account = true
      this.gID = this.$route.query.gID ? this.$route.query.gID : ''
      this.pubKey = this.$route.query.publicKey ? this.$route.query.publicKey : ''
      this.getAccounts()
      this.getGroupData()
    },
    getGroupData () {
      this.$$.getGroup().then(res => {
        // console.log(res)
        this.getGroup = res.info ? res.info : []
        if (this.$route.query.gID) {
          this.gID = this.$route.query.gID
        }
        // this.gMemberInit = []
        this.getMemberList()
      }).catch(err => {
        console.log(err)
        this.msgError(err.error)
      })
    },
    getMemberList () {
      for (let obj of this.getGroup) {
        if (this.gID === obj.Gid) {
          this.gMode = obj.Mode
          this.setMemberList(obj.Enodes)
          break
        }
      }
    },
    setMemberList (data) {
      let arr = []
      for (let obj of data) {
        if (obj.substr(0, obj.indexOf('@')) === this.eNode.substr(0, this.eNode.indexOf('@'))) continue
        arr.push({
          p1: 'dcrm',
          p2: 'getEnodeStatus',
          p3: [obj]
        })
      }
      this.gMemberSelect.push(this.eNode)
      this.$$.batchRequest(arr).then(res => {
        this.gMemberInit = []
        // console.log(res)
        for (let obj of res) {
          let cbData = JSON.parse(obj), status
          // console.log(cbData)
          if (cbData.Data && cbData.Data.Status && cbData.Data.Status === 'OnLine') {
            status = 'OnLine'
          } else {
            status = 'OffLine'
          }
          this.gMemberInit.push({
            eNode: cbData.Data.Enode,
            status: status === 'OnLine' ? 1 : 0
          })
          if (this.gMode.split('/')[0] === this.gMode.split('/')[1]) {
            this.gMemberSelect.push(cbData.Data.Enode)
          }
        }
        this.loading.nodeSelect = false
      })
    },
    /**
     * 初始获取账号
     */
    getAccounts () {
      if (!this.gID) {
        this.loading.account = false
        return
      }
      // console.log(this.pubKey)
      if (this.pubKey) {
        this.$$.getAccountsBalance(this.pubKey, this.address).then(res => {
          // console.log(res)
          if (res.msg === 'Success') {
            this.tableData = res.info
          }
          this.loading.account = false
        }).catch(err => {
          console.log(err)
          this.msgError(this.$t('warn').w_2)
          this.loading.account = false
        })
      } else {
        this.loading.account = false
      }
    },
    openReceive (index, item) {
      let url = '/account/receive'
      this.toUrl(url, {
        address: item.DcrmAddr,
        coinType: item.Cointype,
        ERC20Coin: item.Cointype,
        gID: this.gID,
        publicKey: this.pubKey
      })
    },
    setTxnsData (item) {
      // console.log(item)
      this.sendDataObj = {
        balance: item.Balance,
        dcrmAddr: item.DcrmAddr,
        coinType: item.Cointype,
        gID: this.gID,
        mode: this.gMode
      }
    },
    openSendDialog (index, item) {
      this.setTxnsData(item)
      if (!Number(this.accountType)) {
        this.gMemberInit = []
        this.gMemberSelect = []
        this.loading.nodeSelect = true
        this.drawer.select = true
        setTimeout(() => {
          this.getMemberList()
        }, 500)
      } else {
        this.toSendTxnsUrl()
      }
    },
    toSendTxnsUrl (obj) {
      this.drawer.select = false
      this.drawer.send = true
    },
  }
}
</script>