import React, { useMemo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { SortableItemContext } from './context';

export function SortableItem({ id, children }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition
    } = useSortable({ id });
    const context = useMemo(() => ({
        attributes,
        listeners,
        ref: setActivatorNodeRef
    }), [attributes, listeners, setActivatorNodeRef]);

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <SortableItemContext.Provider value={context}>
            <div ref={setNodeRef} style={style}>
                {children}
            </div>
        </SortableItemContext.Provider>
    );
}
