import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icons from '../../utils/imagePaths/imagePaths';
import CustomText from '../../components/Ui/CustomText';
import {useNavigation} from '@react-navigation/native';
import useAuthStore from '../../utils/store/authStore';

type Props = {};

const NavScreen = (props: Props) => {
  const navigation: any = useNavigation();
  const {logout} = useAuthStore();
  const navLinks = [
    {title: 'New Booking', icon: <Icons.Box style={{marginRight: 20}} />},
    {title: 'My Wallet', icon: <Icons.Wallet style={{marginRight: 20}} />},
    {title: 'Post Orders', icon: <Icons.CubeWhite style={{marginRight: 20}} />},
    {title: 'Profile', icon: <Icons.Avatar style={{marginRight: 23}} />},
  ];
  return (
    <View style={{flex: 1, backgroundColor: '#ED1C24'}}>
      {/* Top Section */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 40,
          marginBottom: 20,
        }}>
        <Icons.LogoWhite style={{marginLeft: 50}} />
        <Icons.BtnMenuBack onPress={() => navigation.goBack()} />
      </View>

      {/* Mid Section */}
      <View
        style={{
          flexDirection: 'column',
          marginLeft: 50,
          marginTop: 30,
        }}>
        <CustomText
          style={{fontSize: 22, color: '#fff', fontFamily: 'Outfit-Bold'}}>
          Menu
        </CustomText>
        <View>
          {/* Menu List */}
          <View style={{marginTop: 40}}>
            {navLinks?.length > 0 &&
              navLinks?.map((val: any, key: any) => (
                <TouchableOpacity key={key} onPress={() => {}}>
                  <View
                    style={{
                      borderRadius: 10,
                      paddingVertical: 10,
                      marginBottom: 10,
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      {val.icon}
                      <CustomText
                        style={{fontSize: 16, marginLeft: 10, color: '#fff'}}>
                        {val.title}
                      </CustomText>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
          </View>

          {/* Logout Button */}
          <View
            style={{
              marginTop: 60,
              borderRadius: 10,
              paddingVertical: 10,
              marginBottom: 10,
            }}>
            <TouchableOpacity
              onPress={logout}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icons.LogOut style={{marginRight: 22}} />
              <CustomText style={{fontSize: 16, marginLeft: 10, color: '#fff'}}>
                Logout
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default NavScreen;

const styles = StyleSheet.create({});
