import { Form } from './common/Form';
import { IOrderForm } from '../types';
import { IEvents } from './base/events';
import { ensureElement } from '../utils/utils';

export class Order extends Form<IOrderForm> {
	protected _card: HTMLButtonElement;
	protected _cash: HTMLButtonElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._card = ensureElement<HTMLButtonElement>(
			'button[name="card"]',
			this.container
		);
		this._cash = ensureElement<HTMLButtonElement>(
			'button[name="cash"]',
			this.container
		);
		this._card.classList.add('button_alt-active');

		this._card.addEventListener('click', () => {
			this._card.classList.add('button_alt-active');
			this._cash.classList.remove('button_alt-active');

			events.emit('card:click');
		});

		this._cash.addEventListener('click', () => {
			this._cash.classList.add('button_alt-active');
			this._card.classList.remove('button_alt-active');

			events.emit('cash:click');
		});
	}

	set address(value: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value =
			value;
	}

	set email(value: string) {
		(this.container.elements.namedItem('email') as HTMLInputElement).value =
			value;
	}

	set phone(value: string) {
		(this.container.elements.namedItem('phone') as HTMLInputElement).value =
			value;
	}
}
