import _ from 'lodash';

import { Model } from './base/Model';
import { IAppState, IOrderForm, FormErrors, IContactsForm } from '../types';
import { ICard } from './Card';

export type CatalogChangeEvent = {
	catalog: ICard[];
};

export class AppState extends Model<IAppState> {
	basket: ICard[] = [];
	catalog: ICard[];
	loading: boolean;
	order: IOrderForm = {
		payment: '',
		address: '',
		email: '',
		phone: '',
		total: 0,
		items: [],
	};
	preview: string | null;
	formErrors: FormErrors = {};

	addToBasket(item: ICard) {
		if (item.price !== null && this.basket.indexOf(item) === -1) {
			this.basket.push(item);
			this.emitChanges('count:changed', this.basket);
			this.emitChanges('basket:changed', this.basket);
		}
	}

	removeFromBasket(item: ICard) {
		this.basket = this.basket.filter((it) => it != item);
		this.emitChanges('count:changed', this.basket);
		this.emitChanges('basket:changed', this.basket);
	}

	clearBasket() {
		this.basket = [];
		this.emitChanges('count:changed', this.basket);
		this.emitChanges('basket:changed', this.basket);
	}

	getTotal() {
		return this.basket.reduce((total, item) => total + item.price, 0);
	}

	setCatalog(items: ICard[]) {
		this.catalog = items;
		this.emitChanges('items:changed', { catalog: this.catalog });
	}

	setPreview(item: ICard) {
		this.preview = item.id;
		this.emitChanges('preview:changed', item);
	}

	validateDeliveryForm() {
		const errors: typeof this.formErrors = {};

		if (!this.order.email) errors.payment = 'Необходимо указать способ оплаты';
		if (!this.order.phone) errors.address = 'Необходимо указать адрес';

		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);

		return Object.keys(errors).length === 0;
	}

	validateContactForm() {
		const errors: typeof this.formErrors = {};

		if (!this.order.email) errors.email = 'Необходимо указать email';
		if (!this.order.phone) errors.phone = 'Необходимо указать телефон';

		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);

		return Object.keys(errors).length === 0;
	}

	setOrderField(field: keyof IContactsForm, value: string) {
		this.order[field] = value;

		if (this.validateContactForm()) this.events.emit('order:ready', this.order);
	}
}
