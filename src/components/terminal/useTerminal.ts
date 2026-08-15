import { useEffect, useState } from 'react';

export function useTerminal() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            const target = e.target as HTMLElement;
            const typing = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';
            if (e.key === '/' && !typing && !open) {
                e.preventDefault();
                setOpen(true);
            }
            if (e.key === 'Escape') setOpen(false);
        }
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [open]);

    return { open, setOpen };
}