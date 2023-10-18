import { app } from 'electron'
import { join, relative } from 'path'
import db from 'sqlite-electron'
import { useUtil } from '../util/util'
import { randomUUID } from 'crypto'
import { musicFileExt } from '@main/types'

/**
 * 初始化数据库
 */
export function procdb() {
    const { checkFilePath, createFile } = useUtil()
    const filepath = join(app.getAppPath(), 'basedb.sqlite3')
    const pathflag = checkFilePath(filepath)

    if (!pathflag) createFile(filepath)

    const resPath = relative(__dirname, filepath)

    db.setdbPath(resPath)

    if (!pathflag) {
        console.log('db proc success')
        /* 创建表格 */
        createConfigTable()
        createDataTable()
        createTabsTable()
        /* 初始化默认字段在此处添加 */
        insertConfigItem('voice', '20')
        insertTabsItem('default')
    }
}

/**
 * 创建 config 表
 * @returns
 */
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
    return new Promise((resolve, reject) => {
        db.executeScript(sql)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

/**
 * 创建 musicdata 表
 * @returns
 */
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
    return new Promise((resolve, reject) => {
        db.executeScript(sql)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

/**
 * config表新行插入
 * @param configname
 * @param status
 * @returns
 */
export async function insertConfigItem(configname: string, status: string) {
    const uuid = randomUUID()
    const lastchangetime = new Date().toLocaleDateString()
    const insertValue = [uuid, configname, status, lastchangetime]
    const sql =
        'INSERT INTO `' +
        'configtable' +
        '` (`uuid`, `configname`, `status`, `lastchangetime`) ' +
        'VALUES (?,?,?,?)'

    return new Promise((resolve, reject) => {
        db.executeQuery(sql, '', insertValue)
            .then((req) => {
                resolve(req)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

/**
 * 查看config表数据
 * @returns
 */
export async function readConfigTable() {
    const sql = 'SELECT * FROM `configtable` '
    return new Promise((resolve, reject) => {
        db.executeQuery(sql, 'all')
            .then((req) => {
                resolve(req)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

/**
 * 更新config item数据
 * @param configname
 * @param value
 * @returns
 */
export async function updateConfigItem(configname: string, value: string) {
    const sql = 'UPDATE `configtable` SET `status` = ?, `lastchangetime` = ? WHERE `configname` = ?'
    const lastchangetime = new Date().toLocaleDateString()
    const val = [value, lastchangetime, configname]
    return new Promise((resolve, reject) => {
        db.executeQuery(sql, '', val)
            .then((req) => {
                resolve(req)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

/**
 * 查看musicdata表数据
 * @returns
 */
export async function readMusicDataTable() {
    const sql = 'SELECT * FROM `musicdatatable` '
    return new Promise((resolve, reject) => {
        db.executeQuery(sql, 'all')
            .then((req: any) => {
                const result = decodeMusicDataList(req)
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

/**
 * musicdata表单行插入
 * @param musicitem
 * @returns
 */
export async function insertMusicDataTable(musicitem: musicFileExt) {
    const uuid = randomUUID()
    const lastchangetime = new Date().toLocaleDateString()
    const sql =
        'INSERT INTO `' +
        'musicdatatable` ' +
        '(`uuid`,`musicname`,`dataid`,`url`,`ext`,`tag`,' +
        '`listid`,`createtime`,`musiclength`,`lastopentime`)' +
        'VALUES(?,?,?,?,?,?,?,?,?,?)'
    const tag: string = musicitem.tag ? musicitem.tag.join(',') : ''
    const listid: number = musicitem.listID ? musicitem.listID : 0
    const musiclength: number = musicitem.musicLength ? musicitem.musicLength : 0
    const value = [
        uuid,
        encodeURI(musicitem.name),
        musicitem.fileid,
        encodeURI(musicitem.url),
        musicitem.ext,
        tag,
        listid,
        lastchangetime,
        musiclength,
        lastchangetime,
    ]
    return new Promise((resolve, reject) => {
        db.executeQuery(sql, '', value)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

/**
 * musicdata表多行插入
 * @param data
 * @returns
 */
export async function insertManyMusicData(data: musicFileExt[]) {
    const valueList = getvalueList(data)
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const valueList: any[] = []
    data.forEach((i) => {
        const lastchangetime = new Date().toLocaleDateString()
        const value = [
            randomUUID(),
            encodeURI(i.name),
            i.fileid,
            encodeURI(i.url),
            i.ext,
            i.tag ? i.tag.join(',') : '',
            i.listID ? i.listID : 0,
            lastchangetime,
            i.musicLength ? i.musicLength : 0,
            lastchangetime,
        ]
        valueList.push(value)
    })
    return valueList
}

function decodeMusicDataList(data: any): musicFileExt[] {
    data.forEach((item) => {
        item[1] = decodeURI(item[1])
        item[3] = decodeURI(item[3])
    })
    return data
}

/**
 * deleteMusicDataItem
 * @param data
 * @returns
 */
export async function deleteMusicDataItem(data: musicFileExt) {
    const sql = 'DELETE FROM musicdatatable WHERE uuid = ?'
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const uuid = data.UUID!
    const val = [uuid]
    return new Promise((resolve, reject) => {
        db.executeQuery(sql, '', val)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

/**
 * 创建 tabstable
 * @returns
 */
function createTabsTable() {
    const createval = [
        '`uuid` text NOT NULL',
        '`tabname` text',
        'PRIMARY KEY (`uuid`)',
    ]
    const val = createval.join(',')
    const sql = 'CREATE TABLE `' + 'tabstable' + '` (' + val + ')'
    return new Promise((resolve, reject) => {
        db.executeScript(sql)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

/**
 * insertTabsItem
 * @param tabname
 * @returns
 */
export async function insertTabsItem(tabname: string) {
    const uuid = randomUUID()
    const insertValue = [uuid, tabname]
    const sql = 'INSERT INTO `' + 'tabstable' + '` (`uuid`, `tabname`) ' + 'VALUES (?,?)'
    return new Promise((resolve, reject) => {
        db.executeQuery(sql, '', insertValue)
            .then((req) => {
                resolve(req)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

/**
 * readTabsTable
 * @returns
 */
export async function readTabsTable() {
    const sql = 'SELECT `rowid`,`uuid`, `tabname` FROM `tabstable` '
    return new Promise((resolve, reject) => {
        db.executeQuery(sql, 'all')
            .then((req) => {
                resolve(req)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

/**
 * updateTabsItem
 * @param tabname
 * @param uuid
 * @returns
 */
export async function updateTabsItem(tabname: string, uuid: string) {
    const sql = 'UPDATE `tabstable` SET `tabname` = ? WHERE `uuid` = ?'
    const val = [tabname, uuid]
    return new Promise((resolve, reject) => {
        db.executeQuery(sql, '', val)
            .then((req) => {
                resolve(req)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

/**
 * deleteTabsItem
 * @param uuid
 * @returns
 */
export async function deleteTabsItem(uuid: string) {
    const sql = 'DELETE FROM `tabstable` WHERE uuid = ?'
    const val = [uuid]
    return new Promise((resolve, reject) => {
        db.executeQuery(sql, '', val)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
    })
}
