import { it } from 'node:test'
import { expect, test } from 'vitest'
const funca = (a: number, b: number) => {
    return a + b
}

test('demo01', () => {
    it('test1', () => {
        expect(funca(1, 2)).eq(3)
    })
})
