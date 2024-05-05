import { useEffect } from 'react';

export const Count = () => {
	useEffect(() => {
		function startCountAnimation(targetId, endValue) {
			let current = 0;
			let interval;

			// Función que incrementa el valor
			function updateValue() {
				current += increment;
				if (current >= endValue) {
					current = endValue;
					clearInterval(interval);
				}
				target.textContent = '+' + current.toLocaleString();
			}

			const target = document.getElementById(targetId);
			const increment = Math.ceil(endValue / 100); // Divide el valor final por 100 para obtener un incremento gradual

			// Función para verificar si el elemento está en el viewport
			function isInViewport(element) {
				const rect = element.getBoundingClientRect();
				return (
					rect.top >= 0 &&
					rect.left >= 0 &&
					rect.bottom <=
						(window.innerHeight ||
							document.documentElement.clientHeight) &&
					rect.right <=
						(window.innerWidth || document.documentElement.clientWidth)
				);
			}

			// Función para reiniciar la animación cuando el elemento está en el viewport
			function restartAnimation() {
				if (isInViewport(target)) {
					current = 0; // Reinicia el valor actual
					clearInterval(interval); // Limpia el intervalo anterior
					interval = setInterval(updateValue, 40); // Inicia la animación nuevamente
				}
			}

			// Agrega un listener para el evento scroll
			window.addEventListener('scroll', restartAnimation);
			restartAnimation(); // Llama a la función al inicio para verificar si el elemento está en el viewport
		}

		startCountAnimation('promo1-value', 750);
		startCountAnimation('promo3-value', 70);
		startCountAnimation('promo4-value', 900);
		// Función para agregar animación cuando los elementos entran en el viewport
		function animateOnScroll() {
			const elements = document.querySelectorAll('.animate-on-scroll');

			function isInViewport(element) {
				const rect = element.getBoundingClientRect();
				return (
					rect.top >= 0 &&
					rect.left >= 0 &&
					rect.bottom <=
						(window.innerHeight ||
							document.documentElement.clientHeight) &&
					rect.right <=
						(window.innerWidth || document.documentElement.clientWidth)
				);
			}
			elements.forEach((element) => {
				if (isInViewport(element)) {
					// Si el elemento está en el viewport, agrega la clase de animación correspondiente
					if (element.classList.contains('animate-from-bottom')) {
						element.classList.add('animated-slide-from-bottom');
					}
				} else {
					// Si el elemento no está en el viewport, elimina la clase de animación
					element.classList.remove('animated-slide-from-bottom');
				}
			});
		}
		window.addEventListener('scroll', animateOnScroll);
		animateOnScroll();
	}, []);

	return (
		<>
			<div className='rounded-t-lg pt-2 mt-10 text-[#25b0f0] bg-[#185574] font-semibold flex flex-row w-full items-center justify-around text-3xl '>
				<p
					id='promo1-value'
					className='bg-gradient-to-t from-primary to-blue-200 text-transparent bg-clip-text font-bold'>
					+0
				</p>
				<p
					id='promo3-value'
					className='bg-gradient-to-t from-primary to-blue-200 text-transparent bg-clip-text font-bold'>
					+0
				</p>
				<p
					id='promo4-value'
					className='bg-gradient-to-t from-primary to-blue-200 text-transparent bg-clip-text font-bold'>
					+0
				</p>
			</div>
			<div className='rounded-b-lg py-3 text-white bg-[#185574] font-semibold flex flex-row w-full items-center justify-around text-xl'>
				<p className='w-4/12 text-center'>Casos de exito</p>
				<p className='w-4/12 text-center'>Años de trayectoria</p>
				<p className='w-4/12 text-center'>Clientes</p>
			</div>
		</>
	);
};
