import { Align } from "./align/align";
export { Align as AssistAlign } from "./align/align";
export const assistAlign = (store) => {
    const align = new Align(store);
    return {
        name: 'assist-align',
        data: align,
        install() {
            store.onMountEnd(() => align.mount());
            store.onMoveRectStart(() => align.render());
            store.onMoveRect(() => align.render());
            store.onMoveRectEnd(() => align.hidden());
        },
        uninstall() {
            align.unmount();
        }
    };
};
