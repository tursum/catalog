<template>
	<main class="category-page">
		<div class="container">
			<h2 class="category-title">{{cat.name}}</h2>
			<div class="category-filters">
				<h4 id="category-filters__title" class="category-filters__title" @click="toggleFilter">Фильтры</h4>
				<form v-if="isFilterOpened" class="category-filters__form" id="category-filters__form" @submit.prevent>
					<fieldset class="filter-capacity">
						<legend>Мощность</legend>
						<ul>
							<li>
								<label for="capacity_for">От</label>
								<input id="capacity_for" type="text" placeholder="Вт" v-model="capacityFilter.from">
							</li>
							<li>
								<label for="capacity_to">До</label>
								<input id="capacity_tor" type="text" placeholder="Вт" v-model="capacityFilter.to">
							</li>
						</ul>
					</fieldset>
					<fieldset class="filter-price">
						<legend>Цена</legend>
						<ul>
							<li>
								<label for="price_for">От</label>
								<input id="price_for" type="text" placeholder="Грн" v-model="priceFilter.from">
							</li>
							<li>
								<label for="price_to">До</label>
								<input id="price_tor" type="text" placeholder="Грн" v-model="priceFilter.to">
							</li>
						</ul>
					</fieldset>
					<fieldset v-for="(filter, id) in cat.extraFilters" :key="id">
						<legend>{{filter.name}}</legend>
						<ul>
							<li v-for="(option, optionID) in filter.options" :key="optionID">
								<label for="option.name">{{option.propRu}}</label>
								<input id="option.name" :type="filter.type" v-model="extraFiltersOptions[option.prop]">
							</li>
						</ul>
					</fieldset>
				</form>
			</div>
			<ul class="category-models">
				<CategoryModel v-for="(model, id) in modelsList" :model="model" :key="id" />
			</ul>
		</div>
	</main>
</template>

<script>
	import CategoryModel from './CategoryModel';
	import {models} from '../../../static/js/db.js';

	export default {
		name: 'Category',
		components: {
			CategoryModel
		},
		props: {
			cat: Object
		},
		data: function() {
			return {
				isFilterOpened: false,
				extraFiltersOptions: {},
				priceFilter: {
					from: null,
					to: null
				},
				capacityFilter: {
					from: null,
					to: null
				}
			}
		},
		computed: {
			modelsList() {
				let categoryModels = models.filter(mod => mod.category === this.cat.name);

				if (this.priceFilter.from) {
					categoryModels = categoryModels.filter(model => {
						return (model.price - model.discount) >= this.priceFilter.from;
					});
				}

				if (this.priceFilter.to) {
					categoryModels = categoryModels.filter(model => {
						return (model.price - model.discount) <= this.priceFilter.to;
					});
				}

				if (this.capacityFilter.from) {
					categoryModels = categoryModels.filter(model => {
						return (model.params.find(param => param.prop == 'capacity').value) >= this.capacityFilter.from;
					});
				}

				if (this.capacityFilter.to) {
					categoryModels = categoryModels.filter(model => {
						return (model.params.find(param => param.prop == 'capacity').value) <= this.capacityFilter.to;
					});
				}

				for (let option in this.extraFiltersOptions) {
					if (!this.extraFiltersOptions[option]) continue;
					categoryModels = categoryModels.filter(model => {
						let currentParam = model.params.find(param => param.prop == option);
						return currentParam.value;
					});
				}

				return categoryModels;
			}
		},
		mounted() {
			this.cat.extraFilters.forEach(f => {
				f.options.forEach(p => {
					this.$set(this.extraFiltersOptions, p.prop, false);
				});
			});
		},
		methods: {
			toggleFilter() {
				this.isFilterOpened = !this.isFilterOpened;
			}
		}
	}
</script>

<style>

</style>