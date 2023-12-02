export default class RadGrad02 extends HTMLElement {
	#active = true;
	#paused = false;
	innerColor = 'rgb(40,40,40)';
	outerColor = 'rgba(250, 250, 250, 0.8)';
	elem;
	static observedAttributes = ['active', 'paused'];

	constructor() {
		super();
		this.attachShadow({mode:'open'});
		this.shadowRoot.innerHTML = `
			<style>
			:host {
				display: flex;
				justify-content: center;
				height: 100%;
				overflow: hidden;
				width: 100%;
				--inner: ${this.innerColor};
				--outer: ${this.outerColor};
			}

			/*****************/
			/**** Outside ****/
			div {
				animation: 16s ease-in-out infinite alternate rotating;
				animation-play-state: running;
				aspect-ratio: 1/1;
				background-image:
					radial-gradient(circle at center, var(--inner), var(--outer) 60%, transparent 61%),
					radial-gradient(circle at center, var(--inner), var(--outer) 60%, transparent 61%),
					radial-gradient(circle at center, var(--inner), var(--outer) 60%, transparent 61%),
					radial-gradient(circle at center, var(--inner), var(--outer) 60%, transparent 61%),
					radial-gradient(circle at center, var(--inner), var(--outer) 60%, transparent 61%),
					radial-gradient(circle at center, var(--inner), var(--outer) 60%, transparent 61%),
					radial-gradient(circle at center, var(--inner), var(--outer) 60%, transparent 61%),
					radial-gradient(circle at center, var(--inner), var(--outer) 60%, transparent 61%);

				background-position:
					top center,
					15% 15%,
					left center,
					15% 85%,
					bottom center,
					85% 85%,
					right center,
					85% 15%;
				background-repeat: no-repeat;
				background-size: 45% 45%;
				display: block;
				object-fit: cover;
				opacity: 0;
				position: relative;
				height: 100%;
				transition: all .5s ease-in-out;
			}

			/*****************/
			/**** Middle ****/
			div::before {
				animation: 18s ease-in-out infinite alternate rotating;
				animation-play-state: running;
				background-image:
						radial-gradient(circle at center, var(--inner), var(--outer) 30%, transparent 31%),
						radial-gradient(circle at center, var(--inner), var(--outer) 30%, transparent 31%),
						radial-gradient(circle at center, var(--inner), var(--outer) 30%, transparent 31%),
						radial-gradient(circle at center, var(--inner), var(--outer) 30%, transparent 31%),
						radial-gradient(circle at center, var(--inner), var(--outer) 30%, transparent 31%),
						radial-gradient(circle at center, var(--inner), var(--outer) 30%, transparent 31%),
						radial-gradient(circle at center, var(--inner), var(--outer) 30%, transparent 31%),
						radial-gradient(circle at center, var(--inner), var(--outer) 30%, transparent 31%);

				background-position:
					top center,
					15% 15%,
					left center,
					15% 85%,
					bottom center,
					85% 85%,
					right center,
					85% 15%;
				background-repeat: no-repeat;
				background-size: 65% 65%;
				content: '';
				left: 0;
				position: absolute;
				height: 100%;
				top: 0;
				width: 100%;
			}

			/*****************/
			/**** Inside ****/
			div::after {
				animation: 20s ease-in-out infinite alternate rotating;
				animation-play-state: running;
				background-image:
					radial-gradient(circle at center, transparent, var(--outer) 15%, transparent 16%),
					radial-gradient(circle at center, var(--inner), var(--outer) 15%, transparent 16%),
					radial-gradient(circle at center, var(--inner), var(--outer) 15%, transparent 16%),
					radial-gradient(circle at center, var(--inner), var(--outer) 15%, transparent 16%),
					radial-gradient(circle at center, var(--inner), var(--outer) 15%, transparent 16%),
					radial-gradient(circle at center, var(--inner), var(--outer) 15%, transparent 16%),
					radial-gradient(circle at center, var(--inner), var(--outer) 15%, transparent 16%),
					radial-gradient(circle at center, var(--inner), var(--outer) 15%, transparent 16%);

				background-position:
					top center,
					15% 15%,
					left center,
					15% 85%,
					bottom center,
					85% 85%,
					right center,
					85% 15%;
				background-repeat: no-repeat;
				background-size: 81% 81%;
				content: '';
				height: 100%;
				left: 0;
				position: absolute;
				top: 0;
				width: 100%;
				z-index: 2;
			}

			@keyframes rotating {
				100% { transform: rotate(1440deg); }
			}

			div.active {
				opacity: 1;
			}

			div.paused {
				animation-play-state: paused;
			}

			div.paused::before {
				animation-play-state: paused;
			}

			div.paused::after {
				animation-play-state: paused;
			}

			@keyframes rotating {
				100% { transform: rotate(1440deg); }
			}

			@keyframes move {
				to {
					margin-top: -50px;
				}
			}

			</style>
			<div> </div>
		`;

		this.elem = this.shadowRoot.querySelector('div');
	}

	attributeChangedCallback(attr, oldval, newval) {
		this[attr] = newval;
	}

	connectedCallback() {
		if (!this.hasAttribute('active')) this.active = this.active;
	}

	get active() { return this.#active; }
	set active (value) {
		switch (value) {
		case null:
		case 'false':
			value = false;
			this.elem.classList.remove('active');
			break;
		default:
			value = true;
			this.elem.classList.add('active');
		}

		this.#active = value;
	}

	get paused () { return this.#paused; }
	set paused (value) {
		switch (value) {
		case null:
		case 'false':
			value = false;
			this.elem.classList.remove('paused');
			break;
		default:
			value = true;
			this.elem.classList.add('paused');
		}
		this.#paused = value;
	}
}

document.addEventListener('DOMContentLoaded', customElements.define('rad-grad02', RadGrad02));
