import { FC, useState } from "react"
import { StyleSheet, View } from "react-native"
import { Main } from "./src/components/main/main"
import { TodoForm } from "./src/components/todoForm/todoForm"
import { useAppSelector } from "./src/hooks/hooks"

type AppWithProviderPropsType = {
    
}


export const AppWithProvider: FC<AppWithProviderPropsType> = ({  }) => {

  const { todoGroups } = useAppSelector(state => state.TodosReducer)
  const { activePage } = useAppSelector(state => state.TodosReducer)
  const { indexGroupPage } = useAppSelector(state => state.TodosReducer)

  return <>
      <View style={styles.container}>
      {activePage === 'main' && <Main />}
      {activePage === 'todoForm' && <TodoForm content={todoGroups.find(el => el.id === indexGroupPage)} />}
    </View>
  </>
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#fff',
      justifyContent: 'flex-start',
    },
  });