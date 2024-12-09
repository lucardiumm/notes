import { Note } from '@/types/include'
import * as SQLite from 'expo-sqlite'
import { useEffect, useState } from 'react'

export default function useNotes() {
    const db = SQLite.openDatabaseSync('notes.db')

    const [data, setData] = useState<Note[]>([])

    useEffect(() => {
        const items = db.getAllSync('SELECT * FROM notes') as Note[]

        items.forEach((item) => {
            setData(prev => [...prev, item])
        })
    }, [])

    return data
}