import React, { Component } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";

export default class SectionListBasics extends Component {
  render() {
    return (
      <View style={styles.body}>
        <ImageBackground source={require("../../../assets/splash.png")} style={styles.body_background}>
          <View style={styles.body_header}></View>
          <View style={styles.body_content}>
            <ScrollView style={styles.library_component}>
              <TouchableOpacity style={styles.image_touchable}>
                <ImageBackground
                  style={styles.library_background}
                  source={require("../../assets/images/004.jpg")}
                  borderRadius={10}
                  resizeMode="cover"
                >
                  <View style={styles.library_shadow}>
                    <Text style={styles.item_text}>CLOTHING</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity style={styles.image_touchable}>
                <ImageBackground
                  style={styles.library_background}
                  source={require("../../assets/images/001.jpg")}
                  borderRadius={10}
                  resizeMode="cover"
                >
                  <View style={styles.library_shadow}>
                    <Text style={styles.item_text}>CLOTHING</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity style={styles.image_touchable}>
                <ImageBackground
                  style={styles.library_background}
                  source={require("../../assets/images/002.jpg")}
                  borderRadius={10}
                  resizeMode="cover"
                >
                  <View style={styles.library_shadow}>
                    <Text style={styles.item_text}>CLOTHING</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity style={styles.image_touchable}>
                <ImageBackground
                  style={styles.library_background}
                  source={require("../../assets/images/003.jpg")}
                  borderRadius={10}
                  resizeMode="cover"
                >
                  <View style={styles.library_shadow}>
                    <Text style={styles.item_text}>CLOTHING</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity style={styles.image_touchable}>
                <ImageBackground
                  style={styles.library_background}
                  source={require("../../assets/images/004.jpg")}
                  borderRadius={10}
                  resizeMode="cover"
                >
                  <View style={styles.library_shadow}>
                    <Text style={styles.item_text}>CLOTHING</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity style={styles.image_touchable}>
                <ImageBackground
                  style={styles.library_background}
                  source={require("../../assets/images/001.jpg")}
                  borderRadius={10}
                  resizeMode="cover"
                >
                  <View style={styles.library_shadow}>
                    <Text style={styles.item_text}>CLOTHING</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity style={styles.image_touchable}>
                <ImageBackground
                  style={styles.library_background}
                  source={require("../../assets/images/002.jpg")}
                  borderRadius={10}
                  resizeMode="cover"
                >
                  <View style={styles.library_shadow}>
                    <Text style={styles.item_text}>CLOTHING</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity style={styles.image_touchable}>
                <ImageBackground
                  style={styles.library_background}
                  source={require("../../assets/images/003.jpg")}
                  borderRadius={10}
                  resizeMode="cover"
                >
                  <View style={styles.library_shadow}>
                    <Text style={styles.item_text}>CLOTHING</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity style={styles.image_touchable}>
                <ImageBackground
                  style={styles.library_background}
                  source={require("../../assets/images/004.jpg")}
                  borderRadius={10}
                  resizeMode="cover"
                >
                  <View style={styles.library_shadow}>
                    <Text style={styles.item_text}>CLOTHING</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity style={styles.image_touchable}>
                <ImageBackground
                  style={styles.library_background}
                  source={require("../../assets/images/001.jpg")}
                  borderRadius={10}
                  resizeMode="cover"
                >
                  <View style={styles.library_shadow}>
                    <Text style={styles.item_text}>CLOTHING</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },

  body_background: {
    flex: 1,
  },

  body_header: {
    flex: 3,
    borderBottomWidth: 1,
    borderBottomColor: "#d2d2d2",
  },

  body_content: {
    flex: 25,
  },

  image_touchable: {
    backgroundColor: "powderblue",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 5,
  },

  library_component: {
    width: "95%",

    marginLeft: "auto",
    marginRight: "auto",
  },

  library_shadow: {
    height: 103,
    backgroundColor: "rgba(52, 52, 52, 0.6)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },

  library_background: {
    borderRadius: 10,
    flex: 1,
  },

  item_text: {
    textAlign: "center",
    color: "#ffffff",
    fontFamily: "TheNautigal-Bold",
    fontWeight: "bold",
  },
});
