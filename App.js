/* eslint-disable react-native/no-inline-styles */
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	useWindowDimensions,
	ScrollView,
	TouchableOpacity,
	TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { DATA } from './utils/data3';
import MathJax from './utils/MathJax3';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import RenderHTML, { defaultSystemFonts, HTMLContentModel, defaultHTMLElementModels } from 'react-native-render-html';
import { useFonts, SpaceMono_400Regular } from '@expo-google-fonts/space-mono';

function FontLoader({ children }){
  const [fontsLoaded] = useFonts({
    'space-mono': SpaceMono_400Regular,
  });
  if (!fontsLoaded) {
    return null;
  }
  return <>{children}</>;
}

const customHTMLELementModels = {
	img: defaultHTMLElementModels.img.extend({
		contentModel: HTMLContentModel.mixed
	})
};

function HeadingDisplay({ heading }) {
	return (
		<Text
			style={styles.heading}
		>
			{heading}
		</Text>
	);
}
function MathJaxDisplay({ html, width }) {
	return (
		<View style={{ width: width * 0.9 }}>
			<MathJax
				// HTML content with MathJax support
				style={{
					opacity: 0.99,
					minHeight: 1,
					width: width * 0.9,
					alignItems: 'center',
					alignSelf: 'center',
				}}
				html={html}
			/>
		</View>
	);
}

console.log(defaultSystemFonts);
const systemFonts = ['space-mono', ...defaultSystemFonts];

function NativeDisplay({ html, width }) {
	return (
		<RenderHTML
			contentWidth={width * 0.9}
			source={{ html: html }}
			systemFonts={systemFonts}
			customHTMLElementModels={customHTMLELementModels}
	        tagsStyles={{
				p: { fontSize: 8 },
				body: { fontSize: 8 },
				img:{alignSelf: 'left'}
			}}
			// tagsStyles={{
			// 	a: {
			// 			color:'#58585A',
			// 			textDecorationLine:'none',
			// 			fontSize:16,
			// 			fontFamily:'Montserrat-Bold',
			// 			lineHeight: 23
			// 	},
			// 	p: 
			// 	{
			// 		lineHeight: 23,
			// 		color:'#58585A',
			// 		fontSize:50,
			// 		marginBottom:16
			// 	},
			// 	img:{
			// 		display: 'none'
			// 	}
			// }} 
		/>
	);
}

export default function App() {
	const { width } = useWindowDimensions();
	const [index, SetIndex] = useState(1);
	const [text, setText] = useState(1);

	return (
		<View
			style={styles.global_view}>
			<ScrollView>
				<Text style={styles.index_view}>
					{index + '  of  ' + DATA.length}
				</Text>
				<Text style={styles.question_id_view}>
					{`${DATA[index - 1].question_id}`}
				</Text>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-evenly',
					}}>
					<TextInput
						style={styles.type_index_view}
						keyboardType="numeric"
						placeholder="Type here Index To View Question"
						onChangeText={inputIndex => setText(parseInt(inputIndex))}
					/>
					<TouchableOpacity
						onPress={() => { SetIndex(Math.max(1, Math.min(DATA.length, text))); }}
						style={{
							backgroundColor: 'white',
							padding: 3,
							alignSelf: 'center',
							borderWidth: 1,
							borderRadius: 6,
						}}>
						<Text style={{ fontSize: 25, color: 'black', textAlign: 'center' }}>
							View
						</Text>
					</TouchableOpacity>
				</View>

				<View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
					<TouchableOpacity
						onPress={() => {
							SetIndex(Math.max(1, index - 1));
						}}>
						<Text style={{ fontSize: 30, color: 'black' }}>Back</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							SetIndex(Math.min(DATA.length, index + 1));
						}}>
						<Text style={{ fontSize: 30, color: 'black' }}>Next</Text>
					</TouchableOpacity>
				</View>
				<View
					style={{
						borderBottomColor: 'black',
						borderBottomWidth: 1,
					}}
				/>
				{
					HeadingDisplay({ heading: 'Legacy:' })
				}
				{
					MathJaxDisplay({
						html: DATA[index - 1].question_old + DATA[index - 1].option1_old + DATA[index - 1].option2_old + DATA[index - 1].option3_old + DATA[index - 1].option4_old + DATA[index - 1].solution_text_old
						, width: width
					})
				}
				{
					HeadingDisplay({ heading: 'Mathpix Output:' })
				}
				{
					MathJaxDisplay({
						html: DATA[index - 1].question_new + DATA[index - 1].option1_new + DATA[index - 1].option2_new + DATA[index - 1].option3_new + DATA[index - 1].option4_new + DATA[index - 1].solution_text_new
						, width: width
					})
				}
				{
					HeadingDisplay({ heading: 'POC-1:' })
				}
				{
					MathJaxDisplay({
						html: DATA[index - 1].question_poc1 + DATA[index - 1].option1_poc1 + DATA[index - 1].option2_poc1 + DATA[index - 1].option3_poc1 + DATA[index - 1].option4_poc1 + DATA[index - 1].solution_text_poc1
						, width: width
					})
				}
				{
					HeadingDisplay({ heading: 'POC-2:' })
				}
				{
					NativeDisplay({

						
						html: "<div style=\"white-space: normal; text-align: center;\">" + DATA[index - 1].question_poc2 + DATA[index - 1].option1_poc2 + DATA[index - 1].option2_poc2 + DATA[index - 1].option3_poc2 + DATA[index - 1].option4_poc2 + DATA[index - 1].solution_text_poc2 + "</div>"
						, width: width
					})
				}


			</ScrollView>
		</View>
	);
}

// const styles = StyleSheet.create({});

const styles = StyleSheet.create({
	// welcome: {
	// 	fontSize: RFValue(24, 580), // second argument is standardScreenHeight(optional),
	// 	textAlign: "center",
	// 	margin: 10,
	// },
	global_view: {
		width: wp('95%'),
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center',
		alignSelf: 'center',
	},
	heading: {
		textAlign: "left",
		color: "#333333", // 	color: 'black',
		marginBottom: 5,
		fontSize: RFPercentage(2), // 	fontSize: 15,
		fontWeight: 'bold',
		marginVertical: 10,
	},
	index_view: {
		fontSize: RFPercentage(1.5),
		color: 'black',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	question_id_view: {
		fontSize: RFPercentage(2),
		color: 'black',
		fontWeight: 'bold',
	},
	type_index_view: {
		height: RFPercentage(5),
		margin: 12,
		borderWidth: 1,
		padding: 10,
	}
});