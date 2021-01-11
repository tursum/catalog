<template>
	<footer>
		<div class="container">
			<ul class="footer__advantages">
				<li class="footer__advantage">
					<img src="../assets/images/delivery.svg" alt="бесплатная доставка">
					<span>Бесплатная<br> доставка</span>
				</li>
				<li class="footer__advantage">
					<img src="../assets/images/payment.svg" alt="оплата частями">
					<span>Оплата<br> частями</span>
				</li>
				<li class="footer__advantage">
					<img src="../assets/images/change.svg" alt="14 дней на обмен">
					<span>14 дней<br> на обмен</span>
				</li>
				<li class="footer__advantage">
					<img src="../assets/images/service.svg" alt="сервис №1 в Украине">
					<span>Сервис №1<br> в Украине</span>
				</li>
			</ul>
			<div class="footer__menues">
				<div class="footer__menu footer__menu-about">
					<p class="footer__menu-title">О Brand</p>
					<ul>
						<li><a href @click.prevent="joke('Спасибо, я пешком постою. © Мимино')">Новинки</a></li>
						<li><a href @click.prevent="joke('Что посмеешь, то пожмёшь')">Каталог</a></li>
						<li><a href @click.prevent="joke('Отпускайте идиотов и клоунов из своей жизни. Цирк должен гастролировать. © Фаина Раневская')">Новости</a></li>
						<li><a href @click.prevent="joke('Поцелуй - это еще один приятный способ найти общий язык.')">Акционные наборы</a></li>
					</ul>
				</div>
				<div class="footer__menu footer__menu-help">
					<p class="footer__menu-title">Помощь</p>
					<ul>
						<li><a href @click.prevent="joke('Это не народ? Это хуже народа. Это лучшие люди города. © Убить дракона')">Контакты</a></li>
						<li><a href @click.prevent="joke('В беге трусцой самое важное - не потерять трусцы')">Возврат товара</a></li>
						<li><a href @click.prevent="joke('Тото, у меня такое ощущение, что мы больше не в Канзасе. © Волшебник страны Оз')">Доставка и оплата</a></li>
						<li><a href @click.prevent="joke('А компот? © Операция \'Ы\' и другие приключения Шурика')">Карта сайта</a></li>
						<li><a href @click.prevent="joke('Иногда такую глупость услышишь, а оказывается – точка зрения. © Москва слезам не верит')">Черный список</a></li>
					</ul>
				</div>
				<div class="footer__menu footer__menu-services">
					<p class="footer__menu-title">Сервисы</p>
					<ul>
						<li><a href @click.prevent="joke('А голова предмет тёмный и исследованию не подлежит. © Формула любви')">Сервис</a></li>
						<li><a href @click.prevent="joke('Что за мир? Сколько идиотов вокруг, как весело от них! © Фаина Раневская')">Статус ремонта</a></li>
						<li><a href @click.prevent="joke('Я три дня гналась за вами, чтобы сказать, как вы мне безразличны. © Обыкновенное чудо')">Регистрация инструмента</a></li>
						<li><a href @click.prevent="joke('Будем посмотреть. © Мишка Япончик')">Ремонт из дома</a></li>
					</ul>
				</div>
			</div>
			<div class="footer__contacts">
				<p>Здесь находится блок с контактами. Если вы его не видите, значит, вы просто недостаточно верите в него.</p>
			</div>
		</div>
		<div class="tursum">
			created by tursum
		</div>
	</footer>
</template>

<script>
	export default {
		name: 'Footer',
		methods: {
			joke(text) {
				this.$store.commit('printMessage', text);
			}
		}
	}
</script>

<style>

</style>
