import { StyleSheet } from "react-native";

const stylesForHomeScreen = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    // padding: '5%'
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: -2,
  },
  textInputForVisible: {
    width: "85%",
    // borderColor: 'black',
    // borderWidth: 5,
    // backgroundColor: "black",
    borderRadius: 12,
    // marginTop: "5%",
    backgroundColor: "#D3D3D3",
    opacity: 1,
    // padding: '1%',
    paddingVertical: "2%",
    paddingLeft: "5%",
    paddingHorizontal: "5%",
  },
  textInputForInVisible: {
    opacity: 0,
    paddingVertical: "2%",
    paddingHorizontal: "5%",
    paddingLeft: "5%",
    width: "85%",
    borderRadius: 12,
  },
  viewAroundTextInput: {
    flexDirection: "row",
    // width: '1000%',
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: "5%",
    // backgroundColor: '#D3D3D3',
    borderRadius: 12,
  },
  viewWrappingTextInputAndIcon: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "2%",
  },
  android_ripple: { color: "lightgray", radius: 20 },
  currentLocationText: {
    color: "white",
    textAlign: "center",
  },
  firsPartOfLocationText: {
    fontSize: 26,
  },
  secondPartOfLocationText: {
    fontSize: 18,
  },
  viewForLocationText: {
    marginTop: "5%",
    marginBottom: '-5%'
  },
  viewForWeatherIcon: {
    // borderWidth: 5,
    // marginTop: "10%",
    // height: "45%",
    marginTop: '8%',
    marginBottom: '-6%',
    height: '35%',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  styleForWeatherIconImage: { width: "70%", height: "70%" },
  textForCurrentTemperatureUnit: {
    fontSize: 52,
    color: "white",
    textAlign: "center",
    // width: '100%'
  },
  textForForecast: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  superTextForDegreeInForecast: {
    color: "white",
  },
  superTextForDegree: {
    fontSize: 18, // Smaller font size for the superscript
    // position: 'relative',
    // top: -25, // Move the degree symbol upwards
    // backgroundColor: 'black'
    color: "white",
    textAlign: "center",
    // width: '100%'
  },
  viewForCurrentTemperatureText: {
    flexDirection: "row",
    justifyContent: "center",
    // backgroundColor: "black",
  },
  currentWeatherCondition: {
    fontSize: 22,
    color: "white",
    textAlign: "center",
    marginLeft: '-3%'
  },
  miscalenousInformation: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: '5%'
  },
  portionOfTheMiscInformation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  textForMiscInformation: {
    color: 'white',
    fontSize: 18
  },
  dailyForecastHeading: {
    color: 'white',
    fontSize: 20
  },
  viewForCalender: {
    marginTop: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '50%',
    paddingLeft: '7%'
  },
  textColorOfWeatherCondition: {
    color: 'white',
    fontSize: 18
  },
  viewForFlatLsit: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '5%',
    // paddingBottom: '5%',
    // height: '150%',
    // paddingVertical: '10%',
    paddingHorizontal: 25,
    // marginLeft: '5%',
    // marginLeft: '10%',
    backgroundColor:'rgba(223, 231, 245, 0.3)',
    borderRadius: 12
    // width: '100%'
  },
  flashListForSearch: {
    position: 'absolute',
    top: '110%',
    width: '85%',
    zIndex: 100

  }
});

export default stylesForHomeScreen;
