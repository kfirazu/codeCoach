import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from '../interfaces/user.interface';
import { CodeBlock } from '../interfaces/codeBlock.interface';
import { codeBlockService } from '../services/code.block.service';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { material } from '@uiw/codemirror-theme-material'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import { BsArrowLeft } from 'react-icons/bs'
import { storageService } from '../services/async.storage.service';


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
    const [connectedUsers, setConnectedUsers] = useState<User[]>([])
    const [codeBlock, setCodeBlock] = useState<CodeBlock>()
    console.log('connectedUsers:', connectedUsers)

    useEffect(() => {
        // onSetUserRole()
        //socket.on - user got into the room
        // cb function onSetUserRole(users[0])
    }, [connectedUsers, setConnectedUsers])

    useEffect(() => {
        ; (async () => {
            const codeBlock = await codeBlockService.getCodeBlocksById(codeBlockId!)
            setCodeBlock(codeBlock)
        })()
    }, [codeBlockId, setCodeBlock])

    useEffect(() => {
        updateConnectedUsers(connectedUsers)
    }, [connectedUsers])



    const onGoBack = () => {
        navigate(-1)
    }

    // const onSetUserRole = () => {
    //     if (!connectedUsers?.length) connectedUsers![0].isMentor = true
    //     else {
    //         connectedUsers.forEach((user, idx) => {
    //             if (idx !== 0) user.isMentor = false
    //         })
    //     }
    //     setUserRole(connectedUsers![0])
    // }
    const updateConnectedUsers = (users: User[]) => {
        if (users.length === 1 && users[0]._id === loggedInUser?._id) {
            users[0].isMentor = true
            setConnectedUsers(users)

        } else {
            users.forEach((user, idx) => user.isMentor = false)
        }

    }

    const handleChange = (newCode: string) => {
        if (userRole?.isMentor) return
        else {
            codeBlockService.updateCodeBlock({ _id: codeBlock!._id, code: newCode })
            if (newCode === codeBlock?.solution) {
                alert('Great success!')
            }
        }
    }

    console.log('connectedUsers:', connectedUsers)
    return (
        <section className="code-block-details">
            <h1 className="code-block-title">{codeBlock?.title}</h1>
            <div>{connectedUsers.map((user) => (
                <div key={user._id}>{user.username}{user.isMentor ? 'Mentor' : 'Stuent'}</div>
            ))}</div>
            <div className="icon-back" onClick={onGoBack}><BsArrowLeft /></div>
            {codeBlock && <CodeMirror
                value={codeBlock.code}
                height="400px"
                width="800px"
                extensions={[javascript({ jsx: true })]}
                onChange={handleChange}
                editable={!loggedInUser?.isMentor}
                theme={vscodeDark}

            // placeholder="placeholder: 'Please enter the JavaScript code.'"

            />
            }
        </section>
    )
}

