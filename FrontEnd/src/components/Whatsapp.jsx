import '../css/Home.css';

export const Whatsapp = () => {
	return (
		<div>
			<a
				href='https://api.whatsapp.com/send?phone=+543814581382&text=Hola!%20Quiero%20consultar%20por%20servicios%20de%20asesoramiento%20legal.%20'
				className='float bg-[#25d366] text-white text-center text-3xl border-1 rounded-full'
				target='_blank'>
				<i className='fa fa-whatsapp mt-[16px]'></i>
			</a>
		</div>
	);
};
