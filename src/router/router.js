import Vue from 'vue';
import Router from 'vue-router';
import show from '@/views/show.vue';
import add from '@/views/add.vue';
import login from '@/views/login.vue';
import register from '@/views/register.vue';
import edit from '@/views/edit.vue'
import couple from '@/views/couple.vue';

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
        component: show
    }, {
        path: "/add",
        name: "add",
        component: add
    }, {
        path: "/login",
        name: "login",
        component: login
    }, {
        path: "/register",
        name: "register",
        component: register
    }, {
        path: "/edit",
        name: "edit",
        component: edit
    }, {
        path: "/couple",
        name: "couple",
        component: couple
    }]
})