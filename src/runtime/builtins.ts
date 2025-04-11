// filepath: /pronto-lang/pronto-lang/src/runtime/builtins.ts
export function print(...args: any[]): void {
    console.log(...args);
}

export function querySelector(selector: string): HTMLElement | null {
    return document.querySelector(selector);
}

export function querySelectorAll(selector: string): NodeListOf<HTMLElement> {
    return document.querySelectorAll(selector);
}

export function createElement(tag: string): HTMLElement {
    return document.createElement(tag);
}

export function setHTML(element: HTMLElement, html: string): void {
    element.innerHTML = html;
}

export function setText(element: HTMLElement, text: string): void {
    element.textContent = text;
}

export function addClass(element: HTMLElement, className: string): void {
    element.classList.add(className);
}

export function removeClass(element: HTMLElement, className: string): void {
    element.classList.remove(className);
}

export function on(element: HTMLElement, event: string, handler: EventListener): void {
    element.addEventListener(event, handler);
}

export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function now(): number {
    return Date.now();
}