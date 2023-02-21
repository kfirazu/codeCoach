import { FC, useEffect, useState } from "react"
import { CodeBlock } from "../interfaces/codeBlock.interface";
import { User } from '../interfaces/user.interface';
import { codeBlockService } from '../services/code.block.service';
import { useNavigate } from 'react-router-dom';

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

export const Lobby: FC<LobbyProps> = ({ loggedInUser }) => {
    // console.log('loggedInUser lobby:', loggedInUser)

    const [codeBlockList, setCodeBlockList] = useState<CodeBlock[]>()
    const navigate = useNavigate()

    // Puts codeblock in component state when component mounts
    useEffect(() => {
        // will need to fetch code blocks from db - async function.
        const codeBlocks = codeBlockService.getCodeBlocks()
        setCodeBlockList(codeBlocks)
    }, [])

    // Sends chosen code block to the server
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

