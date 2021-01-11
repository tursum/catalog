export default function(store, models) {
	store.commit('addReview', {
		model: models[0],
		review: {
			author: 'Дед Макар',
			date: '08.11.2020',
			text: 'Всем привет, отличная модель',
			responses: [{
				author: 'Семен из второго подъезда',
				date: '09.11.2020',
				text: 'Поддерживаю, че'
			}],
			rate: 5
		}
	});

	store.commit('addReview', {
		model: models[1],
		review: {
			author: 'Миша. Просто Миша',
			date: '12.11.2020',
			text: 'На троечку',
			responses: [],
			rate: 3
		}
	});

	store.commit('addReview', {
		model: models[2],
		review: {
			author: 'Дед Макар',
			date: '05.11.2020',
			text: 'Агонь вообще',
			responses: [],
			rate: 5
		}
	});

	store.commit('addReview', {
		model: models[3],
		review: {
			author: 'Ярослав Мудрый',
			date: '08.11.2020',
			text: 'Строил этим шуриком Десятинную церковь. Вы сейчас видите Десятинную церковь?.',
			responses: [],
			rate: 2
		}
	});

	store.commit('addReview', {
		model: models[4],
		review: {
			author: 'Артем Магнитов',
			date: '08.11.2020',
			text: 'Четыре, потому что комплектация не понравилась',
			responses: [],
			rate: 4
		}
	});

	store.commit('addReview', {
		model: models[4],
		review: {
			author: 'Разработчик каталога',
			date: '08.11.2020',
			text: 'Ставлю 5, чтобы посмотреть, что будет, если есть два отзыва - 4 и 5',
			responses: [],
			rate: 5
		}
	});

	store.commit('addReview', {
		model: models[12],
		review: {
			author: 'Саня',
			date: '07.11.2020',
			text: 'Не очень, а почему не скажу',
			responses: [],
			rate: 2
		}
	});

	store.commit('addReview', {
		model: models[12],
		review: {
			author: 'Натан',
			date: '08.11.2020',
			text: 'Шото барахлит, хотя только купил',
			responses: [{
				author: 'Сергей Сергеевич',
				date: '09.11.2020',
				text: 'Та да'
			}],
			rate: 1
		}
	});

	store.commit('addReview', {
		model: models[12],
		review: {
			author: 'Петр Максимович',
			date: '09.11.2020',
			text: 'Та шо вы рассказываете, дрель - пушка',
			responses: [],
			rate: 5
		}
	});
}