class IndecisionApp extends React.Component {
	constructor(props) {
		super(props);
		this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
		this.handlePick = this.handlePick.bind(this);
		this.handleAddOption = this.handleAddOption.bind(this);
		this.state = {
			options: []
		};
	}
	handleDeleteOptions() {
		this.setState(() => {
			return {
				options: []
			};
		});
	}
	handlePick() {
		console.log('Clicked');
		const randomPick = Math.floor(Math.random() * this.state.options.length);
		alert(this.state.options[randomPick]);
	}
	handleAddOption(option) {
		if (!option) {
			return 'Please enter a valid value.'
		} else if (this.state.options.indexOf(option) !== -1) {
			return 'Oops! This option has already been entered.'
		}
		this.setState((prevState) => {
			// We avoided using the push method as that would have mutated state
			return {
				options: prevState.options.concat(option)
			};
		});
	}
	render() {
		const title = 'Indecision';
		const subtitle = 'Put your life in the hands of a computer';

		return (
			<div>
				<Header title={title} subtitle={subtitle} />
				<Action
					hasOptions={this.state.options.length > 0}
					handlePick={this.handlePick}
				/>
				<Options
					options={this.state.options}
					handleDeleteOptions={this.handleDeleteOptions}
				/>
				<AddOption handleAddOption={this.handleAddOption}/>
			</div>
		);
	}
}

class Header extends React.Component {
	render() {
		return (
			<div>
				<h1>{this.props.title}</h1>
				<h2>{this.props.subtitle}</h2>
			</div>
		);
	}
}

class Action extends React.Component {
	render() {
		return (
			<div>
				<button
					onClick={this.props.handlePick}
					disabled={!this.props.hasOptions}
				>
					What should I do?
				</button>
			</div>
		);
	}
}

class Options extends React.Component {
	render() {
		return (
			<div>
				<button onClick={this.props.handleDeleteOptions}>Remove All</button>
				{this.props.options.map((option, i) => (
					<Option key={i} text={option} />
				))}
			</div>
		);
	}
}

class Option extends React.Component {
	render() {
		return <div>{this.props.text}</div>;
	}
}

class AddOption extends React.Component {
	constructor(props) {
		super(props);
		this.handleAddOption = this.handleAddOption.bind(this);
		this.state = {
			error: undefined
		};
	}
	handleAddOption(e) {
		e.preventDefault();

		const option = e.target.elements.option.value.trim();
		const error = this.props.handleAddOption(option);
		if (!error) {
			e.target.elements.option.value = '';
		} else {
			this.setState (() => {
				return { error };
			});
		}
	}

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

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
