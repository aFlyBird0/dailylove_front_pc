<template>
  <div>
    <Table
      highlight-row
      ref="currentRowTable"
      :row-class-name="getRowClassName"
      :loading="loading"
      :columns="columns1"
      :data="things"
      @on-current-change="getSelectedRow"
    ></Table>
    <!-- <p v-show="showEditAndDelete">当前选中的为thingId={{currentThingId}}的事件</p> -->
    <Button type="primary" v-show="showEditAndDelete" @click="updateThing">修改</Button>
    <Modal v-model="showDeleteModal" title @on-ok="deleteThing" @on-cancel="cancel">
      <p>确认删除?</p>
    </Modal>
    <!-- <Poptip
      v-show="showEditAndDelete"
      confirm
      title="确认删除吗"
      @on-ok="deleteThing"
      @on-cancel="cancel"
    >-->
    <Button type="error" @click="changeShowDeleteModal" v-show="showEditAndDelete">删除</Button>
    <!-- </Poptip> -->
  </div>
</template>

<script>
import showVue from "../views/show.vue";
import * as dateUtil from "../utils/dateUtil";
export default {
  name: "thing-show",
  props: {
    things: Array
    // sessionId: String
  },
  data() {
    return {
      columns1: [
        // {
        //   title: "ThingId",
        //   key: "thingId"
        // },
        // {
        //   title: "用户id",
        //   key: "userId",
        //   sortable: true
        // },
        // {
        //   title: "用户名",
        //   key: "username",
        //   sortable: true
        // }
        // {
        //   title: "日期",
        //   key: "date"
        // },
        {
          sortable: true,
          title: "开始时间",
          key: "startTime",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color:
                      params.row.userId == this.userIdSelf
                        ? this.fontColorSelf
                        : this.fontColorLove,
                    "font-weight":
                      params.row.thingId == this.currentThingId
                        ? "bold"
                        : "normal" //选中加粗
                    // "background-color": this.bgColorSelf
                  }
                },
                params.row.startTime
              )
            ]);
          }
        },
        {
          title: "结束时间",
          key: "endTime",
          sortable: true,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color:
                      params.row.userId == this.userIdSelf
                        ? this.fontColorSelf
                        : this.fontColorLove,
                    "font-weight":
                      params.row.thingId == this.currentThingId
                        ? "bold"
                        : "normal" //选中加粗
                    // "background-color": this.bgColorSelf
                  }
                },
                params.row.endTime
              )
            ]);
          }
        },
        {
          title: "事件详情",
          key: "detail",
          sortable: true,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color:
                      params.row.userId == this.userIdSelf
                        ? this.fontColorSelf
                        : this.fontColorLove,
                    "font-weight":
                      params.row.thingId == this.currentThingId
                        ? "bold"
                        : "normal" //选中加粗
                    // "background-color": this.bgColorSelf
                  }
                },
                params.row.detail
              )
            ]);
          }
        }
      ],
      currentThing: {},
      currentThingId: "",
      oldCurrentThingId: "",
      userIdSelf: this.globalData.getUserIdSelf(),
      // userIdSelf: this.$cookies.get("userId"),
      sessionId: this.globalData.getSessionId(),
      userIdLove: null,
      // showEditAndDelete: false,
      loading: false,
      // bgColorSelf: localStorage.getItem("bgColorSelf")
      showDeleteModal: false
    };
  },
  computed: {
    showEditAndDelete: function() {
      //只能改自己的，并且只有选中了才显示删除
      return (
        this.currentThing.userId == this.userIdSelf &&
        (this.currentThingId == "" ? false : true)
      );
    },
    tableClass: function() {
      return {
        "background-color": "#5bc2f58c",
        /* background-color: var(--bgColorSelf); */
        color: "#fff"
      };
    },
    bgColorSelf: function() {
      return localStorage.getItem("bgColorSelf")
        ? localStorage.getItem("bgColorSelf")
        : "#6290d162";
    },
    bgColorLove: function() {
      return localStorage.getItem("bgColorLove")
        ? localStorage.getItem("bgColorLove")
        : "#e2868373";
    },
    fontColorSelf: function() {
      return localStorage.getItem("fontColorSelf")
        ? localStorage.getItem("fontColorSelf")
        : "#fff";
    },
    fontColorLove: function() {
      return localStorage.getItem("fontColorLove")
        ? localStorage.getItem("fontColorLove")
        : "#fff";
    }
  },
  methods: {
    getSelectedRow: function(currentRow, oldCurrentRow) {
      console.log("当前选中的事件详情");
      console.log(currentRow);
      this.currentThing = currentRow;
      //两次点击取消选中
      if (oldCurrentRow != null && currentRow == oldCurrentRow) {
        this.$refs.currentRowTable.clearCurrentRow();
        console.log("两次选中同一个事件");
        return;
      }
      this.currentThingId = currentRow.thingId;
      //上一个选取的行可能为空
      if (oldCurrentRow != null) {
        this.oldCurrentThingId = oldCurrentRow.thingId;
      }
      // this.showEditAndDelete = this.currentThingId == "" ? false : true;
      console.log("当前选中的是thingId为" + this.currentThingId + "的事件");
    },
    deleteThing: function() {
      // console.log("删除thingId为" + this.currentThingId + "的事件,正在制作中");
      let this_ = this;
      //先把要删除的id保存下来，避免点了删除但是又点了别的，可是浏览器没跟上手点的速度
      let deletedThingId = this.currentThingId;
      axios
        .post(
          this.serverUrl + "/api/thing/delete",
          {
            thingId: this_.currentThingId,
            userId: this_.userIdSelf
          },
          {
            headers: {
              // Authorization: this_.sessionId,
              // Authorization: this.$cookies.get("sessionId"),
              Authorization: this.globalData.getSessionId(),
              "Access-Control-Allow-Origin": "*"
            }
          }
        )
        .then(result => {
          //成功后把删除的事件id传给父组件，父组件获取后传给撤销删除的组件
          this_.$emit("sendDelete", deletedThingId);
          this_.$Message.success("删除成功");
        });
      // console.log("重新获取数据");
      // this.showEditAndDelete = false;
      //刷新移动到了show的handleDelete中
      // this.$emit("refresh");
    },
    cancel: function() {
      console.log("取消删除");
    },
    //修改事件
    updateThing: function() {
      this.$router.push({
        name: "edit",
        params: { oneThing: this.currentThing }
      });
    },
    //获取表格自定义样式
    getRowClassName: function(row, index) {
      // console.log(row);
      // console.log(index);
      if (row.userId == this.userIdSelf) {
        return "table-self";
      } else {
        return "table-love";
      }
    },
    //显示删除提示框
    changeShowDeleteModal: function() {
      this.showDeleteModal = true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
/deep/ .ivu-table .table-self td {
  background-color: #6290d162;
  /* background-color: var(--bgColorSelf); */
  /* color: #fff; */
}
/deep/ .ivu-table .table-love td {
  background-color: #e2868373;
  /* color: #fff; */
}
/deep/ .ivu-table .table-time-row td {
  width: 25%;
}
</style>
