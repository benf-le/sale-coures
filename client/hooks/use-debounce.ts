import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay?:number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, delay || 500);

        return () => {
            clearTimeout(timer);
        }
    }, [value, delay]);

    return debouncedValue;
};

// dùng để ngăn chặn người dùng search liên tục, hàm trên dùng để delay 500ms sau mỗi lần người dùng nhập vào input