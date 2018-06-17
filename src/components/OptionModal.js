import React from 'react';
import Modal from 'react-modal';

// Stateless component using an implicit return
const OptionModal = props => (
	<Modal
		isOpen={!!props.selectedOption}
		// Closes modal with the ESC key or when clicking outside of the modal
		onRequestClose={props.handleClearSelectedOption}
		contentLabel="Selected Option"
		closeTimeoutMS={200}
		className="modal"
	>
		<h3 className="modal__title">Selected Option</h3>
		{props.selectedOption && <p className="modal__body">{props.selectedOption}</p>}
		<button className="sm-button" onClick={props.handleClearSelectedOption}>OK</button>
	</Modal>
);

export default OptionModal;