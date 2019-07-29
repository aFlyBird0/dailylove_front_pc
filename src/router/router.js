import Vue from 'vue';
import Router from 'vue-router';
import show from '@/views/show.vue';
import add from '@/views/add.vue';
import login from '@/views/login.vue';
import register from '@/views/register.vue';
import edit from '@/views/edit.vue';
import couple from '@/views/couple.vue';
import settings from '@/views/settings.vue';

Vue.use(Router)

export default new Router({
    // mode: 'history',
    path: '/dailylove',
    mode: 'hash',
    // base: '/dailylove',
    // base: process.env.BASE_URL,
    // base: process.env.publicPath,
    routes: [{
        path: '/',
        redirect: '/login',
        component: login
    }, {
        path: '/show',
        name: 'show',
        meta: {
            showMenu: true,
            title: "展示"
        },
        component: show
    }, {
        path: "/add",
        name: "add",
        meta: {
            showMenu: true,
            title: "添加"
        },
        component: add
    }, {
        path: "/login",
        name: "login",
        meta: {
            showMenu: false,
            title: "登录"
        },
        component: login
    }, {
        path: "/register",
        name: "register",
        meta: {
            showMenu: false,
            title: "注册"
        },
        component: register
    }, {
        path: "/edit",
        name: "edit",
        meta: {
            showMenu: true,
            title: "修改"
        },
        component: edit
    }, {
        path: "/couple",
        name: "couple",
        meta: {
            showMenu: true,
            title: "配对"
        },
        component: couple
    }, {
        path: "/settings",
        name: "settings",
        meta: {
            showMenu: true,
            title: "设置"
        },
        component: settings
    }]
})