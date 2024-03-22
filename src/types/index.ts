export interface IProductItem {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
}

export interface IDeliveryForm {
	payment: string;
	address: string;
}

export interface IContactsForm {
	email: string;
	phone: string;
}

export interface IOrderForm extends IDeliveryForm, IContactsForm {
	total: number;
	items: string[];
}

export interface IOrderResult {
	id: string;
	total: number;
}

export interface IAppState {
	catalog: IProductItem[];
	basket: IProductItem[];
	preview: string | null;
	order: IOrderForm | null;
	loading: boolean;
}

export type FormErrors = Partial<Record<keyof IOrderForm, string>>;
