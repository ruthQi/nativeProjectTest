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

export default class DouBan extends PureComponent{
   // static navigationOptions = () => ({
   //    headerTitle: '首页',
   //    headerTitleStyle: styles.headerStyle
   // });

   constructor(){
      super();
      this.state = {
         hotList:[],
         noPlayList: [],
         top250List:[]
      }
   }
   componentDidMount(){
      fetch('https://api.douban.com/v2/movie/in_theaters?start=0&count=8').then((res)=>{
         return res.json();
      }).then((res)=>{
         console.log(res);
         this.setState({
            hotList: res.subjects
         })
      })
      fetch('https://api.douban.com/v2/movie/coming_soon?start=0&count=8').then((res)=>{
         return res.json();
      }).then((res)=>{
         console.log(res);
         this.setState({
            noPlayList: res.subjects
         })
      })
      fetch('https://api.douban.com/v2/movie/top250?start=0&count=8').then((res)=>{
         return res.json();
      }).then((res)=>{
         console.log(res);
         this.setState({
            top250List: res.subjects
         })
      })
   }
   renderHotList = ({item}) => {
      return (<View style={styles.liContainer}>
         <Image style={styles.coverImage} source={{uri: `${item.images.small}`}}/>
         <Text style={styles.itemTitle}>{item.title}</Text>
      </View>)
   }
   goMore(type){
      const { navigate } = this.props.navigation;
      navigate('MoreList',{type})
   }
   render(){
      return(
         <ScrollView >
            <View style={styles.header}>
               <Image style={styles.iconLogo} source={require('../images/logo.png')}/>
               <View style={styles.nav}>
                  <Text style={[styles.navItem, styles.navMovie]}>电影</Text>
                  <Text style={[styles.navItem, styles.navBook]}>图书</Text>
               </View>
            </View>
            <View style={styles.movieContainer}>
               <View style={styles.movieTitle}>
                  <Text>影院热映</Text>
                  <Text style={styles.more} onPress={()=>{this.goMore('hot')}}>更多</Text>
               </View>
               <FlatList style={styles.movieList} 
                        horizontal={true} 
                        data={this.state.hotList}
                        keyExtractor={(item, index)=>{return `${index}`}}
                        renderItem={this.renderHotList}/>
            </View>
            <View style={styles.movieContainer}>
               <View style={styles.movieTitle}>
                  <Text>即将上映</Text>
                  <Text style={styles.more} onPress={()=>{this.goMore('noPlay')}}>更多</Text>
               </View>
               <FlatList style={styles.movieList} 
                        horizontal={true} 
                        data={this.state.noPlayList}
                        keyExtractor={(item, index)=>{return `${index}`}}
                        renderItem={this.renderHotList}/>
            </View>
            <View style={styles.movieContainer}>
               <View style={styles.movieTitle}>
                  <Text>热门电影</Text>
                  <Text style={styles.more} onPress={()=>{this.goMore('top250')}}>更多</Text>
               </View>
               <FlatList style={styles.movieList} 
                        horizontal={true} 
                        data={this.state.top250List}
                        keyExtractor={(item, index)=>{return `${index}`}}
                        renderItem={this.renderHotList}/>
            </View>
         </ScrollView>
      )
   }
} 

const styles = StyleSheet.create({
   container: {
      height: '100%',
      
   },
   header: {
      height: 60,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'space-around',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc'
   },
   iconLogo: {
      width: 46,
      height: 22
   },
   nav:{
      flexDirection: 'row',

   },
   navItem: {
      fontSize: 15,
      marginRight: 20
   },
   navMovie: {
      color: '#2384E8'
   },
   navBook: {
      color: '#9F7860'
   },
   movieContainer: {
      paddingTop: 10,

   },
   movieTitle: {
      flexDirection:'row',
      justifyContent: 'space-between',
      paddingLeft: 10,
      paddingRight: 10,
   },
   movieList: {
      //height: 200,
      //backgroundColor:'#ccc',
      paddingTop: 10,
      paddingBottom: 20,
      //paddingRight: 10
      paddingLeft: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc'
   },
   more: {
      color: '#42bd56'
   },
   liContainer: {
      width: 100,
      marginRight: 10  
   },
   coverImage: {
      width: 100,
      height: 150
   },
   itemTitle: {
      fontSize: 12,
      flexGrow: 1,
      overflow: 'hidden',
      marginTop: 5,
      textAlign: 'center'
   },
   headerStyle: {
      textAlign: 'center',
      color:'#fff000'
   }


})