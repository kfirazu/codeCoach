import io, { Socket } from 'socket.io-client'
import { User } from '../interfaces/user.interface'
import { userService } from './user.service'

const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'
export const socketService = createSocketService()

socketService.setup()

export const SOCKET_EMIT_LOGIN = 'set-user-socket'
export const SOCKET_EMIT_LOGOUT = 'unset-user-socket'
export const SOCKET_EMIT_UPDATE_CODE_BLOCK = 'update-code-block'
export const SOCKET_EMIT_SET_CODE_BLOCK = 'set-code-block'


function createSocketService() {
  let socket: Socket

  const socketService = {
    setup() {
      socket = io(baseUrl)
      setTimeout(() => {
        const user = userService.getLoggedInUser()
        if (user) this.login(user._id)
      }, 500)
    },
    async setCodeBlock(codeBlockId: string, loggedInUser: User | undefined) {
      if (!socket) await socketService.setup()
      socket.emit(SOCKET_EMIT_SET_CODE_BLOCK, codeBlockId, loggedInUser)
    },
    async updateCodeBlock(codeBlock: { _id: string, code: string }, loggedInUser: User | undefined) {
      if (!socket) await socketService.setup()
      socket.emit(SOCKET_EMIT_UPDATE_CODE_BLOCK, codeBlock, loggedInUser)
    },
    on(eventName: string, cb: () => void) {
      socket.on(eventName, cb)
    },
    emit(eventName: string, data: Object) {
      socket.emit(eventName, data)
    },
    login(userId: string) {
      socket.emit(SOCKET_EMIT_LOGIN, userId)
    },
    off(eventName: string, cb = null) {
      if (!socket) return;
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    async logout() {
      if (!socket) await socketService.setup()
      socket.emit(SOCKET_EMIT_LOGOUT)
    },
  }

  return socketService
}
