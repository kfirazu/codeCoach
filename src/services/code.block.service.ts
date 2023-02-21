import { codeBlocks } from '../data/codeblocks'
import { CodeBlock } from '../interfaces/codeBlock.interface'
import { storageService } from './async.storage.service'
import { httpService } from './http.service'

const BASE_URL = 'codeblock/'
const STORAGE_KEY = 'codeblock'

export const codeBlockService = {
    getCodeBlocks,
    getCodeBlocksById,
    updateCodeBlock
}

function getCodeBlocks() {
    //should add async
    try {
        // return await httpService.get(BASE_URL)
        _save(STORAGE_KEY, codeBlocks)

        return codeBlocks
    } catch (err) {
        console.log('Failed to get code blocks', err)
        throw err
    }
}

async function getCodeBlocksById(codeBlockId: string) {
    try {
        return storageService.get(STORAGE_KEY + codeBlockId, codeBlockId)
        // return httpService.get(BASE_URL + codeBlockId)
    } catch (err) {
        console.log('Failed to get code block by id', err)
        throw err
    }

}

async function updateCodeBlock(codeBlock: { _id: string, code: string }) {
    try {
        return storageService.put(STORAGE_KEY + codeBlock._id, codeBlock)
        // return httpService.put(BASE_URL + codeBlock._id, codeBlock)
    } catch (err) {
        console.log('Failed to update code block', err)
        throw err
    }

}

function _save(entityType: string, entities: any) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}