import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  // ActivityIndicator
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import React, { useEffect, useState, useRef } from "react";
import stylesForHomeScreen from "../styles/styleForHomeScreen";
import backgroundImage from "../assets/images/backgroundImage.png";
import SearchIcon from "../components/search";
import WindIcon from "../components/windIcon";
import DropletIcon from "../components/dropletIcon";
import SunIcon from "../components/sunIcon";
import CalenderDaysIcon from "../components/calenderDaysIcon";
import axios from "axios";

import rainy from "../assets/images/rainy.png";
import thunderstorm from "../assets/images/thunderstorm.png";
import cloud from "../assets/images/cloud.png";
import sun from "../assets/images/sun.png";
import moderaterain from "../assets/images/moderaterain.png";
import mist from "../assets/images/mist.png";
import partlycloudy from "../assets/images/partlycloudy.png";
import overcast from "../assets/images/overcast.png";

const PLACEHOLDER_TEXT = "Search your location...";

import * as Location from "expo-location";
import { access_token_mapbox, WEATHER_API_KEY } from "@env";

export default function HomeScreen() {
  const [isSearchPressed, setIsSearchPressed] = useState(false);
  const [userLocation, setUserLocation] = useState();
  const [weatherData, setWeatherData] = useState();
  const [forecastData, setForecastData] = useState();
  const [serchedData, setSerchedData] = useState();
  const [valueForTheInput, setValueForTheInput] = useState();
  const [isWeatherDataLoaded, setIsWeatherDataLoaded] = useState(false);
  const [isSeardhDataLoaded, setIsSeardhDataLoaded] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const firstTimeMounted = useRef(false);

  const requestUserPermissionForLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return false;
    }

    return true;
  };

  const fetchUsersCurrentLocation = async () => {
    if (await requestUserPermissionForLocation()) {
      console.log("permission granted");
      const location = await Location.getCurrentPositionAsync({});
      // console.log("langitude"  + location.coords.longitude, "lotitude" + location.coords.latitude)
      return location;
    }
  };


  const getUserReadableAddress = async (longitude, latitude) => {
    console.log("longitude", longitude);
    console.log("latitude", latitude);
    const dataReturnedFromApi = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?types=place&access_token=${access_token_mapbox}`
    );
    console.log(dataReturnedFromApi.data.features[0].place_name);
    return dataReturnedFromApi.data.features[0].place_name;
  };

  const getCurrentWeatherData = async () => {
    setIsWeatherDataLoaded(false);
    // console.log("longitde", longitude, " latitude ", latitude);
    BASE_URL = `http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${userLocation}&days=7`;
    try {
      responseRecievedFromAPI = await axios.get(BASE_URL);

      const {
        current: {
          temp_c: currentTemperature,
          condition: { text: currentWeatherConditionText },
          wind_kph: windSpeed,
        },
        forecast: {
          forecastday: [
            {
              day: {
                daily_chance_of_rain: rainChance,
                // maxtemp_c: maxTemperature,
              },
              astro: { sunrise: sunriseTime },
            },
          ],
        },
      } = responseRecievedFromAPI.data;

      const {
        forecast: {
          forecastday: [
            {
              day: {
                avgtemp_c: averageTempDay1,
                condition: { text: conditionTextDay1 },
              },
            },
            {
              day: {
                avgtemp_c: averageTempDay2,
                condition: { text: conditionTextDay2 },
              },
            },
            {
              day: {
                avgtemp_c: averageTempDay3,
                condition: { text: conditionTextDay3 },
              },
            },
            {
              day: {
                avgtemp_c: averageTempDay4,
                condition: { text: conditionTextDay4 },
              },
            },
            {
              day: {
                avgtemp_c: averageTempDay5,
                condition: { text: conditionTextDay5 },
              },
            },
            {
              day: {
                avgtemp_c: averageTempDay6,
                condition: { text: conditionTextDay6 },
              },
            },
            {
              day: {
                avgtemp_c: averageTempDay7,
                condition: { text: conditionTextDay7 },
              },
            },
          ],
        },
      } = responseRecievedFromAPI.data;

      // console.log(`conditionTextDay${1}`)

      const arrayForForecastData = [
        {
          weatherCondition: conditionTextDay1,
          averageTemperature: averageTempDay1,
        },
        {
          weatherCondition: conditionTextDay2,
          averageTemperature: averageTempDay2,
        },
        {
          weatherCondition: conditionTextDay3,
          averageTemperature: averageTempDay3,
        },
        {
          weatherCondition: conditionTextDay4,
          averageTemperature: averageTempDay4,
        },
        {
          weatherCondition: conditionTextDay5,
          averageTemperature: averageTempDay5,
        },
        {
          weatherCondition: conditionTextDay6,
          averageTemperature: averageTempDay6,
        },
        {
          weatherCondition: conditionTextDay7,
          averageTemperature: averageTempDay7,
        },
      ];

      setForecastData(arrayForForecastData);
      setWeatherData({
        currentTemperature,
        currentWeatherConditionText,
        windSpeed,
        rainChance,
        sunriseTime,
      });

      setIsWeatherDataLoaded(true);
      // console.log("responseRecievedFromAPI", responseRecievedFromAPI.error);
    } catch (error) {
      console.error(error.response.data.error.code);
    }
  };

  useEffect(() => {
    const fetchLocation = async () => {
      // await fetchUsersCurrentLocation();
      if (firstTimeMounted.current == false) {
        const location = await fetchUsersCurrentLocation();
        const userReadableAdress = await getUserReadableAddress(
          location.coords.longitude,
          location.coords.latitude
        );
        //  console.log(userReadableAdress);
        setUserLocation(userReadableAdress);
        firstTimeMounted.current = true;
      } else {
        console.log("has been executed");
      }
    };

    fetchLocation();
  }, []);

  // useEffect to be executed when the location is changed
  useEffect(() => {
    getCurrentWeatherData();
  }, [userLocation]);

  const handleSearchByLocation = async (value) => {
    setIsSeardhDataLoaded(false);
    setValueForTheInput(value);
    console.log("value", value);
    console.log("search executed");
    if (value != "") {
      console.log("inside if");
      BASE_URL = `http://api.weatherapi.com/v1/search.json?key=${WEATHER_API_KEY}&q=${value}`;
      dataObtainedFromApi = await axios.get(BASE_URL);
      setSerchedData(dataObtainedFromApi.data);
      setIsSeardhDataLoaded(true);
      console.log("dataObtainedFromApi", dataObtainedFromApi.data);
    } else {
      setSerchedData("");
    }
  };

  const onPressOfSearch = () => {
    setIsSearchPressed((isSearchPressed) => !isSearchPressed);
  };

  const weatherIcons = {
    Overcast: overcast,
    Sunny: sun,
    "Partly Cloudy": partlycloudy,
    "Partly cloudy": partlycloudy,
    Cloudy: cloud,
    Mist: mist,
    "Moderate Rain": moderaterain,
    Thunderstorm: thunderstorm,
    "Patchy Rain": rainy,
    "Patchy rain nearby": rainy,
    "Light Rain": rainy,
    "Heavy Rain": rainy,
    // Add more mappings as needed
  };

  const renderItem = ({ item }) => {
    // console.log(item.weatherCondition);

    return (
      <View style={stylesForHomeScreen.viewForFlatLsit}>
        <Image
          source={weatherIcons[item.weatherCondition.trim()]}
          resizeMode="contain"
          style={{ height: 70, width: 70 }}
        />
        <Text style={stylesForHomeScreen.textColorOfWeatherCondition}>
          {item.weatherCondition}
        </Text>
        <View style={stylesForHomeScreen.viewForCurrentTemperatureText}>
          <Text style={stylesForHomeScreen.textForForecast}>
            {item.averageTemperature}
          </Text>
          <Text style={stylesForHomeScreen.superTextForDegreeInForecast}>o</Text>
        </View>
      </View>
    );
  };

  const locationOnSearchOptionsPressed = (name) => {
    // console.log(name);
    // Keyboard.dismiss();
    setValueForTheInput(name);
    setUserLocation(name);
    setSerchedData("");
  };

  const renderItemForSearch = ({ item }) => {
    const formatedName = `${item.name}, ${item.region}, ${item.country} `;
    console.log("executed");
    return (
      <TouchableOpacity
        onPress={() => {
          locationOnSearchOptionsPressed(formatedName);
        }}
        style={{
          backgroundColor: "white",
          borderBottomColor: "lightgrey",
          borderBottomWidth: 3,
          width: "100%",
          padding: "3%",
          borderRadius: 12,
        }}
      >
        <Text style={{ fontSize: 16 }}>{formatedName}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {!isWeatherDataLoaded ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Image
            blurRadius={60}
            source={backgroundImage}
            style={stylesForHomeScreen.backgroundImage}
          />
          <ActivityIndicator size="50" color="white" />
        </View>
      ) : (
        <View style={stylesForHomeScreen.container}>
          <Image
            blurRadius={60}
            source={backgroundImage}
            style={stylesForHomeScreen.backgroundImage}
          />
          <View style={stylesForHomeScreen.viewWrappingTextInputAndIcon}>
            <View style={stylesForHomeScreen.viewAroundTextInput}>
              <TextInput
                style={[
                  isSearchPressed
                    ? stylesForHomeScreen.textInputForVisible
                    : stylesForHomeScreen.textInputForInVisible,
                ]}
                onFocus={() => {
                  setIsInputFocused(true);
                }}
                textAlign="left"
                value={valueForTheInput}
                placeholder={PLACEHOLDER_TEXT}
                onChangeText={(text) => {
                  handleSearchByLocation(text);
                }}
              />
              {!isSeardhDataLoaded &
              isInputFocused &
              (valueForTheInput != "") ? (
                <View
                  style={{
                    height: 100,
                    backgroundColor: "white",
                    position: "absolute",
                    top: "110%",
                    width: "85%",
                    zIndex: 100,
                    borderRadius: 12,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ActivityIndicator size="25" color="yellow" />
                </View>
              ) : (
                <FlatList
                  data={serchedData}
                  style={stylesForHomeScreen.flashListForSearch}
                  renderItem={renderItemForSearch}
                  // contentContainerStyle={{'position': 'absolute', zIndex: 20}}
                  contentContainerStyle={{
                    gap: 5,
                    backgroundColor: "white",
                    borderRadius: 12,
                  }}
                />
              )}
              <Pressable
                android_ripple={stylesForHomeScreen.android_ripple}
                onPress={onPressOfSearch}
                style={{ padding: "2%", borderRadius: 20 }}
              >
                <SearchIcon stroke={"white"} strokeWidth={3} />
              </Pressable>
            </View>
            {/* current location */}
          </View>
          <View style={stylesForHomeScreen.viewForLocationText}>
            <Text style={stylesForHomeScreen.currentLocationText}>
              <Text style={stylesForHomeScreen.firsPartOfLocationText}>
                {userLocation !== null ? userLocation.split(",")[0] + ", " : ""}
              </Text>
              <Text style={stylesForHomeScreen.secondPartOfLocationText}>
                {userLocation !== null ? userLocation.split(",")[1] : ""}
              </Text>
            </Text>
          </View>
          {/* current weather icon */}
          <View style={stylesForHomeScreen.viewForWeatherIcon}>
            <Image
              source={
                weatherIcons[
                  weatherData != null
                    ? weatherData.currentWeatherConditionText
                    : ""
                ]
              }
              resizeMode="contain"
              style={stylesForHomeScreen.styleForWeatherIconImage}
            />
          </View>
          {/* current temperature  */}
          <View style={stylesForHomeScreen.viewForCurrentTemperatureText}>
            <Text style={stylesForHomeScreen.textForCurrentTemperatureUnit}>
              {weatherData != null ? weatherData.currentTemperature : ""}
            </Text>
            <Text style={stylesForHomeScreen.superTextForDegree}>o</Text>
          </View>
          {/* current weather condition*/}
          <View>
            <Text style={stylesForHomeScreen.currentWeatherCondition}>
              {weatherData != null
                ? weatherData.currentWeatherConditionText
                : ""}
            </Text>
          </View>
          {/* wind, perception, and sunrise */}
          <View style={stylesForHomeScreen.miscalenousInformation}>
            <View style={stylesForHomeScreen.portionOfTheMiscInformation}>
              <WindIcon stroke={"white"} width={35} height={35} />
              <Text style={stylesForHomeScreen.textForMiscInformation}>
                {weatherData != null ? weatherData.windSpeed + "km" : ""}
              </Text>
            </View>
            <View style={stylesForHomeScreen.portionOfTheMiscInformation}>
              <DropletIcon stroke={"white"} width={35} height={35} />
              <Text style={stylesForHomeScreen.textForMiscInformation}>
                {weatherData != null ? weatherData.rainChance + "%" : ""}
              </Text>
            </View>
            <View style={stylesForHomeScreen.portionOfTheMiscInformation}>
              <SunIcon stroke={"white"} width={35} height={35} />
              <Text style={stylesForHomeScreen.textForMiscInformation}>
                {weatherData != null ? weatherData.sunriseTime : ""}
              </Text>
            </View>
          </View>
          {/* Daily forecast */}
          <View style={stylesForHomeScreen.viewForCalender}>
            <CalenderDaysIcon stroke={"white"} />
            <Text style={stylesForHomeScreen.dailyForecastHeading}>
              Daily Forecast
            </Text>
          </View>

          <FlatList
            contentContainerStyle={{
              marginTop: 10,
              marginBottom: 10,
              gap: 20,
              paddingLeft: "5%",
              paddingRight: "5%",
            }}
            horizontal
            // row={{ flexWrap: 'wrap' }}
            keyExtractor={(item, index) => index.toString()}
            data={forecastData}
            renderItem={renderItem}
            // style={{marginRight: '5%'}}
            // ListFooterComponent={<View style={{width: 120}}/>}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
