import React, {PureComponent} from 'react';
import {
   StyleSheet,
   ScrollView,
   Image,
   Dimensions,
   View,
   Text,
   FlatList
} from 'react-native';
import immutable from 'immutable';

export default class Detail extends PureComponent{

   constructor(){
      super();
      this.state = {
         detailInfo: immutable.fromJS({}),
         width: 0,
         height: 0
      }
   }
   //使用PureComponent，如果更新的数据层级太深，使用immutable处理数据才可setState成功
   componentDidMount(){
      let id = this.props.navigation.state.params.id;
      fetch(`https://api.douban.com/v2/movie/subject/${id}`).then((res)=>{
         return res.json();
      }).then((res)=>{
         let data = immutable.fromJS(res);
         this.setState({
            detailInfo: data
         })
      })
   }
   onLoad = () => {
      let detailInfo = this.state.detailInfo;
      let uri = detailInfo.get('images') && detailInfo.getIn(['images', 'large']);
      //获取图片尺寸
      Image.getSize(uri, (width, height) => {
         this.setState({width, height});
      });
   }
   renderCasts = (item) => {
      console.log(item)
      let data = item.item;
      return(
         <View style={styles.castContainer}>
            <Image style={styles.avatarImg} source={{uri:data.getIn(['avatars','medium'])}}/>
            <Text style={styles.castName}>{data.get('name')}</Text>
         </View>
      )
   }
   renderDirector = (item) =>{
      
      let data = item.item;
      console.log('------',data.get('name'))
      return(
         <View style={styles.castContainer}>
            <Image style={styles.avatarImg} source={{uri:data.getIn(['avatars','medium'])}}/>
            <Text style={styles.castName}>{data.get('name')}</Text>
         </View>
      )
   }
   render(){
      let {detailInfo} = this.state; 
      console.log(detailInfo.toJS())
      //detailInfo.get(['images']).get('large') 与 detailInfo.getIn(['images', 'large']效果相同
      //marginLeft:(Dimensions.get('window').width - this.state.width)/2
      //keyExtractor返回的是一个string型数据
      //FlatList的data只能是数组，如果使用immutable的话，使用toArray转成数组再遍历
      return(
         <ScrollView class={styles.container}>
            <View style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
               <Image source={{uri: detailInfo.get('images') && detailInfo.getIn(['images', 'large'])}} style={{height: this.state.height, width: this.state.width, marginTop: 20}} onLoad={this.onLoad}/>
               <Text style={{marginTop: 20, marginBottom: 20}}>{detailInfo.get('title')}</Text>
            </View>
            <View style={styles.listCon}>
               <Text>主演：</Text>
               <FlatList data={detailInfo.get('casts') && detailInfo.get('casts').toArray()}
                  horizontal={true} 
                  keyExtractor={(item,index)=>{return `${index}`}}
                  renderItem={this.renderCasts}/>
            </View>
            <View style={styles.listCon}>
               <Text>导演：</Text>
               <FlatList data={detailInfo.get('directors') && detailInfo.get('directors').toArray()}
                  horizontal={true} 
                  keyExtractor={(item,index)=>{return `director-${index}`}}
                  renderItem={this.renderDirector}/>
            </View>
            <View style={{paddingLeft: 10, marginBottom: 20}}>
               <Text style={{marginTop: 10, marginBottom: 10}}>简介：</Text>
               <Text>{detailInfo.get('summary')}</Text>
            </View>
            
         </ScrollView>
      )
   }
}
//Dimensions获取屏幕的宽和高
const styles = StyleSheet.create({
   container: {
      flex:1   
   },
   castContainer: {
      marginRight: 10
   },
   avatarImg: {
      width: 100,
      height: 120
   },
   castName: {
      fontSize: 12,
      color:'#666',
      textAlign:'center'
   },
   listCon: {
      paddingLeft: 10,
      paddingTop: 10
   }
})