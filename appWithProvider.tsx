import { FC, useState } from "react"
import { StyleSheet, View } from "react-native"
import { Main } from "./src/components/main/main"
import { TodoForm } from "./src/components/todoForm/todoForm"
import { useAppSelector } from "./src/hooks/hooks"
import { PagesTypes } from "./src/models/models"

type AppWithProviderPropsType = {
    
}


export const AppWithProvider: FC<AppWithProviderPropsType> = ({  }) => {

  const [activePage, setActivePage] = useState<PagesTypes>('main')
  const [activeFormIndex, setActiveFormIndex] = useState(0)
  const { todoGroups } = useAppSelector(state => state.TodosReducer)

  const activePageHandler = (id: string) => {
    const index = todoGroups.findIndex(el => el.id === id)
    console.log(index, id, todoGroups.length)
    if (index != -1) {
      setActiveFormIndex(index)
      setActivePage('todoForm')
    }
    
  }
  
  return <>
      <View style={styles.container}>
      {activePage === 'main' && <Main setActivePage={activePageHandler} />}
      {activePage === 'todoForm' && <TodoForm setActivePage={setActivePage} content={todoGroups[activeFormIndex]} />}
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