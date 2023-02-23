import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from '../interfaces/user.interface';
import { CodeBlock } from '../interfaces/codeBlock.interface';
import { codeBlockService } from '../services/code.block.service';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import { BsArrowLeft } from 'react-icons/bs'
import { socketService, SOCKET_EMIT_SET_CODE_BLOCK } from "../services/socket.service";
import { utilService } from "../services/util.service";
import { toast } from 'react-toastify';

interface CodeBlockDetailsProps {
    loggedInUser: User | undefined
}

enum UserRole {
    MENTOR = 0,
    STUDENT = 1
}

export const CodeBlockDetails: FC<CodeBlockDetailsProps> = ({ loggedInUser }) => {

    const { codeBlockId } = useParams()
    const navigate = useNavigate()
    const [codeBlock, setCodeBlock] = useState<CodeBlock>()
    const [isSolutionMatched, setIsSolutionMatched] = useState(false)
    const [userRole, setUserRole] = useState<UserRole>(UserRole.STUDENT)

    // Connect codeBlock and user to codeBlock "room" via socket
    useEffect(() => {
        if (!codeBlock?._id) return
        socketService.setCodeBlock(codeBlock._id, loggedInUser)
        toast.success(`Welcome ${loggedInUser?.username}`, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        return () => socketService.off(SOCKET_EMIT_SET_CODE_BLOCK)
    }, [codeBlock?._id, loggedInUser])

    // Set codeblock from DB to component state
    useEffect(() => {
        ; (async () => {
            if (!codeBlockId) return
            const codeBlock = await codeBlockService.getCodeBlocksById(codeBlockId!)
            setCodeBlock(codeBlock)
        })()
    }, [codeBlockId, setCodeBlock])

    // Create an event listener to update code block socket & updates state
    // Sets first user as mentor
    useEffect(() => {
        socketService.on('update-code', (updatedCodeblock?: CodeBlock) => {
            setCodeBlock(prevState => ({ ...prevState, code: updatedCodeblock?.code } as CodeBlock))

        })

        socketService.on('user-connected', (connectedUsers?: User[]) => {
            const connectedUser = connectedUsers?.find((user: User) => user._id === loggedInUser?._id)
            const role = connectedUser && connectedUser.isMentor ? UserRole.MENTOR : UserRole.STUDENT
            setUserRole(role)


        })
        return () => {
            socketService.off('update-code')
            socketService.off('user-connected')
        }

    }, [])

    // Updates codeblock on change 
    const handleChange = (newCode: string) => {
        if (loggedInUser?.isMentor) return
        else {
            codeBlockService.updateCodeBlock({ _id: codeBlock!._id, code: newCode })
            socketService.updateCodeBlock({ _id: codeBlock!._id, code: newCode }, loggedInUser)
            if (newCode === codeBlock?.solution) {
                setIsSolutionMatched(true)
            }
        }
    }

    const throttleOnChange = utilService.throttle(handleChange, 1500)

    const onGoBack = () => {
        navigate(-1)
    }
    return (
        <section className="code-block-details">
            <h1 className="code-block-title">{codeBlock?.title}</h1>
            <div className="code-mirror">
                <div className="icon-back" onClick={onGoBack}><BsArrowLeft /></div>
                {codeBlock && <CodeMirror
                    value={codeBlock.code}
                    height="400px"
                    width="800px"
                    extensions={[javascript({ jsx: true })]}
                    onChange={throttleOnChange}
                    editable={userRole === UserRole.STUDENT}
                    theme={vscodeDark}

                />
                }
            </div>
            {isSolutionMatched && <div className="smiley-emoji">Great Job!!  😎</div>}
        </section>
    )
}
