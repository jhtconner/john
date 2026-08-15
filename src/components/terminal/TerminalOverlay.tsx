import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TerminalOverlay.module.css';

const HELP = [
    'available commands:',
    '  whoami     — about me',
    '  projects   — jump to selected work',
    '  blog       — jump to writing',
    '  contact    — get my email',
    '  sudo ...   — try it',
    '  clear      — clear the screen',
    '  exit       — close (or press esc)',
];

export function TerminalOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
    const [lines, setLines] = useState<string[]>(['type "help" to get started', '\u00A0']);
    const [input, setInput] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (open) inputRef.current?.focus();
    }, [open]);

    if (!open) return null;

    function run(cmd: string) {
        const trimmed = cmd.trim().toLowerCase();
        const echo = `user@jhtconner: ~$ ${cmd}`;
        switch (trimmed) {
            case 'help':
                setLines((l) => [...l, echo, ...HELP, '\u00A0']);
                break;
            case 'whoami':
                setLines((l) => [...l, echo,
                    'NAME: John Conner',
                    'OCCUPATION: Graduate Software Engineer at CTM',
                    'INTERESTS: Software Engineering, Machine Learning, and anything to do with coding.',
                    'BIO: I enjoy solving problems whether they\'re old or new, and love telling computers how to beep and boop.',
                    '\u00A0',
                    'ᕕ( ᐛ )ᕗ ',
                    '\u00A0',
                ]);
                break;
            case 'projects':
                setLines([]);
                setLines((l) => [...l, echo, 'type "help" to get started', '\u00A0']);
                onClose();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'blog':
                setLines([]);
                setLines((l) => [...l, echo, 'type "help" to get started', '\u00A0']);
                navigate('/');
                onClose();
                setTimeout(() => document.getElementById('writing')?.scrollIntoView({ behavior: 'smooth' }), 50);
                break;
            case 'contact':
                setLines((l) => [...l, echo, 'jhtconner@outlook.com', '\u00A0']);
                break;
            case 'clear':
                setLines([]);
                setLines((l) => [...l, echo, 'type "help" to get started', '\u00A0']);
                break;
            case 'exit':
                setLines((l) => [...l, echo, 'type "help" to get started', '\u00A0']);
                onClose();
                break;
            default:
                if (trimmed.startsWith('sudo')) {
                    setLines((l) => [...l, echo, 'nice try. permission denied.', '\u00A0']);
                } else {
                    setLines((l) => [...l, echo, `command not found: ${trimmed}`, '\u00A0']);
                }
        }
    }

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
                <div className={styles.output}>
                    {lines.map((line, i) => (
                        <div key={i}>{line}</div>
                    ))}
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (input.trim()) run(input);
                        setInput('');
                    }}
                    className={styles.inputRow}
                >
                    <span>$</span>
                    <input
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className={styles.input}
                        autoComplete="off"
                        spellCheck={false}
                    />
                </form>
            </div>
        </div>
    );
}