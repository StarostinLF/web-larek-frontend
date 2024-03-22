import { IProductItem, IOrderForm, IOrderResult } from '../types';
import { Api, ApiListResponse } from './base/api';

export interface ILarekAPI {
	getProductItem: () => Promise<IProductItem[]>;
	order: (order: IOrderForm) => Promise<IOrderResult>;
}

export class LarekAPI extends Api implements ILarekAPI {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);

		this.cdn = cdn;
	}

	getProductItem(): Promise<IProductItem[]> {
		return this.get('/product').then((data: ApiListResponse<IProductItem>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	order(order: IOrderForm): Promise<IOrderResult> {
		return this.post('/order', order).then((data: IOrderResult) => data);
	}
}
