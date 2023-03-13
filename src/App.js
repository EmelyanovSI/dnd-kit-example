import React, { useState } from 'react';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy
} from '@dnd-kit/sortable';
import {
    closestCenter,
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';

import { SortableItem } from './SortableItem';
import { parentElements } from './elements';

export default function App() {
    const [parentItems, setParentItems] = useState(parentElements);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );
    const childSensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

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
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleParentDragEnd}
        >
            <SortableContext
                items={parentItems}
                strategy={verticalListSortingStrategy}
            >
                {parentItems.map((parentItem) => (
                    <SortableItem key={parentItem.id} id={parentItem.id}>
                        <div style={{ background: 'blue', margin: '5px', padding: '5px' }}>
                            child {parentItem.number}
                            <DndContext
                                sensors={childSensors}
                                collisionDetection={closestCenter}
                                onDragEnd={(event) => handleChildDragEnd(event, parentItem.id)}
                            >
                                <SortableContext
                                    items={parentItem.childElements}
                                    strategy={verticalListSortingStrategy}
                                >
                                    {parentItem.childElements.map((childItem) => (
                                        <SortableItem key={childItem.id} id={childItem.id}>
                                            <div style={{ background: 'red', margin: '5px' }}>
                                                child {childItem.number}
                                            </div>
                                        </SortableItem>
                                    ))}
                                </SortableContext>
                            </DndContext>
                        </div>
                    </SortableItem>
                ))}
            </SortableContext>
        </DndContext>
    );
}
