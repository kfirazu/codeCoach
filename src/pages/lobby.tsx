import { FC, useEffect, useState } from "react"
import { CodeBlock } from "../interfaces/codeBlock.interface";
import { User } from '../interfaces/user.interface';
import { codeBlockService } from '../services/code.block.service';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface LobbyProps {
    loggedInUser: User | undefined
}

export const Lobby: FC<LobbyProps> = ({ loggedInUser }) => {

    const [codeBlockList, setCodeBlockList] = useState<CodeBlock[]>()
    const navigate = useNavigate()

    // Puts codeblock in component state when component mounts
    useEffect(() => {
        ; (async () => {
            try {
                const codeBlocks = await codeBlockService.getCodeBlocks()
                setCodeBlockList(codeBlocks)
            } catch (err) {
                console.log('Cannot get code blocks', err)
                toast.error('Cannot get code blocks', {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
               
            }
        })()
    }, [setCodeBlockList])

    // Sends chosen code block to the server and navigate user to codeBlockDetails
    const onSelectCodeBlock = (codeBlockId: string) => {
        codeBlockService.getCodeBlocksById(codeBlockId)
        navigate(`/codeBlock/${codeBlockId}`)

    }

    if (!codeBlockList) return <div>Loading...</div>
    return (
        <section className="lobby">
            <h1 className="title">Choose a code block</h1>
            <div className="code-block-list">
                {codeBlockList && codeBlockList.map((codeBlock, idx) => (
                    (
                        <div
                            key={codeBlock._id} className="code-block-preview"
                            onClick={() => onSelectCodeBlock(codeBlock._id)}>
                            {idx + 1 + '. ' + codeBlock.title}
                        </div>
                    )
                ))}
            </div>
        </section>
    )
}

