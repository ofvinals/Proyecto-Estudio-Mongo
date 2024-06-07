/* eslint-disable react/prop-types */
import { Modal } from 'react-bootstrap';

const Modals = ({
	isOpen,
	onClose,
	title,
	children,

}) => {
	return (
		<Modal show={isOpen} onHide={onClose}>
			<Modal.Header closeButton>
				<Modal.Title className='text-background font-bold'>
					{title}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>{children}</Modal.Body>
			{/* <Modal.Footer>
        {showSaveButton && (
          <Button variant="primary" onClick={onSave}>
            Guardar Cambios
          </Button>
        )}
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
      </Modal.Footer> */}
		</Modal>
	);
};

export default Modals;
