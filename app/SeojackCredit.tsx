/**
 * SEOJack template credit footer.
 *
 * Standalone marketing templates ship this small, unobtrusive credit bar at the
 * very bottom of the page. It doubles as an inbound link to seojack.net.
 *
 * The `new-standalone-template.ps1` generator copies this file into each
 * `template-{slug}/app/SeojackCredit.tsx`. When a template's source is used as
 * an AI-Builder seed (Phase 5), the seed step removes this file and its import
 * so the client's site does not carry the SEOJack credit.
 */
export default function SeojackCredit({ templateId }: { templateId?: string }) {
    const href = templateId
        ? `https://seojack.net/templates/${templateId}`
        : 'https://seojack.net/templates';
    return (
        <div
            style={{
                borderTop: '1px solid rgba(0,0,0,0.08)',
                background: '#ffffff',
                color: '#3b3b46',
                fontFamily:
                    'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                fontSize: '13px',
                lineHeight: 1.4,
                padding: '14px 20px',
                textAlign: 'center',
            }}
        >
            <a
                href={href}
                target="_blank"
                rel="noopener"
                style={{ color: '#5930A3', fontWeight: 600, textDecoration: 'none' }}
            >
                Built by SEOJack
            </a>{' '}
            <span style={{ opacity: 0.7 }}>— get this template free at seojack.net</span>
        </div>
    );
}
