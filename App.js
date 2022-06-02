import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Main } from './src/components/main/main';
import { TodoForm } from './src/components/todoForm/todoForm';

export default function App() {

  const [activePage, setActivePage] = useState('main')

  return <>
    <View style={styles.container}>
      {activePage === 'main' && <Main setActivePage={setActivePage} />}
      {activePage === 'todoForm' && <TodoForm setActivePage={setActivePage} />}
      <StatusBar style="auto" />
    </View>
  </>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
});
