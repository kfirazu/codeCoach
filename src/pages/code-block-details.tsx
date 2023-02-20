import { FC } from "react";

// Also should get as props the loggedInUser to determine if user can update the codeBlock or on readonly mode.
// Should get the student name from the url params
// Should get the codeBlock id from the params (and get it from db or demo data)
// Should send and update function using sockets (if user is the student)

const CodeBlockDetails: FC = () => {
    return (
        <h1>Hello from code block page</h1>
    )
}

export { CodeBlockDetails }