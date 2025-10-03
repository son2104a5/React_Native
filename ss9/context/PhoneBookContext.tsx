import PhoneApp from "@/components/PhoneApp";
import { Phone } from "@/interfaces/phone.interface";
import React, { useState } from "react";

interface InitialContext {
  isShowForm?: boolean;
  selectedPhone?: Phone | null;
  phoneBooks?: Phone[];
  onOpenForm?: (phone?: Phone) => void;
  onCloseForm?: () => void;
  onAddPhoneBook?: (phone: Phone) => void;
  onEditPhoneBook?: (phone: Phone) => void;
  onDeletePhoneBook?: (id: string) => void;
}

const PhoneContext = React.createContext<InitialContext>({
  isShowForm: false,
});

const PhoneBookProvider = ({ children }: { children: React.ReactNode }) => {
  const [isShowForm, setIsShowForm] = useState<boolean>(false);
  const [phoneBooks, setPhoneBooks] = useState<Phone[]>([]);
  const [selectedPhone, setSelectedPhone] = useState<Phone | null>(null);

  const onOpenForm = (phone?: Phone) => {
    if (phone) setSelectedPhone(phone);
    else setSelectedPhone(null);
    setIsShowForm(true);
  };

  const onCloseForm = () => {
    setIsShowForm(false);
    setSelectedPhone(null);
  };

  const handleAddPhone = (phoneBookValue: Phone) => {
    setPhoneBooks([...phoneBooks, { ...phoneBookValue, id: Date.now().toString() }]);
  };

  const handleEditPhone = (phone: Phone) => {
    setPhoneBooks(
      phoneBooks.map((p) => (p.id === phone.id ? phone : p))
    );
  };

  const handleDeletePhone = (id: string) => {
    setPhoneBooks(phoneBooks.filter((p) => p.id !== id));
  };

  return (
    <PhoneContext.Provider
      value={{
        isShowForm,
        phoneBooks,
        selectedPhone,
        onOpenForm,
        onCloseForm,
        onAddPhoneBook: handleAddPhone,
        onEditPhoneBook: handleEditPhone,
        onDeletePhoneBook: handleDeletePhone,
      }}
    >
      <PhoneApp />
    </PhoneContext.Provider>
  );
};

export { PhoneContext, PhoneBookProvider };
