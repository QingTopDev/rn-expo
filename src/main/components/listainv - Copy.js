import React, { Component } from "react";
import {
  Platform,
  Text,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Animated,
  ImageBackground,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  Container,
  Header,
  Body,
  Right,
  Left,
  Title,
  Toast,
  Button,
  View,
} from "native-base";
import { CheckBox, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Sharing from "expo-sharing";
import Spinner from "react-native-loading-spinner-overlay";
import { getSetting, setSetting } from "../../../storage/settingsStorage";
import { Root } from "native-base";
import * as FileSystem from "expo-file-system";
import Modal from "react-native-modal";
import { Linking } from "react-native";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import { ScrollView } from "react-native-gesture-handler";

const GLOBALS = require("../../main/globals");

const tipojoya_list = [
  { value: "", label: "--TODOS--" },
  { value: "10", label: "ANILLO" },
  { value: "12", label: "COLGANTE" },
  { value: "13", label: "ARETES" },
  { value: "14", label: "CADENA" },
  { value: "16", label: "JUEGO" },
  { value: "17", label: "PULSERA" },
  { value: "19", label: "AROS" },
  { value: "22", label: "ORTOPEDICOS" },
  { value: "27", label: "COLLAR" },
  { value: "28", label: "3D SOLITARIO" },
  { value: "29", label: "3D AROS" },
  { value: "30", label: "3D PERSONALIZADO" },
];

const metal_list = [
  { value: "", label: "--ORO COLOR--" },
  { value: "9", label: "ORO AMARILLO" },
  { value: "10", label: "ORO BLANCO" },
  { value: "11", label: "ORO ROJO" },
  { value: "15", label: "PLATINO" },
  { value: "21", label: "DOS OROS" },
  { value: "22", label: "TRES OROS" },
];

const gema_list = [
  { value: "", label: "--GEMA--" },
  { value: "D", label: "DIAMANTE" },
  { value: "R", label: "RUBI" },
  { value: "E", label: "ESMERALDA" },
  { value: "S", label: "SAFIRO" },
  { value: "PL", label: "PERLA" },
];

class Listinv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tipojoya: tipojoya_list[1],
      metal: metal_list[1],
      gema: gema_list[1],
      codigo: "",
      preciod: "",
      precioh: "",
      gestureName: "",
      pageIndex: 0,
      pageCount: 0,
      width: new Animated.Value(0),
      param_tipojoya: " ",
      param_metal: " ",
      param_gema: " ",
      param_codigo: " ",
      param_preciod: " ",
      param_precioh: " ",
      todos: false,
      meta: false,
      gem: false,
      categories: [],
    };
    this.offset = 0;
  }

  state = {
    spinner: false,
    isMultiple: false,
    isModalVisible: false,
    joyacodigo: "",
    joyanombre: "",
    joyaprecio: "",
    joyagemas: "",
    joyaFoto: "",
    joyaVideo: "",
    clientecodigo: "",
  };

  onSelectTodos(item) {
    this.setState({ tipojoya: item, todos: false });
    console.log(this.state.tipojoya);
  }
  onSelectMetal(item) {
    this.setState({ metal: item, meta: false });
    console.log(this.state.metal);
  }
  onSelectGema(item) {
    this.setState({ gema: item, gem: false });
    console.log(this.state.gema);
  }

  renderTipojoya() {
    return (
      <View style={styles.dialog}>
        <View style={[styles.dialogMain, { height: 600 }]}>
          <View style={styles.dialogHeader}>
            <Text style={{ color: "#FFF", fontSize: 20, fontWeight: "bold" }}>
              {"Tipo de Joya"}
            </Text>
          </View>
          <View style={{ width: "90%", marginTop: 20 }}>
            {console.log(tipojoya_list)}
            {tipojoya_list.map((item, key) => {
              console.log(item);
              return (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => this.onSelectTodos(item)}
                >
                  <Text>{item.label}</Text>
                  <Icon
                    name="check"
                    type="antdesign"
                    size={20}
                    color={
                      item.value == this.state.tipojoya.value ? "#999" : "#EEE"
                    }
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    );
  }

  renderMetal() {
    return (
      <View style={styles.dialog}>
        <View style={[styles.dialogMain, { height: 370 }]}>
          <View style={styles.dialogHeader}>
            <Text style={{ color: "#FFF", fontSize: 20, fontWeight: "bold" }}>
              {"Metal"}
            </Text>
          </View>
          <View style={{ width: "90%", marginTop: 20 }}>
            {metal_list.map((item, key) => {
              return (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => this.onSelectMetal(item)}
                >
                  <Text>{item.label}</Text>
                  <Icon
                    name="check"
                    type="antdesign"
                    size={20}
                    color={
                      item.value == this.state.metal.value ? "#999" : "#EEE"
                    }
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    );
  }

  renderGema() {
    return (
      <View style={styles.dialog}>
        <View style={[styles.dialogMain, { height: 330 }]}>
          <View style={styles.dialogHeader}>
            <Text style={{ color: "#FFF", fontSize: 20, fontWeight: "bold" }}>
              {"Gema"}
            </Text>
          </View>
          <View style={{ width: "90%", marginTop: 20 }}>
            {gema_list.map((item, key) => {
              return (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => this.onSelectGema(item)}
                >
                  <Text>{item.label}</Text>
                  <Icon
                    name="check"
                    type="antdesign"
                    size={20}
                    color={
                      item.value == this.state.gema.value ? "#999" : "#EEE"
                    }
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    );
  }

  onSwipeRight(gestureState) {
    Animated.timing(this.state.width, {
      toValue: 400,
      duration: 300,
    }).start();
  }

  onSwipeLeft(gestureState) {
    Animated.timing(this.state.width, {
      toValue: 0,
      duration: 300,
    }).start();
  }

  onSwipe(gestureName, gestureState) {
    const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    this.setState({ gestureName: gestureName });
  }
  async componentDidMount() {
    this.setState({
      spinner: true,
      categories: [],
      selcategories: [],
      viewableItems: [],
      selNumber: 0,
      isVisible: false,
      mobile_no: "593884712317",
      msg: "",
    });
    this.fetchCategories();
  }

  fetchData = async function () {
    var self = this;
    await this.getitem();
    var accessToken = await getSetting(GLOBALS.consts.SETTING_TOKEN);

    fetch(GLOBALS.api.wsInventario_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({
        tipojoyacodigo: "10",
        Metalcodigo: "9",
        Gemacodigo: "D",
        Joyacodigo: " ",
        D_joyaprecio: " ",
        H_joyaprecio: " ",
        Invexi: false ? "S" : "N",
        Invcon: false ? "S" : "N",
      }),
    })
      .then((response) => response.text())
      .then((responseJson) => {
        setTimeout(async function () {
          self.setState({
            spinner: false,
          });
        }, 300);

        const responseRes = JSON.parse(responseJson);

        if (responseRes.inventario) {
          if (responseRes.inventario.length) {
            self.setState({
              categories: responseRes.inventario,
            });
            console.log(this.state.categories.length);
          } else {
            Toast.show({
              text: "no_categories_info",
              buttonText: "Close",
            });
          }
        } else {
          Toast.show({
            text: "Token Expired",
            buttonText: "Close",
          });
          setSetting(GLOBALS.consts.SETTING_TOKEN, null)
            .then(() => {
              this.props.navigation.navigate("Inicio");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((error) => {
        console.log(error);
        setTimeout(async function () {
          self.setState({
            spinner: false,
          });
        }, 1000);
        Toast.show({
          text: "unknown_error",
          buttonText: "Close",
        });
      });
  };

  fetchCategories = async function () {
    this.onSwipeLeft();
    var self = this;
    await this.getitem();
    var accessToken = await getSetting(GLOBALS.consts.SETTING_TOKEN);
    fetch(GLOBALS.api.wsInventario_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({
        tipojoyacodigo: this.state.tipojoya.value, // son los parametros
        Metalcodigo: this.state.metal.value,
        Gemacodigo: this.state.gema.value,
        Joyacodigo: this.state.codigo,
        D_joyaprecio: this.state.preciod,
        H_joyaprecio: this.state.precioh,
        Invexi: false ? "S" : "N",
        Invcon: false ? "S" : "N",
      }),
    })
      .then((response) => response.text())
      .then((responseJson) => {
        setTimeout(async function () {
          self.setState({
            spinner: false,
          });
        }, 300);
        const responseRes = JSON.parse(responseJson);
        if (responseRes.inventario) {
          if (responseRes.inventario.length) {
            self.setState({
              categories: responseRes.inventario,
            });
            console.log("categories:", this.state.categories);
          } else {
            Toast.show({
              text: "no_categories_info",
              buttonText: "Close",
            });
          }
        } else {
          Toast.show({
            text: "Token Expired",
            buttonText: "Close",
          });
          setSetting(GLOBALS.consts.SETTING_TOKEN, null)
            .then(() => {
              this.props.navigation.navigate("Inicio");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((error) => {
        console.log(error);
        setTimeout(async function () {
          self.setState({
            spinner: false,
          });
        }, 1000);
        Toast.show({
          text: "unknown_error",
          buttonText: "Close",
        });
      });
  };

  incrementar = () => {
    const tempIndex =
      this.state.pageIndex === this.state.pageCount - 1
        ? this.state.pageCount - 1
        : this.state.pageIndex + 1;
    this.setState(
      {
        viewableItems: this.state.categories,
        pageIndex: tempIndex,
      },
      () => {
        this.offset =
          this.offset === this.state.pageCount - 1
            ? this.state.pageCount - 1
            : this.offset + 1;
      }
    );
  };

  recortar = () => {
    const tempIndex = this.state.pageIndex === 1 ? 1 : this.state.pageIndex - 1;
    this.setState(
      {
        viewableItems: this.state.categories.slice(
          (this.offset - 1) * 6,
          this.offset * 6
        ),
        pageIndex: tempIndex,
      },
      () => {
        this.offset = this.offset === 1 ? 1 : this.offset - 1;
      }
    );
  };
  sendOnWhatsApp = () => {
    console.log("WhatsApp");
    let msg =
      "Cod:" +
      this.state.joyacodigo +
      "  Pvp:" +
      this.state.joyaprecio +
      "  Nombre:" +
      this.state.joyanombre;

    if (msg) {
      let url = "whatsapp://send?text=" + msg;
      Linking.openURL(url)
        .then((data) => {
          console.log("WhatsApp Opened");
        })
        .catch(() => {
          alert("Make sure Whatsapp installed on your device");
        });
    } else {
      alert("Please insert message to send");
    }
  };
  async getitem() {
    this.setState({
      clientecodigo: await getSetting(GLOBALS.consts.CLIENTE_CODIGO),
    });
  }

  onSelectCategory = (codigo, nombre, url) => {
    var ext = url.slice(-3);
    FileSystem.downloadAsync(
      url,
      FileSystem.documentDirectory + codigo + "." + ext
    )
      .then(({ uri }) => {
        Sharing.shareAsync(uri, { dialog: "nombre" });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  openModal = (data) => {
    if (!this.state.isMultiple) {
      console.log("data", data);
      this.setState({
        isModalVisible: true,
        joyacodigo: data.Codigo,
        joyanombre: data.Nombre,
        joyaFoto: data.Foto,
        joyaVideo: data.Video,
        joyaprecio: data.Precio,
      });
      console.log("state", this.state.joyaFoto);
    } else {
      this.selectItem(data);
    }
  };

  toggleModal = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
    });
  };

  closeModal = () => {
    this.setState({
      isModalVisible: false,
    });
  };

  selectItem = (data) => {
    this.setState({ isMultiple: true });
    data.isSelect = !data.isSelect;
    data.selectedClass = data.isSelect ? styles.selected : styles.list;
    const index = this.state.categories.findIndex(
      (item) => data.Codigo === item.Codigo
    );

    this.state.categories[index] = data;
    this.setState({
      categories: this.state.categories,
    });
    this.setState({
      selcategories: this.state.categories.filter(
        (item) => item.isSelect == true
      ),
      selNumber: this.state.categories.filter((item) => item.isSelect == true)
        .length,
    });
  };

  _renderOneCategory = ({ item }) => (
    <TouchableOpacity
      style={[styles.list, item.selectedClass]}
      onPress={() => this.openModal(item)}
      onLongPress={() => this.selectItem(item)}
    >
      <Text style={styles.joya}>
        {item.Precio} {item.Gemas}
      </Text>
      <Image
        source={{ uri: item.Foto }}
        style={{ height: 100, width: 100, flex: 1, borderRadius: 1 }}
      />
    </TouchableOpacity>
  );

  async shareSelected() {
    console.log("selected", this.state.selcategories);
    var ext = "";
    var listFotos = this.state.selcategories.map(async (categorie) => {
      ext = categorie.Foto.slice(-3);
      await FileSystem.downloadAsync(
        categorie.Foto,
        FileSystem.documentDirectory + categorie.Codigo + "." + ext
      )
        .then(({ uri }) => {
          console.log(uri);
          var archivo = FileSystem.readAsStringAsync(uri);
          return archivo;
        })
        .catch((error) => {
          console.error(error);
        });
    });
    console.log("selected", listFotos);
  }

  renderCategories = () => (
    <ScrollView style={{ zIndex: 10 }}>
      <FlatList
        contentContainerStyle={{
          alignItems: "center",
        }}
        numColumns={Platform.isPad == true ? 3 : 2}
        data={this.state.categories}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={styles.itemStyle}
              onPress={() => this.openModal(item)}
              onLongPress={() => this.selectItem(item)}
            >
              <Image
                source={{ uri: item.Foto }}
                style={{ height: 120, width: "90%" }}
                resizeMode="cover"
              />
              <Text style={{ fontSize: 18 }}>{item.Precio}</Text>
              <Text style={{ fontSize: 12 }}>{item.Gemas}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </ScrollView>
  );

  renderFooter() {
    return (
      <View
        style={{
          width: wp("100%"),
          flexDirection: "row",
          justifyContent: "space-between",
          paddingLeft: 20,
          paddingRight: 20,
        }}
      ></View>
    );
  }

  render() {
    const seleccionadas = this.state.selNumber;

    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };

    return (
      <Root>
        <Container>
          <Spinner
            visible={this.state.spinner}
            textContent={""}
            textStyle={styles.spinnerTextStyle}
          />

          <GestureRecognizer
            onSwipe={(direction, state) => this.onSwipe(direction, state)}
            onSwipeLeft={(state) => this.onSwipeLeft(state)}
            onSwipeRight={(state) => this.onSwipeRight(state)}
            config={config}
            style={{
              flex: 1,
            }}
          >
            <Animated.View
              style={[
                {
                  backgroundColor: "#fff",
                  height: "100%",
                  position: "absolute",
                  zIndex: 20,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderTopRightRadius: 20,
                  borderBottomRightRadius: 20,
                },
                { width: this.state.width },
              ]}
            >
              {this.state.todos ? (
                this.renderTipojoya()
              ) : this.state.meta ? (
                this.renderMetal()
              ) : this.state.gem ? (
                this.renderGema()
              ) : (
                <View style={styles.sideBar}>
                  <View style={styles.sideBar_top}>
                    <ImageBackground
                      source={require("../../assets/images/jewelry-6.jpg")}
                      style={{ flex: 1 }}
                    />
                  </View>
                  <View style={styles.sideBar_bottom}>
                    <TouchableOpacity
                      style={[styles.inputView, { marginTop: 50 }]}
                      onPress={() => {
                        this.setState({ todos: true });
                      }}
                    >
                      <Icon
                        name="user"
                        type="ionicon"
                        size={20}
                        color="#777"
                        style={{ marginLeft: 20 }}
                      />
                      <Text
                        style={{
                          marginLeft: 20,
                          color: "#777",
                          fontSize: 20,
                          fontWeight: "bold",
                        }}
                      >
                        {this.state.tipojoya.label}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.inputView}
                      onPress={() => {
                        this.setState({ meta: true });
                      }}
                    >
                      <Icon
                        name="home"
                        type="FontAwesome"
                        size={20}
                        color="#777"
                        style={{ marginLeft: 20 }}
                      />
                      <Text
                        style={{
                          marginLeft: 20,
                          color: "#777",
                          fontSize: 20,
                          fontWeight: "bold",
                        }}
                      >
                        {this.state.metal.label}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.inputView}
                      onPress={() => {
                        this.setState({ gem: true });
                      }}
                    >
                      <Icon
                        name="phone"
                        type="ionicon"
                        size={20}
                        color="#777"
                        style={{ marginLeft: 20 }}
                      />
                      <Text
                        style={{
                          marginLeft: 20,
                          color: "#777",
                          fontSize: 20,
                          fontWeight: "bold",
                        }}
                      >
                        {this.state.gema.label}
                      </Text>
                    </TouchableOpacity>
                    <View style={styles.inputView}>
                      <Input
                        style={styles.input_text}
                        ref={(input) => (this.codigoInput = input)}
                        editable={true}
                        placeholder={"Codigo"}
                        placeholderTextColor={"#ddd"}
                        keyboardType={"numeric"}
                        secureTextEntry={false}
                        blurOnSubmit={false}
                        value={this.state.codigo}
                        onSubmitEditing={() => {
                          this.preciodInput.focus();
                        }}
                        onChangeText={(text) => this.setState({ codigo: text })}
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={{ color: "#777", fontWeight: "bold" }}
                      />
                    </View>
                    <View style={styles.inputView}>
                      <Input
                        style={styles.input_text}
                        ref={(input) => (this.preciodInput = input)}
                        editable={true}
                        placeholder={"Precio Desde"}
                        placeholderTextColor={"#ddd"}
                        keyboardType={"numeric"}
                        secureTextEntry={false}
                        blurOnSubmit={false}
                        value={this.state.preciod}
                        onSubmitEditing={() => {
                          this.preciohInput.focus();
                        }}
                        onChangeText={(text) =>
                          this.setState({ preciod: text })
                        }
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={{ color: "#777", fontWeight: "bold" }}
                      />
                    </View>
                    <View style={styles.inputView}>
                      <Input
                        style={styles.input_text}
                        ref={(input) => (this.preciohInput = input)}
                        editable={true}
                        placeholder={"Precio Hasta"}
                        placeholderTextColor={"#ddd"}
                        keyboardType={"numeric"}
                        secureTextEntry={false}
                        blurOnSubmit={false}
                        value={this.state.precioh}
                        onChangeText={(text) =>
                          this.setState({ precioh: text })
                        }
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={{ color: "#777", fontWeight: "bold" }}
                      />
                    </View>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.fetchCategories()}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <View style={{ marginLeft: 40 }}>
                          <Icon
                            name="filter"
                            type="ionicon"
                            size={20}
                            color="#777"
                          />
                        </View>
                        <View>
                          <Text
                            style={{
                              color: "#777",
                              fontSize: 20,
                              fontWeight: "bold",
                              marginLeft: 20,
                            }}
                          >
                            FILTRAR
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Animated.View>
            <StatusBar translucent backgroundColor="transparent" />
            <Header
              style={{
                backgroundColor: "#fff",
                height: 100,
                justifyContent: "flex-end",
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}
              noShadow
            >
              <Left style={{ flex: 1 }}>
                <Icon
                  name="arrow-left"
                  type="FontAwesome"
                  size={20}
                  color="#555"
                  onPress={() => this.props.navigation.goBack()}
                />
              </Left>
              <Body style={{ flex: 10, alignItems: "center" }}>
                <Title style={styles.title}>INVENTARIO</Title>
              </Body>
              <Right style={{ flex: 1 }}>
                <Icon name="search" size={20} color="#555" />
              </Right>
            </Header>
            {this.renderFooter()}
            {this.renderCategories()}
          </GestureRecognizer>

          <View style={styles.numberBox}>
            <Text style={styles.number}>{seleccionadas}</Text>
          </View>
          <TouchableOpacity style={styles.icon}>
            <View>
              <Icon
                raised
                name="share"
                type="font-awesome"
                color="#e3e3e3"
                size={30}
                onPress={() => this.shareSelected()}
                containerStyle={{ backgroundColor: "#FA7B5F" }}
              />
            </View>
          </TouchableOpacity>
          <Modal
            animationIn="slideInUp"
            animationOut="slideOutDown"
            onBackdropPress={() => this.closeModal()}
            onSwipeComplete={() => this.closeModal()}
            swipeDirection="right"
            isVisible={this.state.isModalVisible}
            style={
              Platform.isPad == true
                ? {
                    marginLeft: wp("20.0%"),
                    justifyContent: "flex-start",
                    backgroundColor: "white",
                    borderRadius: 20,
                    maxWidth: wp("60.0%"),
                    top: 200,
                    maxHeight: hp("50.0%"),
                  }
                : {
                    justifyContent: "flex-start",
                    backgroundColor: "white",
                    borderRadius: 20,
                    maxWidth: wp("90.0%"),
                    top: 50,
                    maxHeight: hp("70.0%"),
                  }
            }
          >
            <View style={styles.dialogHeader}>
              <Text style={{ color: "#FFF", fontSize: 20, fontWeight: "bold" }}>
                {"Detail"}
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  width: "90%",
                  padding: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 20 }}>{this.state.joyacodigo}</Text>
                <Text
                  style={{ color: "#FF0000", fontSize: 20, fontWeight: "bold" }}
                >
                  {this.state.joyaprecio}
                </Text>
              </View>
              <Image
                source={{ uri: this.state.joyaFoto }}
                style={{ marginTop: 10, height: 250, width: 250 }}
              />
              <View
                style={{
                  flexDirection: "row",
                  width: Platform.isPad == true ? wp("50.0%") : wp("90.0%"),
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 10,
                  paddingHorizontal: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.texts}>Foto</Text>
                  <Icon
                    color="#f50"
                    raised
                    name="photo"
                    type="FontAwesome"
                    size={20}
                    onPress={() =>
                      this.onSelectCategory(
                        this.state.joyacodigo,
                        this.state.joyanombre,
                        this.state.joyaFoto
                      )
                    }
                  ></Icon>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.texts}>Video</Text>
                  <Icon
                    color="#f50"
                    raised
                    name="camera"
                    size={20}
                    onPress={() =>
                      this.onSelectCategory(
                        this.state.joyacodigo,
                        this.state.joyanombre,
                        this.state.joyaVideo
                      )
                    }
                  ></Icon>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.texts}>ws</Text>
                  <Icon
                    color="#f50"
                    size={20}
                    raised
                    name="whatsapp"
                    onPress={() => this.sendOnWhatsApp()}
                  ></Icon>
                </View>
              </View>
            </View>
          </Modal>
        </Container>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  viewStyles: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2e724",
  },
  textStyles: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },
  joya: {
    fontSize: 11,
    color: "red",
    justifyContent: "flex-start",
  },
  selected: { backgroundColor: "#FA7B5F" },
  list: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#192338",
    zIndex: -1,
  },
  numberBox: {
    position: "absolute",
    bottom: 75,
    width: 30,
    height: 30,
    borderRadius: 15,
    left: 330,
    zIndex: 3,
    backgroundColor: "#e3e3e3",
    justifyContent: "center",
    alignItems: "center",
  },
  number: { fontSize: 14, color: "#000" },
  icon: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    left: 290,
    zIndex: 1,
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  loadMoreBtn: {
    padding: 5,
    backgroundColor: "#800000",
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "black",
    fontSize: 15,
    textAlign: "center",
  },

  itemStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: Platform.isPad == true ? wp("30.0%") : wp("46%"),
    margin: wp("2%"),
    height: 200,
    backgroundColor: "#FFF",
    borderColor: "#000",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.8,
    shadowOffset: { height: 1, width: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  dialog: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: wp("100.0%"),
    height: hp("100.0%"),
    backgroundColor: "#000000BF",
  },
  dialogMain: {
    alignItems: "center",
    width: "80%",
    backgroundColor: "#FFF",
    zIndex: 1000,
    borderRadius: 20,
  },
  dialogHeader: {
    marginTop: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 50,
    backgroundColor: "#999",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.9,
    shadowOffset: { height: 2, width: 1 },
    shadowRadius: 5,
    elevation: 10,
  },
  image_icon: {
    maxWidth: 30,
    maxHeight: 30,
  },
  texts: {
    marginRight: 10,
  },
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    position: "absolute",
    width: wp("100.0%"),
    height: hp("100.0%"),
    alignItems: "center",
  },
  inputView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    // marginTop: Platform.isPad == true ? 50 : 20,
    // width: Platform.isPad == true ? wp("60.0%") : wp("80%"),
    height: 40,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    borderColor: "#ddd",
    marginTop: 10,
    // backgroundColor: '#EEEEEE',
    zIndex: 500,
  },
  dialog: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: wp("100.0%"),
    height: hp("100.0%"),
    backgroundColor: "#000000BF",
  },
  dialogMain: {
    alignItems: "center",
    width: Platform.isPad == true ? "60%" : "80%",
    backgroundColor: "#FFF",
    zIndex: 1000,
    borderRadius: 20,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 35,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#999",
    marginBottom: 5,
  },
  inputContainerStyle: {
    marginTop: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width: "100%",
  },

  button: {
    marginTop: 30,
    marginBottom: "100%",
    paddingVertical: 20,
    // width: Platform.isPad == true ? wp("60.0%") : wp("80%"),
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#ddd",
  },

  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "rgba(247,247,247,1.0)",
  },
  caja: {
    borderWidth: 1,
    borderColor: "black",
    paddingLeft: 50,
    marginTop: 20,
    marginLeft: 80,
    marginRight: 80,
    borderRadius: 5,
    color: "black",
  },
  sideBar: {
    borderRadius: 0.1,
    elevation: 2,
  },
  sideBar_top: {
    height: 200,
    backgroundColor: "#46a5fb",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: {
    color: "#555",
    fontFamily: "Verdana",
    fontWeight: "bold",
    fontSize: 30,
    width: 300,
    textAlign: "center",
  },
  input_text: {
    marginLeft: 10,
  },
});

export default Listinv;
