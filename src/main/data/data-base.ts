import { executeMany, executeQuery, executeScript, setdbPath } from 'sqlite-electron'
export class DataBase {
    private dbPath: string = ''

    public getDbPath(): string {
        return this.dbPath
    }

    public setDbPath(value: string) {
        this.dbPath = value
    }

    constructor(dbpath: string) {
        this.setDbPath(dbpath)
        setdbPath(this.dbPath)
    }

    useScript(sqlScript: string) {
        return new Promise<any>((resolve, reject) => {
            executeScript(sqlScript)
                .then((req) => {
                    resolve(req)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    async createTableSync(tableName: string, createVal: string[]) {
        const val = createVal.join(',')
        const sqlscript = 'CREATE TABLE `' + tableName + '` (' + val + ')'

        return await this.useScript(sqlscript)
    }

    async insertItem(tableName: string, insertName: string[], insertValue: any[]) {
        const _insertName = insertName.join(',')
        let insert: string[] = []
        insertValue.forEach(() => {
            insert.push('?')
        })
        const val = insert.join(',')

        const sql = 'INSERT INTO `' + tableName + '` (' + _insertName + ') VALUES (' + val + ')'

        return await executeQuery(sql, '', insertValue)
    }

    async insertManyItem(tableName: string, insertName: string[], insertValue: any[]) {
        const _insertName = insertName.join(',')
        let insert: string[] = []
        insertName.forEach(() => {
            insert.push('?')
        })
        const val = insert.join(',')

        const sql = 'INSERT INTO `' + tableName + '` (' + _insertName + ') VALUES (' + val + ')'
        return await executeMany(sql, insertValue)
    }

    async deleteItem(tableName: string, uuid: string) {
        const sql = 'DELETE FROM `' + tableName + '` where uuid = ?'
        const val = [uuid]
        return await executeQuery(sql, '', val)
    }

    selectItem(tableName: string, valname: string, val: any) {
        return new Promise<any>((resolve, rejct) => {
            const sql = 'SELECT * FROM `' + tableName + '` WHERE ' + valname + ' = ?'
            const value = [val]
            executeQuery(sql, 'all', value)
                .then((req) => {
                    resolve(req)
                })
                .catch((err) => {
                    rejct(err)
                })
        })
    }

    selectTable(tableName: string) {
        return new Promise<any>((resolve, reject) => {
            executeQuery('SELECT * FROM ' + tableName, 'all')
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    updateItem(tableName: string, setValName: string[], setVal: any[]) {
        return new Promise<any>((resolve, reject) => {
            let setsqlvalArr: string[] = []
            setValName.forEach((i) => {
                let j = i + ' = ? '
                setsqlvalArr.push(j)
            })
            const sql = 'UPDATE `' + tableName + '` SET ' + setsqlvalArr.join(',')
            executeQuery(sql, '', setVal)
                .then((req) => resolve(req))
                .catch((err) => reject(err))
        })
    }
}
