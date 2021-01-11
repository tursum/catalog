import Vue from 'vue';
import Router from 'vue-router';

import {categories, models} from '../../static/js/db.js';
import Category from '../components/Category/';
import Model from '../components/Model/';
import Comparison from '../components/Comparison/';
import User from '../components/User/';
import Login from '../components/Login';
import Register from '../components/Register';
import Home from '../components/Home';

import {store} from '../main.js';

const generateCategoriesPaths = () => {
	return categories.map(cat => {
		return {
			path: `/${cat.path}`,
			component: Category,
			props: {cat}
		}
	});
}

const generateModelsPaths = () => {
	return models.map(model => {
		return {
			path: `/${model.path}`,
			component: Model,
			props: {model},
			name: `/${model.path}`
		}
	});
}

const router = new Router({
	mode: 'history',
	base: '/catalog', //нужно поставить здесь "/catalog"
	routes: [
		{
			path: '/',
			component: Home
		},
		{
			path: '/comparison',
			component: Comparison,
			name: 'comparison',
			props: true
		},
		{
			path: '/user*',
			component: User,
			name: 'user',
			beforeEnter: (to, from, next) => {
				if (!store.state.user.name) {
					next({name: 'login'});
				} else {
					next();
				}
			}
		},
		{
			path: '/login',
			component: Login,
			name: 'login',
			beforeEnter: (to, from, next) => {
				if (store.state.user.name) {
					next({name: 'user'});
				} else {
					next();
				}
			}
		},
		{
			path: '/register',
			component: Register,
			name: 'register',
			beforeEnter: (to, from, next) => {
				if (store.state.user.name) {
					next({name: 'user'});
				} else {
					next();
				}
			}
		},
		...generateCategoriesPaths(),
		...generateModelsPaths()
	],
	scrollBehavior (to, from, savedPosition) {
		return {x: 0, y: 0}
	}
});

export default router;