<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <!-- 利用事件委派+编程式导航实现路由跳转 -->
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="category in categoryList.slice(0, 16)"
                :key="category.categoryId"
                :class="{ cur: currentIndex == category.categoryId }"
              >
                <h3 @mouseenter="changeIndex(category.categoryId)">
                  <a
                    :data-categoryName="category.categoryName"
                    :data-category1Id="category.categoryId"
                    >{{ category.categoryName }}</a
                  >
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{
                    display:
                      currentIndex == category.categoryId ? 'block' : 'none',
                  }"
                >
                  <div
                    class="subitem"
                    v-for="categoryChildList in category.categoryChild"
                    :key="categoryChildList.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="categoryChildList.categoryName"
                          :data-category2Id="categoryChildList.categoryId"
                          >{{ categoryChildList.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="category in categoryChildList.categoryChild"
                          :key="category.categoryId"
                        >
                          <a
                            :data-categoryName="category.categoryName"
                            :data-category3Id="category.categoryId"
                            >{{ category.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 引入方式：是把lodash全部功能函数引入,最好使用按需加载
// import _ from "lodash";
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      // 存储用户鼠标移动到哪一个一级分类
      currentIndex: -1,
      show: true,
    };
  },
  // 组件挂载完毕：可以向服务器发送请求
  mounted() {
    // 当组件挂载完毕，让show属性变为false
    // 如果不是Home路由组件，将typeNav隐藏
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      // 对象写法，右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
      // 会注入一个参数state，其实即为大仓库中的数据
      categoryList: (state) => state.home.categoryList,
    }),
  },
  methods: {
    // 鼠标进入修改响应式数据currentIndex属性
    // changeIndex(index) {
    //   // 鼠标移动到某一个一级元素的索引值
    //   this.currentIndex = index;
    // },
    // throttle 函数别用箭头函数，可能会出现上下文this的问题
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    // 进行路由跳转的方法
    goSearch(event) {
      // 最好的解决方案：编程式导航+事件委派
      // 利用事件的委派存在一些问题： 无法判断点击的是否为a标签  如何获取参数【产品分类的名字】

      // 把子节点中a标签，加上自定义属性 :data-categoryName='category.categoryName'，其余子节点没有
      // this.$router.push("/search");
      let element = event.target;
      // 获取到当前触发这个事件的节点。
      // 节点有一个dataset属性，可以获取节点的自定义属性和值
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      // 如果标签身上有categoryName一定是a标签
      if (categoryname) {
        // 整理路由跳转的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        // 一级分类，二级分类，三级分类区分
        if (category1id) {
          // 一级分类
          query.category1Id = category1id;
        } else if (category2id) {
          // 二级分类
          query.category2Id = category2id;
        } else {
          // 三级分类
          query.category3Id = category3id;
        }
        // 整理完参数
        location.query = query;
        // 判断：如果路由跳转的时候，带有params参数，也要传递过去
        if (this.$route.params) {
          location.params = this.$route.params;
          // 路由跳转
          this.$router.push(location);
        }
      }
    },
    // 当鼠标移入时显示商品列表
    enterShow() {
      if (this.$route.path != "/home") {
        this.show = true;
      }
    },
    // 当鼠标移出时显示商品列表，鼠标移开时修改索引值,且消除背景色
    leaveShow() {
      this.currentIndex = -1;
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            // display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        // .item:hover {
        //   background: skyblue;
        // }
        .cur {
          background-color: skyblue;
        }
      }
    }

    // 过渡动画的样式
    // 进入的开始
    .sort-enter {
      height: 0px;
    }
    // 过渡动画结束状态（进入）
    .sort-enter-to {
      height: 461px;
    }
    // 定义动画时间，速率
    .sort-enter-active {
      transition: all 0.5s;
    }
  }
}
</style>
