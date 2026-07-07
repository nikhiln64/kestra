// jsdom polyfills for Monaco editor (KsEditor)
if (typeof document !== "undefined" && typeof document.queryCommandSupported !== "function") {
    (document as any).queryCommandSupported = () => false
}
if (typeof document !== "undefined" && typeof document.execCommand !== "function") {
    (document as any).execCommand = () => false
}
if (typeof Element !== "undefined" && typeof Element.prototype.scrollIntoView !== "function") {
    Element.prototype.scrollIntoView = () => {}
}
if (typeof window !== "undefined" && typeof window.matchMedia !== "function") {
    (window as any).matchMedia = (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
    })
}
// jsdom doesn't implement ResizeObserver (used by TaskEdit's stacked-layout detection)
if (typeof globalThis.ResizeObserver === "undefined") {
    (globalThis as any).ResizeObserver = class {
        observe() {}
        unobserve() {}
        disconnect() {}
    }
}
// jsdom doesn't implement CSS.escape (used by BlockEditor's data-dock-pane-id lookups)
if (typeof globalThis.CSS === "undefined" || typeof globalThis.CSS.escape !== "function") {
    (globalThis as any).CSS = {
        ...(globalThis as any).CSS,
        escape: (value: string) => String(value).replace(/([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g, "\\$1"),
    }
}
