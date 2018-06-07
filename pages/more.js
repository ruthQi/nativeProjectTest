import React, {PureComponent} from 'react';
import {
   StyleSheet,
   ScrollView,
   View,
   Image,
   Text,
   FlatList,
   TouchableHighlight 
 } from 'react-native';

 export default class MoreList extends PureComponent{
   // static navigationOptions = {
   //    title: '列表页',
   // };
   constructor(){
      super();
      this.start = 0;
      this.state = {
         dataList: []
      }
   }
   componentDidMount(){
      let type = this.props.navigation.state.params.type;
      let url = '';
      switch(type){
         case 'hot':
            url = `https://api.douban.com/v2/movie/in_theaters?start=${this.start}&count=20`;
            break;
         case 'noPlay':
            url = `https://api.douban.com/v2/movie/coming_soon?start=${this.start}&count=20`;
            break;
         case 'top250':
            url = `https://api.douban.com/v2/movie/top250?start=${this.start}&count=20`;
            break;

      }
      fetch(url).then((res)=>{
         return res.json();
      }).then((res)=>{
         console.log(res);
         this.setState({
            dataList: res.subjects
         })
      })
   }
   renderHotList = ({item}) => {
      return (<View style={styles.liContainer}>
         <Image style={styles.coverImage} source={{uri: `${item.images.small}`}}/>
         <Text style={styles.itemTitle}>{item.title}</Text>
      </View>)
   }
   loaadMore = () => {
      alert('00000')
   }
    render(){
       return(
          <ScrollView style={styles.container}>
             <FlatList style={styles.listContainer} 
                  numColumns="3"
                  onEndReached={this.loadMore}
                  onEndReachedThreshold="40"
                  data={this.state.dataList}
                  keyExtractor={(item, index)=>{return `${index}`}}
                  renderItem={this.renderHotList}/>
          </ScrollView>
         
       )
    }
 }

 const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingTop:20
   },
   listContainer: {
      width: '100%'
   },
   liContainer: {
      width: 110,
      height: 150,
      //backgroundColor: '#00ffff',
      marginLeft: 10,
      marginBottom: 10
   },
   coverImage:{
      width: 100,
      height: 120
   },
   itemTitle: {
      textAlign:'center'
   }
 })