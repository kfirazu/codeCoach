import { Credentials, User } from "../interfaces/user.interface"
import { httpService } from './http.service';
import { socketService } from "./socket.service";

const USER_BASE_URL = 'user/'
const AUTH_BASE_URL = 'auth/'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedInUser'

export const userService = {
    getUsers,
    login,
    getLoggedInUser,
    logout
}

async function getUsers() {
    try {
    
        return await httpService.get(USER_BASE_URL)
    } catch (err) {
        console.log('Get users has failed', err)
        throw err
    }
}

async function login(userCred: Credentials) {
    try {
        const user = await httpService.post(`${AUTH_BASE_URL}login`, userCred)
        if (user) {
            socketService.login(user._id)
            return _saveLocalUser(user)

        }
    } catch (err) {
        console.log('Failed to login', err)
        throw err
    }
}

async function logout() {
    try {
        await httpService.post(`${AUTH_BASE_URL}logout`)
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
        socketService.logout()
    } catch (err) {
        console.log('Cannot logout', err)
        throw err
    }
}

function getLoggedInUser() {
    const user = sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER)
    if (user) return JSON.parse(user)
}

function _saveLocalUser(user: User) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}