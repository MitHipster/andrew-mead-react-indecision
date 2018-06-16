import React from 'react';
import Option from './Option';

const Options = props => (
	<div>
		<div className="widget-header">
			<h3 className="widget-header__title">Your Options</h3>
			<button
				className="sm-button sm-button--link"
				onClick={props.handleDeleteOptions}
			>
				Remove All
			</button>
		</div>
		{!props.options.length && <p className="widget__message">Please add an option to get started.</p>}
		{props.options.map((option, i) => (
			<Option
				key={i}
				count={i + 1}
				optionText={option}
				handleDeleteOption={props.handleDeleteOption}
			/>
		))}
	</div>
);

export default Options;
