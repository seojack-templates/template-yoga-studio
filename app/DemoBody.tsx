'use client';

import { useEffect } from 'react';
import SeojackCredit from './SeojackCredit';
import { STYLE_CSS, BODY_HTML, INLINE_JS, FONT_LINKS, EXTERNAL_SCRIPTS, BODY_CLASS } from './content';

// Make addEventListener('DOMContentLoaded') fire immediately (DOM is already
// ready when this runs on mount), and isolate failures.
const JS_PREFIX =
    "(function(){var __a=document.addEventListener.bind(document);" +
    "document.addEventListener=function(t,f,o){if(t==='DOMContentLoaded'){try{f();}catch(e){console.error(e);}return;}return __a(t,f,o);};" +
    "try{";
const JS_SUFFIX = "}catch(e){console.error('[template]',e);}})();";

export default function DemoBody() {
    useEffect(() => {
        let cancelled = false;
        const added: HTMLScriptElement[] = [];
        (async () => {
            for (const src of EXTERNAL_SCRIPTS) {
                if (cancelled) return;
                await new Promise<void>((resolve) => {
                    const s = document.createElement('script');
                    s.src = src;
                    s.async = false;
                    s.onload = () => resolve();
                    s.onerror = () => resolve();
                    document.body.appendChild(s);
                    added.push(s);
                });
            }
            if (!cancelled && INLINE_JS.trim()) {
                const s = document.createElement('script');
                s.textContent = JS_PREFIX + INLINE_JS + JS_SUFFIX;
                document.body.appendChild(s);
                added.push(s);
            }
        })();
        return () => {
            cancelled = true;
            added.forEach((s) => s.remove());
        };
    }, []);

    return (
        <>
            {FONT_LINKS.map((href, i) => (
                <link key={i} rel="stylesheet" href={href} />
            ))}
            <style dangerouslySetInnerHTML={{ __html: STYLE_CSS }} />
            <div className={BODY_CLASS || undefined} dangerouslySetInnerHTML={{ __html: BODY_HTML }} />
            <SeojackCredit templateId="tpl_yoga_studio" />
        </>
    );
}
