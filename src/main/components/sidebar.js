import react from "react";
import { render } from "react-dom";

import {
  Platform,
  ImageBackground,
  StyleSheet,
  StatusBar,
  View,
  Text,
  SafeAreaView,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";

export default class SideBar extends Component {
  render() {
    return (
      <View style={styles.sideBar}>
        {/* <TouchableOpacity style={styles.inputView}
                    onPress={() => this.setState({ checked: !this.state.checked })}>
                    <Icon name={this.state.checked ? 'checkcircle' : 'checkcircleo'} type='antdesign' size={25} color='#FFF' />
                    <Text style={{ color: '#FFF', fontSize: 20, fontWeight: 'bold' }}>Stock Matriz</Text>
                    <View />
                  </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.inputView}
          onPress={() => {
            this.setState({ todos: true });
          }}
        >
          <View />
          <Text style={{ color: "#FFF", fontSize: 20, fontWeight: "bold" }}>
            {this.state.tipojoya.label}
          </Text>
          <Icon name="arrow-down" type="ionicon" size={20} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inputView}
          onPress={() => {
            this.setState({ meta: true });
          }}
        >
          <View />
          <Text style={{ color: "#FFF", fontSize: 20, fontWeight: "bold" }}>
            {this.state.metal.label}
          </Text>
          <Icon name="arrow-down" type="FontAwesome" size={20} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inputView}
          onPress={() => {
            this.setState({ gem: true });
          }}
        >
          <View />
          <Text style={{ color: "#FFF", fontSize: 20, fontWeight: "bold" }}>
            {this.state.gema.label}
          </Text>
          <Icon name="arrow-down" type="FontAwesome" size={20} color="#FFF" />
        </TouchableOpacity>
        <View style={styles.inputView}>
          <Input
            ref={(input) => (this.codigoInput = input)}
            editable={true}
            placeholder={"Codigo"}
            placeholderTextColor={"rgba(255, 255, 255, 0.5)"}
            keyboardType={"numeric"}
            secureTextEntry={false}
            blurOnSubmit={false}
            value={this.state.codigo}
            onSubmitEditing={() => {
              this.preciodInput.focus();
            }}
            onChangeText={(text) => this.setState({ codigo: text })}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={{ color: "#FFF" }}
          />
        </View>
        <View style={styles.inputView}>
          <Input
            ref={(input) => (this.preciodInput = input)}
            editable={true}
            placeholder={"Precio Desde"}
            placeholderTextColor={"rgba(255, 255, 255, 0.5)"}
            keyboardType={"numeric"}
            secureTextEntry={false}
            blurOnSubmit={false}
            value={this.state.preciod}
            onSubmitEditing={() => {
              this.preciohInput.focus();
            }}
            onChangeText={(text) => this.setState({ preciod: text })}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={{ color: "#FFF" }}
          />
        </View>
        <View style={styles.inputView}>
          <Input
            ref={(input) => (this.preciohInput = input)}
            editable={true}
            placeholder={"Precio Hasta"}
            placeholderTextColor={"rgba(255, 255, 255, 0.5)"}
            keyboardType={"numeric"}
            secureTextEntry={false}
            blurOnSubmit={false}
            value={this.state.precioh}
            onChangeText={(text) => this.setState({ precioh: text })}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={{ color: "#FFF" }}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.gotoInventario()}
        >
          <Text style={{ color: "#FFF", fontSize: 20, fontWeight: "bold" }}>
            Filtrar
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
