import { Text } from '@react-three/uikit'
import { Card } from '../components/apfel/card.js'
import { List, ListItem } from '../components/apfel/list.js'
import { forwardRef } from 'react'

export interface ProgramItem {
    title: string;
    src: string;
    subtitle?: string;
    leadingAccessory?: JSX.Element;
    trailingAccessory?: JSX.Element;
    isFirst?: boolean;
    isLast?: boolean;
    selected?: boolean;
}

interface ProgramListProps {
    items: ProgramItem[];
    onItemClick: (item: ProgramItem) => void;
}

export const ProgramList = forwardRef<unknown, ProgramListProps>(({ items, onItemClick }, ref) => {
    return (
        <Card flexDirection="column" borderRadius={6} padding={8} width={230}>
            <List type="inset">
                {items.map((item, index) => (
                    <ListItem
                        key={index}
                        isFirst={index === 0}
                        isLast={index === items.length - 1}
                        onClick={() => onItemClick(item)}
                        selected={item.selected}
                    >
                        <Text>{item.title}</Text>
                    </ListItem>
                ))}
            </List>
        </Card>
    );
});