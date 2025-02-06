import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icons from '@utils/imagePaths/imagePaths';
import CustomText from '@components/Ui/CustomText';
import {useNavigation} from '@react-navigation/native';
import useAuthStore from '@utils/store/authStore';

const NavScreen = () => {
  const navigation = useNavigation();
  const {logout} = useAuthStore();

  const navLinks = [
    {title: 'New Booking', icon: <Icons.Box style={styles.icon} />},
    {title: 'My Wallet', icon: <Icons.Wallet style={styles.icon} />},
    {title: 'Past Orders', icon: <Icons.CubeWhite style={styles.icon} />},
    {title: 'Profile', icon: <Icons.Avatar style={styles.icon} />},
  ];

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <Icons.LogoWhite style={styles.logo} />
        <Icons.BtnMenuBack onPress={() => navigation.goBack()} />
      </View>

      {/* Mid Section */}
      <View style={styles.midSection}>
        <CustomText style={styles.menuTitle}>Menu</CustomText>

        {/* Navigation Links */}
        <View style={styles.navLinksContainer}>
          {navLinks.map((link, index) => (
            <TouchableOpacity key={index} onPress={() => {}}>
              <View style={styles.navLinkItem}>
                <View style={styles.navLinkContent}>
                  {link.icon}
                  <CustomText style={styles.navLinkText}>
                    {link.title}
                  </CustomText>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity onPress={logout} style={styles.navLinkContent}>
            <Icons.LogOut style={styles.icon} />
            <CustomText style={styles.navLinkText}>Logout</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NavScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ED1C24',
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
    marginBottom: 20,
  },
  logo: {
    marginLeft: 50,
  },
  midSection: {
    marginLeft: 50,
    marginTop: 30,
  },
  menuTitle: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'Outfit-Bold',
  },
  navLinksContainer: {
    marginTop: 40,
  },
  navLinkItem: {
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 10,
  },
  navLinkContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navLinkText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#fff',
  },
  icon: {
    marginRight: 20,
  },
  logoutContainer: {
    marginTop: 60,
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 10,
  },
});
