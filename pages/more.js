import React, {PureComponent} from 'react';
import {
   StyleSheet,
   ScrollView,
   View,
   Image,
   Text,
   FlatList,
   TouchableHighlight,
   Dimensions
 } from 'react-native';

 export default class MoreList extends PureComponent{
   // static navigationOptions = {
   //    title: '列表页',
   // };
   constructor(){
      super();
      this.start = 0;
      this.count = 20;
      this.state = {
         dataList: [],
         totalSize:0
      }
   }
   componentDidMount(){
      this.getData(this.start);
   }
   getData(start){
      let type = this.props.navigation.state.params.type;
      let url = '';
      switch(type){
         case 'hot':
            url = `https://api.douban.com/v2/movie/in_theaters?start=${start}&count=20`;
            break;
         case 'noPlay':
            url = `https://api.douban.com/v2/movie/coming_soon?start=${start}&count=20`;
            break;
         case 'top250':
            url = `https://api.douban.com/v2/movie/top250?start=${start}&count=20`;
            break;

      }
      fetch(url).then((res)=>{
         return res.json();
      }).then((res)=>{
         console.log(res);
         this.setState({
            dataList: this.state.dataList.concat(res.subjects),
            totalSize:res.total
         })
      })
   }
   renderHotList = ({item}) => {
      return (<View style={styles.liContainer}>
         <Image style={styles.coverImage} source={{uri: `${item.images.small}`}}/>
         <Text style={styles.itemTitle}>{item.title}</Text>
      </View>)
   }
   loadMore = () => {
      //alert('00000')
      this.start += 1;
      let start = this.start * this.count;
      if(start > this.state.totalSize){
         return
      }
      this.getData(start)
   }
    render(){
       //onEndReachedThreshold:此参数是一个比值而非像素单位。比如，0.5表示距离内容最底部的距离为当前列表可见长度的一半时触发
       return(
          <View style={styles.container}>
             <FlatList style={styles.listContainer} 
                  numColumns="3"
                  onEndReached={this.loadMore}
                  onEndReachedThreshold={0.5}
                  data={this.state.dataList}
                  keyExtractor={(item, index)=>{return `${index}`}}
                  renderItem={this.renderHotList}/>
          </View>
         
       )
    }
 }

 const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingTop:20
   },
   listContainer: {
      width: '100%',
      flex: 1
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