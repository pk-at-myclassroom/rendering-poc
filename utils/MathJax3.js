import React from 'react';
import { View, Dimensions, ScrollView } from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';

const defaultOptions = {
	tex: {
		inlineMath: [
			['$', '$'],
			['\\(', '\\)'],
		],
		displayMath: [
			['$$', '$$'],
			['\\[', '\\]'],
		],
		processEscapes: true,
		packages: ['base', 'ams', 'noerrors', 'noundefined']
	},
	loader: {
		load: ["input/mml", 'output/svg']
	},
	chtml: {
		scale: 1,                      // global scaling factor for all expressions
		minScale: 1,                  // smallest scaling factor to use
		mtextInheritFont: false,       // true to make mtext elements use surrounding font
		merrorInheritFont: false,      // true to make merror text use surrounding font
		mtextFont: '',                 // font to use for mtext, if not inheriting (empty means use MathJax fonts)
		merrorFont: 'serif',           // font to use for merror, if not inheriting (empty means use MathJax fonts)
		unknownFamily: 'serif',        // font to use for character that aren't in MathJax's fonts
		mathmlSpacing: false,          // true for MathML spacing rules, false for TeX rules
		skipAttributes: {},            // RFDa and other attributes NOT to copy to the output
		exFactor: .5,                  // default size of ex in em units
		displayAlign: 'center',        // default for indentalign when set to 'auto'
		displayIndent: '0'             // default for indentshift when set to 'auto'
	},
	svg: {
		scale: 1,                      // global scaling factor for all expressions
		minScale: .5,                  // smallest scaling factor to use
		mtextInheritFont: false,       // true to make mtext elements use surrounding font
		merrorInheritFont: true,       // true to make merror text use surrounding font
		mathmlSpacing: true,          // true for MathML spacing rules, false for TeX rules
		skipAttributes: {},            // RFDa and other attributes NOT to copy to the output
		exFactor: .5,                  // default size of ex in em units
		displayAlign: 'center',        // default for indentalign when set to 'auto'
		displayIndent: '0',            // default for indentshift when set to 'auto'
		fontCache: 'local',            // or 'global' or 'none'
		localID: null,                 // ID to use for local font cache (for single equation processing)
		internalSpeechTitles: true,    // insert <title> tags with speech content
		titleID: 0                     // initial id number to use for aria-labeledby titles
	}
};

class MathJax extends React.Component {
	constructor(props) {
		super(props);
	}

	wrapMathjax(content) {
		const options = JSON.stringify(
			Object.assign({}, defaultOptions, this.props.mathJaxOptions)
		);
		return `
			<!DOCTYPE html>
			<html lang="en-US">
			<head>
				<meta charset="utf-8"/>
				<script>
				MathJax = {
					${options}
				};
				</script>
				<script id="MathJax-script"
					src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/mml-svg.js">
				</script>
			</head>
			<body>
				<div id="formula">
				${content}
				</div>
			</body>
			</html>
		`;
	}
	render() {
		const html = this.wrapMathjax(this.props.html);
		const props = Object.assign({}, this.props, { html: undefined });
		return (
			<View
				style={{
					...props.style,
					overflow: 'hidden'
				}}>
				<AutoHeightWebView
					style={{
						opacity: 0.99,
						minHeight: 1,
						...props.width,
					}}
					customScript={"document.body.style.userSelect = 'none'"}
					customStyle={`
						// * {
						// 	font-family: 'Times New Roman';
						// }
					`}
					source={{
						html: html,
					}}
					scrollEnabled={false}
					javaScriptEnabled
					showsHorizontalScrollIndicator
					{...props}
				/>
			</View>
		);
	}
}

export default MathJax;
