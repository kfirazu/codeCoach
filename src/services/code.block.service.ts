import { httpService } from './http.service'


const BASE_URL = 'codeblock/'
// const STORAGE_KEY = 'codeblock'

export const codeBlockService = {
    getCodeBlocks,
    getCodeBlocksById,
    updateCodeBlock,
}

async function getCodeBlocks() {
    try {
        return await httpService.get(BASE_URL)
    } catch (err) {
        console.log('Failed to get code blocks', err)
        throw err
    }
}

async function getCodeBlocksById(codeBlockId: string) {
    try {
        return httpService.get(BASE_URL + codeBlockId)
    } catch (err) {
        console.log('Failed to get code block by id', err)
        throw err
    }

}

async function updateCodeBlock(codeBlock: { _id: string, code: string }) {
    try {
        return httpService.put(BASE_URL + codeBlock._id, codeBlock)
    } catch (err) {
        console.log('Failed to update code block', err)
        throw err
    }

}

function _save(entityType: string, entities: any) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}
