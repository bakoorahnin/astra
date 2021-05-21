import PropTypes from "prop-types";
import { __ } from "@wordpress/i18n";
import { useState, useEffect } from "react";

const ButtonPresetsComponent = (props) => {
	const { title, options } = props.control.params;

	let value = props.control.setting.get();

	useEffect(() => {}, []);

	const onChangePreset = (presetKey) => {
		let borderRadius = options[presetKey]["border-radius"];
		let btnBackgroundColor = options[presetKey]["button-bg-color"];
		let btnColor = options[presetKey]["button-color"];
		let borderWidth = options[presetKey]["border-size"];
		let padding = options[presetKey]["button-padding"];
		let borderColor = options[presetKey]["border-color"];

		/// Padding
		props.customizer
			.control("astra-settings[theme-button-padding]")
			.setting.set(padding);

		props.customizer.control("astra-settings[theme-button-padding]").renderContent();

		// Border Radius.
		props.customizer
			.control("astra-settings[button-radius]")
			.setting.set(borderRadius);
		props.customizer.control("astra-settings[button-radius]").renderContent();

		// Border size.
		props.customizer.control( "astra-settings[theme-button-border-group-border-size]" ).setting.set( borderWidth );
		props.customizer.control( "astra-settings[theme-button-border-group-border-size]").renderContent();

		let control = props.customizer.control("astra-settings[button-bg-color]");

		control.setting.set( btnBackgroundColor );

		props.customizer.control("astra-settings[theme-button-bg-color-group]").renderContent();

		props.customizer
			.control("astra-settings[button-color]")
			.setting.set(btnColor);

		props.customizer.control("astra-settings[theme-button-color-group]").renderContent();

		// Border Color
		props.customizer
			.control("astra-settings[theme-button-border-group-border-color]")
			.setting.set(borderColor);

		props.customizer.control("astra-settings[theme-button-border-group-border-color]").renderContent();


	};

	const renderBtnPresetHtml = () => {
		let htmlContent = Object.entries(options).map(([key, value]) => {
			const btnStyle = {
				borderRadius: value["border-radius"],
				backgroundColor: value["button-bg-color"],
				color: value["button-color"],
				paddingTop: value["button-padding"]["desktop"]["top"],
				paddingRight: value["button-padding"]["desktop"]["right"],
				paddingBottom: value["button-padding"]["desktop"]["bottom"],
				paddingLeft: value["button-padding"]["desktop"]["left"],
				borderTopWidth: value['border-size']['top'],
				borderLeftWidth: value['border-size']['left'],
				borderRightWidth: value['border-size']['right'],
				borderBottomWidth: value['border-size']['bottom'],
				borderColor: value['border-color']
			};

			return (
				<div className="ast-btn-style-item">
					<button
						className="btn"
						style={btnStyle}
						type="button"
						onClick={() => onChangePreset(key)}
					>
						Button
					</button>
				</div>
			);
		});

		return htmlContent;
	};

	return (
		<>
			<label>
				<span className="customize-control-title">{title}</span>
			</label>

			<div className="ast-btn-preset-wrap">{renderBtnPresetHtml()}</div>
		</>
	);
};

ButtonPresetsComponent.propTypes = {
	control: PropTypes.object.isRequired,
};

export default React.memo(ButtonPresetsComponent);
