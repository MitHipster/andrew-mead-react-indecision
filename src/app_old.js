class IndecisionApp extends React.Component {
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

const Header = props => {
	return (
		<div>
			<h1>{props.title}</h1>
			{props.subtitle && <h2>{props.subtitle}</h2>}
		</div>
	);
};

Header.defaultProps = {
	title: 'Indecision'
};

const Action = props => {
	return (
		<div>
			<button onClick={props.handlePick} disabled={!props.hasOptions}>
				What should I do?
			</button>
		</div>
	);
};

const Options = props => {
	console.log(props.options.length);
	return (
		<div>
			<button onClick={props.handleDeleteOptions}>Remove All</button>
			{!props.options.length && <p>Please add an option to get started.</p>}
			{props.options.map((option, i) => (
				<Option
					key={i}
					optionText={option}
					handleDeleteOption={props.handleDeleteOption}
				/>
			))}
		</div>
	);
};

const Option = props => {
	return (
		<div>
			{props.optionText}
			<button onClick={e => props.handleDeleteOption(props.optionText)}>
				Remove
			</button>
		</div>
	);
};

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
		// Need to setState even if error = undefined in order to overwrite existing error
		this.setState(() => ({ error }));

		if (!error) {
			e.target.elements.option.value = '';
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
