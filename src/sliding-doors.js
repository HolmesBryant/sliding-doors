/**
 * @class SlidingDoors
 * @extends HTMLElement
 * @description A custom element that renders a sliding doors effect
 * Changes appearance dynamically based on attributes.
 *
 * @example
 * ```html
 * <sliding-doors active speed="1s" theme="dark"></sliding-doors>
 *
 *  @author Holmes Bryant <https://github.com/HolmesBryant>
 *  @license GPL-3.0
*/
export class SlidingDoors extends HTMLElement {
	/**
	 * @private
	 * @type {boolean}
	 */
	#active = false;

	/**
	 * @private
	 * @type {string}
	 */
	#speed = '.5s';

	/**
	 * @private
	 * @type {string}
	 */
	#theme = 'auto';

	/**
	 * @public
	 * @type {HTMLElement}
	 * @description Container element for internal components.
	 */
	container;

	/**
	 * @public
	 * @type {object}
	 * @description Predefined themes for the component.
	 */
	themes = {
		default: {
			tintOuter: 'dimgray',
			tintMiddle: 'lightgray 40%',
			tintInner: 'white 90%'
		},
		light: {
			tintOuter: 'rgb(220,220,220)',
			tintMiddle: 'rgb(250,250,250) 40%',
			tintInner: 'white 90%'
		},
		dark: {
			tintOuter: 'rgb(40,40,40)',
			tintMiddle: 'rgb(70,70,70) 40%',
			tintInner: 'dimgray 90%'
		},
		auto: {}
	};

	/**
	 * @public
	 * @type {HTMLElement}
	 * @description Wrapper element for the sliding doors effect.
	 */
	wrapper;

	/**
	 * @static
	 * @type {string[]}
	 * @description List of observed attributes for the component.
	 */
	static observedAttributes = ['active', 'speed', 'theme'];

	/**
	 * @constructor
	 */
	constructor() {
		super();
		this.attachShadow({mode:'open'});
		this.shadowRoot.innerHTML = `
			<style>
				:host {
					--speed: ${this.speed};
					--tintOuter: ${this.themes.default.tintOuter};
					--tintMiddle: ${this.themes.default.tintMiddle};
					--tintInner: ${this.themes.default.tintInner};

					border-radius: inherit;
					display: inline-block;
					overflow: hidden;
					transition: all .5s;
					height: 100%;
				}

				::slotted(*) {
					height: 100%;
					overflow: auto;
				}

				@keyframes close {
					100% { z-index: 1; }
				}

				@keyframes open {
					100% { z-index: -1 }
				}

				#container {
					height: 100%;
					position: relative;
				}

				#container::before,
				#container::after {
					border-width: 1px;
					border-style: solid;
					border-color: silver;
					content: '';
					position: absolute;
					bottom: 0;
					top: 0;
					z-index: 1;
				}

				#container.shadow::before,
				#container.shadow::after {
					box-shadow: 5px 5px 10px rgb(40,40,40);
				}

				#container.shadow::before {
					border-width: 1px 0 1px 1px;
				}

				#container.shadow::after {
					border-width: 1px 1px 1px 0;
				}

				#container::before {
					background-color: var(--tintOuter);
					background-image: linear-gradient(
						to right,
						var(--tintOuter),
						var(--tintMiddle),
						var(--tintInner)
					);
					border-width: 0;
					left: 0;
					right: 100%;
					transition: right var(--speed) ease-in;
				}

				#container::after {
					background-image: linear-gradient(
						to left,
						var(--tintOuter),
						var(--tintMiddle),
						var(--tintInner)
					);
					border-width: 0;
					left: 100%;
					right: 0;
					transition: left var(--speed) ease-in;
				}

				#effectLeft,
				#effectRight {
					aspect-ratio: 1/1;
					display: flex;
					flex-direction: column;
					justify-content: center;
					content: '';
					position: absolute;
					top: 50%;
					transition: all var(--speed) ease-in;
					z-index: 1;
				}

				#effectLeft {
					left: 0;
					right: 100%;
					transform: translateY(-50%) translateX(50%);
					-webkit-mask-image: linear-gradient( to right, white 50%, transparent 51% );
					mask-image: linear-gradient( to right, white 50%, transparent 51% );
				}

				#effectRight {
					left: 100%;
					right: 0;
					transform: translateY(-50%) translateX(-50%);
					-webkit-mask-image: linear-gradient( to left, white 50%, transparent 50% );
					mask-image: linear-gradient( to left, white 50%, transparent 50% );
				}

				#wrapper {
					height: 100%;
					position: relative;
				}

				#wrapper.active #effectLeft,
				#wrapper.active #container::before {
					right: 50%;
				}

				#wrapper.active #effectRight,
				#wrapper.active #container::after {
					left: 50%;
				}

				#scrollable {
					height: inherit;
					scrollbar-gutter: stable both-edges;
				}
			</style>

			<div id="wrapper" part="wrapper">
				<div id="container" part="container">
					<div id="scrollable">
						<slot></slot>
					</div>
				</div>
				<div id="effectLeft"><slot name="effectLeft"></slot></div>
				<div id="effectRight"><slot name="effectRight"></slot></div>
			</div>
		`;

		this.wrapper = this.shadowRoot.querySelector('#wrapper');
		this.container = this.shadowRoot.querySelector('#container');
	}

