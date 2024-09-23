import React from 'react';
import { SafeAreaView, View, Text, Image } from 'react-native';
import { DrawerItemList } from '@react-navigation/drawer';
//import User from '../../../assets/images/agents/profile.jpg'


const CustomDrawer = (props) => {


    return (
        <SafeAreaView>
            {/* Custom drawer header */}
            <View style={{
                height: 200,
                width: '100%',
                justifyContent: "center",
                alignItems: "center",
                borderBottomColor: "#f4f4f4",
                borderBottomWidth: 1,
            }}>
                {/* <Image source={User} style={{
                    height: 130,
                    width: 130,
                    borderRadius: 65
                }} /> */}
                <Text style={{
                    fontSize: 22,
                    marginVertical: 6,
                    fontWeight: "bold",
                    color: "#111"
                }}>Your Name</Text>
                <Text style={{
                    fontSize: 16,
                    color: "#111",
                    paddingBottom: 1
                }}>  Girly
                </Text>
            </View>
            {/* Use DrawerItemList to include default items */}
            <DrawerItemList {...props} />
        </SafeAreaView>
    );
};

export default CustomDrawer;