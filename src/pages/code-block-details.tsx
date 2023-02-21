import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from '../interfaces/user.interface';
import { CodeBlock } from '../interfaces/codeBlock.interface';
import { codeBlockService } from '../services/code.block.service';

// Also should get as props the loggedInUser to determine if user can update the codeBlock or on readonly mode.
// Should get the codeBlock id from the params (and get it from db or demo data)
// Should send and update function using sockets (if user is the student)

// Should have a state isMentor, setIsMentor- inside a function that checks the length of connected users to this "room".
// if users[].length === 1 then setIsMentor(users[0]) else user = 'student'

interface CodeBlockDetailsProps {
    loggedInUser: User | undefined
}

export const CodeBlockDetails: FC<CodeBlockDetailsProps> = ({ loggedInUser }) => {

    const { codeBlockId } = useParams()
    const navigate = useNavigate()
    const [userRole, setUserRole] = useState<User>()
    const [users] = useState<User[]>()
    const [codeBlock, setCodeBlock] = useState<CodeBlock>()
    console.log('codeBlockId:', codeBlockId)
    console.log('loggedInUser codeblock details:', loggedInUser)

    useEffect(() => {
        //socket.on - user got into the room
        // cb function onSetUserRole(users[0])
    }, [users])

    useEffect(() => {
        ; (async () => {
            const codeBlock = await codeBlockService.getCodeBlocksById(codeBlockId!)
            setCodeBlock(codeBlock)
        })()
    }, [codeBlockId, setCodeBlock])



    const onGoBack = () => {
        navigate(-1)
    }

    const onSetUserRole = () => {
        if (!users?.length) users![0].isMentor = true
        setUserRole(users![0])

    }
    console.log('codeBlock.code:', codeBlock?.code)
    return (
        <section className="code-block-details">
            <h1>Hello from code block page</h1>
            <div onClick={onGoBack}><h1>back</h1></div>
            <pre>{codeBlock?.code}</pre>
        </section>
    )
}

