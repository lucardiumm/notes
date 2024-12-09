import { colors } from '@/extra/colors'
import { router, useLocalSearchParams } from 'expo-router'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as Haptics from 'expo-haptics'
import Markdown from 'react-native-markdown-display'
import { useState } from 'react'
import useNote from '@/hooks/useNote'

export default function Page() {
    const { name } = useLocalSearchParams()
    const note = useNote(name)

    const [copy, setCopy] = useState(note[0].content)

    const Back = async () => {
        // await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        router.back()
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={Back} style={styles.back}>
                <Text style={styles.title}>{name}</Text>
            </TouchableOpacity>

            <View style={styles.md}>
                <Markdown>
                    {copy}
                </Markdown>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        gap: 15,
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.light,
    },
    back: {
        position: 'relative',
        left: 50,
        top: 75,
    },
    title: {
        fontWeight: '700',
        fontSize: 30,
        color: colors.dark,
    },
    md: {
        backgroundColor: 'red',
        width: '80%',
        height: '80%',
    },
})