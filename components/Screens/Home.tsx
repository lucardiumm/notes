import { Dimensions, Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { colors } from '@/extra/colors'
import { useEffect, useState } from 'react'
import Toaster from '@/public/images/Toaster.png'
import Label from '@/components/Icons/Label'
import * as Haptics from 'expo-haptics'
import { router } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'
import * as WebBrowser from 'expo-web-browser'
import { Note } from '@/types/include'
import Card from '../Core/Card'
import * as SQLite from 'expo-sqlite'
import useNotes from '@/hooks/useNotes'
import { useRouter } from 'expo-router/build'

export default function Home() {
    const router = useRouter()
    const db = SQLite.openDatabaseSync('notes.db')
    const notes = useNotes()

    const [search, setSearch] = useState('')

    const Press = async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        await WebBrowser.openBrowserAsync('https://github.com/lucardiumm')
    }

    const Submit = async () => {
        if (search.length === 0) {
            return
        }

        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
        
        db.runAsync('INSERT INTO notes(title, content, createdAt, lastUpdatedAt, thumbnailHash) VALUES(?,?,?,?,?)', [search, '...', new Date(Date.now()).toString(), new Date(Date.now()).toString(), ''])
        router.push('/' + search)
    }

    useEffect(() => {
        // db.runSync('DROP TABLE notes')
        db.runSync('CREATE TABLE IF NOT EXISTS notes(title TEXT, content TEXT, createdAt TEXT, lastUpdatedAt TEXT, thumbnailHash TEXT)')
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.glow}>
                    <Image 
                        style={styles.icon}
                        resizeMode={'contain'}
                        source={Toaster}
                        alt={'Logo'}
                    />
                </View>

                <TouchableOpacity style={styles.github} onPress={Press}>
                    <AntDesign name={'github'} size={27.5} color={colors.dark} />
                </TouchableOpacity>
            </View>

            <TextInput 
                autoCorrect={false}
                autoComplete={'off'}
                onChangeText={setSearch}
                autoCapitalize={'none'}
                value={search}
                onSubmitEditing={() => {
                    Submit()
                }}
                keyboardType={'default'}
                returnKeyLabel={'Create'}
                style={styles.input}    
                placeholder={'New note name...'}
            />

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContainer}
            >
                {notes.map((note, index) => (
                    <Card title={note.title} key={index} content={note.content} thumbnailHash={note.thumbnailHash} lastUpdatedAt={note.lastUpdatedAt} />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        gap: 25,
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.light,
    },
    header: {
        marginTop: 25,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        display: 'flex',
        flexDirection: 'row',
    },
    github: {
        position: 'absolute',
        top: '-7.5%',
        right: '7.5%',
    },
    view: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        gap: 15,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    icon: {
        height: 75,
        width: 75,
    },
    glow: {
        shadowColor: "#B9DDFFB8",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 5,
        shadowRadius: 20,
        elevation: 5,
    },
    input: {
        fontSize: 16,
        width: 300,
        height: 60,
        fontWeight: '500',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        alignItems: 'center',
        textAlign: 'center',
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    text: {
        color: colors.text,
    },
    scrollView: {
        flexGrow: 0,
        height: '70%',
    },
    scrollViewContainer: {},
})