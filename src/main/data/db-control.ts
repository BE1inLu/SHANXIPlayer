import { app } from 'electron'
import { join, relative } from 'path'
import db from 'sqlite-electron'
import { useUtil } from '../util/util'
import { randomUUID } from 'crypto'
import { musicFileExt } from '@main/types'

export function procdb() {
    const { checkFilePath, createFile } = useUtil()
    const path = join(app.getAppPath(), 'basedb.sqlite3')

    const pathflag = checkFilePath(path)

    if (!pathflag) createFile(path)

    const resPath = relative(__dirname, path)

    db.setdbPath(resPath)

    if (!pathflag) {
        console.log('db proc success')
        /* 创建表格 */
        createConfigTable()
        createDataTable()
        /* 初始化默认字段在此处添加 */
        insertConfigItem('voice', '20')
    }
}

function createConfigTable() {
    const createval = [
        '`uuid` text NOT NULL',
        '`configname` text',
        '`status` text',
        '`lastchangetime` text',
        'PRIMARY KEY (`uuid`)',
    ]
    const val = createval.join(',')
    const sql = 'CREATE TABLE `' + 'configtable' + '` (' + val + ')'
    return new Promise<any>((resolve, reject) => {
        db.executeScript(sql)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

function createDataTable() {
    const createval = [
        '`uuid` text NOT NULL',
        '`musicname` text',
        '`dataid` number',
        '`url` text',
        '`ext` text',
        '`tag` text',
        '`listid` text',
        '`createtime` text',
        '`musiclength` number',
        '`lastopentime` text',
    ]
    const val = createval.join(',')
    const sql = 'CREATE TABLE `' + 'musicdatatable' + '` (' + val + ')'
    return new Promise<any>((resolve, reject) => {
        db.executeScript(sql)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export async function insertConfigItem(configname: string, status: string) {
    const uuid = randomUUID()
    const lastchangetime = new Date().toLocaleDateString()
    const insertValue = [uuid, configname, status, lastchangetime]
    const sql =
        'INSERT INTO `' +
        'configtable' +
        '` (`uuid`, `configname`, `status`, `lastchangetime`) ' +
        'VALUES (?,?,?,?)'

    return new Promise<any>((resolve, reject) => {
        db.executeQuery(sql, '', insertValue)
            .then((req) => {
                resolve(req)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export async function readConfigTable() {
    const sql = 'SELECT * FROM `configtable` '
    return new Promise<any>((resolve, reject) => {
        db.executeQuery(sql, 'all')
            .then((req) => {
                resolve(req)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export async function updateConfigItem(configname: string, value: string) {
    const sql = 'UPDATE `configtable` SET `status` = ?, `lastchangetime` = ? WHERE `configname` = ?'
    const lastchangetime = new Date().toLocaleDateString()
    const val = [value, lastchangetime, configname]
    return new Promise<any>((resolve, reject) => {
        db.executeQuery(sql, '', val)
            .then((req) => {
                resolve(req)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export async function readMusicDataTable() {
    const sql = 'SELECT * FROM `musicdatatable` '
    return new Promise<any>((resolve, reject) => {
        db.executeQuery(sql, 'all')
            .then((req) => {
                resolve(req)
            })
            .catch((err) => {
                reject(err)
            })
    })
}
export async function insertMusicDataTable(musicitem: musicFileExt) {
    const uuid = randomUUID()
    const lastchangetime = new Date().toLocaleDateString()
    const sql =
        'INSERT INTO `' +
        'musicdatatable` ' +
        '(`uuid`,`musicname`,`dataid`,`url`,`ext`,`tag`,' +
        '`listid`,`createtime`,`musiclength`,`lastopentime`)' +
        'VALUES(?,?,?,?,?,?,?,?,?,?)'
    const tag: string = musicitem.tag ? musicitem.tag!.join(',') : ''
    const listid: number = musicitem.listID ? musicitem.listID! : 0
    const musiclength: number = musicitem.musicLength ? musicitem.musicLength! : 0
    const value = [
        uuid,
        musicitem.name,
        musicitem.fileid!,
        musicitem.url,
        musicitem.ext,
        tag,
        listid,
        lastchangetime,
        musiclength,
        lastchangetime,
    ]
    return new Promise<any>((resolve, reject) => {
        db.executeQuery(sql, '', value)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export async function insertManyMusicData(data: musicFileExt[]) {
    let valueList: any[] = getvalueList(data)
    const sql =
        'INSERT INTO `' +
        'musicdatatable` ' +
        '(`uuid`,`musicname`,`dataid`,`url`,`ext`,`tag`,' +
        '`listid`,`createtime`,`musiclength`,`lastopentime`)' +
        'VALUES(?,?,?,?,?,?,?,?,?,?)'

    return new Promise<any>((resolve, reject) => {
        db.executeMany(sql, valueList)
            .then((req) => {
                resolve(req)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

function getvalueList(data: musicFileExt[]) {
    let valueList: any[] = []
    data.forEach((i) => {
        const lastchangetime = new Date().toLocaleDateString()
        const value = [
            randomUUID(),
            i.name,
            i.fileid!,
            i.url,
            i.ext,
            i.tag ? i.tag!.join(',') : '',
            i.listID ? i.listID! : 0,
            lastchangetime,
            i.musicLength ? i.musicLength! : 0,
            lastchangetime,
        ]
        valueList.push(value)
    })
    return valueList
}
