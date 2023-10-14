import { app } from 'electron'
import { join, relative } from 'path'
import db from 'sqlite-electron'
import { useUtil } from '../util/util'
import { randomUUID } from 'crypto'
import { rejects } from 'assert'

export function procdb() {
    const { checkFilePath, createFile } = useUtil()
    const path = join(app.getAppPath(), 'basedb.sqlite3')

    const pathflag = checkFilePath(path)

    if (!pathflag) createFile(path)

    const resPath = relative(__dirname, path)

    db.setdbPath(resPath)

    if (!pathflag) {
        /* 创建表格 */
        createConfigTable()
        createDataTable()
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
        '`length` text',
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
    const sql = 'UPDATE `configtable` SET ' + configname + '= ? WHERE `configname`= ' + configname
    const val = [value]
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
