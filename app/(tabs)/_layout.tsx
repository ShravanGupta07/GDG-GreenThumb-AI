import { Tabs } from 'expo-router';
import { Home, Search, User } from 'lucide-react-native';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [
          styles.tabBar,
          { paddingBottom: insets.bottom + 8, height: 70 + insets.bottom }
        ],
        tabBarLabel: () => null,
        tabBarIcon: ({ focused, color }) => {
          let icon;
          let label = '';

          switch (route.name) {
            case 'index':
              icon = <Home size={22} color={focused ? '#22C55E' : '#6B7280'} />;
              label = 'Home';
              break;
            case 'disease':
              icon = <Search size={22} color={focused ? '#22C55E' : '#6B7280'} />;
              label = 'Detect';
              break;
            case 'profile/index':
              icon = <User size={22} color={focused ? '#22C55E' : '#6B7280'} />;
              label = 'Profile';
              break;
          }

          return (
            <View style={focused ? styles.activeTab : styles.tabItem}>
              {icon}
              {focused && <Text style={styles.tabLabel}>{label}</Text>}
            </View>
          );
        },
      })}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="disease" />
      <Tabs.Screen name="profile/index" />
      <Tabs.Screen
        name="identify"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#F8FAF5',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  activeTab: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ECFDF5',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  tabLabel: {
    color: '#22C55E',
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
});