<template>
	<main class="comparison-page">
		<div class="container">
			<ul class="comparison__categories-list" v-if="comparison.length > 0">
				<li
					v-for="(cat, id) in comparison"
					:key="id"
					:class="{active: cat.name == activeCategory.name}"
					@click="changeActiveCategory(cat.name)"
				>{{cat.name}}</li>
			</ul>
			<div id="comparison__tables-wrapper" class="comparison__tables-wrapper" v-if="activeCategory">
				<table class="comparison__actions-table">
					<thead>
						<tr>
							<th>
								<button class="comparison__button-clear" @click="removeComparisonCategory">Очистить список</button>
								<form class="comparison__diffs-form" action="">
									<label for="diffs">Только отличия</label>
									<input type="checkbox" id="diffs" v-model="onlyDiffs">
								</form>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(param, id) in needParams" :key="id">
							<td class="comparison__property">{{param.propRu}}</td>
						</tr>
					</tbody>
				</table>
				<table id="comparison__models-table" class="comparison__models-table">
					<thead>
						<tr>
							<th v-for="(model, id) in activeCategory.models" :key="id">
								<div class="comparison-model">
									<router-link :to="`/${model.path}`">
										<img class="comparison-model__img" :src="getImagePath(model.vendor)" alt="">
										<p class="comparison-model__name">{{model.name}}</p>
									</router-link>
									<div class="model-rate">
										<ul class="model-rate__stars" v-if="model.rate">
											<li v-for="(star, id) in 5"><i class="fa" :class="((id + 1) > model.rate) ? 'fa-star-o' : 'fa-star'"></i></li>
										</ul>
										<div class="model-rate__comments">
											<router-link :to="{name: `/${model.path}`, hash: '#reviews-ancor'}" v-if="model.reviews.length > 0">
												<i class="fa fa-comment-o"></i>
												<span> {{model.reviews.length}} отзывов</span>
											</router-link>
											<span v-else>Отзывов нет</span>
										</div>
									</div>
									<div class="model__price">
										<span class="model__price_current">{{model.price - model.discount}} грн</span>
										<span class="model__price_old" v-if="model.discount">
											<span class="model__price_old-line">{{model.price}} грн</span>
										</span>
									</div>
									<button class="comparison-model__button-remove" @click="removeComparisonModel(model)"><i class="fa fa-close fa-2x"></i></button>
								</div>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(param, id) in needParams" :key="id">
							<td class="comparison__value" v-for="model in activeCategory.models">{{getParamValue(model.params.find(p => p.prop == param.prop).value)}}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div v-else>Сравнение пусто, но вы осваивайтесь там, не стесняйтесь.<br>Чтобы добавить товар в сравнение, можно нажать на иконку весов на мини-карточке товара.<br>Кнопка "Сравнить" на странице товара тоже сработает.</div>
		</div>
	</main>
</template>

<script>
	import getImagePath from '../../assets/js/getImagePath.js';
	import drugComparison from '../../assets/js/drugComparison';

	export default {
		name: 'Comparison',
		data: function() {
			return {
				activeCategory: this.$store.state.comparison[0] || null,
				onlyDiffs: false,
				getImagePath: getImagePath
			}
		},
		computed: {
			comparison() {
				return this.$store.state.comparison;
			},
			needParams() {
				let models = this.activeCategory.models;
				let needParams = [];
				if (this.onlyDiffs && models.length > 1) {
					needParams = models[0].params.filter(param => {
						for (let i = 0; i < models.length; i++) {
							if (models[i].params.find(p => p.prop == param.prop).value != param.value) return true;
						}

						return false;
					});
				} else {
					needParams = models[0].params;
				}

				return needParams;
			}
		},
		mounted() {
			drugComparison();
		},
		methods: {
			changeActiveCategory(category) {
				this.activeCategory = this.$store.state.comparison.find(cat => cat.name == category);
			},
			removeComparisonModel(model) {
				this.$store.commit('removeComparisonModel', model);
				if (!this.$store.state.comparison.find(cat => cat.name == model.name)) {
					this.activeCategory = this.$store.state.comparison[0] || null;
				}
			},
			removeComparisonCategory() {
				this.$store.commit('removeComparisonCategory', this.activeCategory.name);
				this.activeCategory = this.$store.state.comparison[0] || null;
			},
			getParamValue(value) {
				if (typeof value == 'boolean') {
					return value ? 'Есть' : 'Нет';
				} else {
					return value;
				}
			}
		}
	}
</script>

<style>

</style>