import React from 'react';
import Header from './Header';
import Action from './Action';
import AddOption from './AddOption';
import Options from './Options';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
	state = {
		options: [],
		selectedOption: undefined
	};
	handleDeleteOptions = () => {
		this.setState(() => ({ options: [] }));
	};
	handleDeleteOption = removeOption => {
		this.setState(prevState => ({
			options: prevState.options.filter(option => removeOption !== option)
		}));
	};
	handlePick = () => {
		const randomPick = Math.floor(Math.random() * this.state.options.length);
		this.setState(() => ({ selectedOption: this.state.options[randomPick] }));
	};
	handleAddOption = option => {
		if (!option) {
			return 'Please enter a valid option';
		} else if (this.state.options.indexOf(option) !== -1) {
			return 'This option has already been entered';
		}
		// We avoided using the push method as that would have mutated state
		this.setState(prevState => ({ options: prevState.options.concat(option) }));
	};
	handleClearSelectedOption = () => {
		this.setState(() => ({ selectedOption: undefined }));
	};
	// Is this how you would pass default props using ES6 class properties?
	componentWillReceiveProps(props) {
		this.setState(() => {
			options: props.options;
		});
	}
	componentDidMount() {
		try {
			const json = localStorage.getItem('options');
			const options = JSON.parse(json);

			if (options) {
				this.setState(() => ({ options }));
			}
		} catch (e) {
			// Do nothing and fallback to default empty array
		}
	}
	componentDidUpdate(prevProps, prevState) {
		// Prevent method if options are unchanged. Note: prevProps is first in argument list
		if (prevState.options.length !== this.state.options.length) {
			const json = JSON.stringify(this.state.options);
			localStorage.setItem('options', json);
		}
	}
	render() {
		const subtitle = 'Put your life in the hands of a computer';

		return (
			<div>
				<Header subtitle={subtitle} />
				<div className="container">
					<Action
						hasOptions={this.state.options.length > 0}
						handlePick={this.handlePick}
					/>
					<div className="widget">
						<Options
							options={this.state.options}
							handleDeleteOptions={this.handleDeleteOptions}
							handleDeleteOption={this.handleDeleteOption}
						/>
						<AddOption handleAddOption={this.handleAddOption} />
					</div>
				</div>
				<OptionModal
					selectedOption={this.state.selectedOption}
					handleClearSelectedOption={this.handleClearSelectedOption}
				/>
			</div>
		);
	}
}

IndecisionApp.defaultProps = {
	options: []
};