	/**
	 * @callback attributeChangedCallback
	 * @param {string} attr - The attribute name that changed.
	 * @param {string} oldval - The old value of the attribute.
	 * @param {string} newval - The new value of the attribute.
	 * @description Called when an observed attribute is changed.
	 */
	attributeChangedCallback(attr, oldval, newval) {
		this[attr] = newval;
	}

	/**
	 * @callback connectedCallback
	 * @description Called when the component is inserted into the DOM.
	 *
	 * - Sets up the sliding doors effect.
	 * - Handles initial visibility and transitions based on the `active` state.
	 * - Adds event listeners to manage shadow classes during transitions.
	 */
	connectedCallback() {
		const elem = this.querySelector( '*[slot=effect]' );
		this.setEffect( elem );

		if (this.active) this.container.classList.add( 'shadow' );

		this.container.addEventListener( 'transitionstart', () => {
			if( this.active ) this.container.classList.add( 'shadow' );
		});

		this.container.addEventListener( 'transitionend', () => {
			if( !this.active ) this.container.classList.remove( 'shadow' );
		});
	}

	/**
	 * @private
	 * @param {HTMLElement} elem - The element to apply the effect to.
	 * @description Sets up the visual effect for the sliding doors by cloning the provided element
	 * and positioning the clones as left and right halves.
	 *
	 * @test
		const elem = document.createElement('span');
		const tagname = elem.localName;
		self.setEffect( elem );
		return self.querySelectorAll( tagname ).length; // 2
	 */
	setEffect(elem) {
		if (!elem) return;
		const clone = elem.cloneNode(true);
		elem.setAttribute('slot', 'effectLeft');
		clone.setAttribute('slot', 'effectRight');
		this.append(clone);
	}

	get active () { return this.#active; }

	/**
	 * @setter
	 * @param {boolean} value - The new value for the active property.
	 * @description Sets the active state of the sliding doors.
	 *
	 * - Accepts empty string, "true", or falsey values for `value`.
	 * - Toggles the `active` class on the wrapper element to control the visual state.
	 *
	 * @test self.active = false; return self.active; // false
	 * @test self.active = true; return self.active; // true
	 * @test self.active = 'foo'; return self.active; // true
	 * @test self.setAttribute('active', 'false'); return self.active; // false
	 * @test self.setAttribute( 'active', 'true' ); return self.active; // true
	 */
	set active (value) {
		switch (value) {
		case 'false':
		case null:
		case false:
			value = false;
			this.wrapper.classList.remove('active');
			break;
		default:
			value = true;
			this.wrapper.classList.add('active');
			break;
		}

		this.#active = value;
	}

	get speed () { return this.#speed; }

	/**
	 * @setter
	 * @param {string|number} value - The new value for the speed property.
	 * @description Sets the transition speed for the sliding doors effect.
	 *
	 * - Accepts a number (interpreted as seconds) or a string representing a CSS duration.
	 * - If a number is provided, automatically appends "s" for seconds.
	 * - Updates the internal #speed property and sets the `--speed` CSS variable.
	 *
	 * @test self.speed = 5; return self.style.getPropertyValue( '--speed' ) // '5s'
	 * @test self.speed = '50ms'; return self.style.getPropertyValue( '--speed' ) // '50ms'
	 * @test self.setAttribute('speed', '50ms'); return self.style.getPropertyValue( '--speed' ) // '50ms'
	 */
	set speed (value) {
		// if value is just a number, add 's' for 'seconds';
		if (!isNaN (value)) value = value + 's';
		this.#speed = value;
		this.style.setProperty('--speed', value);
	}

	get theme () { return this.#theme; }

	/**
	 * @setter
	 * @param {string} value - The new value for the theme property.
	 * @description Sets the theme for the sliding doors component.
	 *
	 * - Valid values are "auto", "light", and "dark".
	 * - If "auto" is specified, automatically determines the theme based on user's system preference.
	 * - Updates internal theme state and applies theme-specific colors for tinting effects.
	 * - Sets corresponding CSS variables for visual adjustments.
	 * @test self.theme = 'lightg'; return self.tintInner; // 'white 90%'
	 */
	set theme (value) {
		switch (value) {
		case 'auto':
			if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
				value = 'dark';
			} else {
				value = 'light';
			}
			break;
		case 'light':
		case 'dark':
			break;
		default:
			value = 'default';
			break;
		}

		this.#theme = value;
		const theme = this.themes[value];
		if (theme) {
			this.tintOuter = theme.tintOuter;
			this.tintMiddle = theme.tintMiddle;
			this.tintInner = theme.tintInner;
			this.style.setProperty('--tintOuter', theme.tintOuter);
			this.style.setProperty('--tintMiddle', theme.tintMiddle);
			this.style.setProperty('--tintInner', theme.tintInner);
		}
	}
}

document.addEventListener('DOMContentLoaded', () => {
	if (!customElements.get('sliding-doors')) {
		customElements.define('sliding-doors', SlidingDoors)
	}
});
