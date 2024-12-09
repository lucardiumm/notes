import { CardType } from '@/types/include'
import { useRouter } from 'expo-router/build'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import * as Haptics from 'expo-haptics'

export default function Card({ title, content, lastUpdatedAt, thumbnailHash }: CardType) {
    const router = useRouter()

    const Press = async () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        router.push('/' + title)
    }

    return (
        <TouchableOpacity style={styles.cardContainer} activeOpacity={1} onPress={Press}>
            <Text>{title}</Text>
            <Text>{lastUpdatedAt}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        width: '80%',
        backgroundColor: 'red',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginVertical: 10,
    },
})