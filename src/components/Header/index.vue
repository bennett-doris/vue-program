<template>
  <!-- 头部 -->
  <div class="header">
    <!-- 头部第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>唯品会欢迎您！</p>
          <p v-if="!userName">
            <span>请</span>
            <!-- 声明式导航，务必要有to属性 -->
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <p v-else>
            <a>{{ userName }}</a>
            <a class="register" @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="">我的唯品会</a>
          <a href="">企业采购</a>
          <a href="">关注唯品会</a>
          <a href="">合作招商</a>
          <a href="">商家后台</a>
        </div>
      </div>
    </div>
    <!-- 头部第二行 -->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link to="/home" class="logo">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    // 搜索按钮的回调函数，需要向search路由进行跳转
    goSearch() {
      // this.$router.push(
      // 路由传递参数：
      // 第一种：字符串形式
      // "/search/" + this.keyword + "?k=" + this.keyword.toUpperCase()
      // );
      // 第二种：模板字符串
      // this.$router.push(
      //   `/search/${this.keyword}?k=${this.keyword.toUpperCase()}`
      // );
      // 第三种：对象写法
      // this.$router.push({
      //   name: "search",
      //   params: { keyword: this.keyword },
      //   query: { k: this.keyword.toUpperCase() },
      // });
      // 面试题1：路由传递参数（对象写法）path是否可以结合params参数一起使用
      // path的写法不能与params参数一起使用
      // this.$router.push({
      //   path: "/search",
      //   params: { keyword: this.keyword },
      //   query: { k: this.keyword },
      // });

      // 面试题2：如何指定params参数可传可不传
      // 如果路由要求传递params参数，但是没有传递，会导致URL存在问题
      // 如何指定parmas可传可不传，在配置路由的时候，在占位的后面加上一个问号。
      // this.$router.push({
      //   name: "search",
      //   query: { k: this.keyword },
      // });

      // 面试题3：params参数可以传递也可以不传递，如果传递是空船，如何解决
      // 使用underfined解决，params参数可以传递，不传递（空的字符串）
      // this.$router.push({
      //   name: "search",
      //   params: { keyword: "" || undefined },
      //   query: { k: this.keyword },
      // });

      // 面试题4：路由组件能不能传递props数据

      if (this.$route.query) {
        this.$router.push({
          name: "search",
          params: { keyword: this.keyword || undefined },
          query: this.$route.query,
        });
      }
    },
    async logout() {
      try {
        await this.$store.dispatch("userLogout");
        this.$router.push("/home");
      } catch (error) {
        alert(error.message);
      }
    },
  },
  computed: {
    userName() {
      return this.$store.state.user.userInfo.name || "";
    },
  },
  mounted() {
    // 通过全局事件总线清除搜索关键字
    this.$bus.$on("clearKeyword", () => {
      this.keyword = "";
    });
  },
};
</script>

<style scoped lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
