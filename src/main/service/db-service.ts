import { DataBase } from '@main/data/data-base'
import type { musicFileExt } from '@main/types'
import { error } from 'console'
import { randomUUID } from 'crypto'

export const dbService = (path: string) => {
    const db: DataBase = new DataBase(path)

    const CONFIGTABLE: string = 'configtable'
    const MUSICDATATABLE: string = 'musicdatatable'

    const createConfigTable = async () => {
        const createval = [
            '`uuid` text NOT NULL',
            '`configname` text',
            '`status` text',
            '`lastchangetime` text',
            'PRIMARY KEY (`uuid`)',
        ]
        return await db.createTableSync(CONFIGTABLE, createval)
    }

    const createMusicDataTable = async () => {
        const createVal = [
            '`uuid` text NOT NULL',
            '`musicname` text',
            '`dataid` number',
            '`url` text',
            '`ext` text',
            '`tag` text',
            '`listid` text',
            '`createtime` text',
            '`length` text',
            '`lastopentime` text',
        ]
        return await db.createTableSync(MUSICDATATABLE, createVal)
    }

    const seleteConfigTable = async () => {
        return await db.selectTable(CONFIGTABLE)
    }

    const selectMusicDataTable = async () => {
        return await db.selectTable(MUSICDATATABLE)
    }

    const insertConfigTable = async (configname: string, status: string) => {
        const uuid = randomUUID()
        const lastchangetime = new Date().toLocaleDateString()
        const insertName = ['uuid', 'configname', 'status', 'lastchangetime']
        const insertValue = [uuid, configname, status, lastchangetime]
        return await db.insertItem(CONFIGTABLE, insertName, insertValue)
    }

    const insertMusicDataTable = (data: musicFileExt) => {
        const uuid = randomUUID()
        const createTime = new Date().toLocaleDateString()
        const insertName = [
            'uuid',
            'musicname',
            'url',
            'ext',
            'tag',
            'listid',
            'createtime',
            'length',
            'lastopentime',
        ]
        const tag = data.tag?.join(',')
        const length = data.length ? data.length : 0
        const insertvalue = [
            uuid,
            data.name,
            data.url,
            data.ext,
            tag,
            data.listID,
            createTime,
            length,
            createTime,
        ]
        return db.insertItem(MUSICDATATABLE, insertName, insertvalue)
    }

    const insertManyMusicDataTable = async (dataList: musicFileExt[]) => {
        const uuid = randomUUID()
        const createTime = new Date().toLocaleDateString()
        let insertList: any[] = []
        const insertName = [
            'uuid',
            'musicname',
            'url',
            'ext',
            'tag',
            'listid',
            'createtime',
            'length',
            'lastopentime',
        ]
        dataList.forEach((data) => {
            const tag = data.tag?.join(',')
            const length = data.length ? data.length : 0
            const val = [
                uuid,
                data.name,
                data.url,
                data.ext,
                tag,
                data.listID,
                createTime,
                length,
                createTime,
            ]
            insertList.push(val)
        })
        return await db.insertManyItem(MUSICDATATABLE, insertName, insertList)
    }

    const deleteMusicDataTable = async (uuid: string) => {
        return await db.deleteItem(MUSICDATATABLE, uuid)
    }

    const selectConfigItem = async (configname?: string, uuid?: string) => {
        if (!configname) {
            return await db.selectItem(CONFIGTABLE, 'configname', configname)
        } else if (!uuid) {
            return await db.selectItem(CONFIGTABLE, 'uuid', uuid)
        } else {
            throw new error('no val')
        }
    }

    const updateConfigItem = async (configname: string, status: string) => {
        const configNameList = [configname]
        const valList: any[] = [status]
        return await db.updateItem(CONFIGTABLE, configNameList, valList)
    }

    const config = {
        createConfigTable,
        insertConfigTable,
        seleteConfigTable,
        selectConfigItem,
        updateConfigItem,
    }

    const musicData = {
        createMusicDataTable,
        selectMusicDataTable,
        insertMusicDataTable,
        insertManyMusicDataTable,
        deleteMusicDataTable,
    }

    return {
        config,
        musicData,
    }
}
