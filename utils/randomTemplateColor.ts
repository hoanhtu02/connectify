
export function randomTemplateColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}
type ColorPlaceholderPhoto = {
    readonly background: string;
    readonly text: string;
};
const colors: ColorPlaceholderPhoto[] = [
    { background: "F87171", text: "fff" },
    { background: "FBBF24", text: "fff" },
    { background: "34D399", text: "fff" },
    { background: "60A5FA", text: "fff" },
    { background: "818CF8", text: "fff" },
    { background: "F472B6", text: "fff" },
    { background: "A5B4FC", text: "fff" },
    { background: "6EE7B7", text: "fff" },
    { background: "93C5FD", text: "fff" },
    { background: "FBCFE8", text: "fff" },
    { background: "FECACA", text: "fff" },
    { background: "FDE68A", text: "fff" },
    { background: "A7F3D0", text: "fff" },
    { background: "F0ABFC", text: "fff" },
    { background: "EDE9FE", text: "fff" },
    { background: "D1FAE5", text: "111" },
    { background: "FEEBC8", text: "111" },
    { background: "FED7D7", text: "111" },
];