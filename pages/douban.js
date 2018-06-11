
 import {
   StackNavigator,
 } from 'react-navigation';
 import MoreList from './more';
 import Main from './main';
 import Detail from './detail';

const DouBanApp = StackNavigator({
   Main: {
      screen: Main,
      navigationOptions: {
         tabBarVisible: false, // 隐藏底部导航栏
         header:null,  //隐藏顶部导航栏
      }
   },
   MoreList: {
      screen: MoreList,
      navigationOptions: {
         headerTitle: '更多',
         headerStyle: {
            backgroundColor: '#ff8800'
         },
         headerTitleStyle: {
            alignSelf:'center',
            color: 'white',
            alignItems:'center',
            justifyContent:'center'
         }
      }},
   Detail: {
      screen: Detail,
      navigationOptions: {
         headerTitle: '详情页',
         headerStyle: {
            backgroundColor: '#ff8800'
         },
         headerTitleStyle: {
            alignSelf:'center',
            color: 'white',
            alignItems:'center',
            justifyContent:'center'
         }
      }
   }
    
 },{
  tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
  tabBarOptions: {
     style: {
        display: 'none',
        height: 0
     }
  }
})

 export default DouBanApp;

 