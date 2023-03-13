import React, { useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';

import SortableWrapper from './SortableWrapper';
import { SortableItem } from './SortableItem';
import { parentElements } from './elements';
import { DragHandle } from './DragHandle';

export default function App() {
    const [parentItems, setParentItems] = useState(parentElements);

    function handleParentDragEnd(event) {
        const { active, over } = event;

        if (active.id !== over.id) {
            setParentItems((items) => {
                const oldIndex = items.findIndex(({ id }) => id === active.id);
                const newIndex = items.findIndex(({ id }) => id === over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    function handleChildDragEnd(event, parentId) {
        const { active, over } = event;

        if (active.id !== over.id) {
            setParentItems((items) => {
                const parentElement = items.find((item) => item.id === parentId);
                const oldIndex = parentElement.childElements.findIndex(({ id }) => id === active.id);
                const newIndex = parentElement.childElements.findIndex(({ id }) => id === over.id);

                return items.map((item) => {
                    return item.id === parentId
                        ? {
                            ...item,
                            childElements: arrayMove(item.childElements, oldIndex, newIndex)
                        }
                        : item;
                });
            });
        }
    }

    return (
        <SortableWrapper items={parentItems} onDragEnd={handleParentDragEnd}>
            {parentItems.map((parentItem) => (
                <SortableItem key={parentItem.id} id={parentItem.id}>
                    <DragHandle />
                    <div style={{ background: 'blue', margin: '5px', padding: '5px' }}>
                        parent {parentItem.number}
                        <SortableWrapper
                            items={parentItem.childElements}
                            onDragEnd={(event) => handleChildDragEnd(event, parentItem.id)}
                        >
                            {parentItem.childElements.map((childItem) => (
                                <SortableItem key={childItem.id} id={childItem.id}>
                                    <DragHandle />
                                    <div style={{ background: 'red', margin: '5px' }}>
                                        child {childItem.number}
                                    </div>
                                </SortableItem>
                            ))}
                        </SortableWrapper>
                    </div>
                </SortableItem>
            ))}
        </SortableWrapper>
    );
}
