<template>
  <div class="monitor-navigation">
    <bk-navigation
      :header-title="nav.id"
      :side-title="nav.title"
      :default-open="false"
      :navigation-type="'top-bottom'"
      :need-menu=false
      @toggle="handleToggle"
    >
      <template slot="header">
        <div class="monitor-navigation-header">
          <ol class="header-nav">
            <bk-popover
              v-for="(item,index) in header.list"
              :key="item.id"
              theme="light navigation-message"
              :arrow="false"
              offset="0, -5"
              placement="bottom"
              :tippy-options="{ 'hideOnClick': false, flipBehavior: ['bottom'] }"
            >
              <li
                v-show="item.show"
                class="header-nav-item"
                :class="{ 'item-active': index === header.active }"
                @click="changeRouterView(item.name)"
              >
                {{item.name}}
              </li>
              <!-- 如果要做导航按钮二级菜单，反注释下面的代码 -->
              <!-- <template slot="content">
                <ul class="monitor-navigation-nav">
                  <li class="nav-item" v-for="headerNavItem in curHeaderNav.navList" :key="headerNavItem.id">
                    {{headerNavItem.name}}
                  </li>
                </ul>
              </template> -->
            </bk-popover>
          </ol>
          <div style="margin-left: auto;">
            <bk-popover
              theme="light navigation-message"
              :arrow="false"
              offset="-20, 10"
              placement="bottom-start"
              :tippy-options="{ 'hideOnClick': false }"
            >
              <div class="header-user">
                Admin
                <i class="bk-icon icon-down-shape"></i>
              </div>
              <template slot="content">
                <ul class="monitor-navigation-admin">
                  <li
                    class="nav-item"
                    v-for="userItem in user.list"
                    :key="userItem"
                  >
                    {{userItem}}
                  </li>
                </ul>
              </template>
            </bk-popover>
          </div>
        </div>
      </template>
      <div class="monitor-navigation-content">
        <router-view />
      </div>
      <template slot="footer">
        <div class="monitor-navigation-footer">
          Copyright © 2012-{{new Date().getFullYear()}} Author: JHSeng
        </div>
      </template>
    </bk-navigation>
  </div>
</template>

<script>
import { bkNavigation, bkPopover } from 'bk-magic-vue'
export default {
  name: 'monitor-navigation',
  components: {
    bkNavigation,
    bkPopover
  },
  data () {
    return {
      nav: {
        id: '首页',
        toggle: false,
        submenuActive: false,
        title: 'NLP工具箱'
      },
      header: {
        list: [
          {
            name: '首页',
            id: 0,
            show: true,
            url: '/'
          },
          {
            name: '项目管理',
            id: 1,
            show: true,
            url: '/projectManagement',
            // 这里留一个样例
            navList: [
              {
                name: '插件管理',
                id: 1
              }
            ]
          },
          {
            name: '模型进程',
            id: 2,
            show: true,
            url: '/modeltraining'
          },
          {
            name: '运行结果',
            id: 3,
            show: true,
            url: '/modelapp'
          }
        ],
        active: 0
      },
      user: {
        list: [
          '项目管理',
          '权限中心',
          '退出'
        ]
      }
    }
  },
  computed: {
    curHeaderNav () {
      return this.header.list[this.header.active] || {}
    }
  },
  methods: {
    handleSelect (id, item) {
      this.nav.id = id
      console.info(`你选择了${id}`)
    },
    handleToggle (v) {
      this.nav.toggle = v
    },
    changeRouterView (viewName) {
      for (let i = 0; i < this.header.list.length; i++) {
        if (viewName === this.header.list[i].name) {
          this.$router.push(this.header.list[i].url)
          this.header.active = i
          break
        }
      }
    }
  }
}
</script>

<style>
.monitor-navigation-header {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  font-size: 14px;
}
.monitor-navigation-header .header-nav {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 0;
  margin: 0;
}
.monitor-navigation-header .header-nav-item {
  list-style: none;
  height: 50px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-right: 40px;
  color: #96a2b9;
  min-width: 56px;
}
.monitor-navigation-header .header-nav-item.item-active {
  color: #ffffff !important;
}
.monitor-navigation-header .header-nav-item:hover {
  cursor: pointer;
  color: #d3d9e4;
}
.monitor-navigation-header .header-title {
  color: #63656e;
  font-size: 16px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-left: -6px;
}
.monitor-navigation-header .header-title-icon {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 28px;
  height: 28px;
  font-size: 28px;
  color: #3a84ff;
  cursor: pointer;
}
.monitor-navigation-header .header-user {
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  color: #96a2b9;
  margin-left: auto;
  margin-right: 8px;
}
.monitor-navigation-header .header-user .bk-icon {
  margin-left: 5px;
  font-size: 12px;
}
.monitor-navigation-header .header-user:hover {
  cursor: pointer;
  color: #d3d9e4;
}
.monitor-navigation-content {
  min-height: 90%;
  background: #ffffff;
  -webkit-box-shadow: 0px 2px 4px 0px rgba(25, 25, 41, 0.05);
  box-shadow: 0px 2px 4px 0px rgba(25, 25, 41, 0.05);
  border-radius: 2px;
  border: 1px solid rgba(220, 222, 229, 1);
  text-align: center;
  padding: 1%;
}
.monitor-navigation-footer {
  height: 52px;
  width: 100%;
  margin: 32px 0 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  border-top: 1px solid #dcdee5;
  color: #63656e;
  font-size: 12px;
}
.monitor-navigation-nav {
  width: 150px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #e2e2e2;
  -webkit-box-shadow: 0px 3px 4px 0px rgba(64, 112, 203, 0.06);
  box-shadow: 0px 3px 4px 0px rgba(64, 112, 203, 0.06);
  padding: 6px 0;
  margin: 0;
  color: #63656e;
}
.monitor-navigation-nav .nav-item {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 32px;
  flex: 0 0 32px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 0 20px;
  list-style: none;
}
.monitor-navigation-nav .nav-item:hover {
  color: #3a84ff;
  cursor: pointer;
  background-color: #f0f1f5;
}
.monitor-navigation-admin {
  width: 170px #63656e;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #e2e2e2;
  -webkit-box-shadow: 0px 3px 4px 0px rgba(64, 112, 203, 0.06);
  box-shadow: 0px 3px 4px 0px rgba(64, 112, 203, 0.06);
  padding: 6px 0;
  margin: 0;
  color: #63656e;
}
.monitor-navigation-admin .nav-item {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 32px;
  flex: 0 0 32px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 0 20px;
  list-style: none;
}
.monitor-navigation-admin .nav-item:hover {
  color: #3a84ff;
  cursor: pointer;
  background-color: #f0f1f5;
}
.tippy-popper .tippy-tooltip.navigation-message-theme {
  padding: 0;
  border-radius: 0;
  -webkit-box-shadow: none;
  box-shadow: none;
}
</style>
