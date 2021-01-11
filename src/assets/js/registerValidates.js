import {users} from '../../../static/js/db';

export const isPhoneCorrect = phone => {
	return ((phone.length == 9) && !!Number(phone));
}

export const isPhoneAvailable = phone => {
	return !(users.find(user => user.phone === phone));
}