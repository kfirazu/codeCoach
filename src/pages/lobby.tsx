import { FC } from "react"
import { User } from '../interfaces/user.interface';

interface LobbyProps {
    loggedInUser: User | undefined
}

//Todo:
// Need to check the logged in user if it is a mentor or a student
// If it is a mentor he can pick a codeblock
// Think of what students are able to see on the lobby page - can students ask for a specific codeblock or only mentor can decide.

//Todo:
// Show a list of codeblock titles
// A user can pick a specific codeblock and the go to codeBlockDetails page

const Lobby: FC<LobbyProps> = (loggedInUser) => {
    console.log('loggedInUser:', loggedInUser)
    return (
        <h1>Hello from lobby page Choose a code block</h1>
    )
}

export { Lobby }