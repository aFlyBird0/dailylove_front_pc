<template>
  <div>
    <Table
      highlight-row
      ref="currentRowTable"
      :loading="loading"
      :row-class-name="getRowClassName"
      :columns="columns1"
      :data="things"
      @on-current-change="getSelectedRow"
    ></Table>
    <!-- <p v-show="showEditAndDelete">当前选中的为thingId={{currentThingId}}的事件</p> -->
    <Button type="primary" v-show="showEditAndDelete" @click="updateThing">修改</Button>
    <Poptip
      v-show="showEditAndDelete"
      confirm
      title="确认删除吗"
      @on-ok="deleteThing"
      @on-cancel="cancel"
    >
      <Button type="error">删除</Button>
    </Poptip>
  </div>
</template>

<script>
import showVue from "../views/show.vue";
import * as dateUtile from "../utils/dateUtil";
export default {
  name: "thing-show",
  props: {
    things: Array,
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
        //   key: "userId"
        // },
        // {
        //   title: "日期",
        //   key: "date"
        // },
        {
          title: "开始时间",
          key: "startTime"
        },
        {
          title: "结束时间",
          key: "endTime"
        },
        {
          title: "事件详情",
          key: "detail"
        }
      ],
      currentThing: {},
      currentThingId: "",
      oldCurrentThingId: "",
      userIdSelf: 1, //自己的id /todo
      userIdLove: null,
      // showEditAndDelete: false,
      loading: false
    };
  },
  computed: {
    showEditAndDelete: function() {
      //只能改自己的，并且只有选中了才显示删除
      return (
        this.currentThing.userId == this.userIdSelf &&
        (this.currentThingId == "" ? false : true)
      );
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
      axios
        .post(
          this.serverUrl + "/api/thing/delete",
          {
            thingId: this_.currentThingId,
            userId: this_.userIdSelf
          },
          { headers: { Authorization: this_.sessionId } }
        )
        .then(result => {
          this_.$Message.success("删除成功");
        });
      // console.log("重新获取数据");
      // this.showEditAndDelete = false;
      this.$emit("refresh");
    },
    cancel: function() {
      console.log("取消删除");
    },
    updateThing: function() {
      this.$router.push({
        name: "edit",
        params: { oneThing: this.currentThing, sessionId: this.sessionId }
      });
    },
    getRowClassName: function(row, index) {
      // console.log(row);
      // console.log(index);
      if (index % 2 === 1) {
        return "demo-table-info-row-blue";
      } else {
        return "demo-table-info-row-pink";
      }
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
.ivu-table .demo-table-info-row-blue td {
  background-color: #5bc2f58c;
  color: #fff;
}
.ivu-table .demo-table-info-row-pink td {
  background-color: #eb97c19f;
  color: #fff;
}
</style>
