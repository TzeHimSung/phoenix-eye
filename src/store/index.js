/*
 * @Author: JHSeng
 * @Date: 2021-03-10 17:30:54
 * @LastEditTime: 2021-03-10 21:07:22
 * @LastEditors: Please set LastEditors
 * @Description: configuration of Vuex
 * @FilePath: \phoenix-eye\src\store\index.js
 */

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.store({
    state: {
        projectList: [],
        fileSuffixList: []
    },
    getters: {
        projectList: state => projectList,
        fileSuffixList: state => fileSuffixList
    },
    mutations: {
        setProjectList (state, newProjectList) {
            state.projectList = newProjectList
        },

        setFileSuffixList (state, newSuffixList) {
            state.fileSuffixList = newSuffixList
        }
    }
})

export default store