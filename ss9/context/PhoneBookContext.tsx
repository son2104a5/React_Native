import PhoneApp from "@/components/PhoneApp";
import { Phone } from "@/interfaces/phone.interface";
import React, { useState } from "react";

interface InitialContext {
    isShowForm?: boolean,
    onOpenForm?: () => void,
    onCloseForm?: () => void,
    onAddPhoneBook?: (phone: Phone) => void
}

// Tạo ngữ cảnh
const PhoneContext = React.createContext<InitialContext>({
    isShowForm: false,
});

// Tạo component để bọc các component cần sử dụng context
const PhoneBookProvider = ({ children }: { children: React.ReactNode}) => {
    const [isShowForm, setIsShowForm] = useState<boolean>(false);
    const [phoneBooks, setPhoneBooks] = useState<Phone[]>([])

    const onOpenForm = () => {
        setIsShowForm(true)
    }

    const onCloseForm = () => {
        setIsShowForm(false)
    }

    const handleAddPhone = (phoneBookValue: Phone) => {
        setPhoneBooks([...phoneBooks, phoneBookValue]);
    }
    return (
        <PhoneContext.Provider
            value={{
                isShowForm,
                onOpenForm,
                onCloseForm,
                onAddPhoneBook: handleAddPhone
            }}
        >
            {/* Import tất cả component cần dùng context */}
            <PhoneApp />
        </PhoneContext.Provider>
    )
}

export { PhoneContext, PhoneBookProvider };