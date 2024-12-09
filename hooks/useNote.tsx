import { Note } from '@/types/include'
import * as SQLite from 'expo-sqlite'
import { useEffect, useState } from 'react'

export default function useNote(title: string) {
    const db = SQLite.openDatabaseSync('notes.db')

    const [data, setData] = useState<Note[]>([])

    useEffect(() => {
        const items = db.getFirstSync('SELECT * FROM notes WHERE title = ?', [title]) as Note[]
        console.log(items)
        
        items.forEach((item) => {
            setData(prev => [...prev, item])
        })
    }, [])

    return data
}