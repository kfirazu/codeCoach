import { FC } from "react";
import { User } from '../interfaces/user.interface';

// Also should get as props the loggedInUser to determine if user can update the codeBlock or on readonly mode.
// Should get the student name from the url params
// Should get the codeBlock id from the params (and get it from db or demo data)
// Should send and update function using sockets (if user is the student)

// Should have a state isMentor, setIsMentor- inside a function that checks the length of connected users to this "room".
// if users[].length === 1 then setIsMentor(users[0]) else user = 'student'

interface CodeBlockDetailsProps {
    loggedInUser: User | undefined
}

export const CodeBlockDetails: FC<CodeBlockDetailsProps> = ({ loggedInUser }) => {
    console.log('loggedInUser codeblock details:', loggedInUser)
    return (
        <h1>Hello from code block page</h1>
    )
}

