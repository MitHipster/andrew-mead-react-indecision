import React from 'react';
import Modal from 'react-modal';

// Stateless component using an implicit return
const OptionModal = props => (
	<Modal
		isOpen={!!props.selectedOption}
		// Closes modal with the ESC key or when clicking outside of the modal
		onRequestClose={props.handleClearSelectedOption}
		contentLabel="Selected Option"
	>
		<h3>Selected Option</h3>
		{props.selectedOption && <p>{props.selectedOption}</p>}
		<button onClick={props.handleClearSelectedOption}>OK</button>
	</Modal>
);

export default OptionModal;