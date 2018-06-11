import React from 'react';
import Header from './Header';
import Action from './Action';
import AddOption from './AddOption';
import Options from './Options';

export default class IndecisionApp extends React.Component {
	constructor(props) {
		super(props);
		this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
		this.handleDeleteOption = this.handleDeleteOption.bind(this);
		this.handlePick = this.handlePick.bind(this);
		this.handleAddOption = this.handleAddOption.bind(this);
		this.state = {
			options: props.options
		};
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
	handleDeleteOptions() {
		this.setState(() => ({ options: [] }));
	}
	handleDeleteOption(removeOption) {
		this.setState(prevState => ({
			options: prevState.options.filter(option => removeOption !== option)
		}));
	}
	handlePick() {
		console.log('Clicked');
		const randomPick = Math.floor(Math.random() * this.state.options.length);
		alert(this.state.options[randomPick]);
	}
	handleAddOption(option) {
		if (!option) {
			return 'Please enter a valid option.';
		} else if (this.state.options.indexOf(option) !== -1) {
			return 'Oops! This option has already been entered.';
		}
		// We avoided using the push method as that would have mutated state
		this.setState(prevState => ({ options: prevState.options.concat(option) }));
	}
	render() {
		const subtitle = 'Put your life in the hands of a computer';

		return (
			<div>
				<Header subtitle={subtitle} />
				<Action
					hasOptions={this.state.options.length > 0}
					handlePick={this.handlePick}
				/>
				<Options
					options={this.state.options}
					handleDeleteOptions={this.handleDeleteOptions}
					handleDeleteOption={this.handleDeleteOption}
				/>
				<AddOption handleAddOption={this.handleAddOption} />
			</div>
		);
	}
}

IndecisionApp.defaultProps = {
	options: []
};