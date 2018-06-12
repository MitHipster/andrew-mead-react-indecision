import React from 'react';

export default class AddOption extends React.Component {
	state = {
		error: undefined
	};
	handleAddOption = e => {
		e.preventDefault();

		const option = e.target.elements.option.value.trim();
		const error = this.props.handleAddOption(option);
		// Need to setState even if error = undefined in order to overwrite existing error
		this.setState(() => ({ error }));

		if (!error) {
			e.target.elements.option.value = '';
		}
	};

	render() {
		return (
			<div>
				{this.state.error && <p>{this.state.error}</p>}
				<form onSubmit={this.handleAddOption}>
					<input type="text" name="option" placeholder="Add item here" />
					<button>Add Option</button>
				</form>
			</div>
		);
	}
}
