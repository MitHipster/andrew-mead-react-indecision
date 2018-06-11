import React from 'react';
import Option from './Option';

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

export default Options;