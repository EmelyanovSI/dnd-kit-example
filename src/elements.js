import { v4 } from 'uuid';

const getChildElement = (number) => ({
    id: v4(),
    number
});

export const parentElements = [
    {
        id: v4(),
        number: 0,
        childElements: [
            getChildElement(0),
            getChildElement(1),
            getChildElement(2)
        ]
    },
    {
        id: v4(),
        number: 1,
        childElements: [
            getChildElement(0),
            getChildElement(1),
            getChildElement(2)
        ]
    },
    {
        id: v4(),
        number: 2,
        childElements: [
            getChildElement(0),
            getChildElement(1),
            getChildElement(2)
        ]
    }
];
