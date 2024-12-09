import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Drawer } from 'expo-router/drawer'
import { Stack } from 'expo-router/build'

export default function Layout() {
    

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen 
                name={'index'} 
                options={{

                }}
            />
            <Stack.Screen 
                name={'[name]'} 
                options={{

                }}
            />
        </Stack>
    )
}