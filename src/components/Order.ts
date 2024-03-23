import { Form } from './common/Form';
import { IOrderForm } from '../types';
import { IEvents } from './base/events';
import { ensureAllElements } from '../utils/utils';

export class Order extends Form<IOrderForm> {
	protected _orderButton: HTMLButtonElement[];

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._orderButton = ensureAllElements<HTMLButtonElement>(
			'.button_alt',
			container
		);
		this._orderButton.forEach((button) =>
			button.addEventListener('click', () => (this.selected = button.name))
		);
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

	set selected(name: string) {
		this._orderButton.forEach((button) =>
			this.toggleClass(button, 'button_alt-active', button.name === name)
		);
		this.events.emit('payment:change', { name });
	}
}
