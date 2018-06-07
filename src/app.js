class IndecisionApp extends React.Component {
	render() {
		const title = 'Indecision';
		const subtitle = 'Put your life in the hands of a computer';
		const options = ['Thing one', 'Thing two', 'Thing four'];

		return (
			<div>
				<Header title={title} subtitle={subtitle} />
				<Action />
				<Options options={options} />
				<AddOption />
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
	handlePick() {
		alert('Handle Pick');
	}

	render() {
		return (
			<div>
				<button onClick={this.handlePick}>What should I do?</button>
			</div>
		);
	}
}

class Options extends React.Component {
	handleRemoveAll() {
		alert('Remove All');
	}

	render() {
		return (
			<div>
				<button onClick={this.handleRemoveAll}>Remove All</button>
				{this.props.options.map((option, i) => <Option key={i} text={option} />)}
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
	handleAddOption(e) {
		e.preventDefault();

		const option = e.target.elements.option.value.trim();

		if (option) {
			alert(option);
		}
	} 

	render() {
		return (
			<div>
				<form onSubmit={this.handleAddOption}>
					<input type="text" name="option" placeholder="Add item here"/>
					<button>Add Option</button>
				</form>
			</div>
		);
	}
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
