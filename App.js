import React, { Component } from "react";

import { Image, FlatList, StyleSheet, Button, Text, View, ActivityIndicator, Alert } from "react-native";

var REQUEST_URL =
    "https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json";

export default class SampleAppMovies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false
        };
        // 在ES6中，如果在自定义的函数里使用了this关键字，则需要对其进行“绑定”操作，否则this的指向会变为空
        // 像下面这行代码一样，在constructor中使用bind是其中一种做法（还有一些其他做法，如使用箭头函数等）
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.fetchData();
        // this.timer = setInterval(() => {
        //   alert("把一个定时器的引用挂在this上");
        // }, 500);
    }

    fetchData() {
        fetch(REQUEST_URL)
            .then(response => response.json())
            .then(responseData => {
                // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
                this.setState({
                    data: this.state.data.concat(responseData.movies),
                    loaded: true
                });
            });
    }

    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        return (
            <View>
                <Text>fuck</Text>
                <FlatList
                  data={this.state.data}
                  keyExtractor={item => item.id}
                  renderItem={this.renderMovie}
                  style={styles.list}
                />
            </View>   
        );
    }

    renderLoadingView() {
        return (
            <View style={styles.container}>
              <ActivityIndicator size="large" color="red" />
            </View>
        );
    }

    sayHello(item){
      Alert.alert("你点击了按钮！");
    }
_onPressButton() {
    Alert.alert('You tapped the button!')
  }

    renderMovie({ item }) {
        // { item }是一种“解构”写法，请阅读ES2015语法的相关文档
        // item也是FlatList中固定的参数名，请阅读FlatList的相关文档
        const self = this
        return (
            <View style={styles.container} >
              <Text>测试</Text>
              {
                item.posters.thumbnail ?
                <Image
                source={{ uri: item.posters.thumbnail }}
                style={styles.thumbnail}
              /> : 'fuc'
              }
              <View style={styles.rightContainer}>
              <Button onPress={() => {
          Alert.alert("你点击了按钮！" + item.title);
        }} style={styles.title} title="press"></Button>
                <Text style={styles.title}>{item.title}</Text>

                                <Text style={styles.title}>{item.posters.thumbnail}</Text>

                <Text style={styles.year}>{item.year}</Text>        
              </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginBottom: 8
    },
    rightContainer: {
        flex: 1
    },
    title: {
        fontSize: 14,
        marginBottom: 8,
        // textAlign: "center"
    },
    year: {
        // textAlign: "center"
    },
    thumbnail: {
        width: 80,
        height: 80,
        marginRight: 15
    },
    list: {
        // paddingTop: 20,
        backgroundColor: "#F5FCFF"
    }
});