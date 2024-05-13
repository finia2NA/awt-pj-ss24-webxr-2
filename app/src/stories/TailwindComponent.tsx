interface TailwindComponentProps {
    /**
     * A second line of text that can be changed
     */
    changeableText: string;
}

/**
 * A simple demo component that shows how Tailwind CSS can be used in Storybook
 * The top line of text doesn't change while the second one can so we can show how
 * props work.
 * 
 * Also, the second `p` tag has centered text.
 */
export const TailwindComponent = ({ changeableText }: TailwindComponentProps) => {
    return (
        <div className="flex flex-col items-center">
            <p className="text-xl">This text doesn't change</p>
            <p className="text-center">{changeableText}</p>
        </div>
    )
}