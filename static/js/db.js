class Category {
	constructor(name, path) {
		this.name = name;
		this.path = path;
		this.extraFilters = [{
			name: 'Дополнительные особенности',
			type: 'checkbox',
			options: [
				{prop: 'regulator', propRu: 'Регулятор оборотов'},
				{prop: 'speeds', propRu: '2 скорости'},
				{prop: 'revols', propRu: 'Поддержка оборотов'},
				{prop: 'patron', propRu: 'Быстрозажимной патрон'},
				{prop: 'patron2', propRu: 'Быстросъемный патрон'},
			]
		}];
	}
}

export const categories = [
	new Category('Шуруповерты', 'shurupoverty'),
	new Category('Дрели', 'dreli')
];

class Param {
	constructor(prop, propRu, value, measure, isImportant) {
		this.prop = prop;
		this.propRu = propRu;
		this.value = value;
		this.measure = measure;
		this.isImportant = isImportant;
	}
}

const makeShurupovertParams = (capacity, moment, reductor, regulator, speeds, revols, patron2, patron) => {
	return [
		new Param('capacity', 'Мощность', capacity, 'Вт', true),
		new Param('moment', 'Крутящий момент', moment, 'Нм', true),
		new Param('reductor', 'Материал редуктора', reductor, '', true),
		new Param('regulator', 'Регулятор оборотов', regulator, '', false),
		new Param('speeds', '2 скорости', speeds, '', false),
		new Param('revols', 'Поддержка оборотов', revols, '', false),
		new Param('patron', 'Быстрозажимной патрон', patron, '', false),
		new Param('patron2', 'Быстросъемный патрон', patron2, '', false)
	];
}

const makeDrelParams = (capacity, speed, regulator, revols) => {
	return [
		new Param('capacity', 'Мощность', capacity, 'Вт', true),
		new Param('speed', 'Скорость вращения', speed, 'об/мин', true),
		new Param('regulator', 'Регулятор оборотов', regulator, '', false),
		new Param('revols', 'Поддержка оборотов', revols, '', false),
	];
}

class Model {
	constructor(name, path, category, vendor, price) {
		this.vendor = vendor;
		this.name = name;
		this.path = path;
		this.category = category;
		this.price = price;
		this.discount = 0;
		this.hasImage = true;
		this.reviews = [];
		this.isInStock = true;
		this.rate = null;
	}
}

class Shurupovert extends Model {
	constructor(name, path, category, vendor, price, params) {
		super(name, path, category, vendor, price);
		this.params = makeShurupovertParams(...params);
	}
}

class Drel extends Model {
	constructor(name, path, category, vendor, price, params) {
		super(name, path, category, vendor, price);
		this.params = makeDrelParams(...params);
	}
}

export const models = [

	/*			Шуруповерты			*/

	new Shurupovert('Шуруповерт GR-10', 'shurupovert-gr10', 'Шуруповерты', 'gr10', 1300, [
		500, 30, 'Алюминий', false, false, false, true, true	
	]),
	new Shurupovert('Шуруповерт GR-20', 'shurupovert-gr20', 'Шуруповерты', 'gr20', 1350, [
		550, 30, 'Сталь', false, false, false, true, false	
	]),
	new Shurupovert('Шуруповерт GR-30', 'shurupovert-gr30', 'Шуруповерты', 'gr30', 1400, [
		600, 30, 'Алюминий', false, false, false, true, false	
	]),
	new Shurupovert('Шуруповерт GR-40', 'shurupovert-gr40', 'Шуруповерты', 'gr40', 1500, [
		650, 30, 'Сталь', true, false, false, true, false	
	]),
	new Shurupovert('Шуруповерт GR-50', 'shurupovert-gr50', 'Шуруповерты', 'gr50', 1550, [
		650, 30, 'Сталь', true, false, false, true, true	
	]),
	new Shurupovert('Шуруповерт GR-60', 'shurupovert-gr60', 'Шуруповерты', 'gr60', 1550, [
		670, 40, 'Алюминий', false, false, false, true, false	
	]),
	new Shurupovert('Шуруповерт GR-70', 'shurupovert-gr70', 'Шуруповерты', 'gr70', 1700, [
		800, 40, 'Алюминий', true, true, false, true, false	
	]),
	new Shurupovert('Шуруповерт GR-80', 'shurupovert-gr80', 'Шуруповерты', 'gr70', 1800, [
		820, 40, 'Алюминий', true, true, false, true, false	
	]),
	new Shurupovert('Шуруповерт GR-90', 'shurupovert-gr90', 'Шуруповерты', 'gr80', 1810, [
		850, 40, 'Магний', true, false, true, true, false	
	]),
	new Shurupovert('Шуруповерт GR-100', 'shurupovert-gr100', 'Шуруповерты', 'gr100', 1850, [
		1000, 50, 'Алюминий', true, true, false, true, false	
	]),
	new Shurupovert('Шуруповерт GR-110', 'shurupovert-gr110', 'Шуруповерты', 'gr110', 1900, [
		1200, 50, 'Алюминий', true, false, true, true, false	
	]),
	new Shurupovert('Шуруповерт GR-120', 'shurupovert-gr120', 'Шуруповерты', 'gr120', 2000, [
		1300, 50, 'Алюминий', true, true, true, true, false	
	]),

	/*			Дрели			*/

	new Drel('Дрель RY-60', 'drel-ry60', 'Дрели', 'ry60', 1700, [
		1300, 50, 'Алюминий', true, true, true, true, false	
	]),
	new Drel('Дрель RY-61', 'drel-ry61', 'Дрели', 'ry61', 1800, [
		1300, 50, 'Алюминий', true, true, true, true, false	
	]),
	new Drel('Дрель RY-62', 'drel-ry62', 'Дрели', 'ry62', 1900, [
		1300, 50, 'Алюминий', true, true, true, true, false	
	]),
	new Drel('Дрель RY-63', 'drel-ry63', 'Дрели', 'ry63', 2000, [
		1300, 50, 'Алюминий', true, true, true, true, false	
	]),
	new Drel('Дрель RY-64', 'drel-ry64', 'Дрели', 'ry64', 2100, [
		1300, 50, 'Алюминий', true, true, true, true, false	
	]),
];

class User {
	constructor(phone, password, name) {
		this.phone = phone;
		this.password = password;
		this.name = name;
		this.favorite = [];
		this.cart = [];
		this.orders = [];
	}
}

export const users = [
	new User('635678609', 'pseudopassword', 'Михаил Тур')
];