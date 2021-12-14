import React, { useState } from 'react';


function useInputState(initialVal: string | number) {
    const [value, setValue] = useState<string | number>(initialVal);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value)
        setValue(event.target.value)
    }
    return [value, handleChange] as const
}

export default useInputState;
